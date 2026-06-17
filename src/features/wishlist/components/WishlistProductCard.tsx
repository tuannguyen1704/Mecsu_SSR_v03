"use client";

import Link from "next/link";
import {
  Calendar,
  Check,
  ClipboardList,
  Package,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/features/products/types/product";
import type { WishlistItem, WishlistStockStatus } from "../types/wishlist";

interface WishlistProductCardProps {
  item: WishlistItem;
  isSelected: boolean;
  multiSelectMode: boolean;
  onSelect: (id: string) => void;
  onRemove: (productId: string) => void;
  onAddToCart: (item: WishlistItem) => void;
  onRequestQuote: (item: WishlistItem) => void;
}

const stockConfig: Record<
  WishlistStockStatus,
  { label: string; className: string; dotClassName: string }
> = {
  in_stock: {
    label: "Còn hàng",
    className: "bg-emerald-50 text-emerald-700",
    dotClassName: "bg-emerald-500",
  },
  out_of_stock: {
    label: "Hết hàng",
    className: "bg-red-50 text-red-600",
    dotClassName: "bg-red-400",
  },
  limited: {
    label: "Sắp hết",
    className: "bg-amber-50 text-amber-700",
    dotClassName: "bg-amber-400",
  },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN").format(price);
}

function formatSavedDate(dateValue?: string) {
  if (!dateValue) return "Đang cập nhật";

  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;

  return `${day}/${month}/${year}`;
}

export function wishlistItemToProduct(item: WishlistItem): Product {
  return {
    id: item.productId,
    sku: item.sku,
    slug: item.slug,
    name: item.name,
    category: "Wishlist",
    brand: item.brand,
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    stock: item.stockStatus === "out_of_stock" ? 0 : item.stock || 1,
    image: item.image,
  };
}

export function WishlistProductCard({
  item,
  isSelected,
  multiSelectMode,
  onSelect,
  onRemove,
  onAddToCart,
  onRequestQuote,
}: WishlistProductCardProps) {
  const stock = stockConfig[item.stockStatus] || stockConfig.in_stock;
  const isOutOfStock = item.stockStatus === "out_of_stock";
  const hasDiscount =
    Boolean(item.discount) &&
    Boolean(item.originalPrice && item.originalPrice > item.price);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-white p-4 transition-all duration-200 hover:border-[#163F78]/30 hover:shadow-md",
        isSelected
          ? "border-[#163F78] bg-[#F4F8FF] shadow-sm"
          : "border-slate-200",
      )}
    >
      {multiSelectMode ? (
        <button
          type="button"
          onClick={() => onSelect(item.productId)}
          aria-label="Chọn sản phẩm"
          className={cn(
            "absolute left-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white shadow-sm transition-all",
            isSelected
              ? "border-[#163F78] bg-[#163F78]"
              : "border-slate-300 hover:border-[#163F78]",
          )}
        >
          {isSelected ? <Check size={14} className="text-white" /> : null}
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        className="absolute right-3 top-3 z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
        aria-label="Xóa khỏi yêu thích"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/san-pham/${item.slug}`}
          className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-[#F8FAFC] p-3 sm:h-32 sm:w-32"
        >
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <Package size={34} className="text-slate-300" />
          )}
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-3 pr-8 sm:pr-6">
          <div className="min-w-0">
            <Link
              href={`/san-pham/${item.slug}`}
              className="line-clamp-2 text-[15px] leading-snug font-semibold text-slate-900 transition-colors hover:text-[#163F78]"
            >
              {item.name}
            </Link>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p className="truncate">
                SKU:{" "}
                <span className="font-medium text-slate-700">{item.sku}</span>
              </p>
              <p className="truncate">
                Nhà sản xuất:{" "}
                <span className="font-medium text-slate-700">{item.brand}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar size={12} className="shrink-0 text-slate-400" />
                <span>Đã lưu: {formatSavedDate(item.savedDate)}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                stock.className,
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", stock.dotClassName)}
              />
              {stock.label}
            </span>
            {hasDiscount ? (
              <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                -{item.discount}%
              </span>
            ) : null}
          </div>

          <div className="mt-auto">
            {hasDiscount ? (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-xs font-medium text-slate-400 line-through">
                  {formatPrice(item.originalPrice || 0)}đ
                </span>
                <span className="text-lg font-bold text-[#163F78]">
                  {formatPrice(item.price)}đ
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-[#163F78]">
                {item.price > 0 ? `${formatPrice(item.price)}đ` : "Liên hệ"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          disabled={isOutOfStock}
          className={cn(
            "flex h-10 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors",
            isOutOfStock
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-[#163F78] text-white hover:bg-[#1A4A8A]",
          )}
        >
          <ShoppingCart size={16} />
          {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}
        </button>
        <button
          type="button"
          onClick={() => onRequestQuote(item)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#163F78] px-3 text-sm font-semibold text-[#163F78] transition-colors hover:bg-[#F1F6FD]"
        >
          <ClipboardList size={16} />
          Yêu cầu báo giá
        </button>
      </div>
    </article>
  );
}
