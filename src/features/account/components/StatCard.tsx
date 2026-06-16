import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  iconColor?: "navy" | "yellow" | "green" | "blue" | "purple" | "red";
}

const iconColorClasses = {
  navy: "bg-[#163F78]/10 text-[#163F78]",
  yellow: "bg-[#FFC72C]/20 text-[#B8941F]",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
};

export function StatCard({ icon: Icon, value, label, iconColor = "navy" }: StatCardProps) {
  return (
    <div className="bg-white rounded-md border border-slate-200 p-3 lg:p-3.5 hover:border-[#163F78]/30 transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${iconColorClasses[iconColor]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl lg:text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
