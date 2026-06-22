"use client";

import Link from "next/link";
import Image from "next/image";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { CategorySubcategory } from "../../types/category";

interface SubcategoryCarouselItemProps {
  subcategory: CategorySubcategory;
  categorySlug: string;
  isActive?: boolean;
}

export function SubcategoryCarouselItem({
  subcategory,
  categorySlug,
  isActive = false,
}: SubcategoryCarouselItemProps) {
  const href = `/danh-muc/${categorySlug}/${subcategory.slug}`;

  return (
    <Link
      href={href}
      className="group flex min-w-[120px] shrink-0 flex-col items-center text-center sm:min-w-[140px] md:min-w-[160px]"
    >
      <div className="relative h-[88px] w-[88px] sm:h-[105px] sm:w-[105px] md:h-[120px] md:w-[120px]">
        <Image
          src={getSeededCategoryImage(subcategory.name)}
          alt={subcategory.name}
          fill
          sizes="(max-width: 640px) 88px, (max-width: 768px) 105px, 120px"
          className="object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <span
        className={`
          mt-3 max-w-[140px] text-[14px] font-medium leading-snug sm:text-[15px]
          ${isActive
            ? "font-semibold text-[#163F78] underline decoration-[#163F78] decoration-2 underline-offset-4"
            : "text-[#1E2A3B] group-hover:text-[#163F78]"
          }
        `}
      >
        {subcategory.name}
      </span>
    </Link>
  );
}
