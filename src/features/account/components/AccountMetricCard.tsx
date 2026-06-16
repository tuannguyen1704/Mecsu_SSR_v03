import type { AccountMetric } from "../types/account";
import { accountIconMap } from "./account-icons";

const toneClasses = {
  navy: "bg-[#163F78]/10 text-[#163F78]",
  yellow: "bg-[#FFC72C]/20 text-[#B8941F]",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
};

export function AccountMetricCard({ metric }: { metric: AccountMetric }) {
  const Icon = accountIconMap[metric.icon];

  return (
    <article className="group rounded-md border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#163F78]/30 lg:p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${toneClasses[metric.tone]}`}
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-slate-900 lg:text-3xl">
          {metric.value}
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{metric.label}</p>
      </div>
    </article>
  );
}
