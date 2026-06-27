import Image from "next/image";
import Link from "next/link";
import { CalendarDays, PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StockAlert, StockAlertStatus } from "../types";

const statusMeta: Record<
  StockAlertStatus,
  { label: string; className: string }
> = {
  waiting: {
    label: "Đang chờ hàng",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  available: {
    label: "Đã có hàng",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  cancelled: {
    label: "Đã hủy",
    className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  },
};

export function StockAlertCard({ alert }: { alert: StockAlert }) {
  const productHref = `/san-pham/${alert.productId}`;

  return (
    <article className="flex h-full flex-col rounded-sm border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#163F78]/35">
      <div className="flex items-start gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
          <Image
            src={alert.imageUrl}
            alt={alert.productName}
            fill
            sizes="88px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#163F78]">
              {alert.productName}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-bold",
                statusMeta[alert.status].className,
              )}
            >
              {statusMeta[alert.status].label}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold">
              SKU: {alert.sku}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#FFF7D6] px-2.5 py-1 font-semibold text-[#7A5200]">
              <PackageSearch size={14} />
              SL: {alert.requestedQuantity.toLocaleString("vi-VN")}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays size={16} className="text-slate-400" />
            <span>Ngày đăng ký: {alert.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {alert.status === "waiting" ? (
          <>
            <ActionLink href={productHref}>Xem sản phẩm</ActionLink>
            <ActionButton tone="danger">Hủy nhắc hàng</ActionButton>
          </>
        ) : null}

        {alert.status === "available" ? (
          <>
            <ActionLink href={productHref} primary>
              Mua ngay
            </ActionLink>
            <ActionLink href={productHref}>Xem sản phẩm</ActionLink>
          </>
        ) : null}

        {alert.status === "cancelled" ? (
          <>
            <ActionButton>Đăng ký lại</ActionButton>
            <ActionLink href={productHref}>Xem sản phẩm</ActionLink>
          </>
        ) : null}
      </div>
    </article>
  );
}

function ActionLink({
  children,
  href,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center rounded-xl border px-4 text-sm font-bold transition-colors",
        primary
          ? "border-[#163F78] bg-[#163F78] text-white hover:bg-[#1A4A8A]"
          : "border-[#E2E8F0] bg-white text-[#163F78] hover:bg-[#F8FAFC]",
      )}
    >
      {children}
    </Link>
  );
}

function ActionButton({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "danger";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 w-full items-center justify-center rounded-xl border px-4 text-sm font-bold transition-colors",
        tone === "danger"
          ? "border-red-200 bg-white text-red-600 hover:bg-red-50"
          : "border-[#E2E8F0] bg-white text-[#163F78] hover:bg-[#F8FAFC]",
      )}
    >
      {children}
    </button>
  );
}
