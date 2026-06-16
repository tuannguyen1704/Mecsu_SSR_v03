"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "../../types/product";

interface CompatibleProductsProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 5;

export function CompatibleProducts({ products }: CompatibleProductsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = useMemo(() => {
    const chunks: Product[][] = [];

    for (let index = 0; index < products.length; index += ITEMS_PER_PAGE) {
      chunks.push(products.slice(index, index + ITEMS_PER_PAGE));
    }

    return chunks.length > 0 ? chunks : [[]];
  }, [products]);

  const totalPages = Math.max(1, pages.length);
  const visibleProducts = pages[currentPage - 1] ?? [];

  return (
    <section id="related-products" className="border-t border-slate-200 py-6">
      <h2 className="mb-4 text-[22px] font-bold text-[#222]">
        Phụ kiện & sản phẩm tương thích
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {visibleProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          className="rounded-full p-2 transition-colors hover:bg-slate-100"
          aria-label="Trang trước"
        >
          <ChevronLeft size={24} className="text-slate-600" />
        </button>
        <span className="text-[14px] font-medium text-slate-700">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          className="rounded-full p-2 transition-colors hover:bg-slate-100"
          aria-label="Trang sau"
        >
          <ChevronRight size={24} className="text-slate-600" />
        </button>
      </div>
    </section>
  );
}
