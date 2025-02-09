import { expect } from "@playwright/test";
import { generateRandomUsername } from "../helpers/randomizer";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";

test.describe("Registration suite", () => {
  let pm: PageManager;
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || '/'); 
    pm = new PageManager(page);
  });

  test("Successful registration @regression @smoke", async ({ page }) => {
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
  });

  test("Successful registration throw login page @regression", async ({ page }) => {
    const randomUsername = generateRandomUsername("UsernameTest");

    await pm.gotoPage("Sign in");
    await pm.gotoRegistrationPage();
    await pm.register(
      randomUsername,
      `${randomUsername}@gmail.com`,
      "Password123"
    );

    await expect(
      page.getByRole("link", { name: randomUsername })
    ).toBeVisible();
  });
 

  test("Try to register client with empty username @regression", async ({ page }) => {
    const randomUsername = generateRandomUsername("UsernameTest");

    await pm.gotoPage("Sign up");
    await pm.register(
      " ",
      `${randomUsername}@gmail.com`,
      "Password123"
    );

    await expect(
      page.getByText("username can't be blank")
    ).toBeVisible();
  });

  test("Try to register client with empty email @regression", async ({ page }) => {
    const randomUsername = generateRandomUsername("UsernameTest");

    await pm.gotoPage("Sign up");
    await pm.register(
      randomUsername,
      " ",
      "Password123"
    );

    await expect(
      page.getByText("email can't be blank")
    ).toBeVisible();
  });

  test("Try to register client with taken username @regression", async ({ page, loginData }) => {
    const randomUsername = generateRandomUsername("UsernameTest");

    await pm.gotoPage("Sign up");
    await pm.register(
      loginData.username,
      `${randomUsername}@gmail.com`,
      "Password123"
    );

    await expect(
      page.getByText("username has already been taken")
    ).toBeVisible();
  });

  test("Try to register client with taken email @regression", async ({ page, loginData }) => {
    const randomUsername = generateRandomUsername("UsernameTest");

    await pm.gotoPage("Sign up");
    await pm.register(
      randomUsername,
      loginData.email,
      "Password123"
    );

    await expect(
      page.getByText("email has already been taken")
    ).toBeVisible();
  });


});
