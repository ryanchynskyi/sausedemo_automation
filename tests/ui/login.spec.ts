import { test, expect } from '../../src/fixtures';
import { env } from '../../src/config/env';

test.describe('Login', () => {
  // These tests check the login form itself, so start without the saved session
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(env.userEmail, env.userPassword);

    await inventoryPage.expectOpened();
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', env.userPassword);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(env.userEmail, 'wrong_password');

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
  });
});
