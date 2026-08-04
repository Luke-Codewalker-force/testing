# TC-01: Successful Contact Form Submission (Happy Path)

## TC-01 Description

Verify that a user can successfully submit a message to the hotel management via the contact form by providing valid data in all required fields.

## Preconditions

- The application is up and running at [https://automationintesting.online/](https://automationintesting.online/).

- The contact form is visible and empty.

## Test steps

1. Enter Jan Kowalski in the Name field.

2. Enter `jan.kowalski@example.com` in the Email field.

3. Enter 12345678901 in the Phone field (Note: requires min. 11 digits).

4. Enter Booking Inquiry in the Subject field.

5. Enter a message with at least 20 characters in the Message field, e.g., Hello, I would like to inquire about room availability for the summer. Best regards.

6. Click the Submit button.

## Expected result

- The form is submitted successfully.

- The contact form is replaced by a success confirmation message: "Thanks for getting in touch Jan Kowalski! We'll get back to you about Book Inquiry as soon as possible."

- In the Network tab, the POST /message/ HTTP request returns a status code of 200 OK.
