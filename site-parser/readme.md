# 🧠 Web Intelligence Scraper

A powerful, browser-based AI-enhanced tool for scraping, analyzing, and summarizing web pages. Extracts images, videos, metadata, text, and performs OpenAI-assisted content analysis — with visualizations and custom Q&A support.

---

## 🚀 Features

- ✅ Headless browser scraping via Playwright
- 📄 Saves HTML, JSON, and image content
- 🧠 Auto-summary of web page text using GPT-3.5/4
- 📷 Image download + GPT-4 vision analysis
- 🎥 Video & iframe detection (YouTube, Vimeo, etc.)
- ✍️ Custom user questions (from a file)
- 📊 Visualization: word clouds, keyword bars, PDF exports
- 📦 ZIP export of full report

---

## 🛠️ Requirements

- Docker & Docker Compose
- OpenAI API key (via `.env` file)

---

## 📁 Folder Structure

```
reports/
  └── my-page-id/
       ├── report.json
       ├── page.html
       ├── images/
       └── charts/
            ├── chart_summary.pdf
            ├── text_word_freq.png
            ├── subject_wordcloud.png
            ├── image_keywords.png
```

---

## 🔐 .env File (required)

Create a `.env` file with:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ▶️ How to Run

### First Build the Image:
```bash
docker build -t web-scraper .
```

### Then Start in Dev Mode (with hot reload + xvfb)
```bash
make dev
```

You’ll be prompted to:
- Enter a URL to scrape
- Provide a folder name (or auto-generate)
- It will auto-run `visualize.py` and zip the report

---

## 📥 Custom Questions

Add a `questions.txt` in the root folder. Each line is a question to ask the AI about the scraped page.

Example `questions.txt`:
```
What is the main message?
What is the call to action?
Who is the target audience?
```

These will be added to `report.json` under `"custom_questions"`.

---

## 📊 Visual Summary

A separate `visualize.py` script runs automatically and outputs:
- Top keywords (bar chart)
- Subject matter word cloud
- Keywords extracted from image analysis
- A PDF summary
- A ZIP archive of everything

---