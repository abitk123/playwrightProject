import { expect } from "@playwright/test";
import { generateRandomUser } from "../helpers/randomizer";
import { PageManager } from "../pages/PageManager";
import { test } from "../test-fixtures";

test.describe("Registration suite", () => {
  let pm: PageManager;
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL || "/");
    pm = new PageManager(page);
  });

  test("Successful registration @regression @smoke", async ({ page }) => {
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(
      randomUser.username,
      randomUser.email,
      randomUser.password
    );

    await expect(
      page.getByRole("link", { name: randomUser.username })
    ).toBeVisible();
  });

  test("Successful registration throw login page @regression", async ({
    page,
  }) => {
    
    await pm.gotoPage("Sign in");
    await pm.gotoRegistrationPageFromLogin();
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(
      randomUser.username,
      randomUser.email,
      randomUser.password
    );
    await expect(
      page.getByRole("link", { name: randomUser.username })
    ).toBeVisible();
  });

  test("Try to register client with empty username @regression", async ({
    page,
  }) => {
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(" ", randomUser.email, randomUser.password);

    await expect(page.getByText("username can't be blank")).toBeVisible();
  });

  test("Try to register client with empty email @regression", async ({
    page,
  }) => {
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(randomUser.username, " ", randomUser.password);

    await expect(page.getByText("email can't be blank")).toBeVisible();
  });

  test("Try to register client with taken username @regression", async ({
    page,
    loginData,
  }) => {
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(
      loginData.username,
      randomUser.email,
      randomUser.password
    );

    await expect(
      page.getByText("username has already been taken")
    ).toBeVisible();
  });

  test("Try to register client with taken email @regression  @smoke", async ({
    page,
    loginData,
  }) => {
    const randomUser = generateRandomUser("UsernameTest");

    await pm.register(randomUser.username, loginData.email, "Password123");

    await expect(page.getByText("email has already been taken")).toBeVisible();
  });
});
