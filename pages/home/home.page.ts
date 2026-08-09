import { Locator, Page } from "@playwright/test";
import { ContactFormData } from "./types";

export class HomePage {
  private readonly contactSection: Locator;
  private readonly contactNameInput: Locator;
  private readonly contactEmailInput: Locator;
  private readonly contactPhoneInput: Locator;
  private readonly subjectInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly submitButton: Locator;

  constructor(private page: Page) {
    this.contactNameInput = page.getByTestId("ContactName");
    this.contactEmailInput = page.getByTestId("ContactEmail");
    this.contactPhoneInput = page.getByTestId("ContactPhone");
    this.subjectInput = page.getByTestId("ContactSubject");
    this.descriptionInput = page.getByTestId("ContactDescription");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.contactSection = page.locator("#contact");
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

  async goto(url: string = "/"): Promise<void> {
    await this.page.goto(url);
  }

  get contactFormSection(): Locator {
    return this.contactSection;
  }

  get messageElements(): Locator {
    return this.contactSection
      .locator(".card-body", { hasText: "Thanks for getting in touch" })
      .locator("h3, p");
  }
}
