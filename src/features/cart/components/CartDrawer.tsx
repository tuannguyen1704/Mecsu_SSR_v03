"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { useCart } from "../hooks/useCart";
import { formatCartPrice } from "../utils/cart-format";
import { CartQuantityControl } from "./CartQuantityControl";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[650] bg-slate-950/60"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 240 }}
            className="fixed top-0 right-0 bottom-0 z-[651] flex w-[min(440px,100vw)] flex-col bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
              <div>
                <p className="text-[11px] font-black tracking-[0.22em] text-[#005da4] uppercase">
                  Mecsu Cart
                </p>
                <h2 className="text-xl font-black text-[#1a1a1a]">Giỏ hàng</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Đóng giỏ hàng"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
              {items.length === 0 ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-white px-6 text-center">
                  <h3 className="mb-2 text-lg font-black text-[#1a1a1a]">
                    Giỏ hàng của bạn đang trống
                  </h3>
                  <p className="mb-6 text-sm font-medium text-slate-500">
                    Thêm sản phẩm vào giỏ để tiếp tục đặt hàng.
                  </p>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="rounded-sm bg-[#005da4] px-5 py-3 text-[12px] font-black tracking-[0.16em] text-white uppercase hover:bg-[#004b85]"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <article key={item.productId} className="rounded-sm border border-slate-200 bg-white p-4">
                      <div className="flex gap-4">
                        <Link
                          href={`/san-pham/${item.slug || item.productId}`}
                          onClick={onClose}
                          className="flex h-20 w-20 shrink-0 items-center justify-center bg-slate-50 p-2"
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
                            onClick={onClose}
                            className="line-clamp-2 text-[14px] font-bold text-[#005da4] hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-[12px] font-bold text-slate-400">
                            SKU: {item.sku}
                          </p>
                          <p className="mt-2 text-[14px] font-black text-[#1a1a1a]">
                            {formatCartPrice(item.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="h-fit text-[12px] font-black text-slate-400 hover:text-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <CartQuantityControl
                          quantity={item.quantity}
                          stock={item.stock}
                          minOrderQuantity={item.minOrderQuantity}
                          orderStep={item.orderStep}
                          unit={item.unit}
                          onChange={(quantity) => updateQuantity(item.productId, quantity)}
                        />
                        <div className="text-right text-[14px] font-black text-[#1a1a1a]">
                          {formatCartPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between text-[16px] font-black text-[#1a1a1a]">
                <span>Tạm tính</span>
                <span>{formatCartPrice(subtotal)}</span>
              </div>
              <div className="grid gap-3">
                <Link
                  href="/gio-hang"
                  onClick={onClose}
                  className="flex h-11 items-center justify-center rounded-sm border border-[#005da4] text-[13px] font-black tracking-[0.16em] text-[#005da4] uppercase hover:bg-blue-50"
                >
                  Xem giỏ hàng
                </Link>
                <button
                  type="button"
                  disabled
                  className="h-11 cursor-not-allowed rounded-sm bg-slate-200 text-[13px] font-black tracking-[0.16em] text-slate-500 uppercase"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
