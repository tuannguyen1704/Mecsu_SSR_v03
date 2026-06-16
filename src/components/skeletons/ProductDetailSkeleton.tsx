import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <main
      role="status"
      aria-label="Đang tải chi tiết sản phẩm"
      className="min-h-screen bg-white pb-20"
    >
      <div aria-hidden="true">
        <div className="mx-auto max-w-[1500px] px-4 py-8 pb-4 lg:px-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-3 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-3 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-4 py-4 lg:px-8">
          <section className="mb-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5 xl:col-span-4">
              <Skeleton className="aspect-square w-full rounded-3xl" />
              <div className="mt-4 grid grid-cols-5 gap-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
                <div className="mb-4 flex flex-wrap gap-3">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-28 rounded-full" />
                  <Skeleton className="h-7 w-32 rounded-full" />
                </div>
                <Skeleton className="mb-4 h-9 w-full max-w-3xl md:h-12" />
                <SkeletonText lines={2} className="mb-6 max-w-2xl" />
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                </div>
                <Skeleton className="mb-6 h-10 w-44" />
                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                </div>
                <div className="mb-6 flex items-center gap-3">
                  <Skeleton className="h-12 w-36 rounded-xl" />
                  <Skeleton className="h-12 w-40 rounded-xl" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex gap-3">
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
            <SkeletonText lines={6} />
          </section>

          <section>
            <Skeleton className="mb-5 h-8 w-56" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-3">
                  <Skeleton className="mb-4 aspect-square rounded-xl" />
                  <SkeletonText lines={2} className="mb-3" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
