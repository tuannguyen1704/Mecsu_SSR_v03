import type { MockAuthAccount } from "../types/auth";

export const AUTH_USER_STORAGE_KEY = "mecsu-auth-user";
export const AUTH_ACCOUNTS_STORAGE_KEY = "mecsu-mock-accounts";

export const seedMockAccounts: MockAuthAccount[] = [
  {
    id: "mock-user-tuan",
    fullName: "Nguyen Minh Tuan",
    email: "tuan@gmail.com",
    phone: "0901234567",
    password: "123456",
    createdAt: "2026-01-05T09:00:00.000Z",
  },
  {
    id: "mock-user-customer",
    fullName: "Mecsu Customer",
    email: "customer@mecsu.vn",
    phone: "0902345678",
    password: "123456",
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "mock-user-buyer",
    fullName: "Industrial Buyer",
    email: "buyer@mecsu.vn",
    phone: "0903456789",
    password: "123456",
    createdAt: "2026-01-15T09:00:00.000Z",
  },
];
