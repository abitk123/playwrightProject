import { Page } from "@playwright/test";

export class SettingsPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.getByRole('button', { name: 'Or click here to logout.' }).click();
  }

}
