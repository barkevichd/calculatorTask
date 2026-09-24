import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://www.online-calculator.com/full-screen-calculator';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  workers: 5,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL,
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chrome',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'firefox',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'edge',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Edge'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        channel: 'msedge',
      },
    },
  ],
});
