import { Page } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";

export class PageManager {
  private readonly page: Page;
  private readonly registrationPage: RegistrationPage;
  private readonly loginPage: LoginPage;
  private readonly mainPage: MainPage;

  constructor(page: Page) {
    this.page = page;
    this.registrationPage = new RegistrationPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.mainPage = new MainPage(this.page); 
  }

  register(username: string, email: string, password: string) {
    return this.registrationPage.register(username, email, password);
  }

  login(email: string, password: string) {
    return this.loginPage.login(email, password);
  }

  gotoPage(locator: string) {
    return this.mainPage.gotoPage(locator);
  }

  async gotoRegistrationPage() {
    await this.loginPage.gotoRegistrationPage();
  }

  async goToLoginPage() {
    await this.registrationPage.goToLoginPage();
  }

}
