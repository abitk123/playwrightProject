import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";
import article from "../data/article.json";
import { Assert } from "../helpers/asserts";
import { faker } from "@faker-js/faker";

import { generateRandomUser } from "../helpers/randomizer";


test.describe("Login suite", () => {
  let pm: PageManager;
  let assert = new Assert();
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });


  test("Create user, create article and delete article @regression", async ({
    page,
  }) => {
    const articleTitle = faker.lorem.words(3);
    const randomUser = generateRandomUser();
    await pm.register(
      randomUser.username,
      randomUser.email,
      randomUser.password
    );
    await assert.assertUILogin(page, randomUser.username);
    await pm.gotoPage("New Article");
    await pm.createArticle(
      articleTitle,
      article.about,
      article.article,
      article.tag
    );

    await expect(page.getByRole("paragraph")).toContainText(article.article);

    await pm.gotoPage("Home");
    await assert.assertArticleCreationMainPage(page, articleTitle);

    await pm.goToCreatedArticle(articleTitle);

    await pm.deleteArticle();

    await pm.gotoPage("Home");
    await assert.assertArticleDeleteMainPage(page, articleTitle);
  });


  test("Create user, change creds and login with new data @regression", async ({
    page,
  }) => {
    const randomUser = generateRandomUser();
    await pm.register(
      randomUser.username,
      randomUser.email,
      randomUser.password
    );

    await assert.assertUILogin(page, randomUser.username);
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
