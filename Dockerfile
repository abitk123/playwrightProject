FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx playwright install --with-deps

COPY . .

RUN npm install allure-playwright --save-dev
RUN npm install -g allure-commandline

RUN chmod +x /usr/local/bin/allure

ENTRYPOINT ["npx", "playwright", "test"]
