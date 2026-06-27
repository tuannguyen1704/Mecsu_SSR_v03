"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Bell, CheckCircle2, PackageX, X } from "lucide-react";
import type { Product } from "../types/product";

const STORAGE_KEY = "mecsu-stock-reminders";

type StockReminderRecord = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  status: "Hết hàng";
  fullName: string;
  phone: string;
  email: string;
  quantity: number;
  note: string;
  createdAt: string;
};

type StockReminderModalProps = {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  quantity: string;
  note: string;
};

type FormErrors = Partial<Record<"fullName" | "phone", string>>;

const initialFormState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  quantity: "1",
  note: "",
};

function readStoredReminders(): StockReminderRecord[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as StockReminderRecord[]) : [];
  } catch {
    return [];
  }
}

function writeReminder(record: StockReminderRecord) {
  const reminders = readStoredReminders();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...reminders]));
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ tên.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!/^[0-9+\s().-]{8,20}$/.test(form.phone.trim())) {
    errors.phone = "Số điện thoại chưa hợp lệ.";
  }

  return errors;
}

export function StockReminderModal({
  isOpen,
  product,
  onClose,
}: StockReminderModalProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const skuLabel = useMemo(() => product.sku || "Đang cập nhật", [product.sku]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined" || !isOpen) {
    return null;
  }

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "fullName" || field === "phone") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const quantity = Math.max(1, Number.parseInt(form.quantity, 10) || 1);

    writeReminder({
      id: `stock-reminder-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: skuLabel,
      status: "Hết hàng",
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      quantity,
      note: form.note.trim(),
      createdAt: new Date().toISOString(),
    });

    setIsSuccess(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999]">
      <button
        type="button"
        aria-label="Đóng popup nhắc hàng"
        className="absolute inset-0 bg-slate-950/60"
        onClick={onClose}
      />

      <div className="relative z-10 flex min-h-dvh items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="stock-reminder-title"
          className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#E5EAF2] px-6 py-5">
            <div>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#163F78] text-[#FFC72C]">
                {isSuccess ? <CheckCircle2 size={22} /> : <Bell size={22} />}
              </div>
              <h2 id="stock-reminder-title" className="text-2xl font-bold tracking-tight text-[#0F172A]">
                {isSuccess ? "Đã ghi nhận yêu cầu" : "Nhắc tôi khi có hàng"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {isSuccess
                  ? "Mecsu sẽ liên hệ khi sản phẩm được cập nhật tồn kho."
                  : "Để lại thông tin, Mecsu sẽ nhắc bạn khi sản phẩm có hàng trở lại."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[calc(100dvh-190px)] overflow-y-auto px-6 py-5">
            <div className="mb-5 rounded-2xl border border-[#E5EAF2] bg-[#F8FAFC] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#163F78]">
                  <PackageX size={20} />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-[15px] font-bold leading-5 text-[#0F172A]">
                    {product.name}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                    <span>SKU: {skuLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="rounded-full bg-red-50 px-2.5 py-1 font-bold text-red-700">
                      Hết hàng
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isSuccess ? (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-6 text-center">
                <CheckCircle2 size={42} className="mx-auto mb-3 text-emerald-600" />
                <p className="text-lg font-bold text-emerald-800">Đã ghi nhận yêu cầu</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-emerald-700">
                  Thông tin của bạn đã được lưu tạm trên trình duyệt. Mecsu sẽ dùng dữ liệu này cho luồng nhắc hàng ở bước tích hợp sau.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 h-11 rounded-xl bg-[#163F78] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0F315F]"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold tracking-wider text-slate-600 uppercase">
                    Họ và tên *
                  </label>
                  <input
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#E5EAF2] px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullName ? (
                    <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.fullName}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-bold tracking-wider text-slate-600 uppercase">
                    Số điện thoại *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#E5EAF2] px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
                    placeholder="0900000000"
                    inputMode="tel"
                  />
                  {errors.phone ? (
                    <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.phone}</p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_130px]">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold tracking-wider text-slate-600 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#E5EAF2] px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold tracking-wider text-slate-600 uppercase">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={(event) => updateField("quantity", event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#E5EAF2] px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-bold tracking-wider text-slate-600 uppercase">
                    Ghi chú
                  </label>
                  <textarea
                    value={form.note}
                    onChange={(event) => updateField("note", event.target.value)}
                    className="min-h-24 w-full resize-none rounded-2xl border border-[#E5EAF2] px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
                    placeholder="Ví dụ: cần báo khi có hàng trong tuần này..."
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#E5EAF2] pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-12 rounded-2xl border border-[#E5EAF2] bg-white px-6 text-sm font-bold text-[#163F78] transition-colors hover:bg-slate-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="h-12 rounded-2xl bg-[#FFC72C] px-6 text-sm font-black tracking-wide text-[#163F78] uppercase transition-colors hover:bg-[#f0b91f]"
                  >
                    Gửi yêu cầu nhắc hàng
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
