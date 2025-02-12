# Используем официальный Playwright-образ
FROM mcr.microsoft.com/playwright:v1.50.1

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой (чтобы кешировать слои)
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая Playwright и Faker)
RUN npm install --legacy-peer-deps

# Устанавливаем Playwright (браузеры и зависимости)
RUN npx playwright install --with-deps

# Копируем оставшиеся файлы проекта (тесты, конфиги)
COPY . .

# Даем права на выполнение Allure
RUN chmod +x ./node_modules/.bin/allure

# Устанавливаем Allure CLI глобально
RUN npm install -g allure-commandline

# Используем ENTRYPOINT для запуска тестов
ENTRYPOINT ["npx", "playwright", "test"]
