"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/features/products/types/product";
import { ProductFilterSidebar } from "@/features/products/components/ProductFilterSidebar";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductList } from "@/features/products/components/ProductList";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import {
  CATEGORY_LISTING_ITEMS_PER_PAGE,
  getBrandFilters,
  getFilteredProducts,
  getPaginatedProducts,
  getTotalProductPages,
} from "../services/category-listing";
import { CategorySortBar } from "./CategorySortBar";
import { SearchNoResultsPanel } from "@/features/search/components/SearchNoResultsPanel";

interface CategoryListingClientProps {
  title: string;
  products: Product[];
  productCountLabel?: string;
  emptyStateQuery?: string;
}

export function CategoryListingClient({
  title,
  products,
  productCountLabel,
  emptyStateQuery,
}: CategoryListingClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  const brandFilters = useMemo(() => {
    const filters = getBrandFilters(products);

    return filters.length > 0
      ? filters
      : ["3M", "Bosch", "SKF", "SATA", "PISCO"].map((brand) => ({
          id: brand,
          label: brand,
          count: 0,
        }));
  }, [products]);

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

  const totalPages = useMemo(
    () =>
      getTotalProductPages(
        filteredProducts,
        CATEGORY_LISTING_ITEMS_PER_PAGE,
      ),
    [filteredProducts],
  );
  const paginatedProducts = useMemo(
    () =>
      getPaginatedProducts(
        filteredProducts,
        currentPage,
        CATEGORY_LISTING_ITEMS_PER_PAGE,
      ),
    [currentPage, filteredProducts],
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

  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileFilterOpen]);

  const desktopFilterSidebar = (
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
        <div className="hidden w-[300px] shrink-0 lg:block">
          {desktopFilterSidebar}
        </div>

        <div className="min-w-0 flex-1">
          <CategorySortBar
            title={title}
            productCount={filteredProducts.length}
            productCountLabel={productCountLabel}
            sortValue={sortValue}
            viewMode={viewMode}
            onSortChange={handleSortChange}
            onViewModeChange={setViewMode}
            onOpenFilters={() => setIsMobileFilterOpen(true)}
          />

          <div
            className={`relative rounded-sm bg-[#ededed] p-4 ${
              filteredProducts.length === 0 && emptyStateQuery
                ? "min-h-[352px]"
                : "min-h-[500px]"
            }`}
          >
            {paginatedProducts.length === 0 && emptyStateQuery ? (
              <SearchNoResultsPanel query={emptyStateQuery} />
            ) : viewMode === "list" ? (
              <ProductList products={paginatedProducts} />
            ) : (
              <ProductGrid products={paginatedProducts} />
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-8 rounded-sm border border-slate-200 bg-white">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : null}
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
              className="fixed inset-0 z-[400] bg-black/60"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[401] flex h-[100dvh] w-[min(360px,calc(100vw-24px))] max-w-full flex-col overflow-hidden bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Bộ lọc sản phẩm"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
                <h3 className="text-lg font-black tracking-tight uppercase">Bộ lọc</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex h-10 w-10 items-center justify-center text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Đóng bộ lọc"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
              <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <ProductFilterSidebar
                  variant="mobile"
                  brandFilters={brandFilters}
                  selectedBrands={selectedBrands}
                  selectedAvailability={selectedAvailability}
                  onBrandToggle={toggleBrand}
                  onAvailabilityToggle={toggleAvailability}
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
