import { expect, Page } from "@playwright/test";

export class ProfilePage {
  constructor(private page: Page) {}

  async checkMyPost() {
    const myPost = this.page.getByText("My Posts");
    const classAtt = await myPost.getAttribute("class");

    if (!classAtt?.includes("active")) {
      await myPost.click();
    }
  }
}
