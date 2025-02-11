<<<<<<< HEAD

=======
>>>>>>> d0300bc (2131)
import { expect, Page } from "@playwright/test";

export class SettingsPage {
  constructor(private page: Page) {}

  async logout() {
<<<<<<< HEAD

=======
>>>>>>> d0300bc (2131)
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
<<<<<<< HEAD

    await this.page.getByRole('button', { name: 'Or click here to logout.' }).click();
  }

=======
>>>>>>> d0300bc (2131)
}
