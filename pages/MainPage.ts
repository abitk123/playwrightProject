import { Page } from "@playwright/test";

export class MainPage {
  constructor(private page: Page) {}

  async gotoPage(locator: string) {
    await this.page.getByRole("link", { name: `${locator}` }).click()
  }

  async goToCreatedArticle(articleTitle: string) {
    await this.page.locator(`xpath=//a[@class="preview-link" and h1[text()="${articleTitle}"]]`).click();
  }

}
