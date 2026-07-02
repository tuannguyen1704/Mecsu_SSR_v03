"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import { getProductHref } from "../services/product-service";
import type { Product } from "../types/product";
import { getProductDisplayId } from "../utils/productDisplayId";
import {
  getInitialOrderQuantity,
  getMinOrderQuantity,
  getOrderStep,
} from "../utils/orderQuantity";
import { QuantityStepper } from "./QuantityStepper";
import { StockReminderModal } from "./StockReminderModal";

type ProductListProps = {
  products: Product[];
};

type ProductWithCommercialFields = Product & {
  includedTax?: number;
  taxAmount?: number;
  vatAmount?: number;
  inStock?: boolean;
  leadTime?: string;
};

function formatVND(value: number, options?: { compact?: boolean }) {
  const amount = Math.max(0, Math.round(value));
  return options?.compact
    ? `${amount.toLocaleString("vi-VN")}đ`
    : `${amount.toLocaleString("vi-VN")} đ`;
}

function getIncludedTaxAmount(product: ProductWithCommercialFields) {
  return (
    product.includedTax ??
    product.taxAmount ??
    product.vatAmount ??
    Math.round(product.price * 0.08)
  );
}

function getProductLeadTime(product: ProductWithCommercialFields) {
  if (product.leadTime) return product.leadTime;
  return product.stock > 0 || product.inStock
    ? "Xuất kho trong ngày"
    : "Xuất kho trong 45 ngày";
}

function formatUnit(unit?: string) {
  const normalizedUnit = unit?.trim() || "cái";
  return normalizedUnit.charAt(0).toUpperCase() + normalizedUnit.slice(1);
}

export const ProductList = memo(function ProductList({
  products,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-sm bg-[#ededed] p-10 text-center">
        <div>
          <h3 className="text-xl font-black text-[#1a1a1a]">
            Không tìm thấy sản phẩm
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Hãy thử bỏ bớt bộ lọc hoặc quay lại danh mục khác.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
});

const ProductListItem = memo(function ProductListItem({
  product,
}: {
  product: Product;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wasAdded, setWasAdded] = useState(false);
  const [quantity, setQuantity] = useState(() =>
    getInitialOrderQuantity(product),
  );
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [reminderSession, setReminderSession] = useState(0);
  const { addItem } = useCart();
  const isOutOfStock = product.stock <= 0;
  const productImage = product.image || getSeededCategoryImage(product.id);
  const productHref = getProductHref(product);
  const productDisplayId = getProductDisplayId(product);
  const description = product.shortDescription || product.description;
  const unit = formatUnit(product.unit);
  const taxAmount = getIncludedTaxAmount(product);
  const leadTime = getProductLeadTime(product);
  const minOrderQuantity = getMinOrderQuantity(product);
  const orderStep = getOrderStep(product);

  const handlePrimaryAction = () => {
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
      <article className="group grid gap-4 rounded-sm border border-slate-200 bg-white p-4 transition-all hover:border-[#163F78]/40 hover:shadow-sm md:grid-cols-[160px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(240px,1fr)_90px_140px_130px_190px] lg:items-center lg:gap-5">
        <div className="relative md:shrink-0">
          <Link
            href={productHref}
            className="relative flex h-[150px] w-full items-center justify-center rounded-sm bg-white md:w-[160px] lg:w-[150px]"
          >
            <Image
              src={productImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 160px, 100vw"
              className="object-contain p-2 mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsWishlisted((current) => !current)}
            className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 text-slate-400 shadow-sm transition-colors hover:text-red-500"
            aria-label="Toggle wishlist"
          >
            <Heart
              size={18}
              className={isWishlisted ? "fill-red-500 text-red-500" : ""}
            />
          </button>
        </div>

        <div className="min-w-0 lg:self-center">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="shrink-0 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              {productDisplayId}
            </span>
            <Link
              href={productHref}
              className="min-w-0 flex-1 text-[15px] leading-6 font-semibold text-[#0056A8] hover:underline md:text-base"
            >
              <span className="line-clamp-2">{product.name}</span>
            </Link>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            SKU: {product.sku || product.id}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-0.5">
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
            </div>
            <span className="text-sm text-slate-600">(150+ đánh giá)</span>
          </div>
          {isOutOfStock ? (
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Hàng đang về
            </p>
          ) : (
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Tồn kho:{" "}
              <span className="text-green-700">
                {product.stock.toLocaleString("vi-VN")}
              </span>
            </p>
          )}

          {description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 md:col-start-2 md:grid-cols-4 lg:col-start-auto lg:grid-cols-subgrid lg:contents lg:border-t-0 lg:pt-0">
          <div className="flex flex-col justify-center lg:text-center">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
              Đơn vị tính
            </span>
            <span className="mt-1 text-sm font-semibold text-slate-800">
              {unit}
            </span>
          </div>

          <div className="flex flex-col justify-center lg:text-right">
            <div className="text-lg font-bold text-slate-950 md:text-[20px]">
              {product.price > 0 ? formatVND(product.price) : "Liên hệ"}
            </div>
            <div className="mt-1 text-xs font-medium text-slate-600">
              Đã bao gồm thuế
            </div>
            <div className="mt-0.5 text-xs font-semibold text-slate-700">
              {formatVND(taxAmount, { compact: true })}
            </div>
          </div>

          <div className="flex flex-col justify-center text-sm leading-5 font-semibold text-slate-800 lg:text-center">
            {leadTime.includes("45") ? (
              <>
                Xuất kho trong
                <br />
                45 ngày
              </>
            ) : (
              <>
                Xuất kho trong
                <br />
                ngày
              </>
            )}
          </div>

          <div className="col-span-2 flex flex-col justify-center gap-2 md:col-span-1">
            {!isOutOfStock ? (
              <QuantityStepper
                value={quantity}
                minOrderQuantity={minOrderQuantity}
                orderStep={orderStep}
                unit={product.unit}
                onChange={setQuantity}
              />
            ) : null}
            <button
              type="button"
              onClick={handlePrimaryAction}
              className={`w-full rounded-sm border px-3 py-2.5 text-sm font-bold tracking-tight uppercase transition-colors ${
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
            <Link
              href={productHref}
              className="inline-flex w-full justify-center text-sm font-semibold text-[#0056A8] hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </article>

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
