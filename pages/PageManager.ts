import { Page } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { ArticleEditorPage } from "./ArticleEditorPage";
import { SettingsPage } from "./SettingsPage";

import { ArticlePage } from "./ArticlePage";


export class PageManager {
  private readonly page: Page;
  private readonly registrationPage: RegistrationPage;
  private readonly loginPage: LoginPage;
  private readonly mainPage: MainPage;
  private readonly articleEditorPage: ArticleEditorPage;
  private readonly settingsPage: SettingsPage;
  private readonly articlePage: ArticlePage;


  constructor(page: Page) {
    this.page = page;
    this.registrationPage = new RegistrationPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.mainPage = new MainPage(this.page);
    this.articleEditorPage = new ArticleEditorPage(this.page);
    this.settingsPage = new SettingsPage(this.page);
    this.articlePage = new ArticlePage(this.page);

  }

  async gotoPage(locator: string) {
    return this.mainPage.gotoPage(locator);
  }

  async register(username: string, email: string, password: string) {
    await this.gotoPage("Sign up");
    return this.registrationPage.register(username, email, password);
  }

  async login(email: string, password: string) {
    await this.gotoPage("Sign in");
    return this.loginPage.login(email, password);
  }

  async gotoRegistrationPageFromLogin() {
    await this.loginPage.gotoRegistrationPageFromLogin();
  }

  async goToLoginPageFromReg() {
    await this.registrationPage.goToLoginPageFromReg();
  }

  async logout() {

    await this.gotoPage("Settings");
    await this.settingsPage.logout();
  }

  async createArticle(
    title: string,
    about: string,
    article: string,
    tag: string
  ) {
    await this.articleEditorPage.createArticle(title, about, article, tag);
  }

  async deleteArticle() {
    await this.articlePage.deleteArticle();
  }


  async goToCreatedArticle(articleTitle: string) {
    await this.mainPage.goToCreatedArticle(articleTitle);
  }

  async updateUserData(
    username: string,
    password: string,
    email: string,
    bio?: string
  ) {
    await this.gotoPage("Settings");
    await this.settingsPage.updateUserData(username, password, email, bio);
  }

}
