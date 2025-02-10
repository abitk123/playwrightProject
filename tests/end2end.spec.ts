import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";
import article from "../data/article.json";
import { Assert } from "../helpers/asserts";
import { faker } from "@faker-js/faker";
import { generateRandomUsername } from "../helpers/randomizer";

test.describe("Login suite", () => {
  let pm: PageManager;
  let assert = new Assert();
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test.only("Create user, create article and delete article and logout @regression @smoke @regression", async ({
    page,
  }) => {
    const articleTitle = faker.lorem.words(3);
    const randomUsername = generateRandomUsername("UsernameTest");
    await pm.gotoPage("Sign up");
    await pm.register(
      randomUsername,
      `${randomUsername}@gmail.com`,
      "Password123"
    );

    await expect(
      page.getByRole("link", { name: randomUsername })
    ).toBeVisible();

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
    await page.locator("app-article-list", { hasText: articleTitle }).click();
    await pm.deleteArticle();

    await pm.gotoPage("Home");
    await assert.assertArticleDeleteMainPage(page, articleTitle);
  });
});
