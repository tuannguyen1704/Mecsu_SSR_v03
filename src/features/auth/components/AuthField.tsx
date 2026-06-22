"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AuthFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  type?: string;
  placeholder?: string;
  error?: string;
  trailing?: ReactNode;
  autoComplete?: string;
  compact?: boolean;
}

export default function AuthField({
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
  placeholder,
  error,
  trailing,
  autoComplete,
  compact = false,
}: AuthFieldProps) {
  return (
    <label className="block">
      <span
        className={`${compact ? "mb-1.5" : "mb-2"} block text-[11px] font-bold tracking-wider text-slate-600 uppercase`}
      >
        {label}
      </span>
      <span className="relative block">
        <Icon
          size={17}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
        />
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${compact ? "h-11" : "h-12"} w-full rounded-xl border bg-white pr-12 pl-11 text-sm outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#003B73] focus:ring-2 focus:ring-[#003B73]/10 ${
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0]"
          }`}
        />
        {trailing ? (
          <span className="absolute top-1/2 right-3 -translate-y-1/2">{trailing}</span>
        ) : null}
      </span>
      {error ? <span className="mt-1.5 block text-[12px] text-red-600">{error}</span> : null}
    </label>
  );
}
