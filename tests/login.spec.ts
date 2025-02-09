import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";

test.describe("Login suite", () => {
  let pm: PageManager;
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test("Successful login - direct way @regression @smoke", async ({
    page,
    loginData,
  }) => {
    await pm.gotoPage("Sign in");
    await pm.login(loginData.email, loginData.password);

    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();
  });

  test("Login through the Registration page @regression", async ({
    page,
    loginData,
  }) => {
    await pm.gotoPage("Sign up");
    await pm.goToLoginPage();
    await pm.login(loginData.email, loginData.password);

    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();
  });
});
