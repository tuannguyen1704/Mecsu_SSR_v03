"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Download,
  MessageCircle,
  Package,
  RotateCcw,
  ShoppingBag,
  X,
} from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { useCart } from "@/features/cart";
import type { Product } from "@/features/products/types/product";
import { cn } from "@/lib/utils";
import {
  findQuotationById,
  initializeQuotations,
  updateQuotation,
} from "../services/quotation-storage";
import type { Quotation, QuotationItem, QuotationStatus } from "../types/quotation";
import {
  quotationStatusConfig,
  quotationStatusTimelineIndex,
  quotationTimelineSteps,
} from "../types/quotation";

interface QuotationDetailPageShellProps {
  quotationId: string;
  initialQuotation?: Quotation;
}

type ToastState = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
};

const cardClass =
  "rounded-[20px] border border-[#E5EAF2] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

const stockBadges = [
  { label: "Có hàng", className: "bg-[#DCFCE7] text-[#166534]" },
  { label: "Cần đặt hàng", className: "bg-[#FFF7D6] text-[#9A6A00]" },
  { label: "Hết hàng", className: "bg-[#FEE2E2] text-[#991B1B]" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

function getTimelineDates(quotation: Quotation) {
  return {
    0: `${quotation.requestDate} • 08:30`,
    1: `${quotation.requestDate} • 10:15`,
    2: quotation.quotationDate ? `${quotation.quotationDate} • 14:30` : "",
    3:
      quotation.status === "completed" || quotation.status === "accepted"
        ? `${quotation.quotationDate || quotation.requestDate} • 17:00`
        : "",
  } as Record<number, string>;
}

function toProduct(quotationItem: QuotationItem): Product {
  return {
    id: quotationItem.id,
    sku: quotationItem.sku,
    name: quotationItem.name,
    slug: quotationItem.sku.toLowerCase().replace(/\s+/g, "-"),
    category: "Báo giá",
    categorySlug: "bao-gia",
    brand: "MECsu",
    price: quotationItem.unitPrice,
    stock: 9999,
    unit: quotationItem.unit,
    image:
      quotationItem.image ||
      `https://placehold.co/200x200/f6f8fb/163F78?text=${encodeURIComponent(
        quotationItem.name.slice(0, 10),
      )}`,
    tags: ["bao-gia"],
  };
}

export function QuotationDetailPageShell({
  quotationId,
  initialQuotation,
}: QuotationDetailPageShellProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quotation, setQuotation] = useState<Quotation | undefined>(
    initialQuotation,
  );
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      initializeQuotations();
      setQuotation(findQuotationById(quotationId) ?? initialQuotation);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialQuotation, quotationId]);

  const timelineDates = useMemo(
    () => (quotation ? getTimelineDates(quotation) : {}),
    [quotation],
  );

  if (!quotation) {
    return (
      <div className="rounded-[20px] border border-[#E5EAF2] bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Không tìm thấy báo giá
        </h1>
        <p className="mt-2 text-slate-500">
          Yêu cầu báo giá này không tồn tại hoặc đã bị xoá khỏi dữ liệu tạm.
        </p>
        <Link
          href="/tai-khoan/bao-gia"
          className="mt-5 inline-flex rounded-xl bg-[#163F78] px-5 py-2.5 font-semibold text-white"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const statusConfig = quotationStatusConfig[quotation.status];
  const currentTimelineIndex = quotationStatusTimelineIndex[quotation.status] ?? 0;

  const setQuotationStatus = (status: QuotationStatus, message: string) => {
    const updatedQuotation = { ...quotation, status };
    setQuotation(updateQuotation(updatedQuotation));
    setToast({ show: true, message, type: "success" });
  };

  const handleDownloadPdf = () => {
    setToast({
      show: true,
      message: `Đang chuẩn bị file PDF cho ${quotation.code}`,
      type: "info",
    });
  };

  const handleSupport = () => {
    setToast({
      show: true,
      message: "Đã mở kênh hỗ trợ cho báo giá này",
      type: "success",
    });
  };

  const handlePlaceOrder = () => {
    quotation.items.forEach((item) => addItem(toProduct(item), item.quantity));
    router.push("/gio-hang");
  };

  const infoItems = [
    { label: "Mã báo giá", value: `#${quotation.code}` },
    { label: "Ngày tạo", value: quotation.requestDate },
    { label: "Ngày phản hồi", value: quotation.quotationDate || "Đang cập nhật" },
    { label: "Hiệu lực đến", value: quotation.expiryDate || "Đang cập nhật" },
  ];

  return (
    <div className="space-y-4 rounded-[20px] border border-[#E5EAF2] bg-[#F6F8FB] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/tai-khoan/bao-gia"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#163F78]"
          >
            <ArrowLeft size={18} />
            Quay lại
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#06152F] lg:text-3xl">
              Chi tiết báo giá
            </h1>
            <span
              className={cn(
                "inline-flex rounded-xl px-3 py-2 text-sm font-semibold",
                statusConfig.bg,
                statusConfig.color,
              )}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">{renderHeaderActions(quotation)}</div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <section className={cn(cardClass, "p-5")}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#06152F]">
              Thông tin báo giá
            </h2>
            <span className="hidden text-xs font-medium uppercase tracking-[0.14em] text-[#3678BA] sm:block">
              Quotation overview
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFC] px-5 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#94A3B8]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#06152F]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={cn(cardClass, "p-5")}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#06152F]">
              Tiến trình báo giá
            </h2>
            <Clock3 size={18} className="text-[#3678BA]" />
          </div>

          <div>
            {quotationTimelineSteps.map((step, index) => {
              const isCompleted = currentTimelineIndex >= index && currentTimelineIndex >= 0;
              const isLast = index === quotationTimelineSteps.length - 1;
              const activeDate = isCompleted && timelineDates[index];

              return (
                <div key={step.id} className="relative flex items-start gap-4 pb-4">
                  {!isLast ? (
                    <div
                      className={cn(
                        "absolute left-[16px] top-8 h-[calc(100%-32px)] w-[2px]",
                        isCompleted ? "bg-[#1F4382]" : "bg-[#E5EAF2]",
                      )}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      isCompleted
                        ? "border-[#1F4382] bg-[#1F4382] text-white"
                        : "border-[#CBD5E1] bg-white text-slate-400",
                    )}
                  >
                    {isCompleted ? <Check size={14} /> : index + 1}
                  </div>
                  <div className="pt-1">
                    <p
                      className={cn(
                        "text-sm font-semibold leading-5",
                        isCompleted ? "text-slate-900" : "text-slate-400",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs text-[#66758E]">
                      {activeDate || "Đang chờ cập nhật"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className={cn(cardClass, "overflow-hidden")}>
        <div className="border-b border-[#E5EAF2] px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#06152F]">
                Sản phẩm trong báo giá
              </h2>
              <p className="mt-1 text-sm text-[#52647E]">
                Bảng giá chi tiết theo từng mã hàng và tình trạng cung ứng.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F1FB] px-3 py-1 text-sm font-semibold text-[#163F78]">
              <Package size={16} />
              {quotation.items.length} sản phẩm
            </span>
          </div>
        </div>

        <div className="hidden xl:block">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#F8FAFC] text-left text-xs uppercase tracking-[0.08em] text-[#5F6F89]">
                <th className="px-6 py-4 font-semibold">Mã hàng</th>
                <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 text-right font-semibold">Số lượng</th>
                <th className="px-6 py-4 font-semibold">Đơn vị</th>
                <th className="px-6 py-4 text-right font-semibold">Đơn giá</th>
                <th className="px-6 py-4 text-right font-semibold">Thành tiền</th>
                <th className="px-6 py-4 font-semibold">Trạng thái hàng</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item, index) => {
                const stock = stockBadges[index % stockBadges.length];

                return (
                  <tr key={item.id} className="transition-colors hover:bg-[#F8FAFC]">
                    <td className="border-t border-[#E5EAF2] px-6 py-5 text-sm font-medium text-[#163F78]">
                      {item.sku}
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5 align-top">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6F8FB] text-[#163F78]">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#06152F]">
                            {item.name}
                          </p>
                          <p className="mt-1 max-w-md text-xs leading-5 text-[#52647E]">
                            Giải pháp phù hợp cho nhu cầu mua hàng B2B số lượng lớn.
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5 text-right text-sm font-semibold text-[#06152F]">
                      {item.quantity}
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5 text-sm text-[#06152F]">
                      {item.unit}
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5 text-right text-sm font-medium text-[#06152F]">
                      {formatPrice(item.unitPrice)}đ
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5 text-right text-sm font-bold text-[#163F78]">
                      {formatPrice(item.lineTotal)}đ
                    </td>
                    <td className="border-t border-[#E5EAF2] px-6 py-5">
                      <span
                        className={cn(
                          "inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold",
                          stock.className,
                        )}
                      >
                        {stock.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 xl:hidden">
          {quotation.items.map((item, index) => {
            const stock = stockBadges[index % stockBadges.length];

            return (
              <div key={item.id} className="rounded-2xl border border-[#E5EAF2] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6F8FB] text-[#163F78]">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.sku}</p>
                    </div>
                  </div>
                  <span className={cn("inline-flex rounded-lg px-2.5 py-1 text-xs font-bold", stock.className)}>
                    {stock.label}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <InfoCell label="Số lượng" value={String(item.quantity)} />
                  <InfoCell label="Đơn vị" value={item.unit} />
                  <InfoCell label="Đơn giá" value={`${formatPrice(item.unitPrice)}đ`} />
                  <InfoCell
                    label="Thành tiền"
                    value={`${formatPrice(item.lineTotal)}đ`}
                    strong
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-[#E5EAF2] bg-[#F8FAFC] px-6 py-6">
          <div className="mb-5 flex flex-col gap-5 sm:flex-row-reverse sm:items-start sm:justify-between">
            <div className="sm:w-1/2">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-slate-900">Tổng cộng</span>
                <span className="text-2xl font-bold text-[#163F78]">
                  {formatPrice(quotation.total)}đ
                </span>
              </div>
              <SummaryRow label="Tạm tính" value={`${formatPrice(quotation.subtotal)}đ`} />
              <SummaryRow label="VAT" value={`${formatPrice(quotation.vatTotal)}đ`} />
              <SummaryRow
                label="Phí vận chuyển"
                value={
                  quotation.shippingFee > 0
                    ? `${formatPrice(quotation.shippingFee)}đ`
                    : "Miễn phí"
                }
              />
            </div>

            <div className="flex-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                Ghi chú yêu cầu
              </p>
              <textarea
                className="w-full resize-none rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20"
                rows={3}
                placeholder="Nhập ghi chú yêu cầu của bạn..."
                defaultValue={quotation.generalNotes || ""}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {quotation.status === "sent" ? (
              <>
                <ActionButton
                  variant="accent"
                  onClick={handlePlaceOrder}
                  icon={<CheckCircle2 size={16} />}
                >
                  Đặt đơn hàng
                </ActionButton>
                <ActionButton
                  variant="secondary"
                  onClick={handleDownloadPdf}
                  icon={<Download size={16} />}
                >
                  Tải PDF
                </ActionButton>
              </>
            ) : null}
            {quotation.status === "expired" ? (
              <ActionButton
                variant="secondary"
                onClick={() =>
                  setToast({
                    show: true,
                    message:
                      "Báo giá đã hết hạn. Vui lòng liên hệ MECSU để được tạo báo giá mới.",
                    type: "info",
                  })
                }
                icon={<CircleAlert size={16} />}
              >
                Báo giá hết hạn
              </ActionButton>
            ) : null}
          </div>
        </div>
      </section>

      {isAcceptModalOpen ? (
        <ModalShell
          title="Xác nhận chấp nhận báo giá?"
          description="Sau khi xác nhận, MECSU sẽ tiến hành xử lý đơn hàng theo báo giá này."
          onClose={() => setIsAcceptModalOpen(false)}
          footer={
            <>
              <ActionButton
                variant="secondary"
                onClick={() => setIsAcceptModalOpen(false)}
              >
                Hủy
              </ActionButton>
              <ActionButton
                variant="primary"
                onClick={() => {
                  setQuotationStatus("accepted", "Đã chấp nhận báo giá thành công");
                  setIsAcceptModalOpen(false);
                }}
              >
                Xác nhận
              </ActionButton>
            </>
          }
        >
          <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFC] p-4">
            <p className="text-sm text-slate-600">
              Báo giá{" "}
              <span className="font-semibold text-slate-900">
                #{quotation.code}
              </span>{" "}
              sẽ được chuyển sang trạng thái đã chấp nhận.
            </p>
          </div>
        </ModalShell>
      ) : null}

      {toast.show ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      ) : null}
    </div>
  );

  function renderHeaderActions(currentQuotation: Quotation) {
    switch (currentQuotation.status) {
      case "sent":
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={handleDownloadPdf}
              icon={<Download size={16} />}
            >
              Tải PDF
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => setIsAcceptModalOpen(true)}
              icon={<CheckCircle2 size={16} />}
            >
              Chấp nhận báo giá
            </ActionButton>
          </>
        );
      case "pending":
      case "processing":
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={handleSupport}
              icon={<MessageCircle size={16} />}
            >
              Nhắn hỗ trợ
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => setQuotationStatus("cancelled", "Đã ghi nhận yêu cầu hủy báo giá")}
              icon={<CircleAlert size={16} />}
            >
              Hủy yêu cầu
            </ActionButton>
          </>
        );
      case "expired":
      case "cancelled":
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={() => setQuotationStatus("pending", "Đã gửi lại yêu cầu báo giá")}
              icon={<RotateCcw size={16} />}
            >
              Gửi lại yêu cầu
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => router.push("/tai-khoan/bao-gia")}
              icon={<ShoppingBag size={16} />}
            >
              Tạo báo giá mới
            </ActionButton>
          </>
        );
      case "accepted":
      case "completed":
      default:
        return (
          <>
            <ActionButton
              variant="secondary"
              onClick={handleDownloadPdf}
              icon={<Download size={16} />}
            >
              Tải PDF
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={handleSupport}
              icon={<MessageCircle size={16} />}
            >
              Nhắn hỗ trợ
            </ActionButton>
          </>
        );
    }
  }
}

function ActionButton({
  children,
  variant = "secondary",
  onClick,
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  const variantClass =
    variant === "primary"
      ? "border-transparent bg-[#163F78] text-white hover:bg-[#1A4A8A]"
      : variant === "accent"
        ? "border-transparent bg-[#FFC72C] text-[#1F2937] hover:bg-[#F1BB24]"
        : "border-[#E5EAF2] bg-white text-[#163F78] hover:bg-[#F8FAFC]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
        variantClass,
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function ModalShell({
  title,
  description,
  onClose,
  children,
  footer,
}: {
  title: string;
  description: string;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="relative z-[10000] w-full max-w-xl rounded-[24px] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5EAF2] px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        <div className="flex flex-col-reverse gap-3 border-t border-[#E5EAF2] px-6 py-5 sm:flex-row sm:justify-end">
          {footer}
        </div>
      </div>
    </div>
  );
}

function InfoCell({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={cn(
          "mt-1 font-semibold",
          strong ? "text-[#163F78]" : "text-slate-800",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-base text-slate-600">
      <span>{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
