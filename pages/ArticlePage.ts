import { Page } from "@playwright/test";

export class ArticlePage {
  constructor(private page: Page) {}

  async deleteArticle() {
    await this.page.getByRole("button", { name: "Delete Article" }).nth(1).click();
  }
}
