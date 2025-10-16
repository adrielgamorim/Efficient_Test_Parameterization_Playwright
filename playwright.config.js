import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  timeout: 30000,
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
  reporter: [['list'], ['html'], ['allure-playwright']],
});