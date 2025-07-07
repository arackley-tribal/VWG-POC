import json
import os
import shutil
from collections import Counter
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from fpdf import FPDF

def generate_visuals(folder_name: str):
    report_path = os.path.join("reports", folder_name, "report.json")
    export_path = os.path.join("reports", folder_name, "charts")
    os.makedirs(export_path, exist_ok=True)

    with open(report_path, encoding="utf-8") as f:
        data = json.load(f)

    print("✅ Report loaded.")

    # === Word frequency from page text ===
    text_words = data['text'].lower().split()
    word_counts = Counter(word.strip('.,!"()[]') for word in text_words if len(word) > 3)

    # === Subject matter estimation ===
    summary_words = data['summary'].lower().split()
    meta_words = ' '.join(m.get('content', '') for m in data['metadata']).lower().split()
    subject_words = summary_words + meta_words
    subject_counts = Counter(word.strip('.,!"()[]') for word in subject_words if len(word) > 3)

    # === Image keyword analysis ===
    image_terms = []
    for image in data['media']:
        if 'analysis' in image and isinstance(image['analysis'], str):
            words = image['analysis'].lower().split()
            image_terms.extend(word.strip('.,!"()[]') for word in words if len(word) > 3)
    image_counts = Counter(image_terms)

    # === Helpers ===
    def save_bar_chart(counter, title, filename):
        items = counter.most_common(10)
        labels, values = zip(*items) if items else ([], [])
        plt.figure(figsize=(10, 5))
        plt.bar(labels, values)
        plt.title(title)
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.savefig(os.path.join(export_path, filename))
        plt.close()

    def save_word_cloud(counter, title, filename):
        wordcloud = WordCloud(width=800, height=400, background_color='white').generate_from_frequencies(counter)
        plt.figure(figsize=(10, 5))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis('off')
        plt.title(title)
        plt.tight_layout()
        plt.savefig(os.path.join(export_path, filename))
        plt.close()

    # === Generate Charts ===
    save_bar_chart(word_counts, "Top 10 Frequent Words in Text", "text_word_freq.png")
    save_word_cloud(subject_counts, "Subject Matter Word Cloud", "subject_wordcloud.png")
    save_bar_chart(image_counts, "Top 10 Image Summary Keywords", "image_keywords.png")

    # Save chart metadata
    chart_metadata = {
        "text_word_freq": word_counts.most_common(20),
        "subject_wordcloud": subject_counts.most_common(20),
        "image_keywords": image_counts.most_common(20)
    }
    with open(os.path.join(export_path, "chart_data.json"), "w", encoding="utf-8") as f:
        json.dump(chart_metadata, f, indent=2, ensure_ascii=False)

    # === Generate PDF ===
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    for img_file in ["text_word_freq.png", "subject_wordcloud.png", "image_keywords.png"]:
        pdf.add_page()
        pdf.set_font("Arial", "B", 16)
        pdf.cell(0, 10, img_file.replace("_", " ").replace(".png", ""), ln=True)
        pdf.image(os.path.join(export_path, img_file), x=10, y=30, w=180)

    pdf_path = os.path.join(export_path, "chart_summary.pdf")
    pdf.output(pdf_path)

    # === Zip everything ===
    zip_path = os.path.join("reports", folder_name, f"{folder_name}_export.zip")
    shutil.make_archive(zip_path.replace(".zip", ""), 'zip', export_path)

    print(f"✅ Charts, JSON, PDF, and ZIP saved to: {export_path}")
    return {
        "charts_folder": export_path,
        "pdf": pdf_path,
        "zip": zip_path,
        "chart_data_json": os.path.join(export_path, "chart_data.json")
    }

# Optional: allow running standalone for local testing
if __name__ == "__main__":
    import sys
    folder_arg = sys.argv[1] if len(sys.argv) > 1 else None
    if not folder_arg:
        print("⚠️ Please provide a folder name as an argument.")
    else:
        generate_visuals(folder_arg)
