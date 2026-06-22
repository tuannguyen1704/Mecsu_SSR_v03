"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Package, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import { getSearchSuggestions } from "@/features/products/services/search-products";
import type { SearchSuggestionItem } from "@/features/products/services/search-products";

type HeroSearchBoxProps = {
  placeholder: string;
  suggestions: SearchSuggestionItem[];
};

export function HeroSearchBox({ placeholder, suggestions }: HeroSearchBoxProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const searchSuggestions = getSearchSuggestions(
    suggestions,
    debouncedSearchValue,
    6,
  );
  const shouldShowDropdown = isFocused && searchValue.trim().length > 0;

  const handleSearch = useCallback(
    (keyword: string) => {
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword) return;
      setIsFocused(false);
      setSearchValue("");
      inputRef.current?.blur();
      router.push(`/search?q=${encodeURIComponent(trimmedKeyword)}`);
    },
    [router],
  );

  const handleSubmit = useCallback(() => {
    handleSearch(searchValue);
  }, [handleSearch, searchValue]);

  const handleSuggestionSelect = (product: SearchSuggestionItem) => {
    setSearchValue(product.name);
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    if (shouldShowDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shouldShowDropdown]);

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        className={`relative flex h-12 min-w-0 items-center overflow-hidden rounded-md border-2 bg-white transition-all sm:h-[56px] lg:h-[60px] ${
          isFocused
            ? "border-brand-primary shadow-lg shadow-brand-primary/20"
            : "border-white/50 hover:border-slate-300"
        }`}
      >
        <div className="flex items-center justify-center pr-2 pl-3 sm:pl-4">
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
              handleSubmit();
            } else if (event.key === "Escape") {
              setIsFocused(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 border-none bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 sm:text-[15px]"
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
            className="absolute top-full right-0 left-0 z-[1000] mt-2 overflow-hidden rounded-md border border-slate-200 bg-white text-left shadow-2xl"
          >
            {searchSuggestions.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {searchSuggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionSelect(product)}
                  className="group flex w-full min-w-0 items-center gap-3 border-b border-slate-100 px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-slate-50 sm:gap-4 sm:px-4"
                  >
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1 transition-colors duration-200 group-hover:bg-slate-50">
                      <Image
                        src={product.image || getSeededCategoryImage(product.id)}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1 mix-blend-multiply"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-[13px] leading-tight font-bold text-brand-secondary transition-colors duration-200 group-hover:text-slate-900">
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
                        <div className="shrink-0 text-left sm:text-right">
                          <div className="text-[14px] font-black text-[#1a1a1a]">
                            {product.price.toLocaleString("vi-VN")} đ
                          </div>
                          {product.discount && product.discount > 0 ? (
                            <div className="text-[11px] text-slate-400 line-through">
                              {product.originalPrice?.toLocaleString("vi-VN")} đ
                            </div>
                          ) : null}
                        </div>
                      </div>
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

            {searchSuggestions.length > 0 ? (
              <div className="border-t border-slate-200 bg-slate-50/50 p-3">
                <button
                  onClick={() => handleSearch(searchValue)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-secondary py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#002a55]"
                >
                  <Search size={16} />
                  Xem tất cả kết quả cho &quot;{searchValue}&quot;
                </button>
              </div>
            ) : null}

            <div className="flex items-center justify-between border-t border-slate-100 p-2">
              <span className="px-2 text-[11px] text-slate-400">
                Nhấn Enter để tìm kiếm
              </span>
              <button
                onClick={() => handleSearch(searchValue)}
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
