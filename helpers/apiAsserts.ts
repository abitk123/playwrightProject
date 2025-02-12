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

  async assertSuccessfulArticleCreation(
    response: APIResponse,
    title: string,
    description: string,
    articleContent: string
  ) {
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.article.title).toBe(title);
    expect(responseBody.article.description).toBe(description);
    expect(responseBody.article.body).toBe(articleContent);
  }


}
