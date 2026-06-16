"use client";

import { motion } from "motion/react";
import { BadgeCheck, CheckCircle2, Package, Settings, Truck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountOrderDetail, AccountOrderStatus } from "../types/account";

const TIMELINE_STEPS = [
  { id: 0, label: "Đã đặt", Icon: Package },
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

interface OrderStatusBarProps {
  order: AccountOrderDetail;
  size?: "sm" | "md";
  accentColor?: string;
  glowColor?: string;
}

const formatTimestamp = (iso: string): string => {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const MM = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${hh}:${mm} • ${dd}/${MM}/${yyyy}`;
};

const generateMockTimestamps = (currentStepIndex: number): string[] => {
  const now = Date.now();
  return Array.from({ length: 5 }, (_, i) => {
    const offsetMinutes = (currentStepIndex - i) * (5 + i * 5);
    return new Date(now - offsetMinutes * 60 * 1000).toISOString();
  });
};

export function OrderStatusBar({
  order,
  size = "md",
  accentColor = "#48c774",
  glowColor = "rgba(72, 199, 116, 0.3)",
}: OrderStatusBarProps) {
  const currentStepIndex = STATUS_ORDER_STEP_INDEX[order.status] ?? 0;
  const isCancelled = order.status === "cancelled";

  const timestamps: string[] =
    order.timeline && order.timeline.length > 0
      ? order.timeline
          .map((step) => step.timestamp)
          .filter((ts): ts is string => typeof ts === "string")
      : generateMockTimestamps(currentStepIndex);

  const circleHeight = size === "sm" ? 40 : 48;
  const circleWidth = size === "sm" ? 40 : 48;
  const lineHeight = size === "sm" ? 6 : 8;
  const lineTop = circleHeight / 2 - lineHeight / 2;

  if (isCancelled) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-red-500",
          size === "sm" ? "text-xs" : "text-sm"
        )}
      >
        <span
          className={cn(
            "flex items-center gap-1.5 font-semibold",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          Đã huỷ
        </span>
      </div>
    );
  }

  const getIconClass = (isLit: boolean) => {
    return isLit
      ? "w-6 h-6 md:w-7 md:h-7 text-white stroke-[2.2]"
      : "w-6 h-6 md:w-7 md:h-7 text-slate-400 stroke-[2.2]";
  };

  return (
    <div className="w-full relative px-2">
      {/* Full-width progress line track - sits behind circles */}
      <div
        className="absolute z-[1]"
        style={{ top: lineTop, height: lineHeight, left: 8, right: 8 }}
      >
        {/* Running label above the active segment */}
        {(() => {
          const isCompletedOrder = order.status === "completed";
          if (isCompletedOrder) return null;

          const runningLabel =
            order.status === "shipping"
              ? "Đang giao hàng"
              : order.status === "processing"
                ? "Đang xử lý"
                : "Đang xác nhận";

          const segmentIndex = currentStepIndex;
          const leftPercent = segmentIndex * (100 / (TIMELINE_STEPS.length - 1));
          const segmentWidth = 100 / (TIMELINE_STEPS.length - 1);
          const centerShift = -(segmentWidth * 0.05);

          return (
            <div
              className="absolute text-[10px] font-semibold whitespace-nowrap"
              style={{
                left: `calc(${leftPercent}% + ${segmentWidth / 2}% + ${centerShift}%)`,
                top: "-24px",
                transform: "translateX(-50%)",
                color: accentColor,
                textShadow: "0 0 6px rgba(255,255,255,0.9)",
                zIndex: 20,
              }}
            >
              {runningLabel}
            </div>
          );
        })()}

        {/* Background gray line */}
        <div className="absolute inset-0 rounded-full bg-slate-200" />

        {/* Completed + running segments */}
        {TIMELINE_STEPS.slice(0, -1).map((_, index) => {
          const isCompleted = index < currentStepIndex;
          const isRunning = index === currentStepIndex;
          const isCompletedOrder = order.status === "completed";

          if (!isCompleted && !isRunning) return null;

          const isFirst = index === 0;
          const isLast = index === TIMELINE_STEPS.length - 2;
          const segmentPct = 100 / (TIMELINE_STEPS.length - 1);

          return (
            <div
              key={`segment-${index}`}
              className="absolute top-0 h-full overflow-hidden"
              style={{
                left: `${index * segmentPct}%`,
                width: `${segmentPct}%`,
                borderRadius: isFirst
                  ? "4px 0 0 4px"
                  : isLast
                    ? "0 4px 4px 0"
                    : "4px",
                clipPath: isFirst
                  ? "inset(0 0 0 24px)"
                  : isLast
                    ? "inset(0 24px 0 0)"
                    : undefined,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}`,
                  borderRadius: "inherit",
                }}
              />

              {isRunning && !isCompletedOrder && (
                <motion.div
                  className="absolute inset-0 opacity-40 bg-repeat-x"
                  style={{
                    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.4) 75%, transparent 75%, transparent)`,
                    backgroundSize: "14px 14px",
                  }}
                  animate={{ backgroundPositionX: ["0px", "-28px"] }}
                  transition={{ ease: "linear", duration: 1.2, repeat: Infinity }}
                />
              )}
              {isRunning && !isCompletedOrder && (
                <motion.div
                  className="absolute top-0 bottom-0 w-12 blur-[4px] opacity-80"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                  }}
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ ease: "linear", duration: 1.8, repeat: Infinity }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step items container */}
      <div className="relative flex justify-between items-start z-10">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const StepIcon = step.Icon;
          const timestamp = timestamps[index];

          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
              style={{ width: circleWidth }}
            >
              {/* Icon area with fixed height */}
              <div
                className="relative flex items-center justify-center flex-shrink-0"
                style={{ height: circleHeight, width: circleWidth }}
              >
                {/* Main circle button */}
                <motion.div
                  className={cn(
                    "rounded-full flex items-center justify-center border-4 transition-all duration-300 relative",
                    isCompleted || isActive
                      ? "border-white shadow-md text-white"
                      : "border-white shadow-sm bg-white text-slate-300"
                  )}
                  style={{
                    width: circleWidth,
                    height: circleHeight,
                    backgroundColor: (isCompleted || isActive) ? accentColor : undefined,
                    boxShadow: isCompleted
                      ? `0 6px 16px ${glowColor}, inset 0 2px 4px rgba(255,255,255,0.2)`
                      : isActive
                        ? `0 10px 25px ${glowColor}, 0 0 0 3px ${accentColor}`
                        : "0 2px 6px rgba(0,0,0,0.08)",
                    zIndex: 10,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <StepIcon
                    className={cn(
                      isCompleted || isActive
                        ? "text-white"
                        : "text-slate-400",
                      size === "sm" ? "w-6 h-6" : "w-6 h-6 md:w-7 md:h-7"
                    )}
                    strokeWidth={2.2}
                  />
                </motion.div>
              </div>

              {/* Labels + Timestamp below */}
              <div className="mt-3 flex flex-col items-center">
                <p
                  className="text-[13px] font-medium leading-4 text-center whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: isCompleted ? accentColor : isActive ? "#0F172A" : "#64748B",
                  }}
                >
                  {step.label}
                </p>

                <p
                  className="mt-1.5 text-center text-[11px] leading-3 font-mono"
                  style={{ color: "#94A3B8" }}
                >
                  {index === TIMELINE_STEPS.length - 1 &&
                  order.status === "completed"
                    ? "Đã giao thành công"
                    : isActive
                      ? "--"
                      : isCompleted && timestamp
                        ? formatTimestamp(timestamp)
                        : "--"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
