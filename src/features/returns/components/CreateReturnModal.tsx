"use client";

import { useState } from "react";
import { FileText, RotateCcw, Send, X } from "lucide-react";

interface CreateReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateReturnModal({ isOpen, onClose }: CreateReturnModalProps) {
  const [orderCode, setOrderCode] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[540] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Đóng tạo yêu cầu đổi trả"
        className="absolute inset-0 bg-slate-950/60"
        onClick={onClose}
      />

      <section className="relative max-h-[calc(100vh-48px)] w-[calc(100vw-32px)] max-w-[640px] overflow-hidden rounded-[22px] border border-[#E5EAF2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="max-h-[calc(100vh-48px)] overflow-y-auto">
          <header className="flex items-start justify-between gap-4 px-7 pt-6 pb-5">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#173E75]">
                Tạo yêu cầu đổi trả
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Gửi thông tin đơn hàng và lý do đổi trả để MECSU hỗ trợ kiểm tra.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] transition-colors hover:bg-[#EEF3FA]"
              aria-label="Đóng modal"
            >
              <X size={18} className="text-slate-500" />
            </button>
          </header>

          <div className="mx-7 mb-5 rounded-[14px] border border-[#D9E5F6] bg-[#F8FAFD] p-4">
            <div className="flex items-start gap-3">
              <RotateCcw size={20} className="mt-0.5 shrink-0 text-[#4F7FC3]" />
              <div>
                <p className="text-sm font-semibold text-[#173E75]">
                  Yêu cầu đổi trả UI-only
                </p>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">
                  Phase 5E chưa lưu dữ liệu. Form này chỉ dùng để kiểm tra trải nghiệm modal.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-7 pb-6">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Mã đơn hàng
              </span>
              <input
                value={orderCode}
                onChange={(event) => setOrderCode(event.target.value)}
                placeholder="VD: ORD-2026-000128"
                className="h-11 w-full rounded-xl border border-[#DDE5F0] bg-white px-3.5 text-sm text-[#173E75] outline-none transition-all placeholder:text-slate-400 focus:border-[#4F7FC3] focus:ring-4 focus:ring-[rgba(79,127,195,0.12)]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Lý do đổi trả
              </span>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#DDE5F0] bg-white px-3.5 text-sm text-[#173E75] outline-none transition-all focus:border-[#4F7FC3] focus:ring-4 focus:ring-[rgba(79,127,195,0.12)]"
              >
                <option value="">Chọn lý do</option>
                <option>Sản phẩm không đúng mô tả</option>
                <option>Sản phẩm lỗi hoặc hư hỏng</option>
                <option>Giao thiếu sản phẩm</option>
                <option>Cần đổi quy cách/kích thước</option>
                <option>Lý do khác</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                Mô tả thêm
              </span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Mô tả tình trạng sản phẩm, số lượng cần đổi/trả hoặc yêu cầu hỗ trợ..."
                className="min-h-[120px] w-full resize-none rounded-xl border border-[#DDE5F0] bg-white px-3.5 py-3 text-sm text-[#173E75] outline-none transition-all placeholder:text-slate-400 focus:border-[#4F7FC3] focus:ring-4 focus:ring-[rgba(79,127,195,0.12)]"
              />
            </label>
          </div>

          <footer className="sticky bottom-0 border-t border-[#E5EAF2] bg-white px-7 py-3.5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs leading-5 text-slate-500">
                <FileText size={14} />
                Không có dữ liệu nào được lưu trong phase này.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-xl border border-[#DDE5F0] bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-[#F6F8FC]"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 items-center gap-2 rounded-xl border border-[#E8B93A] bg-[#F4C84A] px-5 text-sm font-bold text-[#173E75] transition-colors hover:bg-[#E8B93A]"
                >
                  <Send size={16} />
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
