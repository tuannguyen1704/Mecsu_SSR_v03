"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, FileText, Mail, Phone, X } from "lucide-react";
import { motion } from "motion/react";
import type { Quotation } from "../types/quotation";
import { QuotationStatusBadge } from "./QuotationStatusBadge";

interface QuotationDetailModalProps {
  quotation: Quotation | null;
  onClose: () => void;
}

function formatPrice(price: number) {
  if (price <= 0) return "Đang cập nhật";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function QuotationDetailModal({
  quotation,
  onClose,
}: QuotationDetailModalProps) {
  useEffect(() => {
    if (!quotation) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [quotation, onClose]);

  if (!quotation || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        aria-label="Đóng chi tiết báo giá"
        className="absolute inset-0 bg-slate-950/60"
        onClick={onClose}
      />
      <div className="relative z-10 flex min-h-dvh items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="max-h-[calc(100dvh-32px)] w-full max-w-[760px] overflow-hidden rounded-[22px] border border-[#E5EAF2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.24)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#E5EAF2] px-6 py-5">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[#163F78]">
                  {quotation.code}
                </span>
                <QuotationStatusBadge status={quotation.status} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {quotation.requestName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Chi tiết yêu cầu báo giá và danh sách vật tư.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] text-slate-500 transition-colors hover:bg-[#EEF3FA]"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[calc(100dvh-160px)] overflow-y-auto px-6 py-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={13} />
                  Ngày tạo
                </p>
                <p className="font-semibold text-slate-900">{quotation.requestDate}</p>
              </div>
              <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
                <p className="mb-1 text-xs text-slate-500">Ngày phản hồi</p>
                <p className="font-semibold text-slate-900">
                  {quotation.quotationDate || "Đang cập nhật"}
                </p>
              </div>
              <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
                <p className="mb-1 text-xs text-slate-500">Tổng giá trị</p>
                <p className="font-semibold text-[#163F78]">
                  {formatPrice(quotation.total || quotation.estimatedValue)}
                </p>
              </div>
            </div>

            <section className="mt-5 rounded-2xl border border-[#E5EAF2] bg-white">
              <div className="border-b border-[#E5EAF2] px-4 py-3">
                <h3 className="font-bold text-slate-900">Sản phẩm trong báo giá</h3>
              </div>
              <div className="divide-y divide-[#EEF2F7]">
                {quotation.items.map((item) => (
                  <div key={item.id} className="flex gap-3 px-4 py-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E5EAF2] bg-[#F8FAFD]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-5 text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {item.sku} • SL: {item.quantity} {item.unit}
                      </p>
                      {item.notes ? (
                        <p className="mt-1 text-xs text-slate-500">{item.notes}</p>
                      ) : null}
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs text-slate-400">Thành tiền</p>
                      <p className="font-semibold text-slate-900">
                        {formatPrice(item.lineTotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
                <h3 className="mb-3 font-bold text-slate-900">Nhân viên phụ trách</h3>
                <p className="font-semibold text-[#163F78]">{quotation.salesRep.name}</p>
                <p className="text-sm text-slate-500">{quotation.salesRep.role}</p>
                <div className="mt-3 space-y-1 text-sm text-slate-500">
                  {quotation.salesRep.phone ? (
                    <p className="flex items-center gap-2">
                      <Phone size={14} />
                      {quotation.salesRep.phone}
                    </p>
                  ) : null}
                  {quotation.salesRep.email ? (
                    <p className="flex items-center gap-2">
                      <Mail size={14} />
                      {quotation.salesRep.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4">
                <h3 className="mb-3 font-bold text-slate-900">Ghi chú & tệp đính kèm</h3>
                <p className="text-sm leading-6 text-slate-500">
                  {quotation.generalNotes || "Không có ghi chú bổ sung."}
                </p>
                {quotation.attachmentNames?.length ? (
                  <div className="mt-3 space-y-2">
                    {quotation.attachmentNames.map((fileName) => (
                      <div
                        key={fileName}
                        className="flex items-center gap-2 rounded-xl border border-[#E5EAF2] bg-white px-3 py-2 text-sm text-slate-600"
                      >
                        <FileText size={14} className="text-[#163F78]" />
                        {fileName}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}
