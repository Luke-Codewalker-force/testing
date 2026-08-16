import { fakerPL as faker } from "@faker-js/faker";
import { BookingFormData } from "../pages/booking/types";

type BookingDataPayload = BookingFormData & {
  checkIn: string;
  checkOut: string;
};

export class BookingFactory {
  static createBookingData(
    overrides: Partial<BookingDataPayload> = {},
  ): BookingDataPayload {
    const checkInDate = faker.date.soon({
      days: { min: 365, max: 1460 },
      refDate: new Date(Date.now() + 15 * 86_400_000),
    });
    const checkOutDate = faker.date.soon({
      days: { min: 5, max: 21 },
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
