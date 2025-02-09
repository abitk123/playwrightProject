import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async login(email: string, password: string): Promise<void> {
    await this.page.getByPlaceholder("Email").fill(email);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async gotoRegistrationPage(): Promise<void> {
    await this.page.getByText("Need an account?").click();
  }
  
  

}
