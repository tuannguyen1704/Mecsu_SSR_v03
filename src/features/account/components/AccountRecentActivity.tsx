import Link from "next/link";
import { ArrowRight, FileText, Package } from "lucide-react";
import type { AccountActivity } from "../types/account";

interface AccountRecentActivityProps {
  title: string;
  href: string;
  items: AccountActivity[];
  type: "orders" | "quotes";
}

export function AccountRecentActivity({
  title,
  href,
  items,
  type,
}: AccountRecentActivityProps) {
  const Icon = type === "orders" ? Package : FileText;

  return (
    <section className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-[#163F78] transition-colors hover:text-[#1a4a8a]"
        >
          Xem tất cả
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E5EAF2] p-4 transition-all hover:border-[#163F78]/30"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                <Icon size={20} className="text-slate-400" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900">{item.title}</span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#163F78]">
                    {item.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">
                  {item.date} - {item.description}
                </p>
              </div>
            </div>
            {item.amount ? (
              <span className="text-lg font-bold text-[#163F78]">{item.amount}</span>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
