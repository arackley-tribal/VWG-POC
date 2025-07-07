# web_scraper_browser.py

import os
import uuid
import json
import base64
import requests
from tqdm import tqdm
from datetime import datetime
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from playwright_stealth import stealth_async
import openai
from dotenv import load_dotenv
import subprocess

# === LOAD ENV ===
load_dotenv()

# === CONFIGURATION ===
openai_api_key = os.getenv("OPENAI_API_KEY")
client = openai.AsyncOpenAI(api_key=openai_api_key)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9"
}

async def fetch_page_with_browser(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-setuid-sandbox"])
        context = await browser.new_context(
            user_agent=HEADERS["User-Agent"],
            locale="en-US"
        )
        page = await context.new_page()
        await stealth_async(page)
        await page.goto(url, wait_until="domcontentloaded", timeout=60000)
        content = await page.content()
        await browser.close()
        return content

async def scrape_page(url, folder_name=None, questions_file=None):
    print(f"🔍 Launching browser and loading: {url}")
    html = await fetch_page_with_browser(url)
    soup = BeautifulSoup(html, 'html.parser')
    print(f"✅ Page Loaded")

    if not folder_name:
        folder_name = str(uuid.uuid4())
    else:
        folder_name = folder_name.strip().replace(" ", "_").replace("/", "_")

    base_folder = os.path.join("reports", folder_name)
    images_folder = os.path.join(base_folder, "images")
    if os.path.exists(base_folder):
        print(f"⚠️ Folder '{folder_name}' already exists. Files may be overwritten.")

    os.makedirs(images_folder, exist_ok=True)

    with open(os.path.join(base_folder, "page.html"), "w", encoding="utf-8") as f:
        f.write(html)

    metadata = [{k: v for k, v in tag.attrs.items()} for tag in soup.find_all("meta") if tag.attrs]

    title = soup.title.string if soup.title else 'No title found'
    for script_or_style in soup(['script', 'style']):
        script_or_style.extract()
    text = ' '.join(soup.stripped_strings)
    summary = await summarize_text(text)

    print(f"🔍 Processing Images")
    media = []
    seen_images = set()
    image_tags = []

    for tag in soup.find_all('img'):
        src = tag.get('src')
        if not src:
            continue
        if src.startswith('//'):
            src = 'https:' + src
        elif src.startswith('/'):
            src = urljoin(url, src)
        elif not src.startswith('http') or src.lower().endswith('.svg'):
            continue
        if src in seen_images:
            continue
        seen_images.add(src)
        tag['normalized_src'] = src
        image_tags.append(tag)

    for idx, tag in enumerate(tqdm(image_tags, desc="Analyzing Images", unit="img")):
        src = tag['normalized_src']
        image_filename = f"image_{idx + 1}{get_file_extension(src)}"
        image_path = os.path.join(images_folder, image_filename)
        success = download_image(src, image_path)
        analysis = await analyze_image_from_file(image_path) if success else "Image could not be downloaded."
        media.append({
            'tag': tag.name,
            'src': src,
            'alt': tag.get('alt', ''),
            'saved_as': image_filename,
            'analysis': analysis
        })

    print(f"🔍 Processing Videos")
    videos = []
    seen_videos = set()

    for video_tag in soup.find_all('video'):
        for source in video_tag.find_all('source'):
            src = source.get('src')
            if not src:
                continue
            full_src = urljoin(url, src)
            if full_src in seen_videos:
                continue
            seen_videos.add(full_src)
            videos.append({
                'tag': 'video',
                'src': full_src,
                'type': source.get('type', ''),
                'description': video_tag.get('title', '') or video_tag.get('aria-label', '')
            })

    for iframe in soup.find_all('iframe'):
        src = iframe.get('src')
        if not src:
            continue
        full_src = urljoin(url, src)
        if any(site in full_src for site in ["youtube", "vimeo", "embed"]):
            if full_src in seen_videos:
                continue
            seen_videos.add(full_src)
            videos.append({
                'tag': 'iframe',
                'src': full_src,
                'type': 'embedded',
                'description': iframe.get('title', '') or iframe.get('aria-label', '')
            })

    custom_questions = []
    if questions_file and os.path.exists(questions_file):
        print(f"💬 Answering questions from {questions_file}...")
        with open(questions_file, encoding="utf-8") as f:
            for question in f:
                question = question.strip()
                if question:
                    print(f"❓ {question}")
                    try:
                        response = await client.chat.completions.create(
                            model="gpt-3.5-turbo",
                            messages=[
                                {"role": "system", "content": "You are an expert assistant helping analyze a webpage. Answer clearly and concisely."},
                                {"role": "user", "content": f"{question}\n\nPage content:\n{text[:3000]}"}
                            ]
                        )
                        answer = response.choices[0].message.content
                    except Exception as e:
                        answer = f"Error: {e}"
                    custom_questions.append({"question": question, "answer": answer})

    report = {
        'id': folder_name,
        'timestamp': datetime.now().isoformat(),
        'url': url,
        'title': title,
        'metadata': metadata,
        'summary': summary,
        'text': text,
        'media': media,
        'videos': videos,
        'custom_questions': custom_questions
    }

    report_path = os.path.join(base_folder, "report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"✅ Report Saved to {report_path}")

    # Auto-run visualization
    print("📊 Generating visual summary...")
    from visualize import generate_visuals
    generate_visuals(folder_name)

    return report

async def summarize_text(text):
    text = text[:3000]
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Summarize the content of this web page."},
                {"role": "user", "content": text}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error summarizing text: {e}"

async def analyze_image_from_file(image_path):
    try:
        with open(image_path, "rb") as image_file:
            image_data = base64.b64encode(image_file.read()).decode('utf-8')
        image_base64 = f"data:image/jpeg;base64,{image_data}"

        response = await client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are an expert at analyzing images. Describe what's in this image."},
                {"role": "user", "content": [{"type": "image_url", "image_url": {"url": image_base64}}]}
            ],
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error analyzing image: {e}"

def download_image(url, save_path):
    try:
        img_response = requests.get(url, headers=HEADERS, stream=True, timeout=10)
        if img_response.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in img_response.iter_content(1024):
                    f.write(chunk)
            return True
    except Exception as e:
        print(f"⚠️ Failed to download image {url}: {e}")
    return False

def get_file_extension(url):
    path = urlparse(url).path
    ext = os.path.splitext(path)[1]
    return ext if ext else ".jpg"
