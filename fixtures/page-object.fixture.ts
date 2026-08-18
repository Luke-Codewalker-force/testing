import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home/home.page";
import { BookingPage } from "../pages/booking/booking.page";
import { AuthClient } from "../api/auth-client";

type Fixtures = {
  // pages
  homePage: HomePage;
  bookingPage: BookingPage;

  // api
  authClient: AuthClient;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
});

export { expect } from "@playwright/test";
