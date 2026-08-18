import { test, expect } from "../fixtures/page-object.fixture";

test.describe("API Tests - Admin", () => {
  test(
    "Should successfully login with valid credentials via POST /api/admin/login",
    { tag: ["@regression", "@smoke"] },
    async ({ authClient }) => {
      // Act
      const response = await authClient.login();

      // Assert
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = await response.json();
      expect(responseBody.token).toBeTruthy();
      expect(typeof responseBody.token).toBe("string");
    },
  );

  test.only("Should fail with incorrect credentials via POST /api/auth/login", async ({
    authClient,
  }) => {
    // Act
    const response = await authClient.login("invalidUser", "invalidPassword");

    // Assert
    expect(response.status()).toBe(401);
    expect(response.headers()["content-type"]).toContain("application/json");

    const responseBody = await response.json();
    expect(responseBody).toEqual(
      expect.objectContaining({
        error: "Invalid credentials",
      }),
    );
  });
});
