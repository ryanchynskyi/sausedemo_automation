import { expect, Locator, Page } from '@playwright/test';
import { Header } from '../components/Header';

export abstract class BasePage {
  protected abstract readonly path: string;

  readonly header: Header;
  readonly title: Locator;

  constructor(protected readonly page: Page) {
    this.header = new Header(page);
    this.title = page.getByTestId('title');
  }

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.path.replace('.', '\\.')}$`));
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
