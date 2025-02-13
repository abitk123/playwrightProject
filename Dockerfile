FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.50.1-jammy

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x jammy main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install -y nodejs

RUN node -v && npm -v

COPY package*.json ./

RUN ls -la /app

RUN npm install --legacy-peer-deps && ls -la /app/node_modules/.bin/ || echo "npm install failed!"

RUN PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 npx playwright install --with-deps

COPY . .

RUN ls -la /app && ls -la /app/node_modules/.bin/

CMD ["npx", "playwright", "test"]
