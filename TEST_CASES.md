# Test Cases

## TC-01: Successful Contact Form Submission (Happy Path)

### TC-01 Description

Verify that a user can successfully submit a message to the hotel management via the contact form by providing valid data in all required fields.

### Preconditions

- The application is up and running at [https://automationintesting.online/](https://automationintesting.online/).

- The contact form is visible and empty.

### Test steps

1. Scroll down to the contact form section.

2. Enter Jan Kowalski in the Name field.

3. Enter <jan.kowalski@example.com> in the Email field.

4. Enter 12345678901 in the Phone field (Note: requires min. 11 digits).

5. Enter Booking Inquiry in the Subject field.

6. Enter a message with at least 20 characters in the Message field, e.g., Hello, I would like to inquire about room availability for the summer. Best regards.

7. Click the Submit button.

### Expected result

- The form is submitted successfully.

- The contact form is replaced by a success confirmation message: "Thanks for getting in touch Jan Kowalski! We'll get back to you about Book Inquiry as soon as possible."

- In the Network tab, the POST /message/ HTTP request returns a status code of 200 OK.

## TC-02: Successful room booking (Happy Path)

### TC-02 Description

Verify that a user can successfully book a room by selecting valid stay dates and completing the reservation form.

### TC-02 Preconditions

- The application is up and running at [https://automationintesting.online/](https://automationintesting.online/).

- The room availability form is empty and visible on the page

### TC-02 Test steps

1. Select the check in date (e.g. 10/08/2026) and select the check out date (e.g. 15/08/2026)
2. Click the Check Availability button
3. Click the **Book Now** button for the first available room on the list.
4. Click the Reserve Now button
5. Enter Jan in the **Name** field
6. Enter Kowalski in the **Last name** field
7. Enter `jan.kowalski@jan.com` in the **Email** field
8. Enter 901234567812 in the **Phone** field
9. Click the **Reserve Now** button

### TC-02 Expected result

- The form is submitted succesfully
- The Book This Room form is replaced by a message: "Booking Confirmed
  Your booking has been confirmed for the following dates: 2026-08-10 - 2026-08-15"
- In the network tab, the POST /booking request returns a status code 201 Created
