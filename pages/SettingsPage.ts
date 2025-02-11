
import { expect, Page } from "@playwright/test";
import exp from "constants";
import { Page } from "@playwright/test";


export class SettingsPage {
  constructor(private page: Page) {}

  async logout() {

    await this.page
      .getByRole("button", { name: "Or click here to logout." })
      .click();
  }

  async updateUserData(
    username: string,
    password: string,
    email: string,
    bio?: string
  ) {
    await this.page.getByPlaceholder("Username").fill(username);
    if (bio) {
      await this.page.getByPlaceholder("Short bio about you").fill(bio);
    }
    await this.page.getByPlaceholder("Email").fill(email);
    await this.page.getByPlaceholder("New Password").fill(password);
    await expect(this.page.getByRole("button", { name: "Update Settings" })).toBeEnabled();
    await this.page.getByRole("button", { name: "Update Settings" }).click();

    await expect(this.page.getByText(username)).toBeVisible();
  }

    await this.page.getByRole('button', { name: 'Or click here to logout.' }).click();
  }

}
