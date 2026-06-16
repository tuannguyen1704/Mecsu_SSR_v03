import { CheckCircle2, Settings, Truck, BadgeCheck, XCircle, Star, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountOrderStatus } from "../types/account";

const TIMELINE_STEPS = [
  { id: 0, label: "Đã đặt", Icon: CheckCircle2 },
  { id: 1, label: "Xác nhận", Icon: CheckCircle2 },
  { id: 2, label: "Xử lý", Icon: Settings },
  { id: 3, label: "Giao hàng", Icon: Truck },
  { id: 4, label: "Hoàn tất", Icon: BadgeCheck },
];

const STATUS_ORDER_STEP_INDEX: Record<AccountOrderStatus, number> = {
  pending: 0,
  processing: 2,
  shipping: 3,
  completed: 4,
  cancelled: -1,
};

const STATUS_LABELS: Record<AccountOrderStatus, string> = {
  pending: "Đã đặt hàng",
  processing: "Đang xử lý",
  shipping: "Đang giao hàng",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};

const STATUS_TEXT_COLORS: Record<AccountOrderStatus, string> = {
  pending: "text-blue-600",
  processing: "text-amber-600",
  shipping: "text-blue-600",
  completed: "text-green-600",
  cancelled: "text-red-600",
};

interface OrderCardStatusBarProps {
  status: AccountOrderStatus;
  onReview?: () => void;
  reviewed?: boolean;
}

export const OrderCardStatusBar: React.FC<OrderCardStatusBarProps> = ({
  status,
  onReview,
  reviewed = false,
}) => {
  const currentStepIndex = STATUS_ORDER_STEP_INDEX[status] ?? 0;
  const isCancelled = status === "cancelled";

  const circleSize = 24;
  const lineHeight = 3;
  const lineWidth = 20;

  if (isCancelled) {
    return (
      <div className="flex flex-col items-end gap-1.5">
        <span
          className={cn(
            "text-xs font-semibold tracking-wide uppercase",
            STATUS_TEXT_COLORS[status]
          )}
        >
          {STATUS_LABELS[status]}
        </span>
        <div className="flex items-center gap-2 text-slate-500">
          <XCircle size={18} className="text-red-400" strokeWidth={2} />
          <div className="w-16 h-1 rounded-full bg-slate-200" />
          <div className="w-16 h-1 rounded-full bg-slate-200" />
          <div className="w-16 h-1 rounded-full bg-slate-200" />
          <div className="w-16 h-1 rounded-full bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-4 -translate-x-2">
        {status === "completed" && (
          <>
            {reviewed ? (
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#EAF8EF] text-[#36A853] border border-[#BFE8CC]">
                <CheckCheck size={14} strokeWidth={2.5} />
                Đã đánh giá
              </span>
            ) : onReview ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReview();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FFF8E1] text-[#B88700] border border-[#F5D97A] hover:bg-[#FFF3C4] hover:border-[#EAB308] hover:-translate-y-px active:scale-[0.98] transition-all duration-200 shadow-sm"
              >
                <Star size={14} strokeWidth={2.5} />
                Đánh giá
              </button>
            ) : null}
          </>
        )}
        <span
          className={cn(
            "text-xs font-semibold tracking-wide uppercase",
            STATUS_TEXT_COLORS[status]
          )}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const { Icon } = step;

          return (
            <div key={step.id} className="flex items-center">
              <div
                className="flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  width: circleSize,
                  height: circleSize,
                  backgroundColor: isCompleted ? "#48c774" : isActive ? "#48c774" : "#F1F5F9",
                  boxShadow: isCompleted
                    ? "0 2px 8px rgba(72, 199, 116, 0.35)"
                    : isActive
                      ? "0 0 0 3px rgba(72, 199, 116, 0.2), 0 2px 8px rgba(72, 199, 116, 0.25)"
                      : "inset 0 1px 2px rgba(0,0,0,0.06)",
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <Icon
                    size={12}
                    className={isActive ? "text-white" : "text-slate-400"}
                    strokeWidth={2.5}
                  />
                )}
              </div>

              {index < TIMELINE_STEPS.length - 1 && (
                <div
                  key={`${step.id}-line`}
                  className="rounded-full flex-shrink-0"
                  style={{
                    height: lineHeight,
                    width: lineWidth,
                    backgroundColor: index < currentStepIndex ? "#48c774" : "#E2E8F0",
                    transition: "background-color 0.3s ease",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
