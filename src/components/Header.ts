import { Locator, Page } from '@playwright/test';

export class Header {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(private readonly page: Page) {
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.menuButton.click();
    await this.resetAppStateLink.click();
  }
}
