const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const testEmail = process.env.TEST_USER_EMAIL;

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

if (!testEmail) {
  fail('請設定 TEST_USER_EMAIL 環境變數以完成登入測試。');
}

const requiredSnippets = [
  'window.__test_mode',
  'window.__test_user_email',
  'applyTestModeAuth()',
  'window.handleFirebaseAuthState',
  "initializeLocalMode('測試模式啟用，略過 Firebase 初始化')"
];

requiredSnippets.forEach((snippet) => {
  if (!html.includes(snippet)) {
    fail(`找不到登入測試所需的程式碼片段：${snippet}`);
  }
});

if (!html.includes('id="auth-screen"')) {
  fail('找不到登入畫面節點（#auth-screen）。');
}

if (process.exitCode) {
  process.exit(1);
}

console.log('Playwright stub: 測試模式登入檢查通過');
