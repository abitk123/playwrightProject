FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx playwright install --with-deps

COPY . .

RUN chmod +x ./node_modules/.bin/allure

RUN npm install -g allure-commandline --save-dev

RUN npm install @faker-js/faker --save-dev

CMD ["npx", "playwright", "test"]
