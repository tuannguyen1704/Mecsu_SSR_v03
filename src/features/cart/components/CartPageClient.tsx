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
    <div className="flex w-full flex-col bg-[#f6f8fb]">
      <section className="w-full bg-[#f6f8fb] px-4 py-8 font-sans lg:px-12">
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
                    className="group relative flex flex-col gap-5 rounded-lg border border-slate-200/80 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-sm sm:flex-row sm:items-center"
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
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50/50 p-2"
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
                        className="mb-1.5 block pr-8 text-[15px] leading-snug font-semibold text-[#111111] hover:text-[#005da4]"
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-medium">
                        <span className="text-slate-500">
                          SKU: <span className="text-slate-700">{item.sku}</span>
                        </span>
                        <span className="hidden text-slate-400 sm:inline">|</span>
                        <span className="text-slate-500">{brand}</span>
                        <span className="hidden text-slate-400 sm:inline">|</span>
                        <span className="text-slate-500">{category}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded border border-emerald-100 bg-emerald-50/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Còn hàng
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Giao: 2-3 ngày
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <CartQuantityControl
                        quantity={item.quantity}
                        stock={item.stock}
                        onChange={(quantity) => updateQuantity(item.productId, quantity)}
                      />
                      <div className="min-w-[120px] text-left sm:text-right">
                        <div className="text-[16px] leading-none font-bold text-[#111111]">
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
              <button
                type="button"
                className="mt-4 w-full rounded border-2 border-[#005da4] py-3 font-semibold text-[#005da4] transition-colors hover:bg-[#005da4]/5"
              >
                Yêu cầu báo giá (Bulk Order)
              </button>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded border-2 border-[#163F78] py-3 font-semibold text-[#163F78] transition-colors hover:bg-[#163F78]/5"
              >
                + Thêm địa chỉ giao hàng
              </button>
            </aside>
          </div>
        </div>
      </section>

      <CartCommerceSections />
    </div>
  );
}
