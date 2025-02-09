import { expect, request, APIRequestContext } from "@playwright/test";
import { generateRandomUsername } from "../helpers/randomizer";
import { test } from "../test-fixtures";
import { Assert } from "../helpers/asserts";
import dotenv from "dotenv";
dotenv.config();

import { ApiClient } from "../helpers/apiClient";

test.describe("API suite @smoke @regression", () => {
  let apiContext: APIRequestContext;
  let url = process.env.URL_API || "/";
  let apiClient: ApiClient;
  let assert = new Assert();
  let randomUsername: string;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    apiClient = new ApiClient(apiContext, url);
    randomUsername = generateRandomUsername("UsernameTest");
  });

  test("Create user - success", async () => {
    const requestBody = {
      user: {
        email: `${randomUsername}@mail.com`,
        password: "pass123!",
        username: randomUsername,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertSuccessfulUserCreation(response, randomUsername);
  });

  test("Create user - empty password", async () => {
    
    const requestBody = {
      user: {
        email: `${randomUsername}@mail.com`,
        password: "",
        username: randomUsername,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnSuccessfulUserCreation(response, "password", "can't be blank");

  });

  test("Create user - empty name", async () => {
    const requestBody = {
      user: {
        email: `${randomUsername}@mail.com`,
        password: "pass123",
        username: "",
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnSuccessfulUserCreation(response, "username", "can't be blank");
  });

  test("Create user - empty email", async () => {
    const requestBody = {
      user: {
        email: ``,
        password: "pass123",
        username: randomUsername,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnSuccessfulUserCreation(response, "email", "can't be blank");
  });

  test("Login - success", async ({ loginData }) => {
    const requestBody = {
      user: {
        email: loginData.email,
        password: loginData.password,
      },
    };

    let response = await apiClient.loginUser(
      requestBody.user.email,
      requestBody.user.password
    );
    await assert.assertSuccessfulLogin(response, loginData.username, loginData.email);
  });
});
