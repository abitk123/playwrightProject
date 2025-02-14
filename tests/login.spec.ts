import { expect } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";

import { Assert } from "../helpers/asserts";
import { faker } from "@faker-js/faker";

test.describe("Login suite @regression @smoke", () => {
  let pm: PageManager;
  let assert = new Assert();
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test("Successful login and logout", async ({
    page,
    loginData,
  }) => {
    await pm.login(loginData.email, loginData.password);
    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();

    await pm.gotoPage("Settings");
    await pm.logout();
    await assert.assertLogout(page);
  });

  test("Login through the registration page and logout", async ({
    page,
    loginData,
  }) => {
    await pm.gotoPage("Sign up");
    await pm.goToLoginPageFromReg();
    await pm.login(loginData.email, loginData.password);

    await expect(
      page.getByRole("link", { name: loginData.username })
    ).toBeVisible();
    await pm.gotoPage("Settings");
    await pm.logout();
    await assert.assertLogout(page);
  });
  test("Login with incorrect password", async ({
    page,
    loginData,
  }) => {
    const fakePass = faker.internet.password();
    await pm.gotoPage("Sign up");
    await pm.goToLoginPageFromReg();
    await pm.login(loginData.email, fakePass);

    await expect(page.getByText("email or password is invalid")).toBeVisible();
  });

  test("Login with incorrect email", async ({
    page,
    loginData,
  }) => {
    const fakeEmail = faker.internet.email();
    await pm.gotoPage("Sign up");
    await pm.goToLoginPageFromReg();
    await pm.login(fakeEmail, loginData.password);

    await expect(page.getByText("email or password is invalid")).toBeVisible();
  });
});
