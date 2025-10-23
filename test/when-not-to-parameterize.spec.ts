import { test, expect } from '@playwright/test';

test.describe('When NOT to Parameterize Tests', () => {

  // ❌ DON'T parameterize: Different business logic per test
  test('User creation flow', async ({ request }) => {
    const newUser = { 
      name: 'John Doe', 
      username: 'johndoe',
      email: 'john@example.com',
      body: 'Test post content'
    };
    const response = await request.post('/posts', { data: newUser });
    expect(response.status()).toBe(201);
    expect(await response.json()).toHaveProperty('id');
  });

  test('User data retrieval', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('Post content update', async ({ request }) => {
    const updates = { title: 'Updated Title', body: 'Updated content' };
    const response = await request.put('/posts/1', { data: updates });
    expect(response.status()).toBe(200);
    expect((await response.json()).title).toBe('Updated Title');
  });

  // ❌ DON'T parameterize: Complex setup with different preconditions
  test('Verify user has posts', async ({ request }) => {
    // First get user details
    const userResponse = await request.get('/users/1');
    expect(userResponse.status()).toBe(200);
    const user = await userResponse.json();
    
    // Then get user's posts
    const postsResponse = await request.get('/posts?userId=1');
    expect(postsResponse.status()).toBe(200);
    const posts = await postsResponse.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0].userId).toBe(user.id);
  });

  test('Verify post has comments', async ({ request }) => {
    // First get post details
    const postResponse = await request.get('/posts/1');
    expect(postResponse.status()).toBe(200);
    const post = await postResponse.json();
    
    // Then get post's comments
    const commentsResponse = await request.get('/posts/1/comments');
    expect(commentsResponse.status()).toBe(200);
    const comments = await commentsResponse.json();
    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0].postId).toBe(post.id);
  });

  // ❌ DON'T parameterize: Different assertion patterns
  test('Get user returns full profile', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('address');
    expect(user).toHaveProperty('company');
  });

  test('Get posts returns basic info only', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).not.toHaveProperty('address'); // Posts don't have address field
  });

  // ❌ DON'T parameterize: Edge cases with unique handling
  test('Handle non-existent user', async ({ request }) => {
    const response = await request.get('/users/999');
    expect(response.status()).toBe(404);
  });

  test('Handle non-existent post', async ({ request }) => {
    const response = await request.get('/posts/999');
    expect(response.status()).toBe(404);
  });

  // ❌ DON'T parameterize: Performance tests with specific timing
  test('API responds quickly for user data', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/users/1');
    const duration = Date.now() - start;
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(5000); // Reasonable timeout for external API
  });

  test('API handles concurrent requests', async ({ request }) => {
    const promises = Array(5).fill(null).map(() => request.get('/users/1'));
    const responses = await Promise.all(promises);
    responses.forEach(response => {
      expect(response.status()).toBe(200);
    });
  });
});