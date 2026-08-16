import { fakerPL as faker } from "@faker-js/faker";
import { ContactFormData } from "../pages/home/types";

export class ContactFactory {
  static createContactData(
    overrides: Partial<ContactFormData> = {},
  ): ContactFormData {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "national" }),
      subject: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      ...overrides,
    };
  }
}
