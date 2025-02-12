import { expect, APIResponse, Page } from "@playwright/test";

export class Assert {

  async assertLogout(page: Page) {
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  }


  async assertUILogin(page: Page, title: string) {
    await expect(
      page.getByRole("link", { name: title })
    ).toBeVisible();
  }



  async assertArticleDeleteMainPage(page: Page, articleTitle: string) {
    await expect(
      page.locator("app-article-list", { hasText: articleTitle })
    ).toBeVisible({ visible: false });
  }

  async assertArticleCreationMainPage(page: Page, articleTitle: string) {
    await expect(page.locator("app-article-list")).toContainText(articleTitle);
  }

}
