import {
  Calendar,
  Download,
  Eye,
  Clock3,
  Users,
} from "lucide-react";
import type { Quotation } from "../types/quotation";
import { QuotationStatusBadge } from "./QuotationStatusBadge";

interface QuotationCardProps {
  quotation: Quotation;
  onViewDetails: (quotation: Quotation) => void;
  onDownload: (quotation: Quotation) => void;
}

function formatPrice(price: number) {
  if (price <= 0) return "Đang cập nhật";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function QuotationCard({
  quotation,
  onViewDetails,
  onDownload,
}: QuotationCardProps) {
  return (
    <article
      className="group cursor-pointer rounded-2xl border border-[#E5EAF2] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={() => onViewDetails(quotation)}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <h3 className="text-base font-bold tracking-tight text-[#163F78]">
            {quotation.code}
          </h3>

          <div className="mt-3 space-y-2 text-xs text-[#52647E]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {quotation.requestDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={14} />
              Hạn: {quotation.expiryDate || "Đang cập nhật"}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F1FB]">
              <Users size={14} className="text-[#163F78]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#163F78]">
                {quotation.salesRep.name}
              </p>
              <p className="text-[11px] text-[#71819A]">
                {quotation.salesRep.role}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[200px] lg:items-end lg:justify-between">
          <QuotationStatusBadge status={quotation.status} />

          <div className="text-left lg:text-right">
            <p className="text-xs text-slate-400">Tổng tiền</p>
            <p className="text-base font-extrabold text-[#06152F]">
              {formatPrice(quotation.estimatedValue || quotation.total)}
            </p>
          </div>

          <div className="flex w-full gap-2 lg:justify-end">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onViewDetails(quotation);
              }}
              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1F4382] px-4 text-xs font-bold text-white transition-colors hover:bg-[#17366B] lg:flex-none"
            >
              <Eye size={14} />
              Xem chi tiết
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDownload(quotation);
              }}
              className="flex h-9 w-11 items-center justify-center rounded-xl border border-[#E5EAF2] text-[#52647E] transition-colors hover:bg-slate-50"
              title="Tải PDF"
            >
              <Download size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
