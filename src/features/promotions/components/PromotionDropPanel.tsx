"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { mockPromotions, promotionCategories } from "../data/mockPromotions";
import { PromotionCard } from "./PromotionCard";
import { PromotionFilterChips } from "./PromotionFilterChips";

interface PromotionDropPanelProps {
  open: boolean;
  onClose: () => void;
}

export function PromotionDropPanel({ open, onClose }: PromotionDropPanelProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const visiblePromotions = useMemo(() => {
    if (activeCategory === "Tất cả") return mockPromotions;
    return mockPromotions.filter(
      (promotion) => promotion.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Đóng bảng ưu đãi"
            className="fixed inset-x-0 bottom-0 top-20 z-[240] bg-slate-950/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.div
            className="pointer-events-none fixed inset-x-0 top-20 z-[260] px-3 sm:px-4 lg:px-8"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-auto mx-auto mt-3 max-h-[calc(100vh-5rem-24px)] max-w-[1180px] overflow-hidden rounded-lg border border-[#E2E8F0] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
              <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] p-4 sm:p-5">
                <div>
                  <h2 className="text-xl font-semibold text-[#163F78]">
                    Ưu đãi doanh nghiệp
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    Khám phá các mã giảm giá và chương trình ưu đãi đang áp dụng
                    cho đơn hàng đủ điều kiện.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                  aria-label="Đóng ưu đãi"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[calc(100vh-5rem-150px)] overflow-y-auto p-4 sm:p-5">
                <div>
                  <PromotionFilterChips
                    categories={promotionCategories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                  />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {visiblePromotions.map((promotion) => (
                    <PromotionCard
                      key={promotion.id}
                      promotion={promotion}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
