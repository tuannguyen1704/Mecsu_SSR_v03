"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Lock, X } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import {
  CART_ITEM_ADDED_EVENT,
  type CartItemAddedDetail,
} from "../services/cart-feedback";

export function AddToCartPopup() {
  const [item, setItem] = useState<CartItemAddedDetail | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleCartItemAdded = (event: Event) => {
      const cartEvent = event as CustomEvent<CartItemAddedDetail>;
      setItem(cartEvent.detail);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setItem(null);
      }, 1000);
    };

    window.addEventListener(CART_ITEM_ADDED_EVENT, handleCartItemAdded);

    return () => {
      window.removeEventListener(CART_ITEM_ADDED_EVENT, handleCartItemAdded);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!item) return null;

  const productImage = item.productImage || getSeededPlaceholder(item.productName);

  return (
    <div className="absolute top-[90px] right-4 z-[5000] w-[min(390px,calc(100vw-2rem))] rounded-md border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.18)] sm:right-6 lg:right-10">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={21} />
        </div>
        <h2 className="min-w-0 flex-1 text-[18px] leading-tight font-bold text-[#111827]">
          Thêm vào giỏ hàng
        </h2>
        <button
          type="button"
          onClick={() => setItem(null)}
          className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Đóng thông báo thêm vào giỏ hàng"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 flex gap-3.5">
        <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-sm border border-slate-200 bg-white p-2">
          <Image
            src={productImage}
            alt={item.productName}
            fill
            sizes="72px"
            className="object-contain p-2"
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="line-clamp-3 text-[14px] leading-5 font-semibold text-[#007185]">
            {item.productName}
          </p>
          <p className="mt-2 text-[14px] font-bold text-[#111827]">SL: {item.quantity}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <Link
          href="/thanh-toan"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#9a4b1f] px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#803d18]"
        >
          <Lock size={15} />
          Thanh toán ngay
        </Link>
        <Link
          href="/gio-hang"
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[#163F78] bg-white px-4 text-[14px] font-bold text-[#163F78] transition-colors hover:bg-slate-50"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
}
