import { test, expect } from '@playwright/test';

test('theme switch', async ({ page }) => {
  await page.goto('/');
  const switcher = page.getByTestId('theme-switcher');
  expect(switcher).toBeDefined();
  const lightIcon = page.getByTestId('light');
  expect(lightIcon).toBeDefined();
  await switcher.click();
  const darkIcon = page.getByTestId('dark');
  expect(darkIcon).toBeDefined();
});

test('framework select', async ({ page }) => {
  await page.goto('/');
  expect(page.getByTestId('frame-select')).toBeDefined();
  const astroButton = page.getByTestId('astro-button');
  expect(astroButton).toBeDefined();
  expect(page.getByTestId('next-button')).not.toBeVisible();

  await astroButton.click();
  await page.waitForURL('/astro');
});

test('util card', async ({ page }) => {
  await page.goto('/');
  expect(page.getByTestId('util-card')).toBeDefined();
  expect(page.getByTestId('github-icon')).toBeDefined();
  expect(page.getByTestId('twitter-icon')).toBeDefined();
  expect(page.getByText('Next.js Cross Calculator')).toBeDefined();
});

test('calc card', async ({ page }) => {
  await page.goto('/');
  expect(page.getByTestId('calc-main')).toBeDefined();
  expect(page.getByTestId('calc-history')).toBeDefined();

  const oneButton = page.getByRole('button', { name: '1' });
  expect(oneButton).toBeDefined();
  await oneButton.click();
  await page.waitForURL('/?f=1');
});
