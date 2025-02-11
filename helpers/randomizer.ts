import { faker } from '@faker-js/faker';

export function generateRandomUser(base?: string) {
  const username = base ? `${base}${faker.string.alphanumeric(6)}` : faker.internet.username();
  const password = faker.internet.password();
  const email = faker.internet.email();

  return { username, email, password};
}

