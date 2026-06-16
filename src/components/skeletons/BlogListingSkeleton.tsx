import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

export function BlogListingSkeleton() {
  return (
    <main
      role="status"
      aria-label="Đang tải Resource Hub"
      className="min-h-screen bg-slate-50"
    >
      <div aria-hidden="true">
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
                <Skeleton className="mb-4 h-7 w-48 rounded-full" />
                <Skeleton className="mb-4 h-10 w-64" />
                <SkeletonText lines={2} className="max-w-2xl" />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Skeleton className="h-20 w-32 rounded-xl" />
                  <Skeleton className="h-20 w-32 rounded-xl" />
                </div>
              </div>
              <Skeleton className="h-[260px] rounded-2xl lg:h-[320px]" />
            </div>
          </div>
        </section>

        <section className="bg-white py-8 lg:py-10">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <Skeleton className="mb-2 h-6 w-40" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>
            <div className="grid overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <Skeleton className="min-h-[260px] rounded-none lg:min-h-[360px]" />
              <div className="p-6 lg:p-8">
                <Skeleton className="mb-4 h-4 w-28" />
                <Skeleton className="mb-4 h-8 w-full" />
                <SkeletonText lines={4} className="mb-5" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <Skeleton className="mt-7 h-5 w-32" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-28 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-12 w-full max-w-sm rounded-xl" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                <Skeleton className="mb-4 aspect-[16/10] rounded-xl" />
                <Skeleton className="mb-3 h-4 w-24" />
                <SkeletonText lines={3} className="mb-4" />
                <Skeleton className="h-5 w-36" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-10 rounded-lg" />
            ))}
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
