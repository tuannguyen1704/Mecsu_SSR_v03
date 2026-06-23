import type { Product } from "@/features/products/types/product";
import type { Category } from "@/features/categories/types/category";
import { CategoryListingClient } from "@/features/categories/components/CategoryListingClient";
import {
  SubcategoryExploreMore,
  SubcategoryLowerSections,
  SubcategoryTopSellers,
} from "@/features/categories/components/subcategory-lower";
import {
  getExploreMoreLinks,
  getTopSellerProducts,
} from "@/features/categories/data/subcategory-content";
import { getCategoryTrailBySearchQuery } from "@/features/categories/services/category-service";
import { getHeaderSearchProducts } from "@/features/products/services/product-service";
import { toSlug } from "@/lib/routing";
import { SearchBreadcrumb } from "./SearchBreadcrumb";
import { SearchEmptyState } from "./SearchEmptyState";
import { RelatedSubcategoryCarousel } from "@/features/categories/components/RelatedSubcategoryCarousel";

interface SearchPageShellProps {
  query: string;
  products: Product[];
  categories: Category[];
}

export function SearchPageShell({ query, products, categories }: SearchPageShellProps) {
  const trimmedQuery = query.trim();
  const totalLabel = `${products.length.toLocaleString("vi-VN")} sản phẩm`;
  const categoryTrail = getCategoryTrailBySearchQuery(trimmedQuery);
  const lowerSectionCategory = categoryTrail?.category ?? {
    id: "search-results",
    name: "Sản phẩm công nghiệp",
    slug: "search-results",
    icon: "Search",
    subcategories: [],
  };
  const lowerSectionSubcategory = categoryTrail?.subcategory ?? {
    id: `search-${toSlug(trimmedQuery)}`,
    name: trimmedQuery,
    slug: toSlug(trimmedQuery),
    href: `/search?q=${encodeURIComponent(trimmedQuery)}`,
  };
  const recommendationProducts = getHeaderSearchProducts(12);
  const recommendationTopSellers = getTopSellerProducts(recommendationProducts);
  const recommendationLinks = getExploreMoreLinks(
    lowerSectionCategory,
    lowerSectionSubcategory,
    recommendationProducts,
  );

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1600px] px-6 py-8 lg:px-12">
      <SearchBreadcrumb query={trimmedQuery} />

      {!trimmedQuery ? (
        <SearchEmptyState type="empty-query" />
      ) : (
        <>
          <section className="mb-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#1a1a1a] md:text-3xl">
                  Kết quả tìm kiếm cho:{" "}
                  <span className="text-[#005da4]">&quot;{trimmedQuery}&quot;</span>
                </h1>
                <p className="mt-2 text-[14px] font-medium text-slate-500">
                  {products.length > 0
                    ? `${products.length.toLocaleString("vi-VN")} sản phẩm được tìm thấy`
                    : "Không có sản phẩm nào phù hợp"}
                </p>
              </div>
            </div>
          </section>

          <RelatedSubcategoryCarousel query={trimmedQuery} categories={categories} />
          <CategoryListingClient
            title={products.length > 0 ? trimmedQuery : "Sản phẩm tìm thấy"}
            products={products}
            productCountLabel={totalLabel}
            emptyStateQuery={products.length === 0 ? trimmedQuery : undefined}
          />

          {products.length > 0 ? (
            <SubcategoryLowerSections
              category={lowerSectionCategory}
              subcategory={lowerSectionSubcategory}
              products={products}
            />
          ) : (
            <div className="mt-16 bg-white">
              <SubcategoryTopSellers
                subcategoryName={trimmedQuery}
                products={recommendationTopSellers}
                title="Shop Top Sellers"
              />
              <SubcategoryExploreMore links={recommendationLinks} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
