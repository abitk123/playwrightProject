import { generateRandomUser } from '../../helpers/randomizer'
import { Assert } from "../../helpers/asserts";
import { Page } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';


export async function registerNewClient(page: Page) {
  const pageManager = new PageManager(page);
  const assert = new Assert();
  const randomUser = generateRandomUser();

  await pageManager.register(randomUser.username, randomUser.email, randomUser.password);
  await assert.assertUILogin(page, randomUser.username);

  return randomUser;
}
