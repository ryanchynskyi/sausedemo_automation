import { test, expect } from '../../src/fixtures';
import { createUser } from '../../src/utils/dataFactory';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test.describe('Checkout', () => {
  // Already logged in via storageState (see tests/auth.setup.ts)
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.expectOpened();
  });

  test('user can buy products end to end', async ({
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await inventoryPage.addToCart(...products);
    await expect(inventoryPage.header.cartBadge).toHaveText(String(products.length));

    await inventoryPage.header.openCart();
    await cartPage.expectOpened();
    await expect(cartPage.itemNames).toHaveText(products);

    await cartPage.checkout();
    const user = createUser();
    await checkoutInfoPage.submit({
      firstName: user.firstName,
      lastName: user.lastName,
      postalCode: '12345',
    });

    await checkoutOverviewPage.expectOpened();
    await expect(checkoutOverviewPage.itemNames).toHaveText(products);
    const itemsSum = (await checkoutOverviewPage.getItemPrices()).reduce((a, b) => a + b, 0);
    const subtotal = await checkoutOverviewPage.getSubtotal();
    expect(subtotal).toBeCloseTo(itemsSum, 2);
    expect(await checkoutOverviewPage.getTotal()).toBeCloseTo(
      subtotal + (await checkoutOverviewPage.getTax()),
      2,
    );

    await checkoutOverviewPage.finish();
    await checkoutCompletePage.expectOpened();
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout info requires first name', async ({ inventoryPage, cartPage, checkoutInfoPage }) => {
    await inventoryPage.addToCart(products[0]);
    await inventoryPage.header.openCart();
    await cartPage.checkout();

    await checkoutInfoPage.continue();

    await expect(checkoutInfoPage.errorMessage).toHaveText('Error: First Name is required');
  });
});
