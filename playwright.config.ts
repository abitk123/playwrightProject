import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 3,
  reporter: [["list"], ["allure-playwright", { outputFolder: 'allure-results' }], ["html", { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,
    trace: "on",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
