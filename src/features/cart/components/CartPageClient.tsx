"use client";

import Link from "next/link";
import { Building2, ShoppingBag, X } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { getProductByIdOrSlug } from "@/features/products/services/product-service";
import { useCart } from "../hooks/useCart";
import { formatCartPrice } from "../utils/cart-format";
import { CartCommerceSections, CartEmptyState } from "./CartEmptyState";
import { CartQuantityControl } from "./CartQuantityControl";

export function CartPageClient() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const vat = subtotal * 0.1;
  const grandTotal = subtotal + vat;

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="flex w-full flex-col bg-[#F1F3F6]">
      <section className="w-full bg-[#F1F3F6] px-4 py-8 font-sans lg:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#163F78]">
              <ShoppingBag className="text-brand-primary" />
              Giỏ hàng
            </h1>
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 underline transition-colors hover:text-[#163F78]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {items.map((item) => {
                const product = getProductByIdOrSlug(item.slug || item.productId);
                const brand = product?.brand || "Mecsu";
                const category = product?.category || "Vật tư công nghiệp";

                return (
                  <article
                    key={item.productId}
                    className="group relative grid grid-cols-[56px_minmax(0,1fr)] gap-x-3 gap-y-3 rounded-lg border border-slate-200/80 bg-white p-3 transition-all duration-200 hover:border-slate-300 hover:shadow-sm sm:flex sm:items-center sm:gap-5 sm:p-5"
                  >
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="absolute top-3 right-3 rounded p-1.5 text-slate-400 transition-all duration-150 hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Xóa sản phẩm"
                    >
                      <X size={16} strokeWidth={2} />
                    </button>

                    <Link
                      href={`/san-pham/${item.slug || item.productId}`}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50/50 p-1.5 sm:h-20 sm:w-20 sm:rounded-lg sm:p-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || getSeededPlaceholder(item.productId)}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="min-w-0 flex-1 pr-5 sm:pr-0">
                      <Link
                        href={`/san-pham/${item.slug || item.productId}`}
                        className="mb-1 block line-clamp-2 text-[12px] leading-snug font-semibold text-[#111111] hover:text-[#005da4] sm:mb-1.5 sm:pr-8 sm:text-[15px]"
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] font-medium sm:gap-x-4 sm:gap-y-1 sm:text-[12px]">
                        <span className="text-slate-500">
                          SKU: <span className="text-slate-700">{item.sku}</span>
                        </span>
                        <span className="hidden text-slate-400 sm:inline">|</span>
                        <span className="text-slate-500">{brand}</span>
                        <span className="hidden text-slate-400 sm:inline">|</span>
                        <span className="hidden text-slate-500 sm:inline">
                          {category}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:mt-2 sm:gap-3">
                        <span className="inline-flex items-center rounded border border-emerald-100 bg-emerald-50/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Còn hàng
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Giao: 2-3 ngày
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 flex min-w-0 items-end justify-between gap-3 border-t border-slate-100 pt-3 sm:col-auto sm:shrink-0 sm:border-0 sm:pt-0 sm:flex-row sm:items-center sm:gap-4">
                      <CartQuantityControl
                        quantity={item.quantity}
                        stock={item.stock}
                        minOrderQuantity={item.minOrderQuantity}
                        orderStep={item.orderStep}
                        unit={item.unit}
                        onChange={(quantity) => updateQuantity(item.productId, quantity)}
                      />
                      <div className="min-w-0 text-right sm:min-w-[120px]">
                        <div className="text-[14px] leading-none font-bold text-[#111111] sm:text-[16px]">
                          {formatCartPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 ? (
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            {formatCartPrice(item.price)} / cái
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit rounded-lg border border-slate-200/80 bg-white p-6 lg:sticky lg:top-28">
              <h2 className="mb-5 border-b border-slate-100 pb-3 text-[15px] font-bold tracking-wide text-[#111111] uppercase">
                Tóm tắt đơn hàng
              </h2>
              <div className="mb-6 space-y-3 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tạm tính:</span>
                  <span className="font-semibold text-[#111111]">
                    {formatCartPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">VAT:</span>
                  <span className="font-semibold text-[#111111]">
                    {formatCartPrice(vat)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-[#163F78]">{formatCartPrice(grandTotal)}</span>
                </div>
              </div>
              <Link
                href="/thanh-toan"
                className="flex w-full items-center justify-center gap-2 rounded bg-brand-primary py-4 text-lg font-bold text-[#163F78] transition-colors hover:bg-brand-primary/90"
              >
                <Building2 size={20} />
                Chuyển tới thanh toán
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <CartCommerceSections />
    </div>
  );
}
