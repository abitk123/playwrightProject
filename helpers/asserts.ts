import { expect, APIResponse, Page } from "@playwright/test";

export class Assert {
  async assertSuccessfulUserCreation(
    response: APIResponse,
    expectedUsername: string
  ) {
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(expectedUsername);
    expect(responseBody.user).toHaveProperty("token");
  }

  async assertUnsuccessfulUserCreation(
    response: APIResponse,
    field: string,
    expectedMessage: string
  ) {
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody.errors[field][0]).toEqual(expectedMessage);
  }

  async assertSuccessfulLogin(
    response: APIResponse,
    username: string,
    email: string
  ) {
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(username);
    expect(responseBody.user.email).toBe(email);
    expect(responseBody.user).toHaveProperty("token");
  }

  async assertUnsuccessfulLogin(
    response: APIResponse,
    field: string,
    expectedMessage: string
  ) {
    expect(response.status()).toBe(403);
    const responseBody = await response.json();
    expect(responseBody.errors[field][0]).toEqual(expectedMessage);
  }

  async assertLogout(page: Page) {
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  }

  async assertUILogin(page: Page, title: string) {
    await expect(
      page.getByRole("link", { name: title })
    ).toBeVisible();
  }


  async assertArticleDeleteMainPage(page: Page, articleTitle: string) {
    await expect(
      page.locator("app-article-list", { hasText: articleTitle })
    ).toBeVisible({ visible: false });
  }

  async assertArticleCreationMainPage(page: Page, articleTitle: string) {
    await expect(page.locator("app-article-list")).toContainText(articleTitle);
  }

}
