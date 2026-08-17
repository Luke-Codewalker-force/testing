import { Locator, Page } from "@playwright/test";
import { BookingDates } from "../types";

export class CheckBookingAvailabilityFormComponent {
  private readonly bookingAvailabilitySectionLocator: Locator;
  private readonly checkInInputLocator: Locator;
  private readonly checkOutInputLocator: Locator;
  private readonly checkAvailabilityButton: Locator;
  private readonly bookNowLinkLocator: Locator;

  constructor(private page: Page) {
    this.bookingAvailabilitySectionLocator = this.page.locator("#booking");
    // TODO: Change to getByLabel("check-in-label") once DEV fixes missing input ID
    this.checkInInputLocator = this.bookingAvailabilitySectionLocator
      .locator("div", { hasText: "Check In", hasNotText: "Check Out" })
      .getByRole("textbox");

    // TODO: Change to getByLabel("checkout-label") once DEV fixes missing input ID
    this.checkOutInputLocator = this.bookingAvailabilitySectionLocator
      .locator("div", { hasText: "Check Out", hasNotText: "Check In" })
      .getByRole("textbox");

    this.checkAvailabilityButton = this.page.getByRole("button", {
      name: "Check Availability",
    });
    this.bookNowLinkLocator = this.page
      .locator("#rooms")
      .getByRole("link", { name: "Book now" })
      .first();
  }

  async checkAvailability({ checkIn, checkOut }: BookingDates): Promise<void> {
    await this.checkInInputLocator.fill(checkIn);
    await this.checkOutInputLocator.fill(checkOut);
    await this.checkAvailabilityButton.click();
  }

  get checkInInput(): Locator {
    return this.checkInInputLocator;
  }
  get bookingAvailabilitySection(): Locator {
    return this.bookingAvailabilitySectionLocator;
  }

  get bookNowLink(): Locator {
    return this.bookNowLinkLocator;
  }
}
