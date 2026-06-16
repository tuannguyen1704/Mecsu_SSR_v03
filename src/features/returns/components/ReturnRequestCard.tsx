import Link from "next/link";
import {
  Calendar,
  CircleDollarSign,
  Eye,
  Package,
  ReceiptText,
  RotateCcw,
} from "lucide-react";
import { returnStatusLabels } from "../data/returns";
import type { ReturnRequest, ReturnRequestStatus } from "../types/return";

const statusTone: Record<ReturnRequestStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  inspecting: "bg-blue-50 text-blue-700",
  refunded: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
  completed: "bg-green-50 text-green-700",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
}

interface ReturnRequestCardProps {
  request: ReturnRequest;
}

export function ReturnRequestCard({ request }: ReturnRequestCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white shadow-sm transition-all duration-300 hover:border-[#163F78]/20 hover:shadow-md">
      <div className="border-b border-[#E5EAF2] bg-slate-50/50 p-4 lg:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-sm text-slate-500">Mã yêu cầu</span>
              <Link
                href={`/tai-khoan/doi-tra/${request.id}`}
                className="truncate font-bold text-[#163F78] transition-colors hover:text-[#1a4a8a]"
              >
                {request.returnCode}
              </Link>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-sm text-slate-500">Mã đơn hàng</span>
              <span className="truncate font-bold text-slate-700">
                {request.orderCode}
              </span>
            </div>
          </div>
          <span
            className={`inline-flex w-max rounded-full px-3 py-1.5 text-xs font-semibold ${statusTone[request.status]}`}
          >
            {returnStatusLabels[request.status]}
          </span>
        </div>
      </div>

      <div className="p-4 lg:p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex min-w-0 items-start gap-3">
            <Calendar size={18} className="mt-0.5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="mb-1 text-xs text-slate-500">Ngày tạo</p>
              <p className="text-sm font-medium text-slate-800">
                {request.createdDate}
              </p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-3">
            <ReceiptText size={18} className="mt-0.5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="mb-1 text-xs text-slate-500">Lý do đổi/trả</p>
              <p className="line-clamp-2 text-sm font-medium text-slate-800">
                {request.reason}
              </p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-3">
            <Package size={18} className="mt-0.5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="mb-1 text-xs text-slate-500">Sản phẩm</p>
              <p className="text-sm font-medium text-slate-800">
                {request.itemCount} sản phẩm
              </p>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-3">
            <CircleDollarSign size={18} className="mt-0.5 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="mb-1 text-xs text-slate-500">Số tiền hoàn</p>
              <p className="text-sm font-bold text-[#163F78]">
                {request.refundAmount > 0 ? formatCurrency(request.refundAmount) : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-[#E5EAF2] pt-4 sm:flex-row sm:justify-end">
          <Link
            href={`/tai-khoan/doi-tra/${request.id}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#163F78] px-4 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a]"
          >
            <Eye size={16} />
            Xem chi tiết
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E5EAF2] bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Tạo lại yêu cầu
          </button>
        </div>
      </div>
    </article>
  );
}
