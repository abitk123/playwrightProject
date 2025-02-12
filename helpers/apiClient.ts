import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  private apiContext: APIRequestContext;
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(apiContext: APIRequestContext, baseUrl: string) {
    this.apiContext = apiContext;
    this.baseUrl = baseUrl;
  }

  async createUser(email: string, password: string, username: string) {
    const requestBody = { user: { email, password, username } };
    const response = await this.apiContext.post(`${this.baseUrl}/users`, {
      data: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok()) {
      const responseBody = await response.json();
      this.authToken = responseBody.user.token; 
    }

    return response;
  }

  async loginUser(email: string, password: string) {
    const requestBody = { user: { email, password } };
    const response = await this.apiContext.post(`${this.baseUrl}/users/login`, {
      data: requestBody,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok()) {
      const responseBody = await response.json();
      this.authToken = responseBody.user.token; 
    }

    return response;
  }

  async createArticle(
    title: string,
    description: string,
    articleContent: string,
    tagList?: string[]
  ) {
    const requestBody = {
      article: {
        title,
        description,
        body: articleContent,
        ...(tagList && { tagList }),
      },
    };

    return this.apiContext.post(`${this.baseUrl}/articles/`, {
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.authToken}`,
      },
    });
  }
}
