#!/bin/bash

# Load environment variables from .env
if [ ! -f .env ]; then
  echo "❌ .env file not found! Please create one with your OPENAI_API_KEY."
  exit 1
fi

# Start the container with live code volume mounting and reload support using xvfb-run
# NOTE: xvfb and xauth are installed in the Dockerfile

echo "🚀 Starting in development mode with hot-reloading (Xvfb)..."
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  --env-file .env \
  web-scraper \
  bash -c "
    pip install --quiet watchdog;
    echo ▶️ Running initial scrape...;
    xvfb-run web_scraper_browser.py questions.txt;

    echo 🔁 Starting watchmedo for hot-reload...;
    xvfb-run watchmedo auto-restart \
      --directory=./ \
      --pattern=*.py \
      --recursive \
      --verbose \
      -- python web_scraper_browser.py questions.txt
  "
