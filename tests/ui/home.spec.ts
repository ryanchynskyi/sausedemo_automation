import { test, expect } from '../../src/fixtures';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link opens docs', async ({ homePage, docsPage }) => {
    await homePage.clickGetStarted();
    await expect(docsPage.installationHeading).toBeVisible();
  });
});
