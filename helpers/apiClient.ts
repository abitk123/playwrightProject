import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  private apiContext: APIRequestContext;
  private baseUrl: string;

  constructor(apiContext: APIRequestContext, baseUrl: string) {
    this.apiContext = apiContext;
    this.baseUrl = baseUrl;
  }

  async createUser(email: string, password: string, username: string) {
    const requestBody = { user: { email, password, username } };
    return this.apiContext.post(`${this.baseUrl}/users`, {
      data: requestBody,
      headers: { "Content-Type": "application/json" },
    });
  }

  async loginUser(email: string, password: string) {
    const requestBody = { user: { email, password } };
    return this.apiContext.post(`${this.baseUrl}/users/login`, {
      data: requestBody,
      headers: { "Content-Type": "application/json" },
    });
  }
}
