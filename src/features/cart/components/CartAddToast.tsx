"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import {
  CART_ITEM_ADDED_EVENT,
  type CartItemAddedDetail,
} from "../services/cart-feedback";

export function CartAddToast() {
  const [message, setMessage] = useState<CartItemAddedDetail | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleCartItemAdded = (event: Event) => {
      const cartEvent = event as CustomEvent<CartItemAddedDetail>;
      setMessage(cartEvent.detail);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setMessage(null);
      }, 2400);
    };

    window.addEventListener(CART_ITEM_ADDED_EVENT, handleCartItemAdded);

    return () => {
      window.removeEventListener(CART_ITEM_ADDED_EVENT, handleCartItemAdded);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed right-4 bottom-5 z-[600] w-[min(360px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 shadow-2xl">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={21} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[13px] font-black text-[#1a1a1a]">
            <ShoppingCart size={15} className="text-[#005da4]" />
            Đã thêm vào giỏ hàng
          </div>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug font-medium text-slate-600">
            {message.quantity} x {message.productName}
          </p>
        </div>
      </div>
    </div>
  );
}
