import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DocsPage extends BasePage {
  protected readonly path = '/docs/intro';

  readonly installationHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
  }
}
