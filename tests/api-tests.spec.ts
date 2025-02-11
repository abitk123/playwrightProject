import { expect, request, APIRequestContext } from "@playwright/test";
import { generateRandomUser } from "../helpers/randomizer";
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
  const randomUser = generateRandomUser();

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    apiClient = new ApiClient(apiContext, url);
  });

  test("Create user - success", async () => {
    const requestBody = {
      user: {
        email: randomUser.email,
        password: "pass123!",
        username: randomUser.username,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertSuccessfulUserCreation(response, randomUser.username);
  });

  test("Create user - empty password @smoke @regression", async () => {
    
    const requestBody = {
      user: {
        email: randomUser.email,
        password: "",
        username: randomUser.username,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnsuccessfulUserCreation(response, "password", "can't be blank");

  });

  test("Create user - empty name @regression", async () => {
    const requestBody = {
      user: {
        email: randomUser.email,
        password: "pass123",
        username: '',
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnsuccessfulUserCreation(response, "username", "can't be blank");
  });

  test("Create user - empty email @regression", async () => {
    const requestBody = {
      user: {
        email: ``,
        password: randomUser.password,
        username: randomUser.username,
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnsuccessfulUserCreation(response, "email", "can't be blank");
  });

  test("Login - success @smoke @regression @smoke", async ({ loginData }) => {
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

  test("Login - invalid password @regression", async ({ loginData }) => {
    const requestBody = {
      user: {
        email: loginData.email,
        password: "invalidPassword",
      },
    };

    let response = await apiClient.loginUser(
      requestBody.user.email,
      requestBody.user.password
    );
    await assert.assertUnsuccessfulLogin(response, "email or password",  "is invalid");
  });

  test("Login - unregistered user @regression @smoke", async ({ loginData }) => {
    const requestBody = {
      user: {

        email: randomUser.email,
        password: randomUser.password,

      },
    };

    let response = await apiClient.loginUser(
      requestBody.user.email,
      requestBody.user.password
    );
    await assert.assertUnsuccessfulLogin(response, "email or password",  "is invalid");
  });
});
