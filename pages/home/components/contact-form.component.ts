import { Locator, Page } from "@playwright/test";
import { ContactFormData } from "../types";

export class ContactFormComponent {
  private readonly contactFormSectionLocator: Locator;
  private readonly contactNameInput: Locator;
  private readonly contactEmailInput: Locator;
  private readonly contactPhoneInput: Locator;
  private readonly subjectInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly submitButton: Locator;

  constructor(private page: Page) {
    this.contactNameInput = this.page.getByTestId("ContactName");
    this.contactEmailInput = this.page.getByTestId("ContactEmail");
    this.contactPhoneInput = this.page.getByTestId("ContactPhone");
    this.subjectInput = this.page.getByTestId("ContactSubject");
    this.descriptionInput = this.page.getByTestId("ContactDescription");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.contactFormSectionLocator = this.page.locator("#contact");
  }

  async fillContactForm({
    name,
    email,
    phone,
    subject,
    description,
  }: ContactFormData): Promise<void> {
    await this.contactNameInput.fill(name);
    await this.contactEmailInput.fill(email);
    await this.contactPhoneInput.fill(phone);
    await this.subjectInput.fill(subject);
    await this.descriptionInput.fill(description);
  }

  async submitContactForm(): Promise<void> {
    await this.submitButton.click();
  }

  get contactFormSection(): Locator {
    return this.contactFormSectionLocator;
  }

  get messageElements(): Locator {
    return this.contactFormSection
      .locator(".card-body", { hasText: "Thanks for getting in touch" })
      .locator("h3, p");
  }
}
