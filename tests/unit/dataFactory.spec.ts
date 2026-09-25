import { test, expect } from '@playwright/test';
import { createUser } from '../../src/utils/dataFactory';

test('createUser generates valid data and respects overrides', () => {
  const user = createUser({ firstName: 'John' });

  expect(user.firstName).toBe('John');
  expect(user.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  expect(user.password).toHaveLength(12);
});
