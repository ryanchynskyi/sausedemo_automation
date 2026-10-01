import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env'), quiet: true });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  userEmail: process.env.USER_EMAIL ?? '',
  userPassword: process.env.USER_PASSWORD ?? '',
};

/** Saved login session (cookies + localStorage), created by tests/auth.setup.ts */
export const AUTH_FILE = path.resolve(__dirname, '../../.auth/user.json');
