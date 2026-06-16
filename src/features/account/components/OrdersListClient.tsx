"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { AccountOrder, AccountOrderStatus } from "../types/account";
import { OrderCard } from "./OrderCard";
import { BestSellersSlider } from "./BestSellersSlider";
import { OrderReviewModal, type ProductReview, type OverallReview } from "./OrderReviewModal";
import { accountOrderStatusFilters, mockBestSellers } from "../data/account-orders";

type OrderFilter = "all" | AccountOrderStatus;

interface OrdersListClientProps {
  orders: AccountOrder[];
}

export function OrdersListClient({ orders }: OrdersListClientProps) {
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState<AccountOrder | null>(null);
  const [reviewedOrderIds, setReviewedOrderIds] = useState<Set<string>>(new Set());

  const router = useRouter();

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

    return result;
  }, [orders, activeFilter, searchQuery]);

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
  };

  const handleReview = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setReviewingOrder(order);
      setReviewModalOpen(true);
    }
  };

  const handleReviewSubmit = (reviews: ProductReview[], overallReview: OverallReview) => {
    if (reviewingOrder) {
      setReviewedOrderIds((prev) => new Set(prev).add(reviewingOrder.id));
    }
    setReviewModalOpen(false);
    setReviewingOrder(null);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
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
              className="w-full rounded-lg border border-[#E5EAF2] bg-slate-50 pl-10 pr-4 py-2.5 text-sm focus:border-[#163F78] focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {accountOrderStatusFilters.map((option) => {
              const isActive = activeFilter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFilterChange(option.value)}
                  className={`h-10 whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#163F78] text-white shadow-[0_0_0_3px_rgba(156,185,229,0.8)]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                  <span className="ml-1.5 text-xs opacity-70">
                    ({getStatusCount(option.value)})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {paginatedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
              onReview={handleReview}
              reviewed={reviewedOrderIds.has(order.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-[#E5EAF2] bg-white p-8 text-center lg:p-12">
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

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-[#E5EAF2] bg-white px-4 py-4 lg:px-6">
          <p className="text-sm text-slate-500">
            Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} của{" "}
            {filteredOrders.length} đơn hàng
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors border ${
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
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      )}

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
