import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function BlogDetailSkeleton() {
  return (
    <main
      role="status"
      aria-label="Đang tải bài viết"
      className="min-h-screen bg-slate-50"
    >
      <div aria-hidden="true">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-3 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-3 rounded-full" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1100px] px-4 pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-12 lg:pb-12">
            <Skeleton className="mb-6 h-5 w-44" />
            <div className="mb-5 flex flex-wrap gap-3">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-7 w-24" />
            </div>
            <Skeleton className="mb-5 h-12 w-full max-w-4xl md:h-16" />
            <SkeletonText lines={3} className="max-w-3xl" />
            <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </section>

        <section className="bg-white pb-10">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-[280px] rounded-[24px] md:h-[420px] lg:h-[500px]" />
          </div>
        </section>

        <section className="py-10 lg:py-14">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
            <article className="min-w-0 space-y-8">
              <div className="rounded-r-2xl border-l-4 border-[#FFC928] bg-white p-6">
                <SkeletonText lines={3} />
              </div>
              <div className="space-y-6 rounded-3xl bg-white p-6">
                <Skeleton className="h-8 w-72 max-w-full" />
                <SkeletonText lines={6} />
                <Skeleton className="h-8 w-56" />
                <SkeletonText lines={5} />
                <Skeleton className="h-40 rounded-2xl" />
              </div>
              <Skeleton className="h-44 rounded-3xl" />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
                <Skeleton className="mb-5 h-6 w-40" />
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-white py-10 lg:py-12">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <Skeleton className="mb-3 h-8 w-52" />
            <Skeleton className="mb-6 h-4 w-96 max-w-full" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Skeleton className="mb-4 aspect-[16/10] rounded-xl" />
                  <SkeletonText lines={3} className="mb-4" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-40 rounded-3xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
