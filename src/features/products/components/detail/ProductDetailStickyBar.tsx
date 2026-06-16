"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ShoppingCart } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { useCart } from "@/features/cart";
import { notifyCartItemAdded } from "@/features/cart/services/cart-feedback";
import type { Product } from "../../types/product";

interface ProductDetailStickyBarProps {
  product: Product;
}

const navItems = [
  { id: "product-info", label: "THÔNG TIN SẢN PHẨM" },
  { id: "related-products", label: "SẢN PHẨM TƯƠNG THÍCH" },
  { id: "customer-reviews", label: "ĐÁNH GIÁ KHÁCH HÀNG" },
];

export function ProductDetailStickyBar({ product }: ProductDetailStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();
  const productImage = product.image || getSeededPlaceholder(product.id);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById("product-info");

      if (!target) {
        setIsVisible(window.scrollY > 720);
        return;
      }

      setIsVisible(target.getBoundingClientRect().top <= 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product.id]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    addItem(product, 1);
    notifyCartItemAdded({
      productImage,
      productName: product.name,
      quantity: 1,
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-[3000] border-b border-slate-200 bg-white transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
        <div className="flex h-[82px] items-center justify-between py-2">
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded border border-slate-100 bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImage}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <div className="mb-1 text-[11px] leading-none font-bold text-[#007185] uppercase">
                {product.brand || "MECSU"}
              </div>
              <h2 className="line-clamp-1 truncate text-[15px] font-bold text-slate-900 uppercase">
                {product.name}
              </h2>
            </div>
          </div>

          <div className="flex h-full shrink-0 items-center gap-8">
            <nav className="mr-4 hidden h-full items-center gap-6 border-r border-slate-100 pr-8 xl:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-[12px] font-bold tracking-tight text-slate-500 uppercase hover:text-[#007185]"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6">
              <div className="hidden text-right sm:block">
                <span className="text-[20px] font-bold text-slate-900">
                  {product.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="ml-1 text-[12px] text-slate-500">
                  / {product.unit || "cái"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-sm border-brand-primary bg-brand-primary px-4 py-3 text-[13px] font-bold text-brand-secondary uppercase shadow-sm transition-colors hover:bg-brand-primary/90 lg:px-8 lg:text-[14px]"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Thêm vào giỏ</span>
              </button>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="p-2 text-slate-400 transition-colors hover:text-[#007185]"
                aria-label="Cuộn lên đầu trang"
              >
                <ChevronUp size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
