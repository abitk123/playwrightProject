import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";
import article from "../data/article.json";
import { Assert } from "../helpers/asserts";
import { faker } from "@faker-js/faker";


test.describe("Login suite", () => {
  let pm: PageManager;
  let assert = new Assert();
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test("Successful login, create article and check creation @regression @smoke @regression", async ({
    page,
    loginData,
  }) => {
    await pm.gotoPage("Sign in");
    await pm.login(loginData.email, loginData.password);

    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();

    await pm.gotoPage("New Article");
    await pm.createArticle(
      faker.lorem.words(3),
      article.about,
      article.article,
      article.tag
    );

    await expect(page.getByRole('paragraph')).toContainText(article.article);
  });

  test("Login through the registration page and logout @regression", async ({
    page,
    loginData,
  }) => {
    await pm.gotoPage("Sign up");
    await pm.goToLoginPage();
    await pm.login(loginData.email, loginData.password);

    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();
    await pm.gotoPage("Settings");
    await pm.logout();
    await assert.assertLogout(page);
  });
});
