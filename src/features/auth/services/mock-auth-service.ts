import {
  AUTH_ACCOUNTS_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
  seedMockAccounts,
} from "../data/mock-accounts";
import type {
  AuthServiceResult,
  LoginPayload,
  MockAuthAccount,
  MockAuthUser,
  RegisterPayload,
} from "../types/auth";

const MOCK_DELAY_MS = 280;

function wait() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MOCK_DELAY_MS);
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toSafeUser(account: MockAuthAccount): MockAuthUser {
  return {
    id: account.id,
    fullName: account.fullName,
    email: account.email,
    phone: account.phone,
    createdAt: account.createdAt,
  };
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAccounts(): MockAuthAccount[] {
  if (!canUseStorage()) {
    return seedMockAccounts;
  }

  const stored = window.localStorage.getItem(AUTH_ACCOUNTS_STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(seedMockAccounts));
    return seedMockAccounts;
  }

  try {
    const accounts = JSON.parse(stored) as MockAuthAccount[];
    return Array.isArray(accounts) ? accounts : seedMockAccounts;
  } catch {
    window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(seedMockAccounts));
    return seedMockAccounts;
  }
}

function writeAccounts(accounts: MockAuthAccount[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(AUTH_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function writeCurrentUser(user: MockAuthUser) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
}

export async function login({
  email,
  password,
}: LoginPayload): Promise<AuthServiceResult<MockAuthUser>> {
  await wait();

  const normalizedEmail = normalizeEmail(email);
  const account = readAccounts().find(
    (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
  );

  if (!account) {
    return { ok: false, error: "Email chưa được đăng ký." };
  }

  if (account.password !== password) {
    return { ok: false, error: "Mật khẩu không đúng." };
  }

  const user = toSafeUser(account);
  writeCurrentUser(user);
  return { ok: true, data: user };
}

export async function checkEmailExists(email: string): Promise<boolean> {
  await wait();
  const normalizedEmail = normalizeEmail(email);
  return readAccounts().some(
    (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
  );
}

export async function registerAccount(
  payload: RegisterPayload,
): Promise<AuthServiceResult<MockAuthUser>> {
  await wait();

  const normalizedEmail = normalizeEmail(payload.email);
  const accounts = readAccounts();
  const exists = accounts.some(
    (candidate) => normalizeEmail(candidate.email) === normalizedEmail,
  );

  if (exists) {
    return { ok: false, error: "Email đã tồn tại." };
  }

  if (payload.password.length < 6) {
    return { ok: false, error: "Mật khẩu phải có ít nhất 6 ký tự." };
  }

  if (payload.password !== payload.confirmPassword) {
    return { ok: false, error: "Mật khẩu xác nhận không khớp." };
  }

  const account: MockAuthAccount = {
    id: `mock-user-${Date.now()}`,
    fullName: payload.fullName.trim(),
    email: normalizedEmail,
    phone: payload.phone?.trim() || undefined,
    password: payload.password,
    createdAt: new Date().toISOString(),
  };

  writeAccounts([...accounts, account]);

  if (payload.address && canUseStorage()) {
    window.localStorage.setItem(
      `mecsu-auth-address-${account.id}`,
      JSON.stringify(payload.address),
    );
  }

  const user = toSafeUser(account);
  writeCurrentUser(user);
  return { ok: true, data: user };
}

export async function logout() {
  await wait();
  if (!canUseStorage()) return;
  window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
}

export function getCurrentUser(): MockAuthUser | null {
  if (!canUseStorage()) {
    return null;
  }

  const stored = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!stored) {
    readAccounts();
    return null;
  }

  try {
    return JSON.parse(stored) as MockAuthUser;
  } catch {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    return null;
  }
}
