"use client";

import { useEffect, useState } from "react";
import { Check, ExternalLink, MailCheck, RefreshCw } from "lucide-react";
import {
  isMockEmailVerificationEnabled,
  isSupabaseConfigured,
  resendVerificationEmail,
  subscribeToEmailVerification,
} from "../services/registration-service";
import { MecsuMiniLogo } from "./LoginForm";

interface EmailVerificationStepProps {
  email: string;
  onBack: () => void;
  onVerified: () => void;
}

export default function EmailVerificationStep({
  email,
  onBack,
  onVerified,
}: EmailVerificationStepProps) {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const isMockVerification = isMockEmailVerificationEnabled();
  const openMailHref = isMockVerification
    ? `/auth/callback?mock=1&email=${encodeURIComponent(email)}`
    : "https://mail.google.com";

  useEffect(
    () => subscribeToEmailVerification(email, onVerified),
    [email, onVerified],
  );

  const handleResend = async () => {
    setIsResending(true);
    setMessage("");
    const result = await resendVerificationEmail(email);
    setIsResending(false);
    setMessage(
      result.ok
        ? "Email xác thực đã được gửi lại."
        : result.error,
    );
  };

  return (
    <div className="bg-white px-5 py-5 sm:px-8 sm:py-6">
      <MecsuMiniLogo />

      <div className="mt-5 flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#163F78] bg-white text-[12px] font-bold text-[#163F78]">
          1
        </span>
        <span className="min-w-0 text-[12px] font-bold text-[#163F78] sm:text-[13px]">
          Chờ xác thực tài khoản
        </span>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-400">
          2
        </span>
        <span className="text-[12px] font-medium text-slate-400 sm:text-[13px]">
          Địa chỉ
        </span>
      </div>

      <div className="mx-auto mt-6 max-w-sm text-center sm:mt-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF4FB] text-[#163F78]">
          <MailCheck size={38} strokeWidth={1.7} />
        </div>
        <h2
          id="auth-modal-title"
          className="mt-5 text-2xl font-bold text-slate-900"
        >
          Xác thực email của bạn
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Chúng tôi đã gửi liên kết xác thực đến email của bạn. Vui lòng mở
          Gmail và bấm vào liên kết để hoàn tất xác thực tài khoản.
        </p>
        <div className="mt-4 rounded-xl border border-[#D8E3F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold text-[#163F78]">
          {email}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#FFC72C]" />
          Đang chờ xác thực...
        </div>

        {isMockVerification ? (
          <p className="mt-2 text-xs text-slate-400">
            Đang dùng dữ liệu mock để kiểm tra luồng xác thực.
          </p>
        ) : !isSupabaseConfigured() ? (
          <p className="mt-2 text-xs text-slate-400">
            Chế độ demo sẽ tự xác thực để bạn kiểm tra giao diện.
          </p>
        ) : null}

        <a
          href={openMailHref}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-4 text-sm font-bold text-white transition-colors hover:bg-[#123563]"
        >
          Mở Gmail
          <ExternalLink size={16} />
        </a>
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D8E3F0] bg-white px-4 text-sm font-bold text-[#163F78] transition-colors hover:bg-[#F8FAFC] disabled:opacity-60"
        >
          {isResending ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <Check size={16} />
          )}
          {isResending ? "Đang gửi lại..." : "Gửi lại email xác thực"}
        </button>

        {message ? (
          <p className="mt-3 text-xs font-medium text-slate-500">{message}</p>
        ) : null}

        <button
          type="button"
          onClick={onBack}
          className="mt-5 text-sm font-bold text-[#163F78] hover:underline"
        >
          Quay lại chỉnh sửa thông tin
        </button>
      </div>
    </div>
  );
}
