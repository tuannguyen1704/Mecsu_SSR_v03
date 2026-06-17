"use client";

import { useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/features/products/types/product";
import { ProductFilterSidebar } from "@/features/products/components/ProductFilterSidebar";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import {
  CATEGORY_LISTING_ITEMS_PER_PAGE,
  getBrandFilters,
  getFilteredProducts,
  getPaginatedProducts,
  getTotalProductPages,
} from "../services/category-listing";
import { CategorySortBar } from "./CategorySortBar";

interface CategoryListingClientProps {
  title: string;
  products: Product[];
  productCountLabel?: string;
}

export function CategoryListingClient({
  title,
  products,
  productCountLabel,
}: CategoryListingClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  const brandFilters = useMemo(() => getBrandFilters(products), [products]);

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
        products,
        selectedAvailability,
        selectedBrands,
        sortValue,
      }),
    [products, selectedAvailability, selectedBrands, sortValue],
  );

  const totalPages = getTotalProductPages(
    filteredProducts,
    CATEGORY_LISTING_ITEMS_PER_PAGE,
  );
  const paginatedProducts = getPaginatedProducts(
    filteredProducts,
    currentPage,
    CATEGORY_LISTING_ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    productListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand],
    );
    setCurrentPage(1);
  };

  const toggleAvailability = (value: string) => {
    setSelectedAvailability((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
    setCurrentPage(1);
  };

  const filterSidebar = (
    <ProductFilterSidebar
      brandFilters={brandFilters}
      selectedBrands={selectedBrands}
      selectedAvailability={selectedAvailability}
      onBrandToggle={toggleBrand}
      onAvailabilityToggle={toggleAvailability}
    />
  );

  return (
    <section ref={productListRef} className="mt-12">
      <div className="relative flex gap-8">
        <div className="hidden w-[300px] shrink-0 lg:block">{filterSidebar}</div>

        <div className="min-w-0 flex-1">
          <CategorySortBar
            title={title}
            productCount={filteredProducts.length}
            productCountLabel={productCountLabel}
            sortValue={sortValue}
            onSortChange={handleSortChange}
            onOpenFilters={() => setIsMobileFilterOpen(true)}
          />

          <div className="relative min-h-[500px] rounded-sm bg-[#ededed] p-4">
            <ProductGrid products={paginatedProducts} />
          </div>

          <div className="mt-8 rounded-sm border border-slate-200 bg-white">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileFilterOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 z-[401] w-[300px] overflow-y-auto bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black tracking-tight uppercase">Bộ lọc</h3>
                <button type="button" onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
              <div className="pb-20">{filterSidebar}</div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
