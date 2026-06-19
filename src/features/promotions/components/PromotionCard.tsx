"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Promotion, PromotionType } from "../types";

const typeMeta: Record<PromotionType, { label: string; className: string }> = {
  code: {
    label: "MÃ GIẢM GIÁ",
    className: "border-slate-300 bg-white text-slate-700",
  },
  automatic: {
    label: "ƯU ĐÃI TỰ ĐỘNG",
    className: "border-slate-300 bg-white text-slate-700",
  },
  gift: {
    label: "QUÀ TẶNG",
    className: "border-slate-300 bg-white text-slate-700",
  },
};

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  const [copied, setCopied] = useState(false);
  const hasCode = promotion.type === "code" && Boolean(promotion.code);
  const autoApply = !hasCode;

  const handleCopy = async () => {
    if (!hasCode || !promotion.code) return;

    try {
      await navigator.clipboard?.writeText(promotion.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="rounded-sm border border-[#E2E8F0] bg-white p-4 transition-colors hover:border-[#163F78]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex rounded-sm border px-2.5 py-1 text-xs font-medium tracking-wide",
            typeMeta[promotion.type].className,
          )}
        >
          {typeMeta[promotion.type].label}
        </span>
        {promotion.expiresAt ? (
          <span className="text-xs font-semibold text-slate-400">
            HSD {promotion.expiresAt}
          </span>
        ) : null}
      </div>

      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-[#0F172A]">
        {promotion.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm font-normal leading-6 text-slate-600">
        {promotion.description}
      </p>

      <div className="mt-4 rounded-sm bg-slate-100 px-3 py-2 text-sm font-normal leading-6 text-slate-700">
        <span className="font-medium text-slate-500">Điều kiện: </span>
        {promotion.condition}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        {hasCode ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-normal text-slate-500">
              {copied ? "Đã sao chép" : "Nhập mã khi thanh toán"}
            </span>
          <button
            type="button"
            onClick={handleCopy}
              className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-sm border border-[#163F78]/30 bg-white px-3 text-sm font-semibold text-[#163F78] transition-colors hover:border-[#163F78] hover:bg-[#F8FAFC]"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
              {promotion.code}
          </button>
          </div>
        ) : null}

        {autoApply ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-normal text-slate-500">
              {promotion.type === "gift"
                ? "Quà tặng được tự động áp dụng"
                : "Không cần nhập mã"}
            </span>
            <span className="inline-flex h-9 w-fit items-center rounded-sm border border-slate-300 bg-white px-3 text-sm font-medium text-[#163F78]">
              Tự áp mã
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
