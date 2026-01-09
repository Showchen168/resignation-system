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
  await page.getByTestId('side-nav-records').click();
  await expect(page.locator('#records')).toBeVisible();

  await page.reload();
  await expect(page.locator('#auth-screen')).toBeHidden();
  await expect(page.locator('#auth-user-label')).toHaveText(testEmail);
});

test('登入表單未填寫會顯示錯誤訊息', async ({ page }) => {
  await page.addInitScript(() => {
    window.__firebase_config = JSON.stringify({
      apiKey: '',
      projectId: 'YOUR_PROJECT_ID'
    });
  });

  await page.goto('/index.html');

  await expect(page.locator('#auth-screen')).toBeVisible();
  await page.getByTestId('auth-login-submit').click();
  await expect(page.locator('#auth-login-error')).toHaveText('請輸入郵箱與密碼。');
});
