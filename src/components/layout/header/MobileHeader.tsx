"use client";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { HeaderCategory } from "@/features/categories/data/header-categories";
import type { SearchSuggestionItem } from "@/features/products/services/search-products";
import HeaderSearch from "./HeaderSearch";

interface MobileHeaderProps {
  isOpen: boolean;
  categories: HeaderCategory[];
  cartCount: number;
  suggestions: SearchSuggestionItem[];
  onAccountClick: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function MobileHeader({
  isOpen,
  categories,
  cartCount,
  suggestions,
  onAccountClick,
  onOpenChange,
}: MobileHeaderProps) {
  return (
    <div className="ml-auto flex min-w-0 items-center gap-2 xl:hidden">
      <button
        type="button"
        onClick={onAccountClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 shadow-sm sm:h-11 sm:w-11"
        aria-label="Mở đăng nhập"
      >
        <User size={20} className="text-slate-500" />
      </button>
      <Link
        href="/gio-hang"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 shadow-lg ring-2 ring-slate-900/5 sm:h-11 sm:w-11 sm:ring-4"
        aria-label="Đi tới giỏ hàng"
      >
        <ShoppingCart size={20} className="text-brand-primary" />
        {cartCount > 0 ? (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-primary text-[10px] font-bold text-[#24465B]">
            {cartCount}
          </span>
        ) : null}
      </Link>
      <button
        onClick={() => onOpenChange(true)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#163F78] text-white shadow-md sm:h-11 sm:w-11"
        aria-label="Open menu"
      >
        <Menu size={22} className="text-brand-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
              className="fixed inset-0 z-[500] bg-slate-950/60"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-0 z-[501] flex w-screen max-w-none flex-col bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              data-modal-scroll-lock="true"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 sm:h-20 sm:px-5">
                <Link href="/" onClick={() => onOpenChange(false)}>
                  <Image
                    src="/mecsu-sologan.png"
                    alt="MECSU Logo"
                    width={160}
                    height={58}
                    className="h-12 w-auto object-contain sm:h-14"
                  />
                </Link>
                <button
                  onClick={() => onOpenChange(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="border-b border-slate-100 p-4 sm:p-5">
                <HeaderSearch suggestions={suggestions} />
              </div>

              <div className="no-scrollbar flex-1 overflow-y-auto bg-slate-50 py-4">
                <div className="px-5 pb-3 text-[11px] font-black uppercase tracking-[0.28em] text-slate-400">
                  Danh mục
                </div>
                {categories.map((category) => (
                  <details key={category.id} className="group bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between border-b border-slate-100 px-5 py-3 text-[13px] font-bold text-slate-700">
                      {category.name}
                      <span className="text-brand-secondary group-open:rotate-90">›</span>
                    </summary>
                    <div className="grid grid-cols-1 gap-2 border-b border-slate-100 bg-slate-50 p-4 min-[390px]:grid-cols-2">
                      {category.subcategories.slice(0, 12).map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => onOpenChange(false)}
                          className="rounded border border-slate-200 bg-white px-3 py-2 text-left text-[12px] font-semibold text-slate-600"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
