"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Heart,
  Package,
  Search,
  ShoppingCart,
  Tag,
  Trash2,
} from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { useCart } from "@/features/cart";
import { cn } from "@/lib/utils";
import {
  getTotalItems,
  initializeWishlist,
  loadWishlist,
  removeItem,
  removeMultipleItems,
} from "../services/wishlist-storage";
import type { WishlistItem } from "../types/wishlist";
import {
  WishlistProductCard,
  wishlistItemToProduct,
} from "./WishlistProductCard";

type FilterChip = "all" | "in_stock" | "out_of_stock" | "has_discount";
type SortOption = "newest" | "oldest" | "name_asc" | "name_desc";

type ToastState = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
};

const filterChips: { value: FilterChip; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "in_stock", label: "Còn hàng" },
  { value: "out_of_stock", label: "Hết hàng" },
  { value: "has_discount", label: "Có giá" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Mới lưu nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "name_asc", label: "Tên A-Z" },
  { value: "name_desc", label: "Tên Z-A" },
];

function StatCard({
  icon,
  value,
  label,
  accentColor,
  bgColor,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  accentColor: string;
  bgColor: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5EAF2] bg-white p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("mb-1 text-3xl font-bold", accentColor)}>{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
        <div className={cn("rounded-lg p-2.5", bgColor)}>{icon}</div>
      </div>
    </div>
  );
}

function StickyActionBar({
  selectedCount,
  onAddToCart,
  onRequestQuote,
  onRemove,
  onClearSelection,
}: {
  selectedCount: number;
  onAddToCart: () => void;
  onRequestQuote: () => void;
  onRemove: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-10 mx-auto max-w-3xl">
      <div className="rounded-2xl border border-[#E5EAF2] bg-white px-4 py-3 shadow-lg">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm font-medium text-slate-700">
            <span className="font-bold text-[#173E75]">{selectedCount}</span>{" "}
            sản phẩm đã chọn
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={onAddToCart}
              className="flex h-10 items-center gap-1.5 rounded-lg bg-[#173E75] px-4 text-xs font-medium text-white transition-colors hover:bg-[#1a4a8a]"
            >
              <ShoppingCart size={14} />
              Thêm vào giỏ
            </button>
            <button
              type="button"
              onClick={onRequestQuote}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-[#173E75] bg-white px-4 text-xs font-medium text-[#173E75] transition-colors hover:bg-blue-50"
            >
              <FileText size={14} />
              Yêu cầu báo giá
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <Trash2 size={14} />
              Xóa
            </button>
            <button
              type="button"
              onClick={onClearSelection}
              className="h-10 rounded-lg px-3 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WishlistGridClient() {
  const router = useRouter();
  const { addItem } = useCart();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterChip, setFilterChip] = useState<FilterChip>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    initializeWishlist();
    const timeoutId = window.setTimeout(() => setItems(loadWishlist()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const itemsPerPage = 8;

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.sku.toLowerCase().includes(normalizedQuery) ||
          item.brand.toLowerCase().includes(normalizedQuery),
      );
    }

    if (filterChip === "in_stock") {
      result = result.filter(
        (item) => item.stockStatus === "in_stock" || item.stockStatus === "limited",
      );
    } else if (filterChip === "out_of_stock") {
      result = result.filter((item) => item.stockStatus === "out_of_stock");
    } else if (filterChip === "has_discount") {
      result = result.filter((item) => Boolean(item.discount));
    }

    result.sort((a, b) => {
      if (sortBy === "oldest") {
        return (a.savedDate || "").localeCompare(b.savedDate || "");
      }
      if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name, "vi");
      }
      if (sortBy === "name_desc") {
        return b.name.localeCompare(a.name, "vi");
      }
      return (b.savedDate || "").localeCompare(a.savedDate || "");
    });

    return result;
  }, [filterChip, items, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = useMemo(
    () => ({
      total: getTotalItems(items),
      inStock: items.filter((item) => item.stockStatus !== "out_of_stock").length,
      hasDiscount: items.filter((item) => Boolean(item.discount)).length,
    }),
    [items],
  );

  const showToast = (message: string, type: ToastState["type"] = "success") => {
    setToast({ show: true, message, type });
  };

  const refreshItems = () => {
    setItems(loadWishlist());
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
    refreshItems();
    setSelectedIds((current) => {
      const next = new Set(current);
      next.delete(productId);
      return next;
    });
    showToast("Đã xóa sản phẩm khỏi danh sách yêu thích");
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (item.stockStatus === "out_of_stock") return;
    addItem(wishlistItemToProduct(item), 1);
    showToast(`${item.name} đã được thêm vào giỏ hàng`);
  };

  const handleRequestQuote = () => {
    router.push("/tai-khoan/bao-gia");
  };

  const handleAddAllToCart = () => {
    const available = items.filter((item) => item.stockStatus !== "out_of_stock");
    if (available.length === 0) {
      showToast("Không có sản phẩm nào có thể thêm vào giỏ", "error");
      return;
    }

    available.forEach((item) => addItem(wishlistItemToProduct(item), 1));
    showToast(`${available.length} sản phẩm đã được thêm vào giỏ hàng`);
  };

  const toggleMultiSelect = () => {
    if (multiSelectMode) {
      setSelectedIds(new Set());
    }
    setMultiSelectMode((current) => !current);
  };

  const handleSelectItem = (productId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleRemoveSelected = () => {
    removeMultipleItems(Array.from(selectedIds));
    refreshItems();
    setSelectedIds(new Set());
    setMultiSelectMode(false);
    showToast("Đã xóa các sản phẩm đã chọn");
  };

  const handleAddSelectedToCart = () => {
    const available = items.filter(
      (item) =>
        selectedIds.has(item.productId) && item.stockStatus !== "out_of_stock",
    );

    if (available.length === 0) {
      showToast("Không có sản phẩm nào có thể thêm vào giỏ", "error");
      return;
    }

    available.forEach((item) => addItem(wishlistItemToProduct(item), 1));
    setSelectedIds(new Set());
    setMultiSelectMode(false);
    showToast(`${available.length} sản phẩm đã được thêm vào giỏ hàng`);
  };

  const isFiltering = Boolean(searchQuery.trim()) || filterChip !== "all";
  const showEmptyWishlist = items.length === 0 && !isFiltering;

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Danh sách yêu thích
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi các sản phẩm bạn quan tâm và thêm nhanh vào giỏ hàng hoặc yêu cầu báo giá.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={toggleMultiSelect}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors sm:flex-none",
              multiSelectMode
                ? "border border-gray-300 bg-slate-100 text-slate-700"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-slate-50",
            )}
          >
            {multiSelectMode ? "Hủy chọn" : "Chọn nhiều"}
          </button>
          <button
            type="button"
            onClick={handleAddAllToCart}
            disabled={items.length === 0}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#173E75] px-5 text-sm font-medium text-white transition-colors hover:bg-[#1a4a8a] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            <ShoppingCart size={16} />
            Thêm tất cả vào giỏ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Heart size={20} className="text-[#173E75]" />}
          value={stats.total}
          label="Sản phẩm đã lưu"
          accentColor="text-[#173E75]"
          bgColor="bg-[#F6F8FB]"
        />
        <StatCard
          icon={<Package size={20} className="text-emerald-600" />}
          value={stats.inStock}
          label="Có sẵn hàng"
          accentColor="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatCard
          icon={<Tag size={20} className="text-red-500" />}
          value={stats.hasDiscount}
          label="Có giá ưu đãi"
          accentColor="text-red-500"
          bgColor="bg-red-50"
        />
      </div>

      <div className="rounded-2xl border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm yêu thích..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-[#E5EAF2] bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-[#3d82c4] focus:ring-2 focus:ring-[#3d82c4]/20 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {filterChips.map((chip) => {
              const isActive = filterChip === chip.value;

              return (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => {
                    setFilterChip(chip.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition-colors",
                    isActive
                      ? "bg-[#173E75] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[160px]">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-slate-50 px-4 py-2.5 pr-10 text-sm transition-all focus:border-[#3d82c4] focus:ring-2 focus:ring-[#3d82c4]/20 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {paginatedItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.productId)}
                multiSelectMode={multiSelectMode}
                onSelect={handleSelectItem}
                onRemove={handleRemove}
                onAddToCart={handleAddToCart}
                onRequestQuote={handleRequestQuote}
              />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5EAF2] bg-white px-4 py-3 lg:px-5">
              <p className="text-sm text-slate-500">
                Hiển thị {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredItems.length)} của{" "}
                {filteredItems.length} sản phẩm
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Trang trước"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "h-10 w-10 rounded-lg border text-sm font-medium transition-colors",
                        currentPage === page
                          ? "border-[#D9E5F6] bg-[#173E75] text-white"
                          : "border-transparent text-slate-600 hover:bg-slate-100",
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Trang tiếp"
                >
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-2xl border border-[#E5EAF2] bg-white p-10 text-center lg:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Heart size={32} className="text-slate-400" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-slate-700">
            {showEmptyWishlist ? "Bạn chưa có sản phẩm yêu thích" : "Không tìm thấy sản phẩm"}
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-slate-500">
            {showEmptyWishlist
              ? "Lưu sản phẩm để theo dõi giá, tồn kho và gửi báo giá nhanh hơn."
              : "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc."}
          </p>
          {showEmptyWishlist ? (
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#173E75] px-6 text-sm font-medium text-white transition-colors hover:bg-[#1a4a8a]"
            >
              Khám phá sản phẩm
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterChip("all");
                setCurrentPage(1);
              }}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#173E75] px-6 text-sm font-medium text-white transition-colors hover:bg-[#1a4a8a]"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      )}

      {multiSelectMode && selectedIds.size > 0 ? (
        <StickyActionBar
          selectedCount={selectedIds.size}
          onAddToCart={handleAddSelectedToCart}
          onRequestQuote={handleRequestQuote}
          onRemove={handleRemoveSelected}
          onClearSelection={() => {
            setSelectedIds(new Set());
            setMultiSelectMode(false);
          }}
        />
      ) : null}

      {toast.show ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((current) => ({ ...current, show: false }))}
        />
      ) : null}
    </div>
  );
}
