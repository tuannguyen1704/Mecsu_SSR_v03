"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard";

interface RecentlyViewedProductsProps {
  currentProduct: Product;
  products: Product[];
}

const STORAGE_KEY = "mecsu-recently-viewed-products";

export function RecentlyViewedProducts({
  currentProduct,
  products,
}: RecentlyViewedProductsProps) {
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const productsById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );

  useEffect(() => {
    const storedIds = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "[]",
    ) as string[];
    const filteredIds = storedIds.filter((id) => id !== currentProduct.id).slice(0, 4);

    const frameId = window.requestAnimationFrame(() => {
      setRecentIds(filteredIds);
    });
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([currentProduct.id, ...filteredIds].slice(0, 5)),
    );

    return () => window.cancelAnimationFrame(frameId);
  }, [currentProduct.id]);

  const recentlyViewed = recentIds
    .map((id) => productsById.get(id))
    .filter(Boolean) as Product[];

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 py-8">
      <h2 className="mb-4 text-[22px] font-bold text-[#222]">Đã xem gần đây</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
