import { Page } from "@playwright/test";

export class ArticleEditorPage {
  constructor(private page: Page) {}

  async createArticle(title: string, about: string, article: string, tag: string) {

  await this.page.getByPlaceholder('Article Title').fill(title);
  await this.page.getByPlaceholder('What\'s this article about?').fill(about);
  await this.page.getByPlaceholder('Write your article (in').fill(article);
  await this.page.getByPlaceholder('Enter tags').fill(tag);
  await this.page.getByRole('button', { name: 'Publish Article' }).click();
  }

}
