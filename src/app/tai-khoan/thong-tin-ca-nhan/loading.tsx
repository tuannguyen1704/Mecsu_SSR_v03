export default function AccountInfoLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-64 bg-slate-200 rounded mb-2" />
        <div className="h-4 w-96 bg-slate-200 rounded" />
      </div>

      {/* Two column cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Personal Info card */}
        <div className="rounded-[20px] border border-[#E5EAF2] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5EAF2] bg-slate-50">
            <div className="h-9 w-9 bg-slate-200 rounded-lg" />
            <div className="h-5 w-40 bg-slate-200 rounded" />
          </div>
          <div className="p-4 space-y-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#E5EAF2] last:border-0">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-4 w-40 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Business Info card */}
        <div className="rounded-[20px] border border-[#E5EAF2] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5EAF2] bg-slate-50">
            <div className="h-9 w-9 bg-slate-200 rounded-lg" />
            <div className="h-5 w-44 bg-slate-200 rounded" />
          </div>
          <div className="p-4 space-y-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#E5EAF2] last:border-0">
                <div className="h-4 w-36 bg-slate-200 rounded" />
                <div className="h-4 w-48 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security section */}
      <div className="space-y-3">
        <div className="h-6 w-56 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-[#E5EAF2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="h-11 w-11 bg-slate-200 rounded-2xl mb-4" />
              <div className="h-4 w-28 bg-slate-200 rounded mb-2" />
              <div className="h-5 w-32 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
