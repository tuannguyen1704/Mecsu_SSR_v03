import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { Product } from "../types/product";
import { getProductHref } from "../services/product-service";
import { ProductCardActions } from "./ProductCardActions";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const productImage = product.image || getSeededCategoryImage(product.id);

  return (
    <div className="group relative flex cursor-pointer flex-col rounded-sm border border-transparent bg-white p-4 transition-shadow hover:border-slate-300">
      <Link href={getProductHref(product)} className="flex flex-1 flex-col">
        <div className="relative mb-6 flex aspect-square items-center justify-center p-2">
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
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

      <ProductCardActions
        isOutOfStock={isOutOfStock}
        product={product}
        productImage={productImage}
      />
    </div>
  );
}
