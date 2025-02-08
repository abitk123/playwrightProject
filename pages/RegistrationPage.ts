import { Page, expect } from "@playwright/test";

export class RegistrationPage {
  constructor(private page: Page) {}

  async register(username: string, email: string, password: string): Promise<void> {

    const signUpButton = this.page.getByRole("button", { name: "Sign up" })

    await expect(signUpButton).toBeDisabled();
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Email").fill(email);
    await this.page.getByPlaceholder("Password").fill(password);
    await expect(signUpButton).toBeEnabled();
    await this.page.getByRole("button", { name: "Sign up" }).click();
  }
}
