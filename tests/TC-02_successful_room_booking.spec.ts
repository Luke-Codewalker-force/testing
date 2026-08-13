import { test, expect } from "../fixtures/page-object.fixture";

test.describe("Description placeholder", () => {
  test("Test name placeholder", async ({ homePage, bookingPage }) => {
    // Arrange
    const checkinDate = "2026-08-24";
    const checkoutDate = "2026-08-31";

    // Act
    await homePage.goto();

    await homePage.bookingFormComponent.checkAvailability({
      checkIn: checkinDate,
      checkOut: checkoutDate,
    });
    await homePage.bookingFormComponent.bookNowLink.click();

    await bookingPage.thisPage.waitForURL("**/reservation/**");
    await bookingPage.openBookingForm();

    await bookingPage.fillBookingForm({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    });
    await bookingPage.submitBookingForm();

    // Assert
    await expect(bookingPage.bookingConfirmationMessage).toHaveText([
      "Your booking has been confirmed for the following dates:",
      `2026-08-24 - 2026-08-31`,
    ]);
  });
});
