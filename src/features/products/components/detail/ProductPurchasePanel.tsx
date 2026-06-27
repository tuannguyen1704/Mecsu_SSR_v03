"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { Product } from "../../types/product";
import {
  getInitialOrderQuantity,
  getMinOrderQuantity,
  getOrderStep,
} from "../../utils/orderQuantity";
import { QuantityStepper } from "../QuantityStepper";
import { ProductRatingPopover } from "./ProductRatingPopover";

interface ProductPurchasePanelProps {
  product: Product;
  shortDescription: string;
}

export function ProductPurchasePanel({
  product,
  shortDescription,
}: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(() =>
    getInitialOrderQuantity(product),
  );
  const [wasAdded, setWasAdded] = useState(false);
  const [isRatingPopoverOpen, setIsRatingPopoverOpen] = useState(false);
  const { addItem } = useCart();
  const isOutOfStock = product.stock <= 0;
  const minOrderQuantity = getMinOrderQuantity(product);
  const orderStep = getOrderStep(product);
  const productImage =
    product.image || product.images?.[0] || getSeededCategoryImage(product.id);

  useEffect(() => {
    if (!isRatingPopoverOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsRatingPopoverOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRatingPopoverOpen]);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product, quantity);
      notifyCartItemAdded({
        productImage,
        productName: product.name,
        quantity,
      });
      setWasAdded(true);
      window.setTimeout(() => setWasAdded(false), 1400);
    }
  };

  return (
    <div className="font-sans text-[#222]">
      <div className="mb-2 text-[13px] font-black tracking-[0.18em] text-[#005da4] uppercase">
        {product.brand}
      </div>

      <h1 className="mb-2 text-[28px] leading-tight font-bold tracking-tight text-[#222] uppercase md:text-[32px]">
        {product.name}
      </h1>

      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium tracking-tighter text-[#666] uppercase">
        <span>Mfr # {product.sku}</span>
        <span>SKU # {product.sku}</span>
      </div>

      <div className="relative mb-4 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <div
          className="relative flex flex-wrap items-center gap-2"
          onMouseEnter={() => setIsRatingPopoverOpen(true)}
          onMouseLeave={() => setIsRatingPopoverOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsRatingPopoverOpen((current) => !current)}
            onFocus={() => setIsRatingPopoverOpen(true)}
            className="flex items-center gap-0.5 text-[#ed6c2d] outline-none focus-visible:ring-2 focus-visible:ring-[#007185] focus-visible:ring-offset-2"
            aria-label="Xem tóm tắt đánh giá"
            aria-expanded={isRatingPopoverOpen}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
                stroke="none"
                className={
                  index < Math.round(product.rating || 4) ? "" : "opacity-30"
                }
              />
            ))}
            <ChevronDown
              size={14}
              strokeWidth={2.4}
              className="ml-0.5 text-[#007185]"
            />
          </button>
          <button
            type="button"
            onClick={() => setIsRatingPopoverOpen((current) => !current)}
            onFocus={() => setIsRatingPopoverOpen(true)}
            className="text-[15px] font-bold text-[#007185] hover:underline focus-visible:ring-2 focus-visible:ring-[#007185] focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Xem 51 ratings"
            aria-expanded={isRatingPopoverOpen}
          >
            51 ratings
          </button>

          {isRatingPopoverOpen ? (
            <ProductRatingPopover
              onClose={() => setIsRatingPopoverOpen(false)}
            />
          ) : null}
        </div>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          className="text-[15px] font-bold text-[#007185] hover:underline"
        >
          Write a Review
        </button>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-[40px] font-bold text-[#222]">
            {product.price.toLocaleString("vi-VN")}đ
          </span>
          <span className="text-[16px] text-[#666]">
            / {product.unit || "cái"}
          </span>
          {product.originalPrice ? (
            <span className="text-[16px] font-medium text-slate-400 line-through">
              {product.originalPrice.toLocaleString("vi-VN")}đ
            </span>
          ) : null}
          {product.discount ? (
            <span className="rounded-sm bg-red-50 px-2 py-1 text-[12px] font-black text-red-600">
              -{product.discount}%
            </span>
          ) : null}
        </div>
      </div>

      <p className="mb-4 max-w-2xl text-[14px] leading-relaxed font-medium text-slate-600">
        {shortDescription}
      </p>

      <div className="mb-4">
        <h3
          className={`text-[18px] font-bold ${isOutOfStock ? "text-slate-900" : "text-[#3c763d]"}`}
        >
          {isOutOfStock ? "Hàng đang về" : "Sẵn hàng"}
        </h3>
      </div>

      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-stretch">
        <QuantityStepper
          value={quantity}
          minOrderQuantity={minOrderQuantity}
          orderStep={orderStep}
          unit={product.unit}
          onChange={setQuantity}
          className="w-[150px]"
        />

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex h-11 flex-1 items-center justify-center gap-2 bg-[#FFD100] px-6 py-2 text-[16px] font-bold text-[#222] shadow-sm transition-colors hover:bg-[#ebc100] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          <ShoppingCart size={18} />
          {isOutOfStock
            ? "Nhắc tôi sau"
            : wasAdded
              ? "Đã thêm vào giỏ hàng"
              : "Thêm vào giỏ"}
        </button>
      </div>

      <div className="mb-4 text-[12px] font-medium text-[#666]">
        Tổng cộng: {(product.price * quantity).toLocaleString("vi-VN")}đ /{" "}
        {product.unit || "cái"}
      </div>
    </div>
  );
}
