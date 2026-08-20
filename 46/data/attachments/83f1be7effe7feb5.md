# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api-auth.spec.ts >> API Tests - Admin >> Should reject request with empty payload
- Location: tests/api-auth.spec.ts:56:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: [Function status]
```

# Test source

```ts
  1  | import { test, expect } from "../fixtures/page-object.fixture";
  2  | import { issue, severity, feature } from "allure-js-commons";
  3  | 
  4  | test.describe("API Tests - Admin", () => {
  5  |   test(
  6  |     "Should successfully login with valid credentials via POST /api/admin/login",
  7  |     { tag: ["@smoke", "@regression", "@api"] },
  8  |     async ({ authClient }) => {
  9  |       issue(
  10 |         "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-5",
  11 |         "SCRUM-5",
  12 |       );
  13 |       severity("critical");
  14 |       feature("Authentication API");
  15 | 
  16 |       // Act
  17 |       const response = await authClient.login();
  18 | 
  19 |       // Assert
  20 |       expect(response.status()).toBe(200);
  21 |       expect(response.headers()["content-type"]).toContain("application/json");
  22 | 
  23 |       const responseBody = await response.json();
  24 |       expect(responseBody.token).toBeTruthy();
  25 |       expect(typeof responseBody.token).toBe("string");
  26 |     },
  27 |   );
  28 | 
  29 |   test(
  30 |     "Should fail with incorrect credentials via POST /api/auth/login",
  31 |     { tag: ["@smoke", "@regression", "@api"] },
  32 |     async ({ authClient }) => {
  33 |       issue(
  34 |         "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-6",
  35 |         "SCRUM-6",
  36 |       );
  37 |       severity("critical");
  38 |       feature("Authentication API");
  39 | 
  40 |       // Act
  41 |       const response = await authClient.login("invalidUser", "invalidPassword");
  42 | 
  43 |       // Assert
  44 |       expect(response.status()).toBe(401);
  45 |       expect(response.headers()["content-type"]).toContain("application/json");
  46 | 
  47 |       const responseBody = await response.json();
  48 |       expect(responseBody).toEqual(
  49 |         expect.objectContaining({
  50 |           error: "Invalid credentials",
  51 |         }),
  52 |       );
  53 |     },
  54 |   );
  55 | 
  56 |   test(
  57 |     "Should reject request with empty payload",
  58 |     { tag: ["@smoke", "@regression", "@api"] },
  59 |     async ({ authClient }) => {
  60 |       issue(
  61 |         "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-7",
  62 |         "SCRUM-7",
  63 |       );
  64 |       severity("critical");
  65 |       feature("Authentication API");
  66 | 
  67 |       // Act
  68 |       const response = authClient.login();
  69 | 
  70 |       // Assert
> 71 |       expect((await response).status).toBe(401);
     |                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  72 |     },
  73 |   );
  74 | });
  75 | 
```