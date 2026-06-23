"use client";

import { useEffect, useMemo } from "react";
import { AlertCircle, CheckCircle2, MapPin, Phone, Save, User, X } from "lucide-react";
import { VietnamAddressSelect } from "@/shared/components/VietnamAddressSelect";
import {
  getProvinces,
  getWardsByProvinceCode,
} from "@/shared/lib/vietnam-address";
import type { Address, AddressFormData } from "../types/address";

interface AddressFormModalProps {
  isOpen: boolean;
  editingAddress: Address | null;
  formData: AddressFormData;
  errors: Partial<Record<keyof AddressFormData, string>>;
  onChange: (data: AddressFormData) => void;
  onClose: () => void;
  onSubmit: () => void;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

export function AddressFormModal({
  isOpen,
  editingAddress,
  formData,
  errors,
  onChange,
  onClose,
  onSubmit,
}: AddressFormModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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
      getWardsByProvinceCode(formData.provinceCode).map((ward) => ({
        code: ward.code,
        label: ward.name_with_type,
      })),
    [formData.provinceCode],
  );

  if (!isOpen) return null;

  const inputBase = "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/20 focus:outline-none";
  const inputState = (hasError?: boolean) => hasError ? "border-red-400" : "border-slate-200";

  return (
    <div className="fixed inset-0 z-[540] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng form địa chỉ"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <section
        className="relative max-h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-[640px] overflow-hidden rounded-[22px] border border-[#E5EAF2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
        role="dialog"
        aria-modal="true"
        aria-label={editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ"}
      >
        <div className="max-h-[calc(100vh-32px)] overflow-y-auto">
          <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 sm:px-7">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#173E75]">
                {editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ"}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Cập nhật thông tin nhận hàng để Mecsu giao đúng người, đúng nơi.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] transition-colors hover:bg-[#EEF3FA]"
              aria-label="Đóng modal"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </header>

          <div className="space-y-4 px-6 pb-6 sm:px-7">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Họ và tên <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <User size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  value={formData.fullName}
                  onChange={(event) => onChange({ ...formData, fullName: event.target.value })}
                  placeholder="Nhập họ và tên người nhận"
                  className={`${inputBase} ${inputState(Boolean(errors.fullName))} pl-10`}
                />
              </div>
              <FieldError message={errors.fullName} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Số điện thoại <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <Phone size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  value={formData.phone}
                  onChange={(event) => onChange({ ...formData, phone: event.target.value })}
                  placeholder="Nhập số điện thoại"
                  className={`${inputBase} ${inputState(Boolean(errors.phone))} pl-10`}
                />
              </div>
              <FieldError message={errors.phone} />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <VietnamAddressSelect
                label="Tỉnh/Thành phố"
                placeholder="Chọn tỉnh/thành phố"
                value={formData.provinceCode}
                options={provinceOptions}
                error={errors.provinceCode}
                onChange={(option) =>
                  onChange({
                    ...formData,
                    provinceCode: option.code,
                    provinceName: option.label,
                    wardCode: "",
                    wardName: "",
                  })
                }
              />
              <VietnamAddressSelect
                label="Phường/Xã"
                placeholder={
                  formData.provinceCode
                    ? "Chọn phường/xã"
                    : "Chọn tỉnh/thành phố trước"
                }
                value={formData.wardCode}
                options={wardOptions}
                disabled={!formData.provinceCode}
                error={errors.wardCode}
                onChange={(option) =>
                  onChange({
                    ...formData,
                    wardCode: option.code,
                    wardName: option.label,
                  })
                }
              />
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Địa chỉ cụ thể <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <MapPin size={18} className="absolute top-3.5 left-3 text-slate-400" />
                <textarea
                  value={formData.streetAddress}
                  onChange={(event) => onChange({ ...formData, streetAddress: event.target.value })}
                  rows={3}
                  placeholder="Số nhà, tên đường, tên công ty"
                  className={`${inputBase} ${inputState(Boolean(errors.streetAddress))} min-h-[96px] resize-none pl-10`}
                />
              </div>
              <FieldError message={errors.streetAddress} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Ghi chú giao hàng (Tùy chọn)
              </span>
              <textarea
                value={formData.note}
                onChange={(event) => onChange({ ...formData, note: event.target.value })}
                rows={3}
                placeholder="Ví dụ: giao giờ hành chính, gọi trước khi giao..."
                className={`${inputBase} min-h-[88px] resize-none`}
              />
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] px-4 py-3">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                  formData.isDefault ? "border-[#163F78] bg-[#163F78]" : "border-slate-300 bg-white"
                }`}
              >
                {formData.isDefault ? <CheckCircle2 size={14} className="text-white" /> : null}
              </span>
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(event) => onChange({ ...formData, isDefault: event.target.checked })}
                className="sr-only"
              />
              <span className="text-sm font-medium text-slate-700">Đặt làm mặc định</span>
            </label>
          </div>

          <footer className="sticky bottom-0 border-t border-[#E5EAF2] bg-white px-6 py-3.5 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="h-11 rounded-xl border border-[#DDE5F0] bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-[#F6F8FC]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a]"
              >
                <Save size={16} />
                Lưu địa chỉ
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
