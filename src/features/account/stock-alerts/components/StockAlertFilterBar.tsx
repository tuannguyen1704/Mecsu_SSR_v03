"use client";

import { ChevronDown, Search } from "lucide-react";
import type {
  StockAlertSortOption,
  StockAlertStatusFilter,
} from "../types";

const statusOptions: { value: StockAlertStatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "waiting", label: "Đang chờ hàng" },
  { value: "available", label: "Đã có hàng" },
  { value: "cancelled", label: "Đã hủy" },
];

const sortOptions: { value: StockAlertSortOption; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "quantity-desc", label: "Số lượng cao nhất" },
];

interface StockAlertFilterBarProps {
  searchQuery: string;
  statusFilter: StockAlertStatusFilter;
  sortBy: StockAlertSortOption;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StockAlertStatusFilter) => void;
  onSortChange: (value: StockAlertSortOption) => void;
}

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-xl border border-[#E2E8F0] bg-white px-4 pr-10 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F8FAFC] focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20";

export function StockAlertFilterBar({
  searchQuery,
  statusFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: StockAlertFilterBarProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3 lg:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_13rem_13rem]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Tìm theo tên sản phẩm, SKU..."
            className="h-11 w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 transition-colors placeholder:text-slate-400 hover:bg-[#F8FAFC] focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20"
          />
        </div>

        <SelectWrap>
          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusChange(event.target.value as StockAlertStatusFilter)
            }
            className={selectClass}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </SelectWrap>

        <SelectWrap>
          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as StockAlertSortOption)
            }
            className={selectClass}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </SelectWrap>
      </div>
    </div>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}
