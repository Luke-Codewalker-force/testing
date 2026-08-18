import { fakerPL as faker } from "@faker-js/faker";
import { BookingDataPayload } from "../pages/booking/types";

const DAYS_UNTIL_FIRST_AVAILABLE = 15;
const BOOKING_START_OFFSET_DAYS = { min: 365, max: 1460 };
const STAY_DURATION_DAYS = { min: 5, max: 21 };
const MILLISECONDS_PER_DAY = 86_400_000;

export class BookingFactory {
  static createBookingData(
    overrides: Partial<BookingDataPayload> = {},
  ): BookingDataPayload {
    const checkInDate = faker.date.soon({
      days: BOOKING_START_OFFSET_DAYS,
      refDate: new Date(
        Date.now() + DAYS_UNTIL_FIRST_AVAILABLE * MILLISECONDS_PER_DAY,
      ), // Ensure check-in is at least 15 days from now
    });
    const checkOutDate = faker.date.soon({
      days: STAY_DURATION_DAYS,
      refDate: checkInDate,
    });

    return {
      checkIn: checkInDate.toISOString().split("T")[0],
      checkOut: checkOutDate.toISOString().split("T")[0],
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "national" }),
      ...overrides,
    };
  }
}
