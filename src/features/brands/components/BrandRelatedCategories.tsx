import Image from "next/image";
import Link from "next/link";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { BrandCatalogNode } from "../types";
import { buildBrandChildUrl } from "../utils/brand-catalog";

export function BrandRelatedCategories({
  brandSlug,
  currentPath,
  children,
}: {
  brandSlug: string;
  currentPath: string[];
  children: BrandCatalogNode[];
}) {
  if (children.length === 0) return null;

  return (
    <section className="mb-8 min-w-0 overflow-hidden">
      <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto py-3">
        {children.map((child) => (
          <Link
            key={child.slug}
            href={buildBrandChildUrl(brandSlug, currentPath, child.slug)}
            className="group flex min-w-[128px] shrink-0 snap-start flex-col items-center text-center sm:min-w-[150px]"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-sm border border-slate-200 bg-slate-50">
              <Image
                src={getSeededCategoryImage(child.title)}
                alt={child.title}
                fill
                sizes="96px"
                className="object-contain p-2 transition-transform group-hover:scale-105"
              />
            </div>
            <span className="mt-3 max-w-[150px] text-sm font-medium leading-snug text-[#334155] group-hover:text-[#163F78]">
              {child.title}
            </span>
            <span className="mt-1 text-xs text-[#94A3B8]">
              {child.productCount} sản phẩm
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
