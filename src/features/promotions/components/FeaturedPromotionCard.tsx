"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import type { Promotion } from "../types";

export function FeaturedPromotionCard({ promotion }: { promotion: Promotion }) {
  const [copied, setCopied] = useState(false);
  const hasCode = promotion.type === "code" && Boolean(promotion.code);
  const ctaLabel = promotion.type === "gift" ? "Xem sản phẩm" : "Mua ngay";
  const offerText =
    promotion.type === "gift"
      ? "Quà tặng tự động khi đơn hàng đủ điều kiện."
      : "Tự áp mã khi đơn hàng đủ điều kiện.";
  const ruleText = hasCode
    ? `Kết thúc ngày ${promotion.expiresAt}. Điều kiện áp dụng.`
    : `Kết thúc ngày ${promotion.expiresAt}. Ưu đãi tự áp dụng khi đủ điều kiện.`;

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
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-[#E2E8F0] bg-white transition-colors hover:border-[#163F78]">
      <div className="relative h-[220px] bg-slate-100">
        <Image
          src={promotion.imageUrl || "/placeholder.svg"}
          alt={promotion.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {promotion.category}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold leading-tight text-[#0F172A] lg:text-2xl">
          {promotion.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm font-normal leading-6 text-slate-600">
          {promotion.description}
        </p>

        <div className="mt-4 text-sm leading-6 text-slate-700">
          {hasCode && promotion.code ? (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex flex-wrap items-center gap-2 text-left"
              aria-label={`Sao chép mã ${promotion.code}`}
            >
              <span className="font-normal text-slate-700">
                Nhập mã khi thanh toán:
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#163F78]/25 bg-white px-2.5 py-1 font-semibold text-[#163F78] transition-colors hover:border-[#163F78] hover:bg-[#F8FAFC]">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Đã sao chép" : promotion.code}
              </span>
            </button>
          ) : (
            <p className="font-normal text-slate-700">{offerText}</p>
          )}
        </div>

        <div className="mt-5 flex flex-1 flex-col justify-end">
          <Link
            href={promotion.href || "/"}
            className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-[#163F78] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1A4A8A] sm:w-auto"
          >
            {ctaLabel}
          </Link>
          <p className="mt-4 text-sm font-normal leading-6 text-slate-600">
            {ruleText}
          </p>
          <p className="mt-1 text-sm font-normal leading-6 text-slate-500">
            {promotion.condition}
          </p>
        </div>
      </div>
    </article>
  );
}
