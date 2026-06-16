"use client";

import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

interface HeaderCartButtonProps {
  cartCount: number;
  cartTotal: number;
}

export default function HeaderCartButton({
  cartCount,
  cartTotal,
}: HeaderCartButtonProps) {
  return (
    <div className="relative">
      <Link
        href="/gio-hang"
        className="group relative flex items-center gap-4"
        aria-label="Đi tới giỏ hàng"
      >
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 shadow-lg ring-4 ring-slate-900/5 transition-all group-hover:bg-[#24465B]">
            <ShoppingCart size={20} className="text-brand-primary" />
          </div>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-primary text-[10px] font-bold text-[#24465B] shadow-sm"
              >
                {cartCount}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="hidden text-left leading-tight xl:block">
          <div className="mb-1 text-[10px] font-medium capitalize leading-none tracking-widest text-slate-400">
            Giỏ hàng
          </div>
          <div className="text-sm font-bold italic tracking-tighter text-[#24465B]">
            {cartCount === 0 ? "0" : cartTotal.toLocaleString("vi-VN")} VNĐ
          </div>
        </div>
      </Link>
    </div>
  );
}
