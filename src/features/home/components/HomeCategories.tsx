"use client";

import { useState } from "react";
import { HOME_CATEGORIES, HOME_INDUSTRIES } from "../data/home-categories";
import { HomeCategoryCard } from "./HomeCategoryCard";
import { HomeSectionHeader } from "./HomeSectionHeader";

export function HomeCategories() {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <section className="bg-white pt-4 pb-4 font-sans">
      <div className="mx-auto max-w-[1600px] px-6 text-left lg:px-12">
        <HomeSectionHeader title="Shop categories" />

        <div className="mb-5 flex flex-wrap items-center gap-4 pb-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("top")}
              className={`rounded-md px-6 py-2.5 text-[15px] font-bold transition-all ${
                activeTab === "top"
                  ? "bg-[#163F78] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Top categories
            </button>
            <div className="mx-2 h-6 w-px bg-slate-300" />
            <button
              onClick={() => setActiveTab("industry")}
              className={`rounded-md px-6 py-2.5 text-[15px] font-bold transition-all ${
                activeTab === "industry"
                  ? "bg-[#163F78] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              By industry
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {HOME_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                className="rounded-md border border-slate-300 px-5 py-2 text-[13px] font-medium text-slate-600 transition-all hover:border-[#163F78] hover:text-[#163F78]"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {HOME_CATEGORIES.map((category) => (
            <HomeCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
