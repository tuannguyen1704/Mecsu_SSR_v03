"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HOME_MORE_CATEGORIES } from "../data/more-categories";
import { MoreCategoryItem } from "./MoreCategoryItem";

export function HomeMoreCategories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const scrollDistance = Math.round(container.clientWidth * 0.72);

    if (direction === "left" && container.scrollLeft <= 1) {
      container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    if (direction === "right" && container.scrollLeft >= maxScrollLeft - 1) {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    container.scrollBy({
      left: direction === "left" ? -scrollDistance : scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-10 pb-2 font-sans lg:px-12">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-slate-800">
        More categories to explore
      </h2>

      <div className="group relative">
        <button
          onClick={() => scrollCategories("left")}
          className="absolute top-1/2 -left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-colors hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scrollCategories("right")}
          className="absolute top-1/2 -right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-colors hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex scroll-smooth gap-4 overflow-x-auto py-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "max(0.5rem, calc((100% - 1388px) / 2))",
            paddingRight: "max(0.5rem, calc((100% - 1388px) / 2))",
          }}
        >
          {HOME_MORE_CATEGORIES.map((item) => (
            <MoreCategoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
