FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jdk && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npx playwright install --with-deps

COPY . .

RUN curl -o allure-2.23.0.tgz -L https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.23.0/allure-commandline-2.23.0.tgz \
    && tar -zxvf allure-2.23.0.tgz \
    && mv allure-2.23.0 /opt/allure \
    && ln -s /opt/allure/bin/allure /usr/local/bin/allure

ENV PATH="/opt/allure/bin:$PATH"

# Даем права на выполнение Allure
RUN chmod +x /opt/allure/bin/allure

RUN node -v && npm -v && npx playwright --version && allure --version

ENTRYPOINT ENTRYPOINT ["npx", "playwright", "test"]

