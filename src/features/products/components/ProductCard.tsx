"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import type { Product } from "../types/product";
import { getProductHref } from "../services/product-service";
import { StockReminderModal } from "./StockReminderModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [reminderSession, setReminderSession] = useState(0);
  const isOutOfStock = product.stock <= 0;
  const { addItem } = useCart();
  const productImage = product.image || getSeededPlaceholder(product.id);

  return (
    <div className="group relative flex cursor-pointer flex-col rounded-sm border border-transparent bg-white p-4 transition-shadow hover:border-slate-300">
      <button
        type="button"
        onClick={() => setIsWishlisted((current) => !current)}
        className="absolute top-4 right-4 z-10 text-slate-400 transition-colors hover:text-red-500"
        aria-label="Toggle wishlist"
      >
        <Heart
          size={18}
          className={isWishlisted ? "fill-red-500 text-red-500" : ""}
        />
      </button>

      <Link href={getProductHref(product)} className="flex flex-1 flex-col">
        <div className="mb-6 flex aspect-square items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-1 text-[13px] font-bold text-[#1a1a1a]">
            {product.brand}
          </div>
          <span className="mb-2 line-clamp-2 block min-h-[2.5rem] text-[15px] leading-tight font-medium text-[#2071a7]">
            {product.name}
          </span>

          <div className="mb-3 text-[12px] font-medium tracking-tight text-slate-500">
            {product.sku || "SKU: Đang cập nhật"}
          </div>

          <div className="mt-auto mb-3 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star
                key={starIndex}
                size={14}
                className={
                  starIndex < Math.round(product.rating || 4)
                    ? "fill-[#ed6c2d] text-[#ed6c2d]"
                    : "text-slate-300"
                }
              />
            ))}
            <span className="ml-1 text-[14px] text-slate-600">
              (150+ đánh giá)
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[18px] font-black text-[#1a1a1a]">
              {product.price > 0
                ? `${product.price.toLocaleString("vi-VN")} đ`
                : "Liên hệ"}
            </span>
            <div
              className={`text-[13px] font-bold ${
                isOutOfStock ? "text-slate-900" : "text-green-700"
              }`}
            >
              {isOutOfStock ? "Hàng đang về" : "Sẵn hàng"}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => {
          if (isOutOfStock) {
            setReminderSession((current) => current + 1);
            setIsReminderOpen(true);
            return;
          }

          addItem(product, 1);
          notifyCartItemAdded({
            productImage,
            productName: product.name,
            quantity: 1,
          });
          setWasAdded(true);
          window.setTimeout(() => setWasAdded(false), 1200);
        }}
        className={`mt-3 w-full rounded-sm border py-2.5 text-sm font-bold tracking-tight uppercase transition-all ${
          isOutOfStock
            ? "border-slate-800 bg-white text-slate-800 hover:bg-slate-800 hover:text-white"
            : "border-brand-primary bg-brand-primary text-brand-secondary hover:bg-brand-primary/90"
        }`}
      >
        {isOutOfStock
          ? "Nhắc tôi sau"
          : wasAdded
            ? "Đã thêm vào giỏ hàng"
            : "Thêm giỏ hàng"}
      </button>

      <StockReminderModal
        key={`${product.id}-${reminderSession}`}
        isOpen={isReminderOpen}
        product={product}
        onClose={() => setIsReminderOpen(false)}
      />
    </div>
  );
}
