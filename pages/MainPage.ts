import { Page } from "@playwright/test";

export class MainPage {
  constructor(private page: Page) {}

  async gotoPage(locator: string) {
    await this.page.getByRole("link", { name: `${locator}` }).click()
  }

}
