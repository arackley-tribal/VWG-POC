# Dockerfile for Web Scraper + FastAPI + Graphiti + Xvfb + Stealth

FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  build-essential \
  python3-dev \
  wget curl gnupg libglib2.0-0 libnss3 libgconf-2-4 libfontconfig1 \
  libxss1 libasound2 libxtst6 libxrandr2 libgtk-3-0 libgbm1 libx11-xcb1 \
  libxcomposite1 libxdamage1 libxfixes3 libxshmfence1 libu2f-udev \
  libatspi2.0-0 libenchant-2-2 libsecret-1-0 ca-certificates \
  fonts-liberation libdrm2 libxcb1 libxext6 xvfb xauth \
  && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright and browsers
RUN playwright install --with-deps

# Install Uvicorn for FastAPI
RUN pip install uvicorn

# Copy all app files (since we're mounting the root directory, this is needed)
COPY . .

# Expose the port FastAPI will run on
EXPOSE 8000

# Run FastAPI server by default
CMD ["uvicorn", "web_api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
