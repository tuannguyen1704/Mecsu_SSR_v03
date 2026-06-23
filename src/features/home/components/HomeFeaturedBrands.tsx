"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  FEATURED_BRAND_GROUPS,
  getFeaturedBrands,
  type FeaturedBrand,
  type FeaturedBrandGroup,
} from "../data/featured-brands";

function BrandPrefix({ type }: { type: FeaturedBrand["prefix"] }) {
  if (type === "bosch") {
    return (
      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-500">
        <div className="h-5 w-4 rounded-sm border-x-2 border-slate-500" />
      </div>
    );
  }

  if (type === "sata") {
    return (
      <div className="mr-2 flex h-8 w-8 flex-col items-center justify-center text-[#296a4b]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 3.5L5.93 9v6L12 18.5l6.07-3.5v-6L12 5.5zM12 8l4.33 2.5v5L12 18l-4.33-2.5v-5L12 8z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return null;
}

function BrandSuffix({ type }: { type: FeaturedBrand["suffix"] }) {
  if (type !== "cdc") return null;

  return (
    <div className="mt-1 ml-2 flex flex-col justify-center text-[8px] leading-none font-bold tracking-normal text-black not-italic sm:text-[10px]">
      <span>씨디씨뉴매틱</span>
      <span>PNEUMATICS CORP.</span>
    </div>
  );
}

export function HomeFeaturedBrands() {
  const [activeGroup, setActiveGroup] =
    useState<FeaturedBrandGroup>("trusted");
  const visibleBrands = getFeaturedBrands(activeGroup);

  return (
    <section className="mt-5 bg-white pt-2 pb-10">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[32px]">
            Thương hiệu đáng tin cậy
          </h2>
          <Link
            href={`/thuong-hieu?group=${activeGroup}`}
            className="text-[15px] font-medium text-[#326295] hover:underline"
          >
            Xem thêm
          </Link>
        </div>

        <div
          className="no-scrollbar mb-8 flex snap-x items-center gap-3 overflow-x-auto pb-2 sm:mb-12 md:flex-wrap md:overflow-visible md:pb-0"
          role="tablist"
          aria-label="Lọc thương hiệu theo lĩnh vực"
        >
          <BrandFilterButton
            active={activeGroup === "trusted"}
            label="Thương hiệu uy tín"
            onClick={() => setActiveGroup("trusted")}
          />

          <div className="mx-2 h-6 w-px shrink-0 bg-slate-300" />

          <span className="mr-2 shrink-0 text-[16px] font-bold whitespace-nowrap text-slate-800">
            Theo lĩnh vực
          </span>

          {FEATURED_BRAND_GROUPS.map((group) => (
            <BrandFilterButton
              key={group.id}
              active={activeGroup === group.id}
              label={group.label}
              onClick={() => setActiveGroup(group.id)}
            />
          ))}
        </div>

        <div className="min-h-[356px] sm:min-h-[280px] lg:min-h-[192px] xl:min-h-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid grid-cols-2 items-center gap-3 opacity-95 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-8 xl:grid-cols-8"
            >
              {visibleBrands.map((brand) => (
                <div
                  key={brand.id}
                  className={`flex min-h-20 min-w-0 select-none items-center justify-center rounded-xl p-3 text-center uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-4 ${brand.weightClass} ${brand.colorClass}`}
                >
                  <BrandPrefix type={brand.prefix} />
                  {brand.name}
                  <BrandSuffix type={brand.suffix} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function BrandFilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`shrink-0 snap-start rounded-md border px-5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-200 ${
        active
          ? "border-[#163F78] bg-[#163F78] text-white"
          : "border-slate-200 bg-white text-slate-700 hover:border-[#264553] hover:text-[#264553]"
      }`}
    >
      {label}
    </button>
  );
}
