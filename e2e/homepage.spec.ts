import { test, expect } from '@playwright/test';
import config from '../playwright.config.js';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto(`${config.use?.baseURL}`);
})

// start links
test('teacher start link navigates to teacher sign up', async ({ page }) => {
  const teacherStartLink = page.getByText(/I want to teach/i);
  await expect(teacherStartLink).toBeVisible();
  teacherStartLink.click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/auth/sign-up/teacher`);
});

test('student start link navigates to student sign up', async ({ page }) => {
  page.getByText(/I want to learn/i).click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/auth/sign-up/student`);
})

test('find instructors start link navigates to /find-teachers', async ({ page }) => {
  page.getByText(/Find instructors/i).click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/find-teachers`)
})

// nav links
test('navbar student sign up button navigates to /auth/sign-up/student', async ({ page }) => {
  page.getByText('Student Sign Up').click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/auth/sign-up/student`);
});

test('navbar teacher sign up button navigates to /auth/sign-up/teacher', async ({ page }) => {
  page.getByText('Teacher Sign Up').click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/auth/sign-up/teacher`);
});

test('log in button navigates to /auth/sign-in', async ({ page }) => {
  page.getByText('Log In').click();
  await expect(page).toHaveURL(`${config.use?.baseURL}/auth/sign-in`);
})
