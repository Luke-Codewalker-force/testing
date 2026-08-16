import { test, expect } from "@playwright/test";
import { ContactFactory } from "../factories/contact-factory";

test.describe("API Tests - Contact Messages", () => {
  test.only("TC-05: Should successfully submit contact message via POST /message/", async ({
    request,
  }) => {
    // Arrange
    const payload = ContactFactory.createContactData();

    // Act
    const response = await request.post("api/message/", {
      data: payload,
    });

    // Assert
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const responseBody = await response.json();
    expect(responseBody).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
  });
});
