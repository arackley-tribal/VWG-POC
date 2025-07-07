# Makefile for Web Scraper + FastAPI + Docker

# Build Docker image
build:
	docker build -t web-scraper .

# Run scraper in dev mode with Xvfb and hot reload
dev:
	docker run -it --rm -v $(shell pwd):/app -w /app -p 8009:8009 web-scraper uvicorn web_api:app --host 0.0.0.0 --port 8009 --reload

# Run the FastAPI API (without scraping)
api:
	docker run -it --rm -v $(shell pwd):/app -w /app -p 8009:8009 web-scraper uvicorn web_api:app --host 0.0.0.0 --port 8009 --reload

# Run scraper in production mode (no hot-reloading)
prod:
	docker run -it --rm -v $(shell pwd):/app -w /app -p 8009:8009 web-scraper
