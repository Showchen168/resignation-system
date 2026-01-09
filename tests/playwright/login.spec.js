const { test, expect } = require('@playwright/test');

test('測試模式可顯示登入後畫面', async ({ page }) => {
  const testEmail = process.env.TEST_USER_EMAIL;
  expect(testEmail, '請設定 TEST_USER_EMAIL 環境變數以完成登入測試。').toBeTruthy();

  await page.addInitScript((email) => {
    window.__test_mode = true;
    window.__test_user_email = email;
  }, testEmail);

  await page.goto('/index.html');

  await expect(page.locator('#auth-screen')).toBeHidden();
  await expect(page.locator('#auth-user-label')).toHaveText(testEmail);
  await expect(page.locator('#app-shell')).toBeVisible();
});
