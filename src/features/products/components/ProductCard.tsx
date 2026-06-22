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
  const mobileProductName = product.name.replace(
    /\s*\(50\s*Cái\/Bịch\)\s*$/i,
    "",
  );

  return (
    <div className="group relative flex cursor-pointer flex-col rounded-sm border border-transparent bg-white p-2.5 transition-shadow hover:border-slate-300 sm:p-4">
      <Link href={getProductHref(product)} className="flex flex-1 flex-col">
        <div className="relative mb-3 flex aspect-square items-center justify-center p-1 sm:mb-6 sm:p-2">
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="mb-1 text-[11px] font-bold text-[#1a1a1a] sm:text-[13px]">
            {product.brand}
          </div>
          <span className="mb-1.5 line-clamp-3 block min-h-[3rem] text-[13px] leading-[1.25] font-medium text-[#2071a7] sm:mb-2 sm:line-clamp-2 sm:min-h-[2.5rem] sm:text-[15px] sm:leading-tight">
            <span className="sm:hidden">{mobileProductName}</span>
            <span className="hidden sm:inline">{product.name}</span>
          </span>

          <div className="mb-2 text-[10px] font-medium tracking-tight text-slate-500 sm:mb-3 sm:text-[12px]">
            {product.sku || "SKU: Đang cập nhật"}
          </div>

          <div className="mt-auto mb-2 flex items-center gap-0.5 sm:mb-3">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star
                key={starIndex}
                size={14}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                  starIndex < Math.round(product.rating || 4)
                    ? "fill-[#ed6c2d] text-[#ed6c2d]"
                    : "text-slate-300"
                }`}
              />
            ))}
            <span className="ml-1 text-[11px] text-slate-600 sm:text-[14px]">
              <span className="sm:hidden">(150+)</span>
              <span className="hidden sm:inline">(150+ đánh giá)</span>
            </span>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-3">
            <span className="text-[16px] font-black text-[#1a1a1a] sm:text-[18px]">
              {product.price > 0
                ? `${product.price.toLocaleString("vi-VN")} đ`
                : "Liên hệ"}
            </span>
            <div
              className={`text-[11px] font-bold sm:text-[13px] ${
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
