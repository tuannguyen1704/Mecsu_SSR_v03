"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import type { BrandFilterGroup } from "../types";

export function BrandFilterSidebar({
  filters,
  selected,
  onToggle,
  mobile = false,
}: {
  filters: BrandFilterGroup[];
  selected: string[];
  onToggle: (key: string) => void;
  mobile?: boolean;
}) {
  return (
    <aside
      className={
        mobile
          ? "w-full bg-white"
          : "sticky top-2 h-[calc(100vh-8px)] w-[300px] overflow-hidden border-r border-slate-200 bg-white"
      }
    >
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
        <Filter size={16} />
        <span className="text-sm font-semibold uppercase text-[#0F172A]">
          Bộ lọc nâng cao
        </span>
      </div>
      <div
        className={
          mobile
            ? "pb-6"
            : "custom-scrollbar h-[calc(100%-57px)] overflow-y-auto pb-10"
        }
      >
        {filters.map((group) => (
          <BrandFilterGroupView
            key={group.title}
            group={group}
            selected={selected}
            onToggle={onToggle}
          />
        ))}
      </div>
    </aside>
  );
}

function BrandFilterGroupView({
  group,
  selected,
  onToggle,
}: {
  group: BrandFilterGroup;
  selected: string[];
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50"
      >
        <span className="text-sm font-semibold uppercase text-[#0F172A]">
          {group.title}
        </span>
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open ? (
        <div className="space-y-2 px-5 pb-5">
          {group.values.map((value) => {
            const key = `${group.title}:${value.label}`;
            return (
              <label key={key} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(key)}
                  onChange={() => onToggle(key)}
                  className="mt-0.5 h-4 w-4 appearance-none border border-slate-300 checked:border-[#163F78] checked:bg-[#163F78]"
                />
                <span className="min-w-0 flex-1 text-sm text-[#475569]">
                  {value.label}
                </span>
                <span className="shrink-0 text-xs text-[#94A3B8]">
                  ({value.count})
                </span>
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
