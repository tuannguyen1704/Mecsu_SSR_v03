"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type VietnamAddressOption = {
  code: string;
  label: string;
};

type VietnamAddressSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  options: VietnamAddressOption[];
  disabled?: boolean;
  error?: string;
  onChange: (option: VietnamAddressOption) => void;
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function VietnamAddressSelect({
  label,
  placeholder,
  value,
  options,
  disabled = false,
  error,
  onChange,
}: VietnamAddressSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.code === value);
  const filteredOptions = useMemo(() => {
    const normalizedKeyword = normalizeText(keyword.trim());
    if (!normalizedKeyword) return options;

    return options.filter((option) =>
      normalizeText(option.label).includes(normalizedKeyword),
    );
  }, [keyword, options]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setKeyword("");
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setKeyword("");
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <label className="mb-2 block text-[11px] font-bold tracking-wider text-slate-600 uppercase">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen((current) => !current);
          setKeyword("");
        }}
        className={`flex h-12 w-full items-center justify-between gap-3 rounded-md border bg-white px-4 text-left text-sm outline-none transition-all ${
          error
            ? "border-red-400"
            : "border-[#E2E8F0] hover:border-slate-300 focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/10"
        } disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? "truncate text-slate-800" : "truncate text-slate-400"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}

      {isOpen && !disabled ? (
        <div className="absolute z-[80] mt-2 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                autoFocus
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder={`Tìm ${label.toLocaleLowerCase("vi-VN")}...`}
                className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/10"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto overscroll-contain p-1.5">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setKeyword("");
                  }}
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    option.code === value
                      ? "bg-[#163F78] text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>
                  {option.code === value ? <Check size={16} className="shrink-0" /> : null}
                </button>
              ))
            ) : (
              <p className="px-3 py-6 text-center text-sm text-slate-500">
                Không tìm thấy kết quả
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
