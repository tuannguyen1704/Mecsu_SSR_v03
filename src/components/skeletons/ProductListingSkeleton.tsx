import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

interface ProductListingSkeletonProps {
  variant?: "subcategory" | "search";
}

export function ProductListingSkeleton({
  variant = "subcategory",
}: ProductListingSkeletonProps) {
  const isSearch = variant === "search";

  return (
    <main
      role="status"
      aria-label={isSearch ? "Đang tải kết quả tìm kiếm" : "Đang tải danh sách sản phẩm"}
      className="mx-auto max-w-[1600px] px-6 py-8 lg:px-12"
    >
      <div aria-hidden="true">
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-3 rounded-full" />
          <Skeleton className="h-4 w-36" />
          {!isSearch ? (
            <>
              <Skeleton className="h-4 w-3 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </>
          ) : null}
        </div>

        <section className="mb-8">
          {isSearch ? <Skeleton className="mb-3 h-4 w-32" /> : null}
          <Skeleton className="mb-3 h-9 w-72 md:h-11 md:w-96" />
          <SkeletonText lines={2} className="max-w-3xl" />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <Skeleton className="mb-5 h-6 w-32" />
            {Array.from({ length: 5 }).map((_, groupIndex) => (
              <div key={groupIndex} className="border-t border-slate-100 py-5 first:border-t-0 first:pt-0">
                <Skeleton className="mb-4 h-5 w-36" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((__, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <section className="min-w-0">
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-28 lg:hidden" />
                <Skeleton className="h-5 w-44" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <Skeleton className="mb-4 aspect-square w-full rounded-xl" />
      <Skeleton className="mb-2 h-3 w-16" />
      <SkeletonText lines={2} className="mb-3" />
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="mb-3 h-4 w-28" />
      <Skeleton className="mb-4 h-6 w-24" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
