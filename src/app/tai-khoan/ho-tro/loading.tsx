export default function SupportLoading() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-8 w-64 bg-slate-200 rounded mb-2" />
        <div className="h-4 w-96 bg-slate-200 rounded" />
      </div>

      {/* Hero */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#173E75] to-[#245A9C] p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-32 bg-white/20 rounded-full" />
            <div className="h-10 w-80 bg-white/20 rounded" />
            <div className="h-4 w-full bg-white/20 rounded" />
            <div className="flex gap-2 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-7 w-20 bg-white/20 rounded-full" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-white/10 rounded-[20px] p-3">
              <div className="bg-white rounded-[16px] p-2">
                <div className="flex gap-2">
                  <div className="h-12 flex-1 bg-slate-200 rounded-[14px]" />
                  <div className="h-12 w-32 bg-slate-200 rounded-[14px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick channels */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-[18px] border border-[#E3EAF3] bg-white p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-11 w-11 bg-slate-200 rounded-full shrink-0" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-3 w-40 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="h-9 w-24 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>

      {/* FAQ + Form */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_0.9fr]">
        {/* FAQ */}
        <div className="rounded-[20px] border border-[#E5EAF2] bg-white p-5">
          <div className="h-5 w-40 bg-slate-200 rounded mb-1" />
          <div className="h-4 w-72 bg-slate-200 rounded mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-slate-200 rounded-full" />
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#E8EEF5] bg-[#FCFDFE] p-4">
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                {i === 0 && <div className="h-3 w-3/4 bg-slate-200 rounded" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="rounded-[20px] border border-[#E5EAF2] bg-white p-5">
          <div className="h-5 w-36 bg-slate-200 rounded mb-1" />
          <div className="h-4 w-52 bg-slate-200 rounded mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-11 bg-slate-200 rounded-xl" />
              </div>
            ))}
            <div className="h-12 bg-slate-200 rounded-xl mt-4" />
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-3">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-[20px] border border-[#E5EAF2] bg-white p-4">
              <div className="h-11 w-11 bg-slate-200 rounded-2xl mb-3" />
              <div className="h-4 w-36 bg-slate-200 rounded mb-2" />
              <div className="h-3 w-full bg-slate-200 rounded mb-3" />
              <div className="h-3 w-24 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
