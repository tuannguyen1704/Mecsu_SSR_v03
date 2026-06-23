"use client";

import { useMemo, useState } from "react";
import { Check, MapPin, Phone, User } from "lucide-react";
import { VietnamAddressSelect } from "@/shared/components/VietnamAddressSelect";
import {
  getProvinces,
  getWardsByProvinceCode,
} from "@/shared/lib/vietnam-address";
import type {
  MockAuthUser,
  RegisterAccountPayload,
  RegisterAddressPayload,
} from "../types/auth";
import { completeVerifiedRegistration } from "../services/registration-service";
import { MecsuMiniLogo } from "./LoginForm";

interface RegisterAddressStepProps {
  account: RegisterAccountPayload;
  onBack: () => void;
  onSuccess: (user: MockAuthUser) => void;
}

const emptyAddress: RegisterAddressPayload = {
  provinceCode: "",
  provinceName: "",
  wardCode: "",
  wardName: "",
  streetAddress: "",
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

  const provinceOptions = useMemo(
    () =>
      getProvinces().map((province) => ({
        code: province.code,
        label: province.name_with_type,
      })),
    [],
  );
  const wardOptions = useMemo(
    () =>
      getWardsByProvinceCode(address.provinceCode ?? "").map((ward) => ({
        code: ward.code,
        label: ward.name_with_type,
      })),
    [address.provinceCode],
  );

  const completeRegistration = async (shouldSaveAddress: boolean) => {
    if (
      shouldSaveAddress &&
      (!address.provinceCode ||
        !address.provinceName ||
        !address.wardCode ||
        !address.wardName ||
        !address.streetAddress?.trim())
    ) {
      setFormError("Vui lòng chọn tỉnh/thành phố, phường/xã và nhập địa chỉ cụ thể.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");
    const result = await completeVerifiedRegistration(
      account,
      shouldSaveAddress ? address : undefined,
    );
    setIsSubmitting(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    onSuccess(result.data);
  };

  return (
    <div className="flex max-h-[calc(100dvh-16px)] min-h-0 flex-col bg-white sm:max-h-[calc(100dvh-32px)]">
      <div className="shrink-0 bg-white px-5 pt-5 pb-3 sm:px-7 sm:pt-7 sm:pb-4">
        <MecsuMiniLogo />
        <div className="mt-4 flex min-w-0 items-center gap-2 sm:mt-6 sm:gap-3">
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

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto scroll-smooth px-5 pb-5 [scrollbar-width:thin] sm:px-7">
        <div>
          <h2 id="auth-modal-title" className="mb-1 text-2xl font-bold text-slate-900">
          Địa chỉ giao hàng
          </h2>
          <p className="text-sm text-slate-500">Thêm địa chỉ giao hàng (tùy chọn)</p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
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
              className="ml-auto text-[12px] font-bold text-[#003B73] hover:underline"
            >
              Đổi người nhận
            </button>
          </div>
        </div>

        <p className="rounded-xl bg-[#FFF7E0] px-4 py-3 text-[13px] font-medium leading-relaxed text-[#6B5A21]">
          Bạn có thể bỏ qua bước này và thêm địa chỉ sau
        </p>

        <div className="space-y-3.5">
          <VietnamAddressSelect
            label="Tỉnh/Thành phố"
            placeholder="Chọn tỉnh/thành phố"
            value={address.provinceCode ?? ""}
            options={provinceOptions}
            onChange={(option) =>
              setAddress((current) => ({
                ...current,
                provinceCode: option.code,
                provinceName: option.label,
                wardCode: "",
                wardName: "",
              }))
            }
          />
          <VietnamAddressSelect
            label="Phường/Xã"
            placeholder={
              address.provinceCode ? "Chọn phường/xã" : "Chọn tỉnh/thành phố trước"
            }
            value={address.wardCode ?? ""}
            options={wardOptions}
            disabled={!address.provinceCode}
            onChange={(option) =>
              setAddress((current) => ({
                ...current,
                wardCode: option.code,
                wardName: option.label,
              }))
            }
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
                value={address.streetAddress ?? ""}
                onChange={(event) =>
                  setAddress((current) => ({
                    ...current,
                    streetAddress: event.target.value,
                  }))
                }
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
            onChange={(event) =>
              setAddress((current) => ({ ...current, note: event.target.value }))
            }
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

      <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] sm:px-5 sm:py-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_0.8fr_1.35fr]">
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
            className="col-span-2 h-11 rounded-xl bg-[#FFC72C] px-3 text-[12px] font-black text-[#003B73] uppercase transition-colors hover:bg-[#f2bd24] disabled:opacity-70 sm:col-span-1"
          >
            {isSubmitting ? "Đang lưu..." : "Hoàn tất đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}
