"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/features/products/types/product";
import { ProductFilterSidebar } from "@/features/products/components/ProductFilterSidebar";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductList } from "@/features/products/components/ProductList";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import type { ProductFilterGroup } from "@/features/products/types/product-filter-group";
import {
  CATEGORY_LISTING_ITEMS_PER_PAGE,
  getBrandFilters,
  getFilteredProducts,
  getPaginatedProducts,
  getTotalProductPages,
  type ProductFilterOption,
} from "../services/category-listing";
import { CategorySortBar } from "./CategorySortBar";
import { SearchNoResultsPanel } from "@/features/search/components/SearchNoResultsPanel";

interface CategoryListingClientProps {
  title: string;
  products: Product[];
  pagination?: CategoryListingPagination;
  brandFilters?: ProductFilterOption[];
  filterGroups?: ProductFilterGroup[];
  productCountLabel?: string;
  emptyStateQuery?: string;
}

export interface CategoryListingPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const FALLBACK_BRAND_FILTERS = ["3M", "Bosch", "SKF", "SATA", "PISCO"].map(
  (brand) => ({
    id: brand,
    label: brand,
    count: 0,
  }),
);

type ViewMode = "grid" | "list";
type SortBy = "featured" | "price_asc" | "price_desc" | "name_asc" | "name_desc";

function parseViewMode(value: string | null): ViewMode {
  return value === "list" ? "list" : "grid";
}

function parseSortBy(value: string | null): SortBy {
  if (
    value === "price_asc" ||
    value === "price_desc" ||
    value === "name_asc" ||
    value === "name_desc"
  ) {
    return value;
  }

  return "featured";
}

export function CategoryListingClient({
  title,
  products,
  pagination,
  brandFilters: apiBrandFilters,
  filterGroups = [],
  productCountLabel,
  emptyStateQuery,
}: CategoryListingClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasServerPagination = typeof pagination === "object";
  const [clientCurrentPage, setClientCurrentPage] = useState(1);
  const [clientSelectedBrands, setClientSelectedBrands] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);
  const viewMode = parseViewMode(searchParams.get("view"));
  const sortValue = parseSortBy(searchParams.get("sortBy"));
  const selectedBrandId = searchParams.get("brandId");
  const selectedBrands = useMemo(
    () =>
      hasServerPagination && selectedBrandId
        ? [selectedBrandId]
        : hasServerPagination
          ? []
          : clientSelectedBrands,
    [clientSelectedBrands, hasServerPagination, selectedBrandId],
  );
  const selectedFilterValues = useMemo(
    () => getSelectedFilterValues(searchParams),
    [searchParams],
  );
  const selectedAvailability = useMemo(
    () =>
      hasServerPagination
        ? []
        : selectedFilterValues.availability || [],
    [hasServerPagination, selectedFilterValues],
  );

  const brandFilters = useMemo(() => {
    if (apiBrandFilters && apiBrandFilters.length > 0) {
      return apiBrandFilters;
    }

    const filters = getBrandFilters(products);

    return filters.length > 0 ? filters : FALLBACK_BRAND_FILTERS;
  }, [apiBrandFilters, products]);

  const filteredProducts = useMemo(
    () =>
      getFilteredProducts({
        products,
        selectedAvailability,
        selectedBrands,
        sortValue,
        applyClientSort: !hasServerPagination || sortValue !== "featured",
      }),
    [hasServerPagination, products, selectedAvailability, selectedBrands, sortValue],
  );

  const serverTotalPages = pagination
    ? Math.max(
        1,
        pagination.totalPages ||
          Math.ceil(pagination.total / Math.max(1, pagination.pageSize)),
      )
    : undefined;
  const currentPage = hasServerPagination ? pagination.page : clientCurrentPage;
  const totalPages = hasServerPagination
    ? (serverTotalPages ?? 1)
    : getTotalProductPages(filteredProducts, CATEGORY_LISTING_ITEMS_PER_PAGE);
  const listingProductCount = hasServerPagination
    ? pagination.total
    : filteredProducts.length;
  const listingProductCountLabel = hasServerPagination
    ? `${pagination.total.toLocaleString("vi-VN")} sản phẩm`
    : productCountLabel;
  const hasPaginationProducts = hasServerPagination
    ? pagination.total > 0
    : filteredProducts.length > 0;
  // Temporary limitation: availability filters are still client-side and only
  // apply to the currently loaded API page until catalog filter APIs are wired.
  // sortBy is sent to the products API, but the backend currently returns the
  // same order for price_asc/price_desc. Keep a current-page fallback sort
  // without paginating the API products again until server sorting is reliable.
  const paginatedProducts = useMemo(
    () =>
      hasServerPagination
        ? filteredProducts
        : getPaginatedProducts(
            filteredProducts,
            clientCurrentPage,
            CATEGORY_LISTING_ITEMS_PER_PAGE,
          ),
    [clientCurrentPage, filteredProducts, hasServerPagination],
  );

  const handlePageChange = useCallback((page: number) => {
    if (hasServerPagination) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      if (page <= 1) {
        nextSearchParams.delete("page");
      } else {
        nextSearchParams.set("page", String(page));
      }

      const queryString = nextSearchParams.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    } else {
      setClientCurrentPage(page);
    }

    productListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hasServerPagination, pathname, router, searchParams]);

  const handleSortChange = useCallback((value: string) => {
    const nextSortBy = parseSortBy(value);
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    nextSearchParams.delete("page");

    if (nextSortBy === "featured") {
      nextSearchParams.delete("sortBy");
    } else {
      nextSearchParams.set("sortBy", nextSortBy);
    }

    const queryString = nextSearchParams.toString();

    if (hasServerPagination) {
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    } else {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      setClientCurrentPage(1);
    }
  }, [hasServerPagination, pathname, router, searchParams]);

  const handleViewModeChange = useCallback((value: ViewMode) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    nextSearchParams.set("view", value);

    const queryString = nextSearchParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const openMobileFilter = useCallback(() => {
    setIsMobileFilterOpen(true);
  }, []);

  const closeMobileFilter = useCallback(() => {
    setIsMobileFilterOpen(false);
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    if (hasServerPagination) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      const isSelected = nextSearchParams.get("brandId") === brand;

      nextSearchParams.delete("page");

      if (isSelected) {
        nextSearchParams.delete("brandId");
      } else {
        nextSearchParams.set("brandId", brand);
      }

      const queryString = nextSearchParams.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      return;
    }

    setClientSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand],
    );
    setClientCurrentPage(1);
  }, [hasServerPagination, pathname, router, searchParams]);

  const toggleFilter = useCallback((queryKey: string, value: string) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    nextSearchParams.delete("page");
    toggleFilterQueryValue(nextSearchParams, queryKey, value);

    const queryString = nextSearchParams.toString();
    const nextHref = queryString ? `${pathname}?${queryString}` : pathname;

    if (hasServerPagination) {
      router.push(nextHref, { scroll: false });
      return;
    }

    router.replace(nextHref, { scroll: false });
    setClientCurrentPage(1);
  }, [hasServerPagination, pathname, router, searchParams]);

  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileFilter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileFilter, isMobileFilterOpen]);

  const desktopFilterSidebar = useMemo(
    () => (
      <ProductFilterSidebar
        brandFilters={brandFilters}
        selectedBrands={selectedBrands}
        onBrandToggle={toggleBrand}
        filterGroups={filterGroups}
        selectedFilterValues={selectedFilterValues}
        onFilterToggle={toggleFilter}
      />
    ),
    [
      brandFilters,
      filterGroups,
      selectedBrands,
      selectedFilterValues,
      toggleBrand,
      toggleFilter,
    ],
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
            productCount={listingProductCount}
            productCountLabel={listingProductCountLabel}
            sortValue={sortValue}
            viewMode={viewMode}
            onSortChange={handleSortChange}
            onViewModeChange={handleViewModeChange}
            onOpenFilters={openMobileFilter}
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

          {hasPaginationProducts ? (
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
              onClick={closeMobileFilter}
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
                  onClick={closeMobileFilter}
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
                  onBrandToggle={toggleBrand}
                  filterGroups={filterGroups}
                  selectedFilterValues={selectedFilterValues}
                  onFilterToggle={toggleFilter}
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function getSelectedFilterValues(searchParams: URLSearchParams) {
  const selectedValues: Record<string, string[]> = {};

  if (searchParams.get("instock") === "true") {
    selectedValues.availability = [
      ...(selectedValues.availability || []),
      "instock:true",
    ];
  }

  if (searchParams.get("instockVendor") === "true") {
    selectedValues.availability = [
      ...(selectedValues.availability || []),
      "instockVendor:true",
    ];
  }

  if (searchParams.get("nextDayShipping") === "true") {
    selectedValues.availability = [
      ...(selectedValues.availability || []),
      "nextDayShipping:true",
    ];
  }

  ["stockLevel", "partType", "material", "origin"].forEach((key) => {
    const value = searchParams.get(key);

    if (value) {
      selectedValues[key] = [value];
    }
  });

  return selectedValues;
}

function toggleFilterQueryValue(
  searchParams: URLSearchParams,
  queryKey: string,
  value: string,
) {
  if (queryKey === "availability") {
    const [booleanKey, booleanValue] = value.split(":");

    if (!booleanKey || booleanValue !== "true") {
      return;
    }

    if (searchParams.get(booleanKey) === "true") {
      searchParams.delete(booleanKey);
    } else {
      searchParams.set(booleanKey, "true");
    }

    return;
  }

  if (searchParams.get(queryKey) === value) {
    searchParams.delete(queryKey);
  } else {
    searchParams.set(queryKey, value);
  }
}
