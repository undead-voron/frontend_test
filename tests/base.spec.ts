import { test, expect } from '@playwright/test';

const waitMs = (ms: number): Promise<void> => new Promise<void>((res) => setTimeout(res, ms));

test('test basic main page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input');
  await expect(page).toHaveScreenshot();
});

test('click input', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input');
  await page.click('input');
  await waitMs(100);
  await expect(page).toHaveScreenshot();
});

test('click menu item', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input');
  await page.click('input');
  await page.getByText('Menu-Item').click();
  await waitMs(100);
  // page snapshot with 'Menu-Item' clicked but not selected
  await expect(page).toHaveScreenshot();
  await page.getByText('Hamburger').click();
  await waitMs(100);
  // page snapshot with Hamburger 'Menu-Item' selected
  await expect(page).toHaveScreenshot();
});

test('menu item with ingredients', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input');
  await page.click('input');
  await page.getByText('Menu-Item').click();
  await page.getByText('Hamburger').click();
  await page.getByText('Ingredient').click();
  await page.getByText('Pickles').click();
  await page.getByText('Ingredient').click();
  await page.getByText('Fresh Tomato').click();
  await waitMs(100);
  await expect(page).toHaveScreenshot();
});

test('several menu items with ingredients', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input');
  await page.click('input');
  // add hamburger menu item
  await page.getByText('Menu-Item').click();
  await page.getByText('Hamburger').click();
  // add ingrediennts to first menu item
  await page.getByText('Ingredient').click();
  await page.getByText('Pickles').click();
  await page.getByText('Ingredient').click();
  await page.getByText('Fresh Tomato').click();
  await waitMs(100);
  await expect(page).toHaveScreenshot();
  // add second menu item
  await page.getByText('Menu-Item').click();
  await page.getByText('Sushi').click();
  // add ingredients to second menu item
  await page.getByText('Ingredient').click();
  await page.locator('ul').getByText('Pickles').click();
  await page.getByText('Ingredient').click();
  await page.getByText('Soy Sauce').click();
  await expect(page).toHaveScreenshot();
  // remnove first item in menu
  await page.click('button');
  await waitMs(100);
  await expect(page).toHaveScreenshot();
  await page.locator('ul').getByText('And').click();
  await page.locator('body').click();
  await expect(page).toHaveScreenshot();
});
