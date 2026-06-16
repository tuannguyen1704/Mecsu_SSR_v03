"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Printer,
  RotateCcw,
  Star,
  Truck,
  XCircle,
} from "lucide-react";
import type { AccountOrderDetail, AccountOrderItem } from "../types/account";
import { OrderStatusBar } from "./OrderStatusBar";
import { ProductReviewModal, type ProductReviewInput } from "./ProductReviewModal";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
        {value}
      </p>
    </div>
  );
}

interface OrderDetailPageShellProps {
  order: AccountOrderDetail;
}

export function OrderDetailPageShell({ order }: OrderDetailPageShellProps) {
  const [reviewedProductIds, setReviewedProductIds] = useState<Set<string>>(
    new Set()
  );
  const [reviewModalProduct, setReviewModalProduct] =
    useState<AccountOrderItem | null>(null);

  const handleOpenReview = (item: AccountOrderItem) => {
    setReviewModalProduct(item);
  };

  const handleCloseReview = () => {
    setReviewModalProduct(null);
  };

  const handleSubmitReview = (_review: ProductReviewInput) => {
    if (reviewModalProduct) {
      setReviewedProductIds((prev) => new Set(prev).add(reviewModalProduct.id));
    }
    setReviewModalProduct(null);
  };

  return (
    <div className="space-y-4">
      <Link
        href="/tai-khoan/don-hang"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-[#163F78]"
      >
        <ArrowLeft size={16} className="text-slate-400" />
        Quay lại đơn hàng
      </Link>

      {/* Page Header */}
      <section className="rounded-2xl border border-[#E5EAF2] bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
              Mã đơn hàng
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              {order.orderCode}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  order.status === "completed"
                    ? "bg-green-50 text-green-700"
                    : order.status === "shipping"
                      ? "bg-blue-50 text-blue-700"
                      : order.status === "processing"
                        ? "bg-amber-50 text-amber-700"
                        : order.status === "cancelled"
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-600"
                }`}
              >
                {order.status === "completed"
                  ? "Hoàn thành"
                  : order.status === "shipping"
                    ? "Đang giao"
                    : order.status === "processing"
                      ? "Đang xử lý"
                      : order.status === "cancelled"
                        ? "Đã hủy"
                        : "Chờ xác nhận"}
              </span>
              <span className="text-sm text-slate-500">
                Ngày đặt hàng: {order.orderDate}
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3 lg:text-right">
            <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
              Tổng thanh toán
            </p>
            <p className="mt-1 text-2xl font-bold text-[#163F78]">
              {formatCurrency(order.grandTotal)}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Order Status Timeline with animation */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-6">
            <OrderStatusBar order={order} size="md" />
          </section>

          {/* Products in Order */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Sản phẩm trong đơn hàng
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => {
                const unitPrice = item.unitPrice ?? 0;
                const isReviewed = reviewedProductIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className="grid gap-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 sm:grid-cols-[72px_minmax(0,1fr)] lg:grid-cols-[72px_minmax(0,1fr)_180px]"
                  >
                    <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-slate-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-6 text-[#163F78]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {item.sku}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                        <span className="text-slate-500">
                          Số lượng:{" "}
                          <strong className="text-slate-800">
                            {item.quantity}
                          </strong>
                        </span>
                        <span className="text-slate-500">
                          Đơn giá:{" "}
                          <strong className="text-slate-800">
                            {formatCurrency(unitPrice)}
                          </strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
                      <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
                        Thành tiền
                      </p>
                      <p className="text-sm font-bold text-[#163F78]">
                        {formatCurrency(unitPrice * item.quantity)}
                      </p>
                      {isReviewed ? (
                        <div className="mt-2 flex flex-col items-start gap-1 lg:items-end">
                          <span className="flex items-center gap-1.5 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                            <CheckCircle2 size={12} />
                            Đã đánh giá
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenReview(item)}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8E1] text-[#B8860B] text-xs font-semibold rounded-lg border border-[#F5D97A] hover:bg-[#FFF3C4] transition-colors"
                        >
                          <Star size={12} />
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Shipping Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Truck size={20} className="text-[#163F78]" />
              <h2 className="text-lg font-bold text-slate-900">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    Địa chỉ giao hàng
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {order.shippingAddress || "Chưa có địa chỉ giao hàng"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <MapPin size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Người nhận</p>
                  <p className="text-sm font-medium text-slate-800">
                    {order.customerName || "Chưa có thông tin"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Phone size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Số điện thoại</p>
                  <p className="text-sm font-medium text-slate-800">
                    {order.customerPhone || "Chưa có số điện thoại"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Truck size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    Phương thức vận chuyển
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {order.shippingMethod}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-6">
            <div className="mb-4 flex items-center gap-3">
              <CreditCard size={20} className="text-[#163F78]" />
              <h2 className="text-lg font-bold text-slate-900">
                Thông tin thanh toán
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <CreditCard size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    Phương thức thanh toán
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${order.paymentStatus === "Đã thanh toán" ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500"}`}
                >
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">
                    Trạng thái thanh toán
                  </p>
                  <p
                    className={`text-sm font-medium ${order.paymentStatus === "Đã thanh toán" ? "text-green-700" : "text-slate-800"}`}
                  >
                    {order.paymentStatus}
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex gap-3 rounded-xl border border-[#E5EAF2] bg-slate-50 p-4">
                  <FileText size={20} className="mt-0.5 shrink-0 text-slate-500" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">Mã giao dịch</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-slate-800">
                        {order.transactionCode ?? "Chưa phát sinh giao dịch"}
                      </p>
                      <button
                        type="button"
                        className="rounded p-1 transition-colors hover:bg-slate-200"
                      >
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="text-slate-400"
                        >
                          <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Summary Panel */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sticky top-28">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Tóm tắt đơn hàng
            </h2>

            {/* Order Info */}
            <div className="space-y-3 pb-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Mã đơn hàng</span>
                <span className="text-sm font-semibold text-[#163F78]">
                  {order.orderCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Ngày đặt</span>
                <span className="text-sm font-medium text-slate-700">
                  {order.orderDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Trạng thái</span>
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    order.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : order.status === "shipping"
                        ? "bg-blue-50 text-blue-700"
                        : order.status === "processing"
                          ? "bg-amber-50 text-amber-700"
                          : order.status === "cancelled"
                            ? "bg-red-50 text-red-600"
                            : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {order.status === "completed"
                    ? "Hoàn thành"
                    : order.status === "shipping"
                      ? "Đang giao"
                      : order.status === "processing"
                        ? "Đang xử lý"
                        : order.status === "cancelled"
                          ? "Đã hủy"
                          : "Chờ xác nhận"}
                </span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-3 py-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Tạm tính</span>
                <span className="text-sm font-medium text-slate-700">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Phí vận chuyển</span>
                <span className="text-sm font-medium text-slate-700">
                  {order.shippingFee === 0 ? "Miễn phí" : formatCurrency(order.shippingFee)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Giảm giá</span>
                <span className="text-sm font-medium text-green-600">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">VAT</span>
                <span className="text-sm font-medium text-slate-700">
                  {formatCurrency(order.vat)}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-4">
              <span className="text-base font-bold text-slate-900">
                Tổng thanh toán
              </span>
              <span className="text-xl font-bold text-[#163F78]">
                {formatCurrency(order.grandTotal)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#EABF3B] px-4 text-sm font-semibold text-[#1a1a1a] transition-colors hover:bg-[#D9AF2F]"
              >
                <RotateCcw size={16} />
                Mua lại
              </button>
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <XCircle size={16} />
                Yêu cầu đổi trả
              </button>
              <button
                type="button"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <Phone size={16} />
                Liên hệ hỗ trợ
              </button>

              {/* Support contact buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#163F78] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1e4a8a]"
                >
                  <Phone size={16} />
                  Quay số
                </button>
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#163F78] transition-colors hover:bg-slate-50"
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.48 3.53 1.3 5.02L2.5 22l5.13-1.34C9.76 21.66 10.86 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReviewModal
        isOpen={!!reviewModalProduct}
        onClose={handleCloseReview}
        product={reviewModalProduct}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
