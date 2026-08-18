import { ContactFactory } from "../factories/contact.factory";
import { test, expect } from "../fixtures/page-object.fixture";
import { ContactFormData } from "../pages/home/types";

test.describe("Contact Form", () => {
  test(
    "TC-01:Successful contact form submission",
    { tag: ["@smoke, @regression"] },
    async ({ homePage }) => {
      // Arrange
      const contactData = ContactFactory.createContactData();

      await homePage.goto();

      // Act
      await homePage.contactFormComponent.fillContactForm(contactData);
      await homePage.contactFormComponent.submitContactForm();

      // Assert
      await expect(
        homePage.contactFormComponent.contactFormSection.getByRole("form"),
      ).not.toBeVisible();

      await expect(homePage.contactFormComponent.messageElements).toHaveText([
        `Thanks for getting in touch ${contactData.name}!`,
        "We'll get back to you about",
        contactData.subject,
        "as soon as possible.",
      ]);
    },
  );
});
