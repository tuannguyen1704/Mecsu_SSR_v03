"use client";

import { memo, useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import type { Product } from "../types/product";
import {
  getInitialOrderQuantity,
  getMinOrderQuantity,
  getOrderStep,
} from "../utils/orderQuantity";
import { QuantityStepper } from "./QuantityStepper";
import { StockReminderModal } from "./StockReminderModal";

interface ProductCardActionsProps {
  isOutOfStock: boolean;
  product: Product;
  productImage: string;
}

export const ProductCardActions = memo(function ProductCardActions({
  isOutOfStock,
  product,
  productImage,
}: ProductCardActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);
  const [quantity, setQuantity] = useState(() => getInitialOrderQuantity(product));
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [reminderSession, setReminderSession] = useState(0);
  const { addItem } = useCart();
  const minOrderQuantity = getMinOrderQuantity(product);
  const orderStep = getOrderStep(product);

  const handleAddToCart = () => {
    if (isOutOfStock) {
      setReminderSession((current) => current + 1);
      setIsReminderOpen(true);
      return;
    }

    addItem(product, quantity);
    notifyCartItemAdded({
      productImage,
      productName: product.name,
      quantity,
    });
    setWasAdded(true);
    window.setTimeout(() => setWasAdded(false), 1200);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsWishlisted((current) => !current)}
        className="absolute top-3 right-3 z-10 text-slate-400 transition-colors hover:text-red-500 sm:top-4 sm:right-4"
        aria-label="Toggle wishlist"
      >
        <Heart
          size={18}
          className={`h-[17px] w-[17px] sm:h-[18px] sm:w-[18px] ${
            isWishlisted ? "fill-red-500 text-red-500" : ""
          }`}
        />
      </button>

      {!isOutOfStock ? (
        <QuantityStepper
          value={quantity}
          minOrderQuantity={minOrderQuantity}
          orderStep={orderStep}
          unit={product.unit}
          onChange={setQuantity}
          className="mt-2 sm:mt-3"
        />
      ) : null}

      <button
        type="button"
        onClick={handleAddToCart}
        className={`mt-2 w-full rounded-sm border px-1 py-2 text-[11px] font-bold tracking-tight uppercase transition-all sm:mt-3 sm:px-0 sm:py-2.5 sm:text-sm ${
          isOutOfStock
            ? "border-slate-800 bg-white text-slate-800 hover:bg-slate-800 hover:text-white"
            : "border-brand-primary bg-brand-primary text-brand-secondary hover:bg-brand-primary/90"
        }`}
      >
        {isOutOfStock
          ? "Nhắc tôi sau"
          : wasAdded
            ? "Đã thêm vào giỏ hàng"
            : "THÊM GIỎ HÀNG"}
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
});
