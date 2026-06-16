"use client";

import { Filter } from "lucide-react";

interface CategorySortBarProps {
  productCount: number;
  productCountLabel?: string;
  title: string;
  sortValue: string;
  onSortChange: (value: string) => void;
  onOpenFilters: () => void;
}

export function CategorySortBar({
  productCount,
  productCountLabel,
  title,
  sortValue,
  onSortChange,
  onOpenFilters,
}: CategorySortBarProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h1 className="text-xl font-bold text-[#1a1a1a]">
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
      </div>
    </div>
  );
}
