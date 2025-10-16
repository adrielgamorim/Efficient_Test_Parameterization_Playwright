# Efficient Test Parameterization with Playwright

A TypeScript framework demonstrating test parameterization patterns for scalable API testing.

## Quick Start

1. Install Node.js from [nodejs.org](https://nodejs.org)

2. Navigate to `Efficient_Test_Parameterization` folder

3. Install dependencies:
```bash
npm install
```

4. Run the demo:
```bash
npm run test:demo
```

5. Generate and review Allure report:
```bash
npm run report
```

## What It Demonstrates

### ✅ Basic Parameterization
- User ID testing with forEach loops
- Dynamic test name generation
- Consistent assertion patterns

### ✅ HTTP Status Code Testing  
- Multiple endpoint validation
- Error condition handling
- Descriptive test scenarios

### ✅ Data-Driven Testing
- External JSON data files
- TypeScript path aliases (@Data/*)
- Separation of test data from test logic

## Framework Features

- **TypeScript**: Full type safety and modern syntax
- **Playwright API**: Industry-standard test framework
- **External Data**: JSON files with path aliases
- **Real HTTP calls**: Uses JSONPlaceholder API
- **Allure Reports**: Rich test reporting with screenshots and details
- **Live results**: See parameterization in action

## Project Structure
```
├── data/
│   └── users.json          # External test data
├── test/
│   └── demo.spec.ts         # Parameterized test examples
├── playwright.config.js     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Example Output
```
🚀 Running Test Parameterization Demo

✅ Get user 1
✅ Get user 2  
✅ Get user 3
✅ JSONPlaceholder API - valid post
✅ JSONPlaceholder API - non-existent post
✅ JSONPlaceholder API - all posts
✅ User validation for ID 1
✅ User validation for ID 2
✅ User validation for ID 3

📊 Results: 9/9 passed
```

## Available Commands

- `npm run test:demo` - Run parameterization demo tests
- `npm run report` - Generate and open Allure report

## Key Patterns Demonstrated

### Pattern 1: Basic forEach Parameterization
```typescript
[1, 2, 3].forEach(userId => {
  test(`Get user ${userId}`, async ({ request }) => {
    // Test logic here
  });
});
```

### Pattern 2: Object-Based Parameters
```typescript
[
  { endpoint: '/posts/1', expectedStatus: 200, description: 'valid post' },
  { endpoint: '/posts/999', expectedStatus: 404, description: 'non-existent post' }
].forEach(({ endpoint, expectedStatus, description }) => {
  test(`API - ${description}`, async ({ request }) => {
    // Test logic here
  });
});
```

### Pattern 3: External Data Files
```typescript
import userData from '@Data/users.json' with { type: 'json' };

userData.forEach(({ userId, expectedName, expectedEmail }) => {
  test(`User validation for ID ${userId}`, async ({ request }) => {
    // Test logic here
  });
});
```
