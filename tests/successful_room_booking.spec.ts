import { BookingFactory } from "../factories/booking-factory";
import { test, expect } from "../fixtures/page-object.fixture";

test.describe("Room booking", () => {
  test(
    "Successful room booking",
    { tag: ["@TC-02"] },
    async ({ homePage, bookingPage }) => {
      // Arrange
      const bookingData = BookingFactory.createBookingData();

      // Act
      await homePage.goto();

      await homePage.bookingFormComponent.checkAvailability({
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      });
      await homePage.bookingFormComponent.bookNowLink.click();

      await bookingPage.waitForPageLoaded("**/reservation/**");

      await bookingPage.openBookingForm();

      await bookingPage.fillBookingForm({
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
      });
      await bookingPage.submitBookingForm();

      // Assert
      await expect(bookingPage.bookingConfirmationMessage).toHaveText([
        "Your booking has been confirmed for the following dates:",
        `${bookingData.checkIn} - ${bookingData.checkOut}`,
      ]);
    },
  );
});
