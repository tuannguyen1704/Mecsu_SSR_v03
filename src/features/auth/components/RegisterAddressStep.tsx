"use client";

import { useState } from "react";
import { Check, MapPin, Phone, User } from "lucide-react";
import type {
  MockAuthUser,
  RegisterAccountPayload,
  RegisterAddressPayload,
} from "../types/auth";
import { registerAccount } from "../services/mock-auth-service";
import { MecsuMiniLogo } from "./LoginForm";

interface RegisterAddressStepProps {
  account: RegisterAccountPayload;
  onBack: () => void;
  onSuccess: (user: MockAuthUser) => void;
}

const provinces = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng"];
const districts = ["Quận 1", "Quận Bình Thạnh", "Quận Cầu Giấy", "Quận Hải Châu"];
const wards = ["Phường Bến Nghé", "Phường 25", "Phường Dịch Vọng", "Phường Thạch Thang"];

const emptyAddress: RegisterAddressPayload = {
  province: "",
  district: "",
  ward: "",
  addressLine: "",
  note: "",
};

export default function RegisterAddressStep({
  account,
  onBack,
  onSuccess,
}: RegisterAddressStepProps) {
  const [address, setAddress] = useState<RegisterAddressPayload>(emptyAddress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const updateAddress = (field: keyof RegisterAddressPayload, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
  };

  const completeRegistration = async (shouldSaveAddress: boolean) => {
    setIsSubmitting(true);
    setFormError("");
    const result = await registerAccount({
      ...account,
      address: shouldSaveAddress ? address : undefined,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    onSuccess(result.data);
  };

  return (
    <div className="flex max-h-[calc(100dvh-32px)] min-h-0 flex-col bg-white">
      <div className="shrink-0 bg-white px-7 pt-7 pb-4">
        <MecsuMiniLogo />
        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#16A34A] text-[12px] font-bold text-white">
            <Check size={15} />
          </span>
          <span className="text-[13px] font-bold text-[#16A34A]">Tài khoản</span>
          <span className="h-px flex-1 bg-slate-200" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#003B73] text-[12px] font-bold text-white">
            2
          </span>
          <span className="text-[13px] font-bold text-[#003B73]">Địa chỉ</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-7 pb-5 [scrollbar-width:thin]">
        <div>
          <h2 id="auth-modal-title" className="mb-1 text-2xl font-bold text-slate-900">
          Địa chỉ giao hàng
          </h2>
          <p className="text-sm text-slate-500">Thêm địa chỉ giao hàng (tùy chọn)</p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#003B73] shadow-sm">
              <User size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-slate-900">{account.fullName}</p>
              {account.phone ? (
                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500">
                  <Phone size={13} />
                  +84 {account.phone}
                </p>
              ) : (
                <p className="mt-0.5 text-[12px] text-slate-500">Chưa thêm số điện thoại</p>
              )}
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-[12px] font-bold text-[#003B73] hover:underline"
            >
              Đổi người nhận
            </button>
          </div>
        </div>

        <p className="rounded-xl bg-[#FFF7E0] px-4 py-3 text-[13px] font-medium leading-relaxed text-[#6B5A21]">
          Bạn có thể bỏ qua bước này và thêm địa chỉ sau
        </p>

        <div className="space-y-3.5">
          <SelectField
            label="Tỉnh/Thành phố"
            value={address.province ?? ""}
            onChange={(value) => updateAddress("province", value)}
            options={provinces}
          />
          <SelectField
            label="Quận/Huyện"
            value={address.district ?? ""}
            onChange={(value) => updateAddress("district", value)}
            options={districts}
          />
          <SelectField
            label="Phường/Xã"
            value={address.ward ?? ""}
            onChange={(value) => updateAddress("ward", value)}
            options={wards}
          />
          <label className="block">
            <span className="mb-2 block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
              Địa chỉ cụ thể
            </span>
            <span className="relative block">
              <MapPin
                size={16}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />
              <input
                value={address.addressLine ?? ""}
                onChange={(event) => updateAddress("addressLine", event.target.value)}
                placeholder="Số nhà, tên đường, tên công ty"
                className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white pr-4 pl-11 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
              />
            </span>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
            Ghi chú giao hàng (Tùy chọn)
          </span>
          <textarea
            value={address.note ?? ""}
            onChange={(event) => updateAddress("note", event.target.value)}
            placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
            className="min-h-20 w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
          />
        </label>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
            {formError}
          </p>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-white/95 px-5 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-[1fr_0.8fr_1.35fr] gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="h-11 rounded-xl border border-slate-200 bg-white text-[13px] font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-70"
          >
            ← Quay lại
          </button>
          <button
            type="button"
            onClick={() => completeRegistration(false)}
            disabled={isSubmitting}
            className="h-11 rounded-xl border border-[#003B73] bg-white text-[13px] font-bold text-[#003B73] transition-colors hover:bg-blue-50 disabled:opacity-70"
          >
            Bỏ qua
          </button>
          <button
            type="button"
            onClick={() => completeRegistration(true)}
            disabled={isSubmitting}
            className="h-11 rounded-xl bg-[#FFC72C] px-3 text-[12px] font-black text-[#003B73] uppercase transition-colors hover:bg-[#f2bd24] disabled:opacity-70"
          >
            {isSubmitting ? "Đang lưu..." : "Hoàn tất đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none transition-all hover:border-slate-300 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10"
      >
        <option value="">Chọn</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
