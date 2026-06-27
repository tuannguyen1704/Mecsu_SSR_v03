"use client";

import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { matchesKeyword } from "@/lib/routing";
import { toSlug } from "@/lib/routing";
import { subcategoryCountsBySlug } from "../../data/subcategory-counts";
import type { Category, CategorySubcategory } from "../../types/category";
import { SubcategoryCarouselItem } from "./SubcategoryCarouselItem";

interface SubcategoryCarouselProps {
  category: Category;
  currentSubcategory: CategorySubcategory;
  parentSubcategory?: CategorySubcategory;
}

export function SubcategoryCarousel({
  category,
  currentSubcategory,
  parentSubcategory,
}: SubcategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const subcategories = useMemo(() => {
    const parentSlug = parentSubcategory?.slug ?? currentSubcategory.slug;
    const shouldUseNestedHref = parentSlug === "bulong";

    return category.subcategories
      .map((name) => {
        const slug = toSlug(name);
        const href = shouldUseNestedHref
          ? `/danh-muc/${category.slug}/${parentSlug}/${slug}`
          : `/danh-muc/${category.slug}/${slug}`;

        return {
          id: slug,
          name,
          slug,
          href,
          count: subcategoryCountsBySlug[slug],
        };
      })
      .filter(
        (item) =>
          matchesKeyword(item.name, "bulong") &&
          item.slug !== parentSlug &&
          item.slug !== currentSubcategory.slug &&
          item.slug !== toSlug(currentSubcategory.name),
      );
  }, [category.subcategories, category.slug, currentSubcategory, parentSubcategory]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const dist = Math.round(el.clientWidth * 0.72);

    if (direction === "left" && el.scrollLeft <= 1) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }
    if (direction === "right" && el.scrollLeft >= maxScroll - 1) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    el.scrollBy({ left: direction === "left" ? -dist : dist, behavior: "smooth" });
  };

  if (subcategories.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div
        className="relative"
        style={{
          marginLeft: "calc((100vw - 100%) / -2)",
          marginRight: "calc((100vw - 100%) / -2)",
        }}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
          <div className="group relative">
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 -left-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0 md:flex"
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 -right-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0 md:flex"
              aria-label="Cuộn sang phải"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollRef}
              className="no-scrollbar flex scroll-smooth gap-9 overflow-x-auto py-3 md:gap-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", overflowY: "hidden" }}
            >
              {subcategories.map((item) => (
                <SubcategoryCarouselItem
                  key={item.slug}
                  subcategory={item}
                  categorySlug={category.slug}
                  isActive={item.slug === currentSubcategory.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
