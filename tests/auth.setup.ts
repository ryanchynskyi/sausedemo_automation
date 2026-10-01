import { test as setup } from '../src/fixtures';
import { env, AUTH_FILE } from '../src/config/env';

setup('authenticate', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login(env.userEmail, env.userPassword);
  await inventoryPage.expectOpened();

  await page.context().storageState({ path: AUTH_FILE });
});
