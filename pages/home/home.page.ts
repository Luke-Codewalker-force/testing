import { Page } from "@playwright/test";
import { ContactFormComponent } from "./components/contact-form.component";
import { CheckBookingAvailabilityFormComponent } from "./components/check-availability-form.component";

export class HomePage {
  public readonly contactFormComponent: ContactFormComponent;
  public readonly bookingFormComponent: CheckBookingAvailabilityFormComponent;

  constructor(private page: Page) {
    this.contactFormComponent = new ContactFormComponent(this.page);
    this.bookingFormComponent = new CheckBookingAvailabilityFormComponent(
      this.page,
    );
  }

  async goto(url: string = "/"): Promise<void> {
    await this.page.goto(url);
  }
}
