import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function CategoryOverviewSkeleton() {
  return (
    <main
      role="status"
      aria-label="Đang tải nội dung danh mục"
      className="mx-auto max-w-[1600px] px-6 py-12 lg:px-12"
    >
      <div aria-hidden="true">
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-3 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>

        <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <Skeleton className="mb-4 h-8 w-56 md:h-10 md:w-80" />
          <SkeletonText lines={3} className="max-w-3xl" />
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <Skeleton className="mb-6 h-8 w-64" />
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={index === 0 ? "h-6 w-52" : "h-6 w-44"}
                />
              ))}
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div className="space-y-3">
                <Skeleton className="h-8 w-72" />
                <Skeleton className="h-4 w-96 max-w-full" />
              </div>
              <Skeleton className="hidden h-10 w-28 md:block" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <Skeleton className="mb-4 aspect-square w-full rounded-xl" />
                  <Skeleton className="mb-2 h-5 w-4/5" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
