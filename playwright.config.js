const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  use: {
    baseURL: 'http://localhost:8000',
    headless: true
  },
  webServer: {
    command: 'python -m http.server 8000',
    port: 8000,
    reuseExistingServer: true
  }
});
