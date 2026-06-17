"use client";

import { useCallback, useRef, useState } from "react";
import { Package, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/features/products/services/search-products";
import type { SearchSuggestionItem } from "@/features/products/services/search-products";
import { useDebounce } from "@/hooks/useDebounce";

interface HeaderSearchProps {
  suggestions?: SearchSuggestionItem[];
  className?: string;
  placeholder?: string;
}

export default function HeaderSearch({
  suggestions = [],
  className = "",
  placeholder = "Tìm kiếm sản phẩm...",
}: HeaderSearchProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const searchSuggestions = getSearchSuggestions(
    suggestions,
    debouncedSearchValue,
    6,
  );
  const shouldShowDropdown = isFocused && searchValue.trim().length > 0;

  const submitSearch = useCallback(
    (keyword = searchValue) => {
      const normalized = keyword.trim();
      if (!normalized) return;
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(normalized)}`);
    },
    [router, searchValue],
  );

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        className={`relative flex items-center overflow-hidden rounded-md border-2 bg-white transition-all ${
          isFocused
            ? "border-brand-primary shadow-lg shadow-brand-primary/20"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <div className="flex items-center justify-center pl-4 pr-2">
          <Search
            size={20}
            className={`transition-colors ${
              isFocused ? "text-brand-primary" : "text-slate-400"
            }`}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submitSearch();
            }
            if (event.key === "Escape") {
              setIsFocused(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={placeholder}
          className="h-12 flex-1 border-none bg-transparent text-[15px] font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
          aria-label="Search products"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              inputRef.current?.focus();
            }}
            className="flex items-center justify-center rounded-full px-3 transition-colors hover:bg-slate-100"
            aria-label="Clear search"
          >
            <X size={18} className="text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {shouldShowDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-[1000] mt-2 overflow-hidden rounded-md border border-slate-200 bg-white shadow-2xl"
          >
            {searchSuggestions.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSearchValue(product.name);
                      setIsFocused(false);
                    }}
                    className="group flex w-full items-center gap-4 border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-slate-50"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1 text-sm font-black text-brand-secondary transition-colors group-hover:bg-slate-50">
                      {product.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[13px] font-bold leading-tight text-brand-secondary transition-colors group-hover:text-slate-900">
                        {product.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                          {product.brand}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[14px] font-black text-[#1a1a1a]">
                        {product.price.toLocaleString("vi-VN")} đ
                      </div>
                      {product.discount ? (
                        <div className="text-[11px] text-slate-400 line-through">
                          {product.originalPrice?.toLocaleString("vi-VN")} đ
                        </div>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <Package className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                <p className="text-[14px] font-medium text-slate-500">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <p className="mt-1 text-[12px] text-slate-400">
                  Thử từ khóa khác hoặc xem tất cả sản phẩm
                </p>
              </div>
            )}

            {searchSuggestions.length > 0 && (
              <div className="border-t border-slate-200 bg-slate-50/50 p-3">
                <button
                  onClick={() => submitSearch(searchValue)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-secondary py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#002a55]"
                >
                  <Search size={16} />
                  Xem tất cả kết quả cho &quot;{searchValue}&quot;
                </button>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-slate-100 p-2">
              <span className="px-2 text-[11px] text-slate-400">
                Nhấn Enter để tìm kiếm
              </span>
              <button
                onClick={() => submitSearch(searchValue)}
                className="px-2 text-[11px] font-medium text-brand-primary transition-colors hover:text-[#002a55]"
              >
                Tìm ngay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
