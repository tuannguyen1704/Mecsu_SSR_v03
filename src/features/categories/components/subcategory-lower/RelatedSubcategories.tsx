"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toSlug } from "@/lib/routing";
import type { Category, CategorySubcategory } from "../../types/category";

interface RelatedSubcategoriesProps {
  category: Category;
  currentSubcategory: CategorySubcategory;
}

const MAX_VISIBLE = 10;

export function RelatedSubcategories({ category, currentSubcategory }: RelatedSubcategoriesProps) {
  const relatedSubcategories = category.subcategories
    .map((name) => ({
      name,
      slug: toSlug(name),
      href: `/danh-muc/${category.slug}/${toSlug(name)}`,
    }))
    .filter((item) => item.slug !== currentSubcategory.slug)
    .slice(0, MAX_VISIBLE);

  if (relatedSubcategories.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1600px] px-4 font-sans sm:px-6 lg:px-12">
      <div className="relative rounded-sm border border-slate-200 bg-white p-4 sm:p-6">
        <div className="flex flex-wrap gap-3">
          {relatedSubcategories.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-[#24465B] hover:text-[#24465B]"
            >
              <span className="h-2 w-2 rounded-full bg-[#24465B]" aria-hidden="true" />
              {item.name}
              <ChevronRight size={16} className="text-slate-500" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
