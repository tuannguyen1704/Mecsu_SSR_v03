"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  ListFilter,
  Search,
} from "lucide-react";
import {
  DateRangePicker,
  type DateRangeValue,
} from "@/components/shared/DateRangePicker";
import { cn } from "@/lib/utils";
import type { AccountOrder, AccountOrderStatus } from "../types/account";
import { OrderCard } from "./OrderCard";
import { BestSellersSlider } from "./BestSellersSlider";
import { OrderReviewModal } from "./OrderReviewModal";
import { accountOrderStatusFilters, mockBestSellers } from "../data/account-orders";

type OrderFilter = "all" | AccountOrderStatus;

interface OrdersListClientProps {
  orders: AccountOrder[];
}

function parseVietnameseDate(dateValue: string) {
  const vietnameseDateMatch = dateValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!vietnameseDateMatch) {
    const parsedTime = new Date(dateValue).getTime();
    return Number.isNaN(parsedTime) ? 0 : parsedTime;
  }

  const [, dayValue, monthValue, yearValue] = vietnameseDateMatch;
  const day = Number(dayValue);
  const month = Number(monthValue);
  const year = Number(yearValue);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return 0;
  }

  return parsedDate.getTime();
}

function matchesDateRange(order: AccountOrder, dateRange: DateRangeValue) {
  if (!dateRange.from && !dateRange.to) return true;

  const orderTime = parseVietnameseDate(order.orderDate);
  if (!orderTime) return false;

  const fromTime = dateRange.from
    ? new Date(
        dateRange.from.getFullYear(),
        dateRange.from.getMonth(),
        dateRange.from.getDate(),
      ).getTime()
    : Number.NEGATIVE_INFINITY;
  const toTime = dateRange.to
    ? new Date(
        dateRange.to.getFullYear(),
        dateRange.to.getMonth(),
        dateRange.to.getDate(),
      ).getTime()
    : Number.POSITIVE_INFINITY;

  return orderTime >= fromTime && orderTime <= toTime;
}

const emptyDateRange: DateRangeValue = { from: null, to: null };

export function OrdersListClient({ orders }: OrdersListClientProps) {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingDateRange, setPendingDateRange] =
    useState<DateRangeValue>(emptyDateRange);
  const [appliedDateRange, setAppliedDateRange] =
    useState<DateRangeValue>(emptyDateRange);
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 5;

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState<AccountOrder | null>(null);
  const [reviewedOrderIds, setReviewedOrderIds] = useState<Set<string>>(new Set());

  const router = useRouter();

  useEffect(() => {
    if (!isStatusDropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!statusDropdownRef.current?.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isStatusDropdownOpen]);

  const handleViewDetails = (orderId: string) => {
    router.push(`/tai-khoan/don-hang/${orderId}`);
  };

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeFilter !== "all") {
      result = result.filter((order) => order.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderCode.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query))
      );
    }

    result = result.filter((order) => matchesDateRange(order, appliedDateRange));

    return result;
  }, [orders, activeFilter, appliedDateRange, searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusCount = (status: OrderFilter) => {
    if (status === "all") {
      return orders.length;
    }
    return orders.filter((order) => order.status === status).length;
  };

  const handleFilterChange = (filter: OrderFilter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setIsStatusDropdownOpen(false);
  };

  const activeStatusLabel =
    accountOrderStatusFilters.find((option) => option.value === activeFilter)
      ?.label ?? "Tất cả";
  const statusButtonLabel =
    activeFilter === "all"
      ? "Tất cả đơn hàng"
      : `Trạng thái: ${activeStatusLabel}`;

  const handleReview = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setReviewingOrder(order);
      setReviewModalOpen(true);
    }
  };

  const handleReviewSubmit = () => {
    if (reviewingOrder) {
      setReviewedOrderIds((prev) => new Set(prev).add(reviewingOrder.id));
    }
    setReviewModalOpen(false);
    setReviewingOrder(null);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-sm border border-[#E5EAF2] bg-white shadow-sm">
        <div className="border-b border-[#E5EAF2] p-4 lg:p-5">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_18rem_13.75rem] lg:items-center">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Tìm theo mã đơn hàng, sản phẩm..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-[#E5EAF2] bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:border-[#163F78] focus:outline-none"
              />
            </div>
            <div className="w-full lg:w-[18rem]">
              <DateRangePicker
                value={pendingDateRange}
                onChange={setPendingDateRange}
                popoverClassName="lg:left-auto lg:right-0"
                onApply={(range) => {
                  setAppliedDateRange(range);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div ref={statusDropdownRef} className="relative w-full lg:w-[13.75rem]">
              <button
                type="button"
                onClick={() => setIsStatusDropdownOpen((open) => !open)}
                className="flex h-11 w-full items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-[#F8FAFC] focus:ring-2 focus:ring-[#163F78]/25 focus:outline-none"
                aria-expanded={isStatusDropdownOpen}
              >
                <ListFilter size={17} className="shrink-0 text-slate-500" />
                <span className="min-w-0 flex-1 truncate">
                  {statusButtonLabel}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    "shrink-0 text-slate-400 transition-transform",
                    isStatusDropdownOpen && "rotate-180",
                  )}
                />
              </button>

              {isStatusDropdownOpen ? (
                <div className="absolute top-full right-0 z-40 mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-lg">
                  {accountOrderStatusFilters.map((option) => {
                    const isActive = activeFilter === option.value;
                    const count = getStatusCount(option.value);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleFilterChange(option.value)}
                        className={cn(
                          "flex h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold transition-colors",
                          isActive
                            ? "bg-[#163F78] text-white"
                            : "text-slate-700 hover:bg-[#F8FAFC]",
                        )}
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                          {isActive ? <Check size={15} /> : null}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {option.label}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-100 text-slate-500",
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          {filteredOrders.length > 0 ? (
            paginatedOrders.map((order, index) => (
              <OrderCard
                key={order.id}
                order={order}
                variant="row"
                className={
                  index < paginatedOrders.length - 1
                    ? "border-b border-[#E5EAF2]"
                    : ""
                }
                onViewDetails={handleViewDetails}
                onReview={handleReview}
                reviewed={reviewedOrderIds.has(order.id)}
              />
            ))
          ) : (
            <div className="p-8 text-center lg:p-12">
              <Filter size={48} className="mx-auto mb-4 text-slate-300" />
              <h3 className="mb-2 text-lg font-bold text-slate-700">
                Không tìm thấy đơn hàng
              </h3>
              <p className="mb-5 text-sm text-slate-500">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#163F78] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1e4a8a]"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          )}
        </div>

        {totalPages > 1 ? (
          <div className="flex flex-col gap-4 border-t border-[#E5EAF2] p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:p-5">
            <p className="text-sm text-slate-500">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)} của{" "}
              {filteredOrders.length} đơn hàng
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "border-[#D9E5F6] bg-[#163F78] text-white"
                      : "border-transparent text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <BestSellersSlider products={mockBestSellers} />

      <OrderReviewModal
        isOpen={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
          setReviewingOrder(null);
        }}
        order={reviewingOrder}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
