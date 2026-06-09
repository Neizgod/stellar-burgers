import { test, expect } from '@playwright/test';

import {
  ingredientsResponse,
  userResponse,
  orderResponse
} from './tests/mocks/mockData';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(ingredientsResponse)
    });
  });

  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userResponse)
    });
  });

  await page.route('**/api/orders', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(orderResponse)
      });
      return;
    }

    await route.continue();
  });

  await page.context().addCookies([
    {
      name: 'accessToken',
      value: 'test-token',
      domain: 'localhost',
      path: '/'
    }
  ]);

  await page.goto('/');
});

test('открыть модальное окно с ингредиентом', async ({ page }) => {
  await page.getByText('Краторная булка N-200i').click();

  await expect(page.getByText('Детали ингредиента')).toBeVisible();
});

test('закрыть модальное окно через кнопку', async ({ page }) => {
  await page.getByText('Краторная булка N-200i').click();

  await expect(page.getByTestId('modal')).toBeVisible();

  await page.getByTestId('modal-close').click();

  await expect(page.getByTestId('modal')).not.toBeVisible();
});

test('закрыть модальное окно через оверлей', async ({ page }) => {
  await page.getByText('Краторная булка N-200i').click();

  await page.getByTestId('modal-overlay').click({
    position: { x: 5, y: 5 }
  });

  await expect(page.getByTestId('modal')).not.toBeVisible();
});

test('добавить ингредиент в конструктор', async ({ page }) => {
  
  await page.getByTestId('add-bun-id').getByRole('button', { name: 'Добавить' }).click();
  await page.getByTestId('add-main-id').getByRole('button', { name: 'Добавить' }).click();

  
  await expect(page.getByText('Краторная булка N-200i (верх)')).toBeVisible();

  
  await expect(page.getByText('Биокотлета из марсианской Магнолии').nth(1)).toBeVisible();
});

test('сделать заказ', async ({ page }) => {
  await page.getByText('Добавить').first().click();
  await page.getByText('Добавить').nth(1).click();

  await page.getByTestId('order-button').click();

  await expect(page.getByText('12345')).toBeVisible();

  await expect(page.getByText('идентификатор заказа')).toBeVisible();

  await page.getByTestId('modal-close').click();

  await expect(page.getByTestId('constructor-bun-empty')).toBeVisible();

  await expect(page.getByTestId('constructor-main-empty')).toBeVisible();
});
