import { expect, request, APIRequestContext } from "@playwright/test";
import { generateRandomUser } from "../helpers/randomizer";
import { test } from "../test-fixtures";
import { Assert } from "../helpers/apiAsserts";
import { generateArticle } from "../helpers/articleFactory";

import { ApiClient } from "../helpers/apiClient";

test.describe.serial("API suite @api", () => {
  let apiContext: APIRequestContext;
  let url = process.env.URL_API || "/";
  let apiClient: ApiClient;
  let article = generateArticle();
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

  test("Create user - empty password", async () => {
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
    await assert.assertUnsuccessfulUserCreation(
      response,
      "password",
      "can't be blank"
    );
  });

  test("Create user - empty name", async () => {
    const requestBody = {
      user: {
        email: randomUser.email,
        password: "pass123",
        username: "",
      },
    };

    let response = await apiClient.createUser(
      requestBody.user.email,
      requestBody.user.password,
      requestBody.user.username
    );
    await assert.assertUnsuccessfulUserCreation(
      response,
      "username",
      "can't be blank"
    );
  });

  test("Create user - empty email", async () => {
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
    await assert.assertUnsuccessfulUserCreation(
      response,
      "email",
      "can't be blank"
    );
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
    await assert.assertSuccessfulLogin(
      response,
      loginData.username,
      loginData.email
    );
  });

  test("Login - invalid password", async ({ loginData }) => {
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
    await assert.assertUnsuccessfulLogin(
      response,
      "email or password",
      "is invalid"
    );
  });

  test("Login - unregistered user", async ({}) => {
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
    await assert.assertUnsuccessfulLogin(
      response,
      "email or password",
      "is invalid"
    );
  });

  test("Article - create", async ({}) => {
    const requestBody = {
      article: {
        title: article.title,
        description: article.description,
        body: article.articleContent,
        tagList: article.tagList,
      },
    };

    let response = await apiClient.createArticle(
      requestBody.article.title,
      requestBody.article.description,
      requestBody.article.body,
      requestBody.article.tagList
    );

    await assert.assertSuccessfulArticleCreation(
      response,
      article.title,
      article.description,
      article.articleContent
    );
  });

  test("Create article without token - should fail", async () => {
    let apiClient = new ApiClient(apiContext, url);

    apiClient["authToken"] = null;

    let response = await apiClient.createArticle(
      article.title,
      article.description,
      article.articleContent,
      article.tagList
    );

    let message = await response.json()

    expect(response.status()).toBe(401);
    expect(message.message).toEqual("missing authorization credentials");
    
  });
});
