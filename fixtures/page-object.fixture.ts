import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home/home.page";
import { BookingPage } from "../pages/booking/booking.page";

type Pages = {
  homePage: HomePage;
  bookingPage: BookingPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
});

export { expect } from "@playwright/test";
