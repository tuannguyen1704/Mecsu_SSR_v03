"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import {
  notifyEmailVerificationComplete,
} from "../services/registration-service";
import { getSupabaseBrowserClient } from "../services/supabase-client";
import { MecsuMiniLogo } from "./LoginForm";

type CallbackStatus = "loading" | "success" | "error";

export default function AuthCallbackClient() {
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const completeCallback = async () => {
      const url = new URL(window.location.href);
      const isMock = url.searchParams.get("mock") === "1";
      const mockEmail = url.searchParams.get("email") || "";

      if (isMock) {
        window.setTimeout(() => {
          notifyEmailVerificationComplete(mockEmail);
          window.dispatchEvent(
            new CustomEvent("mecsu-mock-email-verified", {
              detail: { email: mockEmail },
            }),
          );
          setStatus("success");
          window.setTimeout(() => window.close(), 800);
        }, 3000);
        return;
      }

      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setStatus("error");
        setErrorMessage("Supabase chưa được cấu hình.");
        return;
      }

      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session?.user.email_confirmed_at) {
        setStatus("error");
        setErrorMessage(
          error?.message || "Không thể xác nhận phiên đăng ký từ liên kết này.",
        );
        return;
      }

      notifyEmailVerificationComplete(data.session.user.email);
      setStatus("success");
      window.setTimeout(() => window.close(), 1200);
    };

    void completeCallback();
  }, []);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-950/90 px-3 py-4 sm:px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8">
        <MecsuMiniLogo />
        <div className="mt-6 text-center sm:mt-8">
          {status === "loading" ? (
            <LoaderCircle
              size={52}
              className="mx-auto animate-spin text-[#163F78]"
            />
          ) : status === "success" ? (
            <CheckCircle2 size={52} className="mx-auto text-emerald-600" />
          ) : (
            <XCircle size={52} className="mx-auto text-red-500" />
          )}

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            {status === "loading"
              ? "Đang xác thực email"
              : status === "success"
                ? "Xác thực email thành công"
                : "Không thể xác thực email"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {status === "loading"
              ? "Vui lòng chờ trong giây lát..."
              : status === "success"
                ? "Bạn có thể quay lại tab đăng ký. Biểu mẫu sẽ tự chuyển sang bước địa chỉ."
                : errorMessage}
          </p>

          <button
            type="button"
            onClick={() => window.close()}
            className="mt-6 h-11 w-full rounded-xl bg-[#163F78] text-sm font-bold text-white hover:bg-[#123563]"
          >
            Đóng trang này
          </button>
        </div>
      </section>
    </main>
  );
}
