"use client";

import { Banknote, CreditCard, Edit2, ShieldCheck, Star, Trash2, Truck } from "lucide-react";
import type { PaymentMethod, PaymentMethodType } from "../types/payment-method";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onEdit: (method: PaymentMethod) => void;
  onDelete: (method: PaymentMethod) => void;
  onSetDefault: (method: PaymentMethod) => void;
}

const methodTypeConfig: Record<PaymentMethodType, { label: string; icon: typeof Banknote; className: string }> = {
  bank_transfer: {
    label: "Chuyển khoản",
    icon: Banknote,
    className: "bg-blue-50 text-[#163F78] border-blue-100",
  },
  cod: {
    label: "COD",
    icon: Truck,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

export function PaymentMethodCard({
  method,
  onEdit,
  onDelete,
  onSetDefault,
}: PaymentMethodCardProps) {
  const config = methodTypeConfig[method.type];
  const Icon = config.icon;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${config.className}`}>
              <Icon size={13} />
              {config.label}
            </span>
            {method.isDefault ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                <Star size={10} />
                Mặc định
              </span>
            ) : null}
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FB]">
              <CreditCard size={20} className="text-[#163F78]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">{method.displayName}</h2>
              <p className="mt-1 text-sm text-slate-600">{method.accountName}</p>
              <p className="mt-1 font-mono text-sm font-semibold text-[#163F78]">
                {method.maskedValue}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] p-3">
        <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#4F7FC3]" />
          Chỉ lưu thông tin hiển thị đã che. Không có gateway hoặc dữ liệu thanh toán nhạy cảm trong Phase 5H.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onEdit(method)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#163F78]"
        >
          <Edit2 size={14} />
          Chỉnh sửa
        </button>
        <button
          type="button"
          onClick={() => onDelete(method)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={14} />
          Xóa
        </button>
        {!method.isDefault ? (
          <button
            type="button"
            onClick={() => onSetDefault(method)}
            className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#163F78]"
          >
            <Star size={14} />
            Đặt mặc định
          </button>
        ) : null}
      </div>
    </article>
  );
}
