import { test, expect } from "../fixtures/page-object.fixture";
import { ContactFormData } from "../pages/home/types";

test.describe("Contact Form Submission", () => {
  test("Successful contact form submission", async ({ homePage }) => {
    // Arrange
    const contactData: ContactFormData = {
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com",
      phone: "12345678901",
      subject: "Booking inquiry",
      description:
        "Hello, I would like to inquire about room availability for the summer. Best regards.",
    };

    await homePage.goto();

    // Act
    await homePage.fillContactForm(contactData);
    await homePage.submitContactForm();

    // Assert
    await expect(
      homePage.contactFormSection.getByRole("form"),
    ).not.toBeVisible();

    await expect(homePage.messageElements).toHaveText([
      `Thanks for getting in touch ${contactData.name}!`,
      "We'll get back to you about",
      contactData.subject,
      "as soon as possible.",
    ]);
  });
});
