import { expect, request, APIRequestContext } from "@playwright/test";
import { generateRandomUsername } from "../utils/randomizer";
import { test } from "../test-fixtures";

test.describe("API requests with Playwright @smoke", () => {
  let apiContext: APIRequestContext;
  let url = process.env.URL_API || '/';


  test.beforeAll(async () => {
    apiContext = await request.newContext();
    
  });

  test("POST Request to create user", async () => {
    const randomUsername = generateRandomUsername("UsernameTest");  
    const requestBody = {
      user: {
        email: `${randomUsername}@mail.com`,
        password: "pass123!",
        username: randomUsername,
      },
    };

    const response = await apiContext.post(
      `${url}/users`,
      {
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(randomUsername);
    expect(responseBody.user).toHaveProperty('token');
   
  });


  test("Login with API", async ({loginData}) => {

    const requestBody = {
      user: {
        email: loginData.email,
        password: loginData.password,
      },
    };

    const response = await apiContext.post(
      `${url}/users/login`,
      {
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.user.username).toBe(loginData.username);
    expect(responseBody.user.email).toBe(loginData.email);
    expect(responseBody.user).toHaveProperty('token');
   
  });
})