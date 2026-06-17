"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import type { Product } from "../types/product";
import { StockReminderModal } from "./StockReminderModal";

interface ProductCardActionsProps {
  isOutOfStock: boolean;
  product: Product;
  productImage: string;
}

export function ProductCardActions({
  isOutOfStock,
  product,
  productImage,
}: ProductCardActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [reminderSession, setReminderSession] = useState(0);
  const { addItem } = useCart();

  return (
    <>
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

      {isReminderOpen ? (
        <StockReminderModal
          key={`${product.id}-${reminderSession}`}
          isOpen={isReminderOpen}
          product={product}
          onClose={() => setIsReminderOpen(false)}
        />
      ) : null}
    </>
  );
}
