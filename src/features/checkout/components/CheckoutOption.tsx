"use client";

import type { ReactNode } from "react";

interface CheckoutOptionProps {
  checked: boolean;
  title: string;
  description: string;
  children?: ReactNode;
  onSelect: () => void;
}

export function CheckoutOption({
  checked,
  title,
  description,
  children,
  onSelect,
}: CheckoutOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-sm border p-4 text-left transition-colors ${
        checked
          ? "border-[#005da4] bg-blue-50/50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            checked ? "border-[#005da4]" : "border-slate-300"
          }`}
        >
          {checked ? <span className="h-2.5 w-2.5 rounded-full bg-[#005da4]" /> : null}
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-black text-[#1a1a1a]">
            {title}
          </span>
          <span className="mt-1 block text-[13px] font-medium text-slate-500">
            {description}
          </span>
          {children}
        </span>
      </div>
    </button>
  );
}
