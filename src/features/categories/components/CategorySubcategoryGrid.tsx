import Link from "next/link";
import Image from "next/image";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { Category, CategorySubcategory } from "../types/category";

interface CategorySubcategoryGridProps {
  category: Category;
  subcategories: CategorySubcategory[];
}

export function CategorySubcategoryGrid({
  category,
  subcategories,
}: CategorySubcategoryGridProps) {
  if (subcategories.length === 0) {
    return null;
  }

  return (
    <section className="mb-12 w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1a1a1a]">{category.name}</h2>
        <span className="text-sm font-medium text-slate-500">
          {subcategories.length} danh mục
        </span>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={subcategory.href}
              className="group flex cursor-pointer flex-col items-center rounded-xl border border-transparent p-5 text-center transition-colors duration-200 hover:border-slate-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm transition-all duration-200 group-hover:border-blue-200 group-hover:bg-blue-50">
                <Image
                  src={getSeededCategoryImage(subcategory.name)}
                  alt={subcategory.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2 mix-blend-multiply"
                />
              </div>
              <span className="line-clamp-2 text-[15px] leading-tight font-semibold text-slate-700 transition-all duration-200 group-hover:font-bold group-hover:text-[#2071a7]">
                {subcategory.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
