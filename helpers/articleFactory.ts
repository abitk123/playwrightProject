import { faker } from "@faker-js/faker";

export function generateArticle() {
  const title = faker.lorem.words(3);
  const description = faker.lorem.words(5);
  const articleContent = faker.lorem.words(10);
  const tagList = [faker.lorem.words(1), faker.lorem.words(1)];

  return { title, description, articleContent, tagList };
}
