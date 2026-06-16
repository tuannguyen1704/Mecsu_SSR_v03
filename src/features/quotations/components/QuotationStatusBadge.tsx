import { cn } from "@/lib/utils";
import { quotationStatusConfig, type QuotationStatus } from "../types/quotation";

interface QuotationStatusBadgeProps {
  status: QuotationStatus;
}

export function QuotationStatusBadge({ status }: QuotationStatusBadgeProps) {
  const config = quotationStatusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold",
        config.bg,
        config.color,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
