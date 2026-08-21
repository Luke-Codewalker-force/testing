import { AuthData } from "../api/types";
import { test, expect } from "../fixtures/page-object.fixture";
import { issue, severity, feature } from "allure-js-commons";

type LoginTestCase = {
  tag?: string | string[];
  description: string;
  payload: AuthData;
  expectedStatus: number;
  expectedError: string;
  issueKey: string;
  issueUrl: string;
};

const negativeLoginTestCases: LoginTestCase[] = [
  {
    description:
      "Should fail with incorrect credentials via POST /api/auth/login",
    payload: {
      username: "invalidUser",
      password: "invalidPassword",
    },
    expectedStatus: 401,
    expectedError: "Invalid credentials",
    issueKey: "SCRUM-6",
    issueUrl: "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-6",
    tag: ["@smoke", "@regression", "@api", "@auth"],
  },
  {
    description: "Should reject request with empty payload",
    payload: {},
    expectedStatus: 401,
    expectedError: "Invalid credentials",
    issueKey: "SCRUM-7",
    issueUrl: "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-7",
    tag: ["@smoke", "@regression", "@api", "@auth"],
  },
];

test.describe("API Tests - Admin", () => {
  test(
    "Should successfully login with valid credentials via POST /api/admin/login",
    { tag: ["@smoke", "@regression", "@api", "@auth"] },
    async ({ authClient }) => {
      issue(
        "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-5",
        "SCRUM-5",
      );
      severity("critical");
      feature("Authentication API");

      // Arrange
      const username = process.env.ADMIN_LOGIN;
      const password = process.env.ADMIN_PASSWORD;

      // Act
      const response = await authClient.login({ username, password });

      // Assert
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = await response.json();
      expect(responseBody.token).toBeTruthy();
      expect(typeof responseBody.token).toBe("string");
    },
  );

  for (const testCase of negativeLoginTestCases) {
    const {
      tag,
      description,
      payload,
      expectedError,
      expectedStatus,
      issueKey,
      issueUrl,
    } = testCase;

    test(description, { tag }, async ({ authClient }) => {
      issue(issueUrl, issueKey);
      severity("critical");
      feature("Authentication API");

      // Act
      const response = await authClient.login(payload);

      // Assert
      expect(response.status()).toBe(expectedStatus);
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = await response.json();
      expect(responseBody).toEqual(
        expect.objectContaining({
          error: expectedError,
        }),
      );
    });
  }
});
