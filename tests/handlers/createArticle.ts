import { expect, Page } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";
import article from "../../data/article.json";

export async function createArticle(page: Page, articleTitle: string) {
  const pm = new PageManager(page);
  await pm.gotoPage("New Article");

  const createdArticle = await pm.createArticle(
    articleTitle,
    article.about,
    article.article,
    article.tag
  );

  await expect(page.getByRole("paragraph")).toContainText(article.article);

  return createdArticle;
}
