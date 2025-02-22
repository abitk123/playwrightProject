import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";
import article from "../data/article.json";
import { Assert } from "../helpers/asserts";
import { faker } from "@faker-js/faker";
import { registerNewClient } from "./handlers/registerAndLogin";
import { createArticle } from "./handlers/createArticle";

import { generateRandomUser } from "../helpers/randomizer";

test.describe("Login suite @regression, @smoke @e2e", () => {
  let pm: PageManager;
  let assert = new Assert();
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test("Create user, create article and delete article", async ({ page }) => {
    const articleTitle = faker.lorem.words(3);

    await registerNewClient(page);

    await createArticle(page, articleTitle);

    await pm.gotoPage("Home");
    await assert.assertArticleCreationMainPage(page, articleTitle);

    await pm.goToCreatedArticle(articleTitle);

    await pm.deleteArticle();

    await pm.gotoPage("Home");
    await assert.assertArticleDeleteMainPage(page, articleTitle);
  });

  test("Create user, change creds and login with new data", async ({
    page,
  }) => {
    await registerNewClient(page);
    const newData = generateRandomUser();

    await pm.updateUserData(newData.username, newData.password, newData.email);

    await page.reload();
    await pm.gotoPage("Home");
    await assert.assertUILogin(page, newData.username);

    await pm.logout();
    await assert.assertLogout(page);
    await pm.login(newData.email, newData.password);
    await assert.assertUILogin(page, newData.username);
  });
});
