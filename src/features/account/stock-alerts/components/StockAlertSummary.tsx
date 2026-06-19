import { BellRing, CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { StockAlert } from "../types";

const summaryCards = [
  {
    id: "total",
    label: "Tổng yêu cầu",
    icon: BellRing,
    tone: "bg-[#EEF4FF] text-[#163F78]",
  },
  {
    id: "waiting",
    label: "Đang chờ hàng",
    icon: Clock3,
    tone: "bg-[#FFF7D6] text-[#8A5B00]",
  },
  {
    id: "available",
    label: "Đã có hàng",
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "cancelled",
    label: "Đã hủy",
    icon: XCircle,
    tone: "bg-slate-100 text-slate-500",
  },
] as const;

export function StockAlertSummary({ alerts }: { alerts: StockAlert[] }) {
  const counts = {
    total: alerts.length,
    waiting: alerts.filter((alert) => alert.status === "waiting").length,
    available: alerts.filter((alert) => alert.status === "available").length,
    cancelled: alerts.filter((alert) => alert.status === "cancelled").length,
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="flex h-[86px] items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.tone}`}>
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-black leading-none text-slate-900">
                {counts[card.id]}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-500">
                {card.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
