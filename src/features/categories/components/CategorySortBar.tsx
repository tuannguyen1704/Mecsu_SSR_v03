"use client";

import { memo } from "react";
import { Filter, Grid2X2, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface CategorySortBarProps {
  productCount: number;
  productCountLabel?: string;
  title: string;
  sortValue: string;
  viewMode?: ViewMode;
  onSortChange: (value: string) => void;
  onViewModeChange?: (value: ViewMode) => void;
  onOpenFilters: () => void;
}

export const CategorySortBar = memo(function CategorySortBar({
  productCount,
  productCountLabel,
  title,
  sortValue,
  viewMode,
  onSortChange,
  onViewModeChange,
  onOpenFilters,
}: CategorySortBarProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 className="text-xl font-semibold text-[#1a1a1a]">
        {title}
        <span className="ml-1 text-sm font-normal text-slate-500">
          ({productCountLabel || `${productCount}+ sản phẩm`})
        </span>
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-sm border border-slate-300 bg-white px-4 py-2 text-[12px] font-black tracking-[0.18em] text-[#1a1a1a] uppercase lg:hidden"
        >
          <Filter size={15} />
          Bộ lọc
        </button>

        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 outline-none transition-colors focus:border-blue-600"
          aria-label="Sắp xếp sản phẩm"
        >
          <option value="featured">Sắp xếp nổi bật</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="newest">Mới nhất</option>
          <option value="best-selling">Bán chạy</option>
        </select>

        {viewMode && onViewModeChange ? (
          <div className="flex overflow-hidden rounded-sm border border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                viewMode === "grid"
                  ? "bg-[#163F78] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              aria-label="Hiển thị dạng lưới"
              aria-pressed={viewMode === "grid"}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={`flex h-10 w-10 items-center justify-center border-l border-slate-300 transition-colors ${
                viewMode === "list"
                  ? "bg-[#163F78] text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              aria-label="Hiển thị dạng danh sách"
              aria-pressed={viewMode === "list"}
            >
              <List size={17} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
});
