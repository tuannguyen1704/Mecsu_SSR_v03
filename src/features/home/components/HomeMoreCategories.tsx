"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HOME_MORE_CATEGORIES } from "../data/more-categories";
import { MoreCategoryItem } from "./MoreCategoryItem";

export function HomeMoreCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-10 pb-2 font-sans lg:px-12">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-800">
        More categories to explore
      </h2>

      <div className="group relative">
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 -left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-colors hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute top-1/2 -right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-colors hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto px-2 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {HOME_MORE_CATEGORIES.map((item) => (
            <MoreCategoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
