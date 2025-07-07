#!/bin/bash

# Load env variables
if [ ! -f .env ]; then
  echo "❌ .env file not found! Please create one with your OPENAI_API_KEY."
  exit 1
fi

# Build the Docker image if not built yet
echo "🔧 Building Docker image 'web-scraper'..."
docker build -t web-scraper . || { echo "❌ Failed to build Docker image."; exit 1; }

# Run the container with .env variables
echo "🚀 Running web scraper..."
docker run -it --rm --env-file .env web-scraper