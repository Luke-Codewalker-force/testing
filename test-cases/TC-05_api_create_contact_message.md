# TC-05: API - Submit Contact Message (POST /message/)

## Description

Verify that sending a valid HTTP POST request with a complete JSON payload to the `/message/` endpoint is accepted by the server and returns a `200 OK` status code with a success response.

## Preconditions

- The API backend service is reachable at `https://automationintesting.online/message/`.

## Test steps

1. Send an HTTP `POST` request to `https://automationintesting.online/message/` with header: `Content-Type: application/json`, and body:

   ```json
   {
     "name": "Jan Kowalski",
     "email": "jan.kowalski@example.com",
     "phone": "12345678901",
     "subject": "Booking Inquiry API Test",
     "description": "Hello, this is an automated API test message with over 20 characters."
   }
   ```

2. Inspect the HTTP response status code, headers, and response body.

## Expected result

- The HTTP response status code is 200 OK.

- The response header contains Content-Type: application/json.

- The response body contains `{ "success": true }`.
