import { faker } from '@faker-js/faker';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    phone: faker.phone.number(),
    ...overrides,
  };
}
