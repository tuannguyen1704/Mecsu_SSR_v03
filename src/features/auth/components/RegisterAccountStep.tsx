"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { checkEmailExists } from "../services/mock-auth-service";
import type { RegisterAccountPayload } from "../types/auth";
import AuthField from "./AuthField";
import { MecsuMiniLogo } from "./LoginForm";

interface RegisterAccountStepProps {
  initialValue: RegisterAccountPayload;
  onBackToLogin: () => void;
  onContinue: (payload: RegisterAccountPayload) => void;
}

type RegisterAccountErrors = Partial<Record<keyof RegisterAccountPayload, string>> & {
  form?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterAccountStep({
  initialValue,
  onBackToLogin,
  onContinue,
}: RegisterAccountStepProps) {
  const [form, setForm] = useState<RegisterAccountPayload>(initialValue);
  const [errors, setErrors] = useState<RegisterAccountErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const updateField = (field: keyof RegisterAccountPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleContinue = async () => {
    const nextErrors: RegisterAccountErrors = {};
    const trimmedFullName = form.fullName.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedFullName) {
      nextErrors.fullName = "Vui lòng nhập họ và tên.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Vui lòng nhập email.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Email không hợp lệ.";
    }

    if (!form.password) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsChecking(true);
    const exists = await checkEmailExists(trimmedEmail);
    setIsChecking(false);

    if (exists) {
      setErrors({
        email: "Email đã tồn tại. Vui lòng đăng nhập hoặc dùng email khác.",
      });
      return;
    }

    onContinue({
      ...form,
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: form.phone?.trim() || "",
    });
  };

  return (
    <>
      <div className="bg-white px-8 pt-8 pb-5">
        <MecsuMiniLogo />
        <div className="mt-6 mb-5 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#003B73] text-[12px] font-bold text-white">
            1
          </span>
          <span className="text-[13px] font-bold text-[#003B73]">Tài khoản</span>
        </div>
        <h2 id="auth-modal-title" className="mb-1 text-2xl font-bold text-slate-900">
          Tạo tài khoản
        </h2>
        <p className="text-sm text-slate-500">Nhập thông tin để đăng ký tài khoản</p>
      </div>

      <div className="space-y-3.5 px-8 pb-5">
        <AuthField
          label="Họ và tên"
          type="text"
          value={form.fullName}
          onChange={(value) => updateField("fullName", value)}
          placeholder="Nhập họ và tên"
          autoComplete="name"
          icon={User}
          error={errors.fullName}
        />
        <AuthField
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          placeholder="Nhập email của bạn"
          autoComplete="email"
          icon={Mail}
          error={errors.email}
        />
        <label className="block">
          <span className="mb-2 block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
            Số điện thoại (Tùy chọn)
          </span>
          <span className="relative flex h-12 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all hover:border-slate-300 focus-within:border-[#003B73] focus-within:ring-2 focus-within:ring-[#003B73]/10">
            <span className="flex items-center gap-2 border-r border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-600">
              <Phone size={16} className="text-slate-400" />
              +84
            </span>
            <input
              type="tel"
              value={form.phone ?? ""}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="901234567"
              autoComplete="tel"
              className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-slate-400"
            />
          </span>
        </label>
        <AuthField
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(value) => updateField("password", value)}
          placeholder="Ít nhất 6 ký tự"
          autoComplete="new-password"
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
        <AuthField
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
          icon={Lock}
          error={errors.confirmPassword}
          trailing={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
              className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
        {errors.form ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
            {errors.form}
          </p>
        ) : null}
        <button
          type="button"
          onClick={handleContinue}
          disabled={isChecking}
          className="h-12 w-full rounded-xl bg-[#003B73] text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#002d5a] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isChecking ? "Đang kiểm tra..." : "Tiếp tục"}
        </button>
        <div className="text-center text-[13px] font-medium text-slate-500">
          Đã có tài khoản?{" "}
          <button
            type="button"
            onClick={onBackToLogin}
            className="font-bold text-[#003B73] transition-colors hover:text-[#002d5a] hover:underline"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
}
