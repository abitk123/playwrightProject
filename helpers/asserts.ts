import { expect, APIResponse } from "@playwright/test";

export class Assert {
  async assertSuccessfulUserCreation(response: APIResponse, expectedUsername: string) {
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(expectedUsername);
    expect(responseBody.user).toHaveProperty("token");
  }

  async assertUnSuccessfulUserCreation(response: APIResponse, field: string, expectedMessage: string) {
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody.errors[field][0]).toEqual(expectedMessage);
  }

  async assertSuccessfulLogin(response: APIResponse, username: string, email: string) {
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(username);
    expect(responseBody.user.email).toBe(email);
    expect(responseBody.user).toHaveProperty("token");
}
}
