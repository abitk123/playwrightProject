import { expect, Page } from "@playwright/test";

export class ArticlePage {
  constructor(private page: Page) {}

  async deleteArticle() {
    const deleteButton = this.page
      .getByRole("button", { name: "Delete Article" })
      .nth(1);

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(deleteButton).toBeVisible({visible:false});
  }
}
