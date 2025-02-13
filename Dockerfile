FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx playwright install --with-deps

COPY . .

ENTRYPOINT ["npx", "playwright", "test"]