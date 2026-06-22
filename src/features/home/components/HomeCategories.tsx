"use client";

import { useState } from "react";
import { HOME_CATEGORIES, HOME_INDUSTRIES } from "../data/home-categories";
import { HomeCategoryCard } from "./HomeCategoryCard";
import { HomeSectionHeader } from "./HomeSectionHeader";

export function HomeCategories() {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <section className="bg-white pt-4 pb-4 font-sans">
      <div className="mx-auto max-w-[1600px] px-4 text-left sm:px-6 lg:px-12">
        <HomeSectionHeader title="Danh mục sản phẩm" className="mt-5 mb-3" />

        <div className="no-scrollbar mb-5 flex items-center gap-3 overflow-x-auto pb-4 md:flex-wrap md:gap-4">
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setActiveTab("top")}
              className={`shrink-0 rounded-md px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all sm:px-6 sm:text-[15px] ${
                activeTab === "top"
                  ? "bg-[#163F78] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Danh mục nổi bật
            </button>
            <div className="mx-2 h-6 w-px bg-slate-300" />
            <span className="shrink-0 px-2 py-2.5 text-sm font-bold whitespace-nowrap text-slate-700 sm:px-3 sm:text-[15px]">
              Theo ngành hàng
            </span>
          </div>

          <div className="flex shrink-0 gap-2 md:flex-wrap">
            {HOME_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                className="shrink-0 rounded-md border border-slate-300 px-4 py-2 text-[13px] font-medium whitespace-nowrap text-slate-600 transition-all hover:border-[#163F78] hover:text-[#163F78] sm:px-5"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
          {HOME_CATEGORIES.map((category) => (
            <HomeCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
