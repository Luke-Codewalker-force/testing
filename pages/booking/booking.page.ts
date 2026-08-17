import { type Locator, type Page } from "@playwright/test";
import { type BookingFormData } from "./types";

export class BookingPage {
  private readonly openBookingFormButton: Locator;
  private readonly submitBookingButton: Locator;
  private readonly bookingCard: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly phoneInput: Locator;

  constructor(private page: Page) {
    this.openBookingFormButton = this.page.locator("#doReservation", {
      hasText: "Reserve Now",
    });
    this.submitBookingButton = this.page.locator("button:not(#doReservation)", {
      hasText: "Reserve Now",
    });
    this.bookingCard = this.page.locator(".card-body", {
      has: this.page.getByRole("heading", { name: "Book This Room", level: 2 }),
    });
    this.firstNameInput = this.bookingCard.getByRole("textbox", {
      name: "Firstname",
    });
    this.lastNameInput = this.bookingCard.getByRole("textbox", {
      name: "Lastname",
    });
    this.emailInput = this.bookingCard.getByRole("textbox", {
      name: "Email",
    });
    this.phoneInput = this.bookingCard.getByRole("textbox", {
      name: "Phone",
    });
  }

  async fillBookingForm({
    firstName,
    lastName,
    email,
    phone,
  }: BookingFormData): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async submitBookingForm(): Promise<void> {
    await this.submitBookingButton.click();
  }

  async openBookingForm(): Promise<void> {
    await this.openBookingFormButton.click();
  }

  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForURL("**/reservation/**");
  }

  get bookingConfirmationMessage(): Locator {
    return this.page
      .locator(".card-body", { hasText: "Booking Confirmed" })
      .locator("p");
  }
}
