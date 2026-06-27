import type { ReactNode } from "react";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import type { Quotation } from "../types/quotation";

interface StatCardProps {
  icon: ReactNode;
  value: number;
  label: string;
  tone: "navy" | "yellow" | "blue" | "red";
}

const toneClasses = {
  navy: "text-[#163F78] bg-[#F6F8FB]",
  yellow: "text-[#9A6A00] bg-[#FFF7D6]",
  blue: "text-[#163F78] bg-[#E8F1FB]",
  red: "text-[#991B1B] bg-[#FEE2E2]",
};

function StatCard({ icon, value, label, tone }: StatCardProps) {
  return (
    <div className="rounded-sm border border-[#E5EAF2] bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-3xl font-bold text-[#163F78]">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${toneClasses[tone]}`}>{icon}</div>
      </div>
    </div>
  );
}

interface QuotationStatsProps {
  quotations: Quotation[];
}

export function QuotationStats({ quotations }: QuotationStatsProps) {
  const processing = quotations.filter(
    (q) => q.status === "pending" || q.status === "processing",
  ).length;
  const responded = quotations.filter(
    (q) => q.status === "sent" || q.status === "accepted",
  ).length;
  const expired = quotations.filter(
    (q) => q.status === "expired" || q.status === "cancelled",
  ).length;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        icon={<FileText size={20} />}
        value={quotations.length}
        label="Tất cả báo giá"
        tone="navy"
      />
      <StatCard
        icon={<Clock size={20} />}
        value={processing}
        label="Đang xử lý"
        tone="yellow"
      />
      <StatCard
        icon={<CheckCircle size={20} />}
        value={responded}
        label="Đã phản hồi"
        tone="blue"
      />
      <StatCard
        icon={<XCircle size={20} />}
        value={expired}
        label="Hết hạn / Đã hủy"
        tone="red"
      />
    </div>
  );
}
