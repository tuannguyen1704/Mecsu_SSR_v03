import React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountOrder, AccountOrderStatus } from "../types/account";
import { OrderCardStatusBar } from "./OrderCardStatusBar";

interface OrderCardProps {
  order: AccountOrder;
  variant?: "card" | "row";
  className?: string;
  onViewDetails?: (orderId: string) => void;
  onReview?: (orderId: string) => void;
  reviewed?: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Chờ xác nhận",
  processing: "Đang xử lý",
  shipping: "Đang giao hàng",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};

const STATUS_BADGE_CLASS: Record<AccountOrderStatus, string> = {
  pending: "bg-slate-100 text-slate-600",
  processing: "bg-amber-50 text-amber-700",
  shipping: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

export function OrderCard({
  order,
  variant = "card",
  className,
  onViewDetails,
  onReview,
  reviewed = false,
}: OrderCardProps) {
  function formatDate(dateStr: string) {
    if (!dateStr) return "--/--/----";

    const vietnameseDateMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (vietnameseDateMatch) {
      const [, day, month, year] = vietnameseDateMatch;
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
      const isValid =
        parsedDate.getFullYear() === Number(year) &&
        parsedDate.getMonth() === Number(month) - 1 &&
        parsedDate.getDate() === Number(day);

      return isValid
        ? `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`
        : "--/--/----";
    }

    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "--/--/----";

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewDetails?.(order.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onViewDetails?.(order.id);
        }
      }}
      className={cn(
        "group w-full cursor-pointer overflow-hidden bg-white text-left transition-all duration-300 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20",
        variant === "card"
          ? "rounded-2xl border border-[#E5EAF2] shadow-sm hover:border-navy/20 hover:shadow-lg"
          : "hover:bg-slate-50/70",
        className,
      )}
    >
      {/* Card Header */}
      <div
        className={cn(
          variant === "card"
            ? "border-b border-[#E5EAF2] bg-linear-to-r from-slate-50/80 to-white p-4 lg:p-5"
            : "px-4 py-5 lg:px-6",
        )}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left side: Order info */}
          <div className="flex min-w-0 flex-col gap-1">
            {/* Order code with label on same line */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                Mã đơn hàng
              </span>
              <span className="text-base font-bold tracking-tight text-navy transition-colors group-hover:text-navy-light">
                {order.orderCode}
              </span>
            </div>

            {/* Date + Product count */}
            <div className="mt-1 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar size={13} className="shrink-0 text-slate-400" />
                <span className="text-sm">{formatDate(order.orderDate)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm text-slate-500">
                {order.items.length} sản phẩm
              </span>
            </div>

            {/* Order status label (mobile) */}
            <div className="mt-2 lg:hidden">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE_CLASS[order.status]}`}
              >
                {STATUS_LABELS[order.status] || order.status}
              </span>
            </div>
          </div>

          {/* Right side: Status progress bar */}
          <div className="flex shrink-0 items-center justify-start pt-1 lg:justify-end">
            <OrderCardStatusBar
              status={order.status}
              onReview={
                order.status === "completed" ? () => onReview?.(order.id) : undefined
              }
              reviewed={reviewed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
