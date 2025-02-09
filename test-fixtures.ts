import { test as baseTest } from '@playwright/test';

interface LoginFixture {
  loginData: { username: string; password: string, email: string };
}

const test = baseTest.extend<LoginFixture>({
  loginData: async ({}, use) => {
    await use({ username: 'user-01', password: 'password123!', email: 'user-01@gmail.com' });
  },
});

export { test };
