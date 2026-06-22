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
import { getSupabaseBrowserClient } from "./supabase-client";

const MOCK_DELAY_MS = 280;
export const AUTH_STATE_CHANGED_EVENT = "mecsu-auth-state-changed";

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

function notifyAuthStateChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
}

export async function login({
  email,
  password,
}: LoginPayload): Promise<AuthServiceResult<MockAuthUser>> {
  const normalizedEmail = normalizeEmail(email);

  if (process.env.NODE_ENV !== "production") {
    const seededAccount = seedMockAccounts.find(
      (candidate) =>
        normalizeEmail(candidate.email) === normalizedEmail &&
        candidate.password === password,
    );

    if (seededAccount) {
      await wait();
      const user = toSafeUser(seededAccount);
      writeCurrentUser(user);
      notifyAuthStateChanged();
      return { ok: true, data: user };
    }
  }

  const supabase = getSupabaseBrowserClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error || !data.user) {
      return { ok: false, error: error?.message || "Không thể đăng nhập." };
    }

    const user: MockAuthUser = {
      id: data.user.id,
      fullName:
        String(data.user.user_metadata.full_name || "").trim() ||
        data.user.email?.split("@")[0] ||
        "Khách hàng Mecsu",
      email: data.user.email || normalizedEmail,
      phone: String(data.user.user_metadata.phone || "").trim() || undefined,
      createdAt: data.user.created_at,
    };
    writeCurrentUser(user);
    notifyAuthStateChanged();
    return { ok: true, data: user };
  }

  await wait();

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
  notifyAuthStateChanged();
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
  notifyAuthStateChanged();
  return { ok: true, data: user };
}

export async function logout() {
  const supabase = getSupabaseBrowserClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  await wait();
  if (canUseStorage()) {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  }
  notifyAuthStateChanged();
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
