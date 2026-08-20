import { test, expect } from "../fixtures/page-object.fixture";
import { issue, severity, feature } from "allure-js-commons";

test.describe("API Tests - Admin", () => {
  test(
    "Should successfully login with valid credentials via POST /api/admin/login",
    { tag: ["@smoke", "@regression", "@api"] },
    async ({ authClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-5",
        "SCRUM-5",
      );
      severity("critical");
      feature("Authentication API");

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

  test(
    "Should fail with incorrect credentials via POST /api/auth/login",
    { tag: ["@smoke", "@regression", "@api"] },
    async ({ authClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-6",
        "SCRUM-6",
      );
      severity("critical");
      feature("Authentication API");

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
    },
  );

  test(
    "Should reject request with empty payload",
    { tag: ["@smoke", "@regression", "@api"] },
    async ({ authClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-7",
        "SCRUM-7",
      );
      severity("critical");
      feature("Authentication API");

      // Act
      const response = authClient.login();

      // Assert
      expect((await response).status).toBe(401);
    },
  );
});
