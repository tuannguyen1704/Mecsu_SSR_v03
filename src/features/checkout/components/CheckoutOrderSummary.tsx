"use client";

import Link from "next/link";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import type { CartItem } from "@/features/cart/types/cart";
import { formatCartPrice } from "@/features/cart/utils/cart-format";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  vat: number;
  grandTotal: number;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  shippingCost,
  vat,
  grandTotal,
}: CheckoutOrderSummaryProps) {
  return (
    <aside className="h-fit rounded-sm border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
      <h2 className="mb-5 text-xl font-black text-[#1a1a1a]">Tóm tắt đơn hàng</h2>

      <div className="max-h-[380px] space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <article key={item.productId} className="flex gap-3 border-b border-slate-100 pb-4 last:border-b-0">
            <Link
              href={`/san-pham/${item.slug || item.productId}`}
              className="flex h-16 w-16 shrink-0 items-center justify-center bg-slate-50 p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image || getSeededPlaceholder(item.productId)}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/san-pham/${item.slug || item.productId}`}
                className="line-clamp-2 text-[13px] font-bold text-[#005da4] hover:underline"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-[12px] font-bold text-slate-400">
                SL: {item.quantity}
              </p>
            </div>
            <div className="text-right text-[13px] font-black text-[#1a1a1a]">
              {formatCartPrice(item.price * item.quantity)}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 text-[14px] font-bold">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span>{formatCartPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span>{formatCartPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">VAT</span>
          <span>{formatCartPrice(vat)}</span>
        </div>
      </div>

      <div className="mt-5 flex justify-between border-t border-slate-200 pt-5 text-[18px] font-black text-[#1a1a1a]">
        <span>Grand total</span>
        <span>{formatCartPrice(grandTotal)}</span>
      </div>
    </aside>
  );
}
