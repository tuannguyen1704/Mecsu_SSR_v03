"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown, Lock, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import type { Product } from "../../types/product";

interface CustomerReviewsProps {
  product: Product;
}

const ratingDistribution = [
  { label: "5 sao", percentage: 50 },
  { label: "4 sao", percentage: 50 },
  { label: "3 sao", percentage: 0 },
  { label: "2 sao", percentage: 0 },
  { label: "1 sao", percentage: 0 },
];

const reviews = [
  {
    id: "review-anh-minh",
    initials: "AM",
    name: "Anh Minh",
    rating: 5,
    title: "Chất lượng tốt, đúng thông số",
    date: "10 tháng 5, 2026",
    specs: "Size: 36mm | Steel 65Mn",
    body:
      "Sản phẩm đúng thông số, bề mặt hoàn thiện tốt và đóng gói cẩn thận. Đội kỹ thuật dùng cho cụm lắp ráp cơ khí chính xác, độ đàn hồi ổn định sau khi thử nghiệm.",
    helpful: 24,
    notHelpful: 2,
  },
  {
    id: "review-minh-duc",
    initials: "MD",
    name: "Minh Duc",
    rating: 4,
    title: "Đúng tốt cho cơ khí chính xác",
    date: "02 tháng 5, 2026",
    specs: "Size: 36mm | Steel 65Mn",
    body:
      "Hàng giao đúng mã, đúng kích thước và số lượng. Phù hợp cho bảo trì máy trong xưởng, thông tin SKU rõ nên dễ đối chiếu với bản vẽ kỹ thuật.",
    helpful: 18,
    notHelpful: 1,
  },
];

export function CustomerReviews({ product }: CustomerReviewsProps) {
  const imageSeeds = Array.from({ length: 5 }).map((_, index) =>
    getSeededPlaceholder(`${product.id}-review-photo-${index}`),
  );

  return (
    <section id="customer-reviews" className="border-t border-slate-200 bg-white py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(280px,0.34fr)_minmax(0,0.66fr)]">
        <div>
          <h2 className="text-[26px] font-bold leading-tight text-[#111827]">
            Đánh giá khách hàng
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <StarRow rating={5} />
            <span className="text-[18px] font-bold text-[#111827]">4.5 trên 5</span>
          </div>
          <p className="mt-1 text-[14px] text-slate-600">4 đánh giá</p>

          <div className="mt-6 space-y-3">
            {ratingDistribution.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[48px_minmax(0,1fr)_42px] items-center gap-3"
              >
                <span className="text-[13px] font-medium text-[#007185]">{item.label}</span>
                <div className="h-4 overflow-hidden rounded-[2px] bg-slate-100">
                  <div
                    className="h-full rounded-[2px] bg-[#ed6c2d]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-right text-[13px] text-slate-600">{item.percentage}%</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1 text-left text-[14px] font-medium text-[#007185] hover:underline"
          >
            Cách thức đánh giá và xếp hạng hoạt động
            <ChevronDown size={16} strokeWidth={2.2} />
          </button>

          <div className="my-6 h-px bg-slate-200" />

          <div>
            <h3 className="text-[18px] font-bold text-[#111827]">Đánh giá sản phẩm này</h3>
            <p className="mt-2 text-[14px] leading-6 text-slate-600">
              Chia sẻ trải nghiệm của bạn với khách hàng khác
            </p>
            <button
              type="button"
              disabled
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-slate-300 bg-slate-50 px-4 py-2.5 text-[14px] font-bold text-slate-500 opacity-80 sm:w-auto"
            >
              <Lock size={16} />
              Viết đánh giá sản phẩm
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[20px] font-bold text-[#111827]">Hình ảnh từ đánh giá</h3>
            <button
              type="button"
              className="shrink-0 text-[14px] font-semibold text-[#007185] hover:underline"
            >
              Xem tất cả ảnh
            </button>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
            {imageSeeds.map((image, index) => (
              <div
                key={`${product.id}-customer-review-photo-${index}`}
                className="h-[98px] w-[98px] shrink-0 overflow-hidden rounded-sm border border-slate-200 bg-white sm:h-auto sm:w-auto sm:aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`Ảnh đánh giá ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="my-7 h-px bg-slate-200" />

          <h3 className="text-[20px] font-bold text-[#111827]">Đánh giá hàng đầu</h3>

          <div className="mt-5 divide-y divide-slate-200">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number];
}) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  return (
    <article className="py-6 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8edf5] text-[14px] font-bold text-[#173b6d]">
          {review.initials}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-bold text-[#111827]">{review.name}</h4>
          <div className="mt-2 flex items-center gap-2">
            <StarRow rating={review.rating} compact />
          </div>

          <h5 className="mt-2 text-[15px] font-bold text-[#111827]">{review.title}</h5>

          <p className="mt-1 text-[13px] leading-5 text-slate-600">
            Đánh giá vào {review.date} | {review.specs} |{" "}
            <span className="font-bold text-[#c45500]">Đã mua hàng</span>
          </p>

          <p className="mt-3 text-[14px] leading-6 text-[#334155]">{review.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <HelpfulButton active={vote === "up"} onClick={() => setVote("up")}>
              <ThumbsUp size={15} />
              Hữu ích ({review.helpful})
            </HelpfulButton>
            <HelpfulButton active={vote === "down"} onClick={() => setVote("down")}>
              <ThumbsDown size={15} />
              Không hữu ích ({review.notHelpful})
            </HelpfulButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function HelpfulButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "border-[#007185] bg-[#e6f4f7] text-[#007185]"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function StarRow({ rating, compact = false }: { rating: number; compact?: boolean }) {
  return (
    <div className="flex items-center text-[#ed6c2d]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={compact ? 16 : 20}
          fill="currentColor"
          stroke="none"
          className={index < rating ? "" : "opacity-30"}
        />
      ))}
    </div>
  );
}
