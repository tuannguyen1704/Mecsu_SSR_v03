"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { Product } from "@/features/products/types/product";

type HomeProductCardProps = {
  product: Product;
  discountPercent: number;
};

export function HomeProductCard({
  product,
  discountPercent,
}: HomeProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const productHref = `/san-pham/${product.slug || product.id}`;
  const productImage = product.image || getSeededCategoryImage(product.name || product.id);
  const currentPrice = useMemo(
    () => product.price * (1 - discountPercent / 100),
    [discountPercent, product.price],
  );

  return (
    <div className="flex min-w-[76vw] max-w-[260px] shrink-0 snap-start flex-col rounded-lg bg-white p-3 shadow-sm min-[430px]:min-w-[230px] sm:min-w-[200px] sm:max-w-[200px]">
      <div className="relative mb-3 flex flex-1 flex-col">
        <button
          onClick={() => setIsWishlisted((value) => !value)}
          className={`absolute top-0 right-0 z-10 transition-colors ${
            isWishlisted ? "text-red-500" : "text-slate-400 hover:text-red-500"
          }`}
          aria-label="Wishlist product"
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <Link
          href={productHref}
          className="relative flex h-[130px] cursor-pointer items-center justify-center pt-3"
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="200px"
            className="object-contain pt-3"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <span className="mb-0.5 text-[9px] font-bold tracking-wider text-slate-500 uppercase">
          {product.brand || "Thương hiệu"}
        </span>
        <Link
          href={productHref}
          className="mb-2 line-clamp-3 cursor-pointer text-[12px] leading-tight font-medium text-[#0056A8] hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-auto">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="text-[11px] text-slate-400 line-through">
              {(product.price * 1.2).toLocaleString("vi-VN")} đ
            </span>
            <span className="text-[11px] text-[#bb2a3e]">
              {discountPercent}% off
            </span>
          </div>
          <div className="mb-2 text-[16px] font-bold text-[#bb2a3e]">
            {Math.round(currentPrice).toLocaleString("vi-VN")} đ / cái
          </div>

          <div className="mx-auto mb-3 h-1 w-[60px] rounded-full bg-slate-200" />

          <button
            onClick={() => {
              addItem(product, 1);
              notifyCartItemAdded({
                productImage,
                productName: product.name,
                quantity: 1,
              });
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1200);
            }}
            className="w-full rounded-sm border-brand-primary bg-brand-primary py-1.5 text-[12px] font-bold text-brand-secondary transition-colors hover:bg-brand-primary/90"
          >
            {added ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </div>
  );
}
