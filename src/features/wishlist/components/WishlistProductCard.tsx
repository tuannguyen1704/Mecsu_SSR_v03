"use client";

import Link from "next/link";
import { Heart, Package, ShoppingCart, Trash2 } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import type { Product } from "@/features/products/types/product";
import type { WishlistItem, WishlistStockStatus } from "../types/wishlist";

interface WishlistProductCardProps {
  item: WishlistItem;
  onRemove: (productId: string) => void;
  onAddToCart: (item: WishlistItem) => void;
}

const stockConfig: Record<WishlistStockStatus, { label: string; className: string }> = {
  in_stock: {
    label: "Còn hàng",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  out_of_stock: {
    label: "Hết hàng",
    className: "bg-red-50 text-red-700 border-red-100",
  },
  limited: {
    label: "Sắp hết",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

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
  onRemove,
  onAddToCart,
}: WishlistProductCardProps) {
  const isOutOfStock = item.stockStatus === "out_of_stock";
  const stock = stockConfig[item.stockStatus];

  return (
    <article className="group relative flex h-full flex-col rounded-sm border border-transparent bg-white p-4 transition-all hover:border-slate-300 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onRemove(item.productId)}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
        aria-label="Xóa khỏi yêu thích"
      >
        <Trash2 size={17} />
      </button>

      <Link href={`/san-pham/${item.slug}`} className="flex flex-1 flex-col">
        <div className="mb-5 flex aspect-square items-center justify-center overflow-hidden bg-white p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image || getSeededPlaceholder(item.productId)}
            alt={item.name}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-1 text-[13px] font-bold text-[#1a1a1a]">
            {item.brand}
          </div>
          <h2 className="mb-2 line-clamp-2 min-h-[2.5rem] text-[15px] leading-tight font-medium text-[#2071a7] transition-colors group-hover:text-[#163F78]">
            {item.name}
          </h2>
          <div className="mb-3 text-[12px] font-medium tracking-tight text-slate-500">
            SKU: {item.sku}
          </div>

          <div className="mt-auto space-y-2 border-t border-slate-50 pt-3">
            <span className={`inline-flex rounded-sm border px-2 py-1 text-[9px] font-bold tracking-widest uppercase ${stock.className}`}>
              {stock.label}
            </span>
            <div className="flex flex-col gap-1">
              {item.originalPrice && item.originalPrice > item.price ? (
                <span className="text-xs font-medium text-slate-400 line-through">
                  {item.originalPrice.toLocaleString("vi-VN")} đ
                </span>
              ) : null}
              <span className="text-[18px] font-black text-[#1a1a1a]">
                {item.price > 0 ? `${item.price.toLocaleString("vi-VN")} đ` : "Liên hệ"}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          disabled={isOutOfStock}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-sm border px-3 text-[12px] font-bold tracking-tight uppercase transition-all ${
            isOutOfStock
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : "border-brand-primary bg-brand-primary text-brand-secondary hover:bg-brand-primary/90"
          }`}
        >
          {isOutOfStock ? <Package size={15} /> : <ShoppingCart size={15} />}
          {isOutOfStock ? "Hết hàng" : "Thêm giỏ hàng"}
        </button>
        <Link
          href={`/san-pham/${item.slug}`}
          className="flex h-10 w-full items-center justify-center rounded-sm border border-slate-200 bg-white px-3 text-[12px] font-bold tracking-tight text-slate-700 uppercase transition-colors hover:border-[#163F78] hover:text-[#163F78]"
        >
          Xem chi tiết
        </Link>
      </div>

      <div className="pointer-events-none absolute top-4 left-4 text-red-500">
        <Heart size={18} className="fill-red-500" />
      </div>
    </article>
  );
}
