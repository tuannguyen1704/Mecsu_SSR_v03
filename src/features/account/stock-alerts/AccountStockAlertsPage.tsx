"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

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

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    resetToFirstPage();
  };

  const handleStatusChange = (value: StockAlertStatusFilter) => {
    setStatusFilter(value);
    resetToFirstPage();
  };

  const handleSortChange = (value: StockAlertSortOption) => {
    setSortBy(value);
    resetToFirstPage();
  };

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const startItem = filteredAlerts.length > 0
    ? (currentPage - 1) * itemsPerPage + 1
    : 0;
  const endItem = Math.min(currentPage * itemsPerPage, filteredAlerts.length);

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

      <div className="rounded-sm border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <StockAlertFilterBar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
        />
      </div>

      {filteredAlerts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 min-[920px]:grid-cols-2">
            {paginatedAlerts.map((alert) => (
              <StockAlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="rounded-sm border border-[#E5EAF2] bg-white px-4 py-3 lg:px-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-slate-500">
                  Hiển thị {startItem} - {endItem} của{" "}
                  {filteredAlerts.length} nhắc hàng
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={20} className="text-slate-600" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "border-[#163F78] bg-[#163F78] text-white"
                            : "border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight size={20} className="text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <StockAlertEmptyState />
      )}
    </div>
  );
}
