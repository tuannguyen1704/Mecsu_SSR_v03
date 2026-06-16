"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDeterministicDiscount } from "../data/home-best-deals";
import type { Product } from "@/features/products/types/product";
import { HomeProductCard } from "./HomeProductCard";

export function HomeBestDealsClient({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative rounded-md bg-[#163F78] p-5 lg:p-6">
      <h2 className="mb-5 text-[22px] font-bold text-white">
        Best deals for you
      </h2>

      <button
        onClick={() => scroll("left")}
        className="absolute top-[55%] left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white hover:bg-white/10"
        aria-label="Scroll best deals left"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar relative z-0 flex snap-x gap-3 overflow-x-auto"
      >
        {products.map((product) => (
          <HomeProductCard
            key={product.id}
            product={product}
            discountPercent={getDeterministicDiscount(product.id)}
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute top-[55%] right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white hover:bg-white/10"
        aria-label="Scroll best deals right"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
