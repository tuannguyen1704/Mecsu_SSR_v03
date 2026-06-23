"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import {
  DateRangePicker,
  type DateRangeValue,
} from "@/components/shared/DateRangePicker";
import { Toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { mockQuotations } from "../data/quotations";
import {
  addQuotation,
  initializeQuotations,
  loadQuotations,
} from "../services/quotation-storage";
import type {
  Quotation,
  QuotationRequestItem,
  QuotationStatus,
} from "../types/quotation";
import { QuotationCard } from "./QuotationCard";
import { QuotationEmptyState } from "./QuotationEmptyState";
import { QuotationStats } from "./QuotationStats";
import { RequestQuotationModal } from "./RequestQuotationModal";

type FilterStatus = "all" | QuotationStatus;
type SortOption = "newest" | "oldest";

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Đang xử lý" },
  { value: "processing", label: "Chờ phản hồi" },
  { value: "sent", label: "Đã gửi" },
  { value: "accepted", label: "Đã chấp nhận" },
  { value: "expired", label: "Hết hạn" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
];

function parseVietnameseDate(dateValue: string) {
  const [day, month, year] = dateValue.split("/").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

function matchesDateRange(quotation: Quotation, dateRange: DateRangeValue) {
  if (!dateRange.from && !dateRange.to) return true;

  const requestTime = parseVietnameseDate(quotation.requestDate);
  if (!requestTime) return false;

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

  return requestTime >= fromTime && requestTime <= toTime;
}

const emptyDateRange: DateRangeValue = { from: null, to: null };

export function QuotationsListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [pendingDateRange, setPendingDateRange] =
    useState<DateRangeValue>(emptyDateRange);
  const [appliedDateRange, setAppliedDateRange] =
    useState<DateRangeValue>(emptyDateRange);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialItems, setInitialItems] =
    useState<QuotationRequestItem[] | null>(null);
  const [initialRequestName, setInitialRequestName] = useState<
    string | undefined
  >();
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "success" });

  const itemsPerPage = 6;

  useEffect(() => {
    initializeQuotations();
    const timer = window.setTimeout(() => {
      setQuotations(loadQuotations());

      if (searchParams.get("openQuotation") !== "cart") return;

      const storedItems = sessionStorage.getItem("mecsu-cart-rfq-items");
      const storedName = sessionStorage.getItem("mecsu-cart-rfq-name");

      sessionStorage.removeItem("mecsu-cart-rfq-items");
      sessionStorage.removeItem("mecsu-cart-rfq-name");

      if (!storedItems) return;

      try {
        const parsedItems: unknown = JSON.parse(storedItems);
        if (
          Array.isArray(parsedItems) &&
          parsedItems.length > 0 &&
          parsedItems.every(isQuotationRequestItem)
        ) {
          setInitialItems(parsedItems);
          setInitialRequestName(storedName || "Báo giá từ giỏ hàng");
          setIsModalOpen(true);
        }
      } catch {
        setInitialItems(null);
        setInitialRequestName(undefined);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const filteredQuotations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = quotations.filter((quotation) => {
      const matchesQuery =
        !query ||
        quotation.code.toLowerCase().includes(query) ||
        quotation.requestName.toLowerCase().includes(query) ||
        quotation.items.some(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.sku.toLowerCase().includes(query),
        );
      const matchesStatus =
        statusFilter === "all" || quotation.status === statusFilter;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesDateRange(quotation, appliedDateRange)
      );
    });

    return result.sort((a, b) => {
      const dateA = parseVietnameseDate(a.requestDate);
      const dateB = parseVietnameseDate(b.requestDate);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [appliedDateRange, quotations, searchQuery, sortBy, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredQuotations.length / itemsPerPage));
  const paginatedQuotations = filteredQuotations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const resetPage = () => setCurrentPage(1);

  const handleCreateSuccess = (quotation: Quotation) => {
    setQuotations(addQuotation(quotation));
    setInitialItems(null);
    setInitialRequestName(undefined);
    setToast({
      show: true,
      message: "Gửi yêu cầu báo giá thành công",
      type: "success",
    });
    resetPage();
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleDownload = (quotation: Quotation) => {
    setToast({
      show: true,
      message: `Đang chuẩn bị file PDF cho ${quotation.code}`,
      type: "info",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Báo giá
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý yêu cầu báo giá, theo dõi trạng thái và phản hồi từ MECSU.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#1A4A8A] sm:w-auto"
        >
          <Plus size={18} />
          Tạo yêu cầu báo giá
        </button>
      </div>

      <QuotationStats quotations={quotations} />

      <div className="rounded-2xl border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative md:col-span-2 lg:col-span-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm theo mã báo giá, sản phẩm..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                resetPage();
              }}
              className="w-full rounded-xl border border-[#E5EAF2] bg-slate-50 py-2.5 pl-10 pr-4 text-sm transition-all focus:border-[#3D82C4] focus:outline-none focus:ring-2 focus:ring-[#3D82C4]/20"
            />
          </div>

          <SelectWrap>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as FilterStatus);
                resetPage();
              }}
              className={selectClass}
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </SelectWrap>

          <DateRangePicker
            value={pendingDateRange}
            onChange={setPendingDateRange}
            onApply={(range) => {
              setAppliedDateRange(range);
              resetPage();
            }}
          />

          <SelectWrap>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
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

      {paginatedQuotations.length > 0 ? (
        <>
          <div className="space-y-3">
            {paginatedQuotations.map((quotation) => (
              <QuotationCard
                key={quotation.id}
                quotation={quotation}
                onViewDetails={(item) => router.push(`/tai-khoan/bao-gia/${item.id}`)}
                onDownload={handleDownload}
              />
            ))}
          </div>

          {filteredQuotations.length > itemsPerPage ? (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5EAF2] bg-white px-4 py-3 lg:px-5">
              <p className="text-sm text-slate-500">
                Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredQuotations.length)} của{" "}
                {filteredQuotations.length} báo giá
              </p>
              <div className="flex items-center gap-2">
                <PaginationButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  <ChevronLeft size={20} />
                </PaginationButton>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "h-10 w-10 rounded-lg border text-sm font-semibold transition-colors",
                        currentPage === page
                          ? "border-[#D9E5F6] bg-[#163F78] text-white"
                          : "border-transparent text-slate-600 hover:bg-slate-100",
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
                <PaginationButton
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  <ChevronRight size={20} />
                </PaginationButton>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <QuotationEmptyState onCreate={openCreateModal} />
      )}

      <RequestQuotationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialItems(null);
          setInitialRequestName(undefined);
        }}
        onSuccess={handleCreateSuccess}
        initialItems={initialItems}
        initialRequestName={initialRequestName}
      />

      {toast.show ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      ) : null}
    </div>
  );
}

function isQuotationRequestItem(
  item: unknown,
): item is QuotationRequestItem {
  if (!item || typeof item !== "object") return false;

  const candidate = item as Partial<QuotationRequestItem>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.productName === "string" &&
    typeof candidate.productCode === "string" &&
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0 &&
    candidate.unit === "cái"
  );
}

const selectClass =
  "w-full cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-slate-50 px-4 py-2.5 pr-10 text-sm transition-all focus:border-[#3D82C4] focus:outline-none focus:ring-2 focus:ring-[#3D82C4]/20";

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}
