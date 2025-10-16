import { test, expect } from '@playwright/test';
import userData from '@Data/users.json' with { type: 'json' };

test.describe('Test Parameterization Demo', () => {

  // Example 1: Basic User ID Parameterization
  [1, 2, 3].forEach(userId => {
    test(`Get user ${userId}`, async ({ request }) => {
      const response = await request.get(`/users/${userId}`);
      expect(response.status()).toBe(200);
      const user = await response.json();
      expect(user.id).toBe(userId);
    });
  });

  // Example 2: HTTP Status Code Testing
  [
    { endpoint: '/posts/1', expectedStatus: 200, description: 'valid post' },
    { endpoint: '/posts/999', expectedStatus: 404, description: 'non-existent post' },
    { endpoint: '/posts', expectedStatus: 200, description: 'all posts' }
  ].forEach(({ endpoint, expectedStatus, description }) => {
    test(`JSONPlaceholder API - ${description}`, async ({ request }) => {
      const response = await request.get(endpoint);
      expect(response.status()).toBe(expectedStatus);
    });
  });

  // Example 3: Data-Driven Testing
  userData.forEach(({ userId, expectedName, expectedEmail }) => {
    test(`User validation for ID ${userId}`, async ({ request }) => {
      const response = await request.get(`/users/${userId}`);
      expect(response.status()).toBe(200);
      const user = await response.json();
      expect(user.name).toBe(expectedName);
      expect(user.email).toBe(expectedEmail);
    });
  });
});
