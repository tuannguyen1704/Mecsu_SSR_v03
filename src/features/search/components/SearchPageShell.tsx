import type { Product } from "@/features/products/types/product";
import { CategoryListingClient } from "@/features/categories/components/CategoryListingClient";
import { SearchBreadcrumb } from "./SearchBreadcrumb";
import { SearchEmptyState } from "./SearchEmptyState";

interface SearchPageShellProps {
  query: string;
  products: Product[];
}

export function SearchPageShell({ query, products }: SearchPageShellProps) {
  const trimmedQuery = query.trim();
  const totalLabel = `${products.length.toLocaleString("vi-VN")} sản phẩm`;

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-12">
      <SearchBreadcrumb />

      {!trimmedQuery ? (
        <SearchEmptyState type="empty-query" />
      ) : (
        <>
          <section className="mb-8">
            <p className="mb-2 text-[12px] font-black tracking-[0.22em] text-[#005da4] uppercase">
              Search Results
            </p>
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

          {products.length > 0 ? (
            <CategoryListingClient
              title="Search Results"
              products={products}
              productCountLabel={totalLabel}
            />
          ) : (
            <SearchEmptyState query={trimmedQuery} type="no-results" />
          )}
        </>
      )}
    </main>
  );
}
