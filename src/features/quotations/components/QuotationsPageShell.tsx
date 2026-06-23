import { Suspense } from "react";
import { QuotationsListClient } from "./QuotationsListClient";

export function QuotationsPageShell() {
  return (
    <Suspense fallback={<QuotationsPageFallback />}>
      <QuotationsListClient />
    </Suspense>
  );
}

function QuotationsPageFallback() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="h-20 animate-pulse rounded-xl bg-slate-100" />
      <div className="h-28 animate-pulse rounded-xl bg-slate-100" />
      <div className="h-44 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}
