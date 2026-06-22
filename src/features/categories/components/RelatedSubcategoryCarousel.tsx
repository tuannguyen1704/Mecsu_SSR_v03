"use client";

import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { matchesKeyword } from "@/lib/routing";
import { toSlug } from "@/lib/routing";
import type { Category, CategorySubcategory } from "../types/category";
import { SubcategoryCarouselItem } from "./subcategory-lower/SubcategoryCarouselItem";

interface RelatedSubcategoryCarouselProps {
  query: string;
  categories: Category[];
}

export function RelatedSubcategoryCarousel({ query, categories }: RelatedSubcategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const subcategories = useMemo(() => {
    const allSubcategories: Array<{
      id: string;
      name: string;
      slug: string;
      href: string;
      categorySlug: string;
    }> = [];

    for (const category of categories) {
      for (const name of category.subcategories) {
        const slug = toSlug(name);
        allSubcategories.push({
          id: slug,
          name,
          slug,
          href: `/danh-muc/${category.slug}/${slug}`,
          categorySlug: category.slug,
        });
      }
    }

    return allSubcategories.filter((item) => {
      if (!matchesKeyword(item.name, query)) return false;
      return true;
    });
  }, [categories, query]);

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
    <section className="relative mb-8 w-full min-w-0 max-w-full overflow-hidden">
      <div className="group relative w-full min-w-0">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0 md:flex"
          aria-label="Cuộn sang trái"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 opacity-0 shadow-sm transition-all hover:bg-slate-50 group-hover:opacity-100 disabled:opacity-0 md:flex"
          aria-label="Cuộn sang phải"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex w-full min-w-0 max-w-full scroll-smooth gap-9 overflow-x-auto overflow-y-hidden py-3 md:gap-12 md:px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {subcategories.map((item) => (
            <SubcategoryCarouselItem
              key={`${item.categorySlug}-${item.slug}`}
              subcategory={{ id: item.slug, name: item.name, slug: item.slug, href: "" }}
              categorySlug={item.categorySlug}
              isActive={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
