FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npx playwright install --with-deps

COPY . .

RUN ls -la /app && ls -la /app/node_modules/.bin/

CMD ["npx", "playwright", "test"]
