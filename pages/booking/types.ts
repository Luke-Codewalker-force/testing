export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type BookingDataPayload = BookingFormData & {
  checkIn: string;
  checkOut: string;
};
