"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Star, X } from "lucide-react";

const ratingDistribution = [
  { label: "5 star", percentage: 72 },
  { label: "4 star", percentage: 12 },
  { label: "3 star", percentage: 4 },
  { label: "2 star", percentage: 3 },
  { label: "1 star", percentage: 9 },
];

interface ProductRatingPopoverProps {
  onClose: () => void;
}

export function ProductRatingPopover({ onClose }: ProductRatingPopoverProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false);
      window.requestAnimationFrame(() => setAnimateBars(true));
    }, 320);

    return () => {
      window.clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="absolute top-full left-0 z-40 mt-2 w-[300px] rounded-lg border border-slate-200 bg-white p-4 text-[#222] shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        aria-label="Đóng tóm tắt đánh giá"
      >
        <X size={16} />
      </button>

      {isLoading ? <RatingPopoverSkeleton /> : null}

      {!isLoading ? (
        <>
      <div className="pr-7">
        <div className="flex items-center gap-1 text-[#ed6c2d]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={18} fill="currentColor" stroke="none" />
          ))}
        </div>
        <p className="mt-2 text-[18px] font-bold leading-tight">4.3 out of 5</p>
        <p className="mt-1 text-[13px] text-slate-600">2,965 global ratings</p>
      </div>

      <div className="mt-4 space-y-2.5">
        {ratingDistribution.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[44px_minmax(0,1fr)_34px] items-center gap-2"
          >
            <span className="text-[13px] text-[#007185]">{item.label}</span>
            <div className="h-3 overflow-hidden rounded-sm bg-slate-100">
              <div
                className="h-full rounded-sm bg-[#ed6c2d] transition-[width] duration-500 ease-out"
                style={{ width: animateBars ? `${item.percentage}%` : "0%" }}
              />
            </div>
            <span className="text-right text-[13px] text-slate-600">{item.percentage}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 h-px bg-slate-200" />

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1 text-[14px] font-bold text-[#007185] hover:underline"
      >
        See customer reviews
        <ChevronRight size={15} />
      </button>
        </>
      ) : null}
    </div>
  );
}

function RatingPopoverSkeleton() {
  return (
    <div className="animate-pulse pr-7">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 w-4 rounded-sm bg-slate-200" />
        ))}
      </div>
      <div className="mt-3 h-5 w-32 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-40 rounded bg-slate-100" />

      <div className="mt-5 space-y-2.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[44px_minmax(0,1fr)_34px] items-center gap-2"
          >
            <div className="h-3 rounded bg-slate-100" />
            <div className="h-3 rounded-sm bg-slate-100" />
            <div className="h-3 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
