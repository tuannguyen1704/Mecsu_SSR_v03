"use client";

import { useEffect } from "react";
import {
  notifyEmailVerificationComplete,
  PENDING_VERIFICATION_EMAIL_KEY,
} from "../services/registration-service";
import { getSupabaseBrowserClient } from "../services/supabase-client";

export default function AuthSessionBridge() {
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const handleVerifiedSession = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      const pendingEmail = window.localStorage.getItem(
        PENDING_VERIFICATION_EMAIL_KEY,
      );

      if (
        user?.email_confirmed_at &&
        (!pendingEmail ||
          user.email?.toLowerCase() === pendingEmail.toLowerCase())
      ) {
        notifyEmailVerificationComplete(user.email);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user?.email_confirmed_at) {
        notifyEmailVerificationComplete(user.email);
      }
    });

    void handleVerifiedSession();
    const timeoutId = window.setTimeout(handleVerifiedSession, 1200);

    return () => {
      window.clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
