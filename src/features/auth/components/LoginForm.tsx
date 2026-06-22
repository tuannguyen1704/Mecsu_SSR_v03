"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { login } from "../services/mock-auth-service";
import type { MockAuthUser } from "../types/auth";
import AuthField from "./AuthField";

interface LoginFormProps {
  onSuccess: (user: MockAuthUser) => void;
  onRegisterClick: () => void;
}

interface LoginErrors {
  email?: string;
  password?: string;
  form?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const nextErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = "Vui lòng nhập email.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    }

    setErrors(nextErrors);
    setForgotMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const result = await login({ email: trimmedEmail, password });
    setIsSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    onSuccess(result.data);
  };

  return (
    <>
      <div className="bg-white px-5 pt-5 pb-4 sm:px-8 sm:pt-8 sm:pb-6">
        <MecsuMiniLogo />
        <h2 id="auth-modal-title" className="mt-5 mb-1 text-2xl font-bold text-slate-900 sm:mt-7">
          Chào mừng trở lại
        </h2>
        <p className="text-sm text-slate-500">Đăng nhập để tiếp tục mua sắm</p>
      </div>

      <div className="space-y-4 px-5 pb-5 sm:px-8 sm:pb-6">
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Nhập email của bạn"
          autoComplete="email"
          icon={Mail}
          error={errors.email}
        />
        <AuthField
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="Nhập mật khẩu"
          autoComplete="current-password"
          icon={Lock}
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() =>
              setForgotMessage("Tính năng quên mật khẩu sẽ được kết nối ở phase sau.")
            }
            className="text-[12px] font-bold text-[#003B73] transition-colors hover:text-[#002d5a] hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>
        {forgotMessage ? (
          <p className="rounded-lg bg-blue-50 px-3 py-2 text-[12px] font-medium text-[#173E75]">
            {forgotMessage}
          </p>
        ) : null}
        {errors.form ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
            {errors.form}
          </p>
        ) : null}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-[#003B73] text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#002d5a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <div className="text-center text-[13px] font-medium text-slate-500">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="font-bold text-[#003B73] transition-colors hover:text-[#002d5a] hover:underline"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-8">
        <p className="text-center text-[12px] leading-relaxed text-slate-400">
          Bằng việc đăng nhập, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật
          của Mecsu.
        </p>
      </div>
    </>
  );
}

export function MecsuMiniLogo() {
  return (
    <Image
      src="/mecsu-sologan.png"
      alt="MECSU - Một cách khác"
      width={178}
      height={64}
      priority
      className="h-12 w-auto max-w-full object-contain sm:h-14"
    />
  );
}
