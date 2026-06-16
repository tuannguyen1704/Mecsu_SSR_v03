"use client";

import { Menu, ShoppingCart, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { HeaderCategory } from "@/features/categories/data/header-categories";
import type { Product } from "@/features/products/types/product";
import HeaderSearch from "./HeaderSearch";

interface MobileHeaderProps {
  isOpen: boolean;
  categories: HeaderCategory[];
  cartCount: number;
  products: Product[];
  onAccountClick: () => void;
  onOpenChange: (open: boolean) => void;
}

export default function MobileHeader({
  isOpen,
  categories,
  cartCount,
  products,
  onAccountClick,
  onOpenChange,
}: MobileHeaderProps) {
  return (
    <div className="ml-auto flex items-center gap-4 md:hidden">
      <button
        type="button"
        onClick={onAccountClick}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 shadow-sm"
        aria-label="Mở đăng nhập"
      >
        <User size={20} className="text-slate-500" />
      </button>
      <Link
        href="/gio-hang"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 shadow-lg ring-4 ring-slate-900/5"
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
        className="flex h-11 w-11 items-center justify-center rounded-md bg-[#163F78] text-white shadow-md"
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
              className="fixed inset-0 z-[500] bg-slate-900/50 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed bottom-0 right-0 top-0 z-[501] flex w-[min(390px,100vw)] flex-col bg-white shadow-2xl"
            >
              <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
                <Link href="/" onClick={() => onOpenChange(false)}>
                  <Image
                    src="/mecsu-sologan.png"
                    alt="MECSU Logo"
                    width={160}
                    height={58}
                    className="h-14 w-auto object-contain"
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

              <div className="border-b border-slate-100 p-5">
                <HeaderSearch products={products} />
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
                    <div className="grid grid-cols-2 gap-2 border-b border-slate-100 bg-slate-50 p-4">
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
