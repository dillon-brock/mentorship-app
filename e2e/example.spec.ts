import { test, expect } from '@playwright/test';
import config from '../playwright.config.js';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto(`${config.use?.baseURL}`);
})

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Saga/);
});
