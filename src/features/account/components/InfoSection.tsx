"use client";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface InfoSectionProps {
  title: string;
  items: InfoItem[];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  iconColor?: "navy" | "yellow" | "green" | "blue" | "purple" | "red";
  showEditButton?: boolean;
  onEditClick?: () => void;
  className?: string;
}

const iconColorClasses = {
  navy: "bg-[#163F78]/10 text-[#163F78]",
  yellow: "bg-[#FFC72C]/20 text-[#B8941F]",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
};

export function InfoSection({
  title,
  items,
  icon: Icon,
  iconColor = "navy",
  showEditButton = false,
  onEditClick,
  className,
}: InfoSectionProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-[#E5EAF2] bg-white",
        className
      )}
    >
      {/* Section Header */}
      <div className="border-b border-[#E5EAF2] bg-slate-50/50 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  iconColorClasses[iconColor]
                )}
              >
                <Icon size={18} />
              </div>
            )}
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
          </div>
          {showEditButton && onEditClick && (
            <button
              type="button"
              onClick={onEditClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#163F78] hover:bg-[#163F78]/5 rounded-lg transition-colors"
            >
              <Pencil size={14} />
              <span>Chỉnh sửa</span>
            </button>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="p-4">
        {items.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <div
              key={index}
              className={cn(
                "flex items-start justify-between py-2.5",
                index < items.length - 1 && "border-b border-[#E5EAF2]"
              )}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {ItemIcon && (
                  <ItemIcon size={16} className="shrink-0 text-slate-400" />
                )}
                <span className="truncate text-sm text-slate-500">
                  {item.label}
                </span>
              </div>
              <span className="ml-4 max-w-[60%] text-right text-sm font-medium text-slate-900">
                {item.value || (
                  <span className="italic text-slate-400">Chưa cập nhật</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
