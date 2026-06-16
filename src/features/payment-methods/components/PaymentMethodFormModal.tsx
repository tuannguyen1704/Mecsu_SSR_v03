"use client";

import { useEffect } from "react";
import { AlertCircle, CheckCircle2, CreditCard, Save, User, Wallet, X } from "lucide-react";
import type { PaymentMethod, PaymentMethodFormData, PaymentMethodType } from "../types/payment-method";

interface PaymentMethodFormModalProps {
  isOpen: boolean;
  editingMethod: PaymentMethod | null;
  formData: PaymentMethodFormData;
  errors: Partial<Record<keyof PaymentMethodFormData, string>>;
  onChange: (data: PaymentMethodFormData) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const methodTypes: { value: PaymentMethodType; label: string }[] = [
  { value: "bank_transfer", label: "Chuyển khoản ngân hàng" },
  { value: "cod", label: "Thanh toán khi nhận hàng (COD)" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

export function PaymentMethodFormModal({
  isOpen,
  editingMethod,
  formData,
  errors,
  onChange,
  onClose,
  onSubmit,
}: PaymentMethodFormModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const inputBase = "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/20 focus:outline-none";
  const inputState = (hasError?: boolean) => hasError ? "border-red-400" : "border-slate-200";

  return (
    <div className="fixed inset-0 z-[540] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng form phương thức thanh toán"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <section
        className="relative max-h-[calc(100vh-32px)] w-[calc(100vw-32px)] max-w-[640px] overflow-hidden rounded-[22px] border border-[#E5EAF2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
        role="dialog"
        aria-modal="true"
        aria-label={editingMethod ? "Chỉnh sửa phương thức" : "Thêm phương thức"}
      >
        <div className="max-h-[calc(100vh-32px)] overflow-y-auto">
          <header className="flex items-start justify-between gap-4 px-6 pt-6 pb-5 sm:px-7">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#173E75]">
                {editingMethod ? "Chỉnh sửa phương thức" : "Thêm phương thức"}
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Lưu thông tin hiển thị an toàn cho thanh toán doanh nghiệp. Không nhập dữ liệu nhạy cảm.
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

          <div className="mx-6 mb-5 rounded-[14px] border border-[#D9E5F6] bg-[#F8FAFD] p-4 sm:mx-7">
            <div className="flex items-start gap-3">
              <Wallet size={20} className="mt-0.5 shrink-0 text-[#4F7FC3]" />
              <div>
                <p className="text-sm font-semibold text-[#173E75]">Thông tin hiển thị</p>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                  Phase 5H chỉ lưu `maskedValue`; không lưu số thẻ, mật khẩu, CVV hoặc token thanh toán.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-6 pb-6 sm:px-7">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Loại phương thức <span className="text-red-500">*</span>
              </span>
              <select
                value={formData.type}
                onChange={(event) => onChange({
                  ...formData,
                  type: event.target.value as PaymentMethodType,
                })}
                className={`${inputBase} ${inputState(Boolean(errors.type))}`}
              >
                {methodTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <FieldError message={errors.type} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Tên hiển thị <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <CreditCard size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  value={formData.displayName}
                  onChange={(event) => onChange({ ...formData, displayName: event.target.value })}
                  placeholder="VD: Chuyển khoản doanh nghiệp"
                  className={`${inputBase} ${inputState(Boolean(errors.displayName))} pl-10`}
                />
              </div>
              <FieldError message={errors.displayName} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Chủ tài khoản <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <User size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
                <input
                  value={formData.accountName}
                  onChange={(event) => onChange({ ...formData, accountName: event.target.value })}
                  placeholder="Tên doanh nghiệp hoặc người nhận"
                  className={`${inputBase} ${inputState(Boolean(errors.accountName))} pl-10`}
                />
              </div>
              <FieldError message={errors.accountName} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Giá trị hiển thị <span className="text-red-500">*</span>
              </span>
              <input
                value={formData.maskedValue}
                onChange={(event) => onChange({ ...formData, maskedValue: event.target.value })}
                placeholder="VD: VCB **** 2468 hoặc COD - xác nhận khi giao"
                className={`${inputBase} ${inputState(Boolean(errors.maskedValue))}`}
              />
              <FieldError message={errors.maskedValue} />
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
              <span className="text-sm font-medium text-slate-700">Đặt mặc định</span>
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
                Lưu phương thức
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
