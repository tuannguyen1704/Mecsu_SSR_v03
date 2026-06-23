"use client";

import { useMemo, useState } from "react";
import {
  HOME_CATEGORIES,
  HOME_CATEGORY_TABS,
  HOME_FEATURED_CATEGORY_IDS,
} from "../data/home-categories";
import { HomeCategoryCard } from "./HomeCategoryCard";
import { HomeSectionHeader } from "./HomeSectionHeader";

export function HomeCategories() {
  const [activeTab, setActiveTab] = useState("featured");
  const visibleCategories = useMemo(() => {
    const visibleCategoryIds =
      activeTab === "featured"
        ? HOME_FEATURED_CATEGORY_IDS
        : HOME_CATEGORY_TABS.find((tab) => tab.id === activeTab)?.categoryIds ??
          HOME_FEATURED_CATEGORY_IDS;

    return visibleCategoryIds
      .map((categoryId) =>
        HOME_CATEGORIES.find((category) => category.id === categoryId),
      )
      .filter((category) => category !== undefined);
  }, [activeTab]);

  return (
    <section className="bg-white pt-4 pb-4 font-sans">
      <div className="mx-auto max-w-[1600px] px-4 text-left sm:px-6 lg:px-12">
        <HomeSectionHeader title="Danh mục sản phẩm" className="mt-5 mb-3" />

        <div
          className="no-scrollbar mb-5 flex snap-x items-center gap-2 overflow-x-auto pb-4 md:flex-wrap md:gap-3"
          role="tablist"
          aria-label="Lọc danh mục sản phẩm"
        >
          <CategoryFilterTab
            active={activeTab === "featured"}
            label="Danh mục nổi bật"
            onClick={() => setActiveTab("featured")}
          />
          {HOME_CATEGORY_TABS.map((tab) => (
            <CategoryFilterTab
              key={tab.id}
              active={activeTab === tab.id}
              label={tab.label}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-6 sm:grid-cols-2 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
          {visibleCategories.map((category) => (
            <HomeCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryFilterTab({
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
      className={`shrink-0 snap-start rounded-md border px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-5 sm:text-sm ${
        active
          ? "border-[#163F78] bg-[#163F78] text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-[#163F78] hover:text-[#163F78]"
      }`}
    >
      {label}
    </button>
  );
}
