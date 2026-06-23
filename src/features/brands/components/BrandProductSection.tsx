"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CategorySortBar } from "@/features/categories/components/CategorySortBar";
import {
  CATEGORY_LISTING_ITEMS_PER_PAGE,
  getFilteredProducts,
  getPaginatedProducts,
  getTotalProductPages,
} from "@/features/categories/services/category-listing";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import type { BrandCatalog, BrandCatalogNode } from "../types";
import { BrandFilterSidebar } from "./BrandFilterSidebar";

export function BrandProductSection({
  catalog,
  node,
}: {
  catalog: BrandCatalog;
  node: BrandCatalogNode;
}) {
  const [sortValue, setSortValue] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sortedProducts = useMemo(
    () =>
      getFilteredProducts({
        products: node.products || [],
        selectedAvailability: [],
        selectedBrands: [],
        sortValue,
      }),
    [node.products, sortValue],
  );
  const totalPages = getTotalProductPages(
    sortedProducts,
    CATEGORY_LISTING_ITEMS_PER_PAGE,
  );
  const products = getPaginatedProducts(
    sortedProducts,
    currentPage,
    CATEGORY_LISTING_ITEMS_PER_PAGE,
  );

  const toggleFilter = (key: string) => {
    setSelectedFilters((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [mobileOpen]);

  return (
    <section className="mt-10">
      <div className="flex gap-8">
        <div className="hidden w-[300px] shrink-0 lg:block">
          <BrandFilterSidebar
            filters={node.filters}
            selected={selectedFilters}
            onToggle={toggleFilter}
          />
        </div>
        <div className="min-w-0 flex-1">
          <CategorySortBar
            title={
              node.slug
                ? node.title
                : `Sản phẩm ${catalog.brand.name}`
            }
            productCount={node.productCount}
            productCountLabel={`${node.productCount} sản phẩm`}
            sortValue={sortValue}
            onSortChange={(value) => {
              setSortValue(value);
              setCurrentPage(1);
            }}
            onOpenFilters={() => setMobileOpen(true)}
          />
          <div className="min-h-[500px] rounded-sm bg-[#EDEDED] p-4">
            <ProductGrid products={products} />
          </div>
          <div className="mt-8 rounded-sm border border-slate-200 bg-white">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Đóng bộ lọc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[400] bg-black/60"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 z-[401] flex h-[100dvh] w-[min(360px,calc(100vw-24px))] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="font-semibold uppercase">Bộ lọc</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Đóng bộ lọc"
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto">
                <BrandFilterSidebar
                  mobile
                  filters={node.filters}
                  selected={selectedFilters}
                  onToggle={toggleFilter}
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
