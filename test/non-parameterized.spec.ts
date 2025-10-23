import { test, expect } from '@playwright/test';

test.describe('Non-Parameterized Tests (Manual Repetition)', () => {

  // Example 1: Basic User ID Testing - Manual repetition
  test('Get user 1', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
  });

  test('Get user 2', async ({ request }) => {
    const response = await request.get('/users/2');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(2);
  });

  test('Get user 3', async ({ request }) => {
    const response = await request.get('/users/3');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(3);
  });

  // Example 2: HTTP Status Code Testing - Manual repetition
  test('JSONPlaceholder API - valid post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
  });

  test('JSONPlaceholder API - non-existent post', async ({ request }) => {
    const response = await request.get('/posts/999');
    expect(response.status()).toBe(404);
  });

  test('JSONPlaceholder API - all posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
  });

  // Example 3: Data-Driven Testing - Manual repetition
  test('User validation for ID 1', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Leanne Graham');
    expect(user.email).toBe('Sincere@april.biz');
  });

  test('User validation for ID 2', async ({ request }) => {
    const response = await request.get('/users/2');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Ervin Howell');
    expect(user.email).toBe('Shanna@melissa.tv');
  });

  test('User validation for ID 3', async ({ request }) => {
    const response = await request.get('/users/3');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.name).toBe('Clementine Bauch');
    expect(user.email).toBe('Nathan@yesenia.net');
  });
});