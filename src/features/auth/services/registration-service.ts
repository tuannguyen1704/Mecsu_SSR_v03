import type {
  AuthServiceResult,
  MockAuthUser,
  RegisterAccountPayload,
  RegisterAddressPayload,
} from "../types/auth";
import {
  AUTH_STATE_CHANGED_EVENT,
  registerAccount,
} from "./mock-auth-service";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "./supabase-client";

export const MOCK_EMAIL_VERIFIED_EVENT = "mecsu-mock-email-verified";
export const EMAIL_VERIFICATION_CHANNEL = "mecsu-email-verification";
export const EMAIL_VERIFIED_STORAGE_KEY = "mecsu-email-verified-at";
export const PENDING_VERIFICATION_EMAIL_KEY = "mecsu-pending-verification-email";

function getEmailVerificationRedirectUrl() {
  return `${window.location.origin}/auth/callback`;
}

export function isMockEmailVerificationEnabled() {
  return process.env.NEXT_PUBLIC_MOCK_EMAIL_VERIFICATION === "true";
}

function toMockAuthUser(account: RegisterAccountPayload, id: string): MockAuthUser {
  return {
    id,
    fullName: account.fullName.trim(),
    email: account.email.trim().toLowerCase(),
    phone: account.phone?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
}

export async function requestEmailVerification(
  account: RegisterAccountPayload,
): Promise<AuthServiceResult<{ verified: boolean }>> {
  const supabase = getSupabaseBrowserClient();

  if (isMockEmailVerificationEnabled()) {
    window.localStorage.setItem(
      PENDING_VERIFICATION_EMAIL_KEY,
      account.email.trim().toLowerCase(),
    );
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return { ok: true, data: { verified: false } };
  }

  if (!supabase) {
    return { ok: true, data: { verified: false } };
  }

  const { data, error } = await supabase.auth.signUp({
    email: account.email.trim(),
    password: account.password,
    options: {
      emailRedirectTo: getEmailVerificationRedirectUrl(),
      data: {
        full_name: account.fullName.trim(),
        phone: account.phone?.trim() || "",
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  window.localStorage.setItem(
    PENDING_VERIFICATION_EMAIL_KEY,
    account.email.trim().toLowerCase(),
  );
  return { ok: true, data: { verified: Boolean(data.session) } };
}

export async function resendVerificationEmail(
  email: string,
): Promise<AuthServiceResult<undefined>> {
  const supabase = getSupabaseBrowserClient();

  if (isMockEmailVerificationEnabled() || !supabase) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return { ok: true, data: undefined };
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: getEmailVerificationRedirectUrl(),
    },
  });

  return error
    ? { ok: false, error: error.message }
    : { ok: true, data: undefined };
}

export function notifyEmailVerificationComplete(email?: string) {
  const normalizedEmail = email?.trim().toLowerCase() || "";
  const payload = JSON.stringify({
    email: normalizedEmail,
    verifiedAt: Date.now(),
  });

  window.localStorage.setItem(EMAIL_VERIFIED_STORAGE_KEY, payload);
  window.localStorage.removeItem(PENDING_VERIFICATION_EMAIL_KEY);

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel(EMAIL_VERIFICATION_CHANNEL);
    channel.postMessage({ type: "email-verified", email: normalizedEmail });
    channel.close();
  }
}

export function subscribeToEmailVerification(
  email: string,
  onVerified: () => void,
) {
  const supabase = getSupabaseBrowserClient();
  const normalizedEmail = email.trim().toLowerCase();

  if (isMockEmailVerificationEnabled() || !supabase) {
    const handleMockVerified = (event: Event) => {
      const customEvent = event as CustomEvent<{ email?: string }>;
      const verifiedEmail = customEvent.detail?.email?.toLowerCase();
      if (!verifiedEmail || verifiedEmail === normalizedEmail) {
        onVerified();
      }
    };
    const handleMockStorage = (event: StorageEvent) => {
      if (event.key !== EMAIL_VERIFIED_STORAGE_KEY || !event.newValue) return;
      try {
        const payload = JSON.parse(event.newValue) as { email?: string };
        if (payload.email?.toLowerCase() === normalizedEmail) {
          onVerified();
        }
      } catch {
        onVerified();
      }
    };

    window.addEventListener(MOCK_EMAIL_VERIFIED_EVENT, handleMockVerified);
    window.addEventListener("storage", handleMockStorage);
    return () => {
      window.removeEventListener(MOCK_EMAIL_VERIFIED_EVENT, handleMockVerified);
      window.removeEventListener("storage", handleMockStorage);
    };
  }

  let active = true;
  let verificationChannel: BroadcastChannel | null = null;
  const finishVerification = (verifiedEmail?: string) => {
    if (
      active &&
      (!verifiedEmail ||
        verifiedEmail.trim().toLowerCase() === normalizedEmail)
    ) {
      onVerified();
    }
  };
  const handleStorage = (event: StorageEvent) => {
    if (event.key === EMAIL_VERIFIED_STORAGE_KEY && event.newValue) {
      try {
        const payload = JSON.parse(event.newValue) as { email?: string };
        finishVerification(payload.email);
      } catch {
        finishVerification();
      }
    }
  };
  const handleBroadcastMessage = (event: MessageEvent) => {
    finishVerification(event.data?.email);
  };
  const handleFocus = () => {
    void checkSession();
  };
  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user.email_confirmed_at) {
      finishVerification(data.session.user.email);
    }
  };

  if ("BroadcastChannel" in window) {
    verificationChannel = new BroadcastChannel(EMAIL_VERIFICATION_CHANNEL);
    verificationChannel.addEventListener("message", handleBroadcastMessage);
  }
  window.addEventListener("storage", handleStorage);
  window.addEventListener("focus", handleFocus);
  document.addEventListener("visibilitychange", handleFocus);

  void checkSession();
  const intervalId = window.setInterval(checkSession, 2000);
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user.email_confirmed_at) {
      finishVerification(session.user.email);
    }
  });

  return () => {
    active = false;
    window.clearInterval(intervalId);
    verificationChannel?.removeEventListener("message", handleBroadcastMessage);
    verificationChannel?.close();
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("focus", handleFocus);
    document.removeEventListener("visibilitychange", handleFocus);
    subscription.unsubscribe();
  };
}

export async function completeVerifiedRegistration(
  account: RegisterAccountPayload,
  address?: RegisterAddressPayload,
): Promise<AuthServiceResult<MockAuthUser>> {
  const supabase = getSupabaseBrowserClient();

  if (isMockEmailVerificationEnabled() || !supabase) {
    return registerAccount({ ...account, address });
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return {
      ok: false,
      error: "Phiên xác thực chưa sẵn sàng. Vui lòng mở lại liên kết xác thực.",
    };
  }

  const user = toMockAuthUser(account, data.user.id);
  window.localStorage.setItem("mecsu-auth-user", JSON.stringify(user));

  if (address) {
    window.localStorage.setItem(
      `mecsu-auth-address-${data.user.id}`,
      JSON.stringify(address),
    );
  }

  window.dispatchEvent(new Event(AUTH_STATE_CHANGED_EVENT));
  return { ok: true, data: user };
}

export { isSupabaseConfigured };
