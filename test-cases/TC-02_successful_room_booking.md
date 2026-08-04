# TC-02: Successful room booking (Happy Path)

## TC-02 Description

Verify that a user can successfully book a room by selecting valid stay dates and completing the reservation form.

## TC-02 Preconditions

- The application is up and running at [https://automationintesting.online/](https://automationintesting.online/).

- The room availability form is empty and visible on the page

## TC-02 Test steps

1. Select the check in date (e.g. 10/08/2026) and select the check out date (e.g. 15/08/2026)
2. Click the Check Availability button
3. Click the **Book Now** button for the first available room on the list.
4. Click the Reserve Now button
5. Enter Jan in the **Name** field
6. Enter Kowalski in the **Last name** field
7. Enter `jan.kowalski@jan.com` in the **Email** field
8. Enter 901234567812 in the **Phone** field
9. Click the **Reserve Now** button

## TC-02 Expected result

- The form is submitted successfully
- The Book This Room form is replaced by a message: "Booking Confirmed
  Your booking has been confirmed for the following dates: 2026-08-10 - 2026-08-15"
- In the network tab, the POST /booking request returns a status code 201 Created
