"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { mockStockAlerts } from "./data/mockStockAlerts";
import { StockAlertCard } from "./components/StockAlertCard";
import { StockAlertEmptyState } from "./components/StockAlertEmptyState";
import { StockAlertFilterBar } from "./components/StockAlertFilterBar";
import { StockAlertSummary } from "./components/StockAlertSummary";
import type {
  StockAlertSortOption,
  StockAlertStatusFilter,
} from "./types";

function parseVietnameseDate(dateValue: string) {
  const [day, month, year] = dateValue.split("/").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

export function AccountStockAlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StockAlertStatusFilter>("all");
  const [sortBy, setSortBy] = useState<StockAlertSortOption>("newest");

  const filteredAlerts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = mockStockAlerts.filter((alert) => {
      const matchesQuery =
        !query ||
        alert.productName.toLowerCase().includes(query) ||
        alert.sku.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || alert.status === statusFilter;

      return matchesQuery && matchesStatus;
    });

    return result.sort((left, right) => {
      if (sortBy === "quantity-desc") {
        return right.requestedQuantity - left.requestedQuantity;
      }

      const leftDate = parseVietnameseDate(left.createdAt);
      const rightDate = parseVietnameseDate(right.createdAt);

      return sortBy === "newest" ? rightDate - leftDate : leftDate - rightDate;
    });
  }, [searchQuery, sortBy, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Nhắc hàng
          </h1>
          <p className="mt-1 max-w-2xl text-slate-500">
            Theo dõi các sản phẩm bạn đã đăng ký nhận thông báo khi có hàng trở
            lại.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1A4A8A] sm:w-auto"
        >
          <ShoppingBag size={18} />
          Tiếp tục mua hàng
        </Link>
      </div>

      <StockAlertSummary alerts={mockStockAlerts} />

      <StockAlertFilterBar
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
      />

      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-2">
          {filteredAlerts.map((alert) => (
            <StockAlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <StockAlertEmptyState />
      )}
    </div>
  );
}
