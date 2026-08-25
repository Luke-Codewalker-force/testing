import { AuthData } from "../api/types";
import { test, expect } from "../fixtures/page-object.fixture";
import { issue, severity, feature } from "allure-js-commons";

type LoginNegativeTestCase = {
  rule: string;
  description: string;
  payload: AuthData;
  expectedStatus: number;
  expectedError: string;
};

type TokenNegativeTestCases = Omit<LoginNegativeTestCase, "payload"> & {
  payload: string;
};

const negativeLoginTestCases: LoginNegativeTestCase[] = [
  {
    rule: "REQ-AUTH-01",
    description:
      "Should fail with incorrect credentials via POST /api/auth/login",
    payload: {
      username: "invalidUser",
      password: "invalidPassword",
    },
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
  {
    rule: "REQ-AUTH-02",
    description: "Should reject login when password does not match username",
    payload: { username: "admin", password: "wrong_password" },
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
  {
    rule: "REQ-AUTH-03",
    description:
      "Should reject login when username does not exist in the database",
    payload: { username: "ghost_user", password: "password123" },
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
  {
    rule: "REQ-AUTH-04",
    description: "Should reject request when username field is omitted",
    payload: { password: "password123" },
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
  {
    rule: "REQ-AUTH-05",
    description: "Should reject request with empty payload",
    payload: {},
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
  {
    rule: "REQ-AUTH-06",
    description: "Should reject request with empty payload",
    payload: {},
    expectedStatus: 401,
    expectedError: "Invalid credentials",
  },
];

const negativeTokenValidationTestCases: TokenNegativeTestCases[] = [
  {
    rule: "REQ-AUTH-07",
    description: "Should reject request with incorrect token",
    payload: "iamanincorrecttoken",
    expectedStatus: 403,
    expectedError: "Invalid token",
  },
  {
    rule: "REQ-AUTH-08",
    description: "Should reject request with empty payload",
    payload: "",
    expectedStatus: 401,
    expectedError: "No token provided",
  },
];

const loginData: AuthData = {
  username: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
};
// test
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

      // Act
      const response = await authClient.login(loginData);

      // Assert
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");

      const responseBody = await response.json();
      expect(responseBody.token).toBeTruthy();
      expect(typeof responseBody.token).toBe("string");
    },
  );

  test(
    "Should successfully validate valid token",
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
      const token = await authClient.getToken({ username, password });

      // Assert
      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");

      const validationResponse = await authClient.validateToken(token);
      expect(validationResponse.status()).toBe(200);
      expect(validationResponse.headers()["content-type"]).toContain(
        "application/json",
      );

      const validationResponseBody = await validationResponse.json();
      expect(validationResponseBody.valid).toBe(true);
    },
  );

  for (const loginTestCase of negativeLoginTestCases) {
    const { rule, description, payload, expectedError, expectedStatus } =
      loginTestCase;

    test(
      `${rule} ${description}`,
      { tag: ["@smoke", "@regression", "@api", "@auth"] },
      async ({ authClient }) => {
        issue(
          "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-10",
          "SCRUM-10",
        );
        severity("critical");
        feature("Authentication API");

        // Act
        const response = await authClient.login(payload);

        // Assert
        expect(response.status()).toBe(expectedStatus);
        expect(response.headers()["content-type"]).toContain(
          "application/json",
        );

        const responseBody = await response.json();
        expect(responseBody).toEqual(
          expect.objectContaining({
            error: expectedError,
          }),
        );
      },
    );
  }

  for (const tokenTestCase of negativeTokenValidationTestCases) {
    const { rule, description, payload, expectedError, expectedStatus } =
      tokenTestCase;

    test(
      `${rule} ${description}`,
      {
        tag: ["@smoke", "@regression", "@api", "@auth"],
      },
      async ({ authClient }) => {
        issue(
          "https://lukaszkowalczykdev.atlassian.net/browse/SCRUM-10",
          "SCRUM-10",
        );
        severity("critical");
        feature("Authentication API");

        // Act
        const token = await authClient.getToken(loginData);
        const tokenValidationResponse = await authClient.validateToken(payload);

        // Assert
        expect(token).not.toEqual(payload);
        expect(tokenValidationResponse.status()).toBe(expectedStatus);
        expect(tokenValidationResponse.headers()["content-type"]).toContain(
          "application/json",
        );
        const responseBody = await tokenValidationResponse.json();
        expect(responseBody).toEqual(
          expect.objectContaining({
            error: expectedError,
          }),
        );
      },
    );
  }
});
