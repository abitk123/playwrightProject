import { expect, Page } from "@playwright/test";

export class MainPage {
  constructor(private page: Page) {}

  async gotoPage(locator: string) {
    await this.page.getByRole("link", { name: `${locator}` }).click();
  }

  async gotoProfile(locator: string) {
    await this.page
      .locator("app-layout-header")
      .getByRole("link", { name: `${locator}` })
      .click();
  }

  async goToCreatedArticle(articleTitle: string) { 
    await this.page
      .locator(
        `xpath=//a[@class="preview-link" and h1[text()="${articleTitle}"]]`
      )
      .click();
  }

  async clickLike(name: string) {
    const likeButton = this.page.locator(
      `xpath=//*[text() = "${name}"]//ancestor::a/preceding-sibling::app-article-meta//button`
    );

    await expect(likeButton).toBeVisible();

    const likeCounterInitial =
      parseInt(await likeButton.innerText().then((text) => text.trim())) || 0;

    await likeButton.click();

    await expect(async () => {
      const likeCounterChange =
        parseInt(await likeButton.innerText().then((text) => text.trim())) || 0;
      expect(likeCounterChange).toBe(likeCounterInitial + 1);
    }).toPass({ timeout: 5000 });

    return likeCounterInitial+1
  }

  async checkLikeAndDiscard(name: string, likeCount: number) {
    const likeButton = this.page.locator(
      `xpath=//*[text() = "${name}"]//ancestor::a/preceding-sibling::app-article-meta//button`
    );

    await expect(likeButton).toBeVisible();

    const likeCounterInitial =
      parseInt(await likeButton.innerText().then((text) => text.trim()));

      expect(likeCounterInitial).toEqual(likeCount);

    await likeButton.click();

    await expect(async () => {
      const likeCounterChange =
        parseInt(await likeButton.innerText().then((text) => text.trim())) || 0;
      expect(likeCounterChange).toBe(likeCounterInitial - 1);
    }).toPass({ timeout: 5000 });
  }
}
