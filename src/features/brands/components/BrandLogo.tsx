"use client";

import { useState } from "react";
import Image from "next/image";
import type { Brand } from "../data/mock-brands";

export function BrandLogo({ brand }: { brand: Brand }) {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(brand.logo) && !hasImageError;

  return (
    <div className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] transition-colors group-hover:bg-[#F3F7FC] sm:h-16 sm:w-16">
      {shouldShowImage ? (
        <Image
          src={brand.logo as string}
          alt={`${brand.name} logo`}
          fill
          sizes="(max-width: 640px) 52px, 64px"
          className="object-contain p-2"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span className="max-w-full truncate px-1.5 text-center text-xs font-medium text-[#163F78] sm:text-sm">
          {getBrandMark(brand.name)}
        </span>
      )}
    </div>
  );
}

function getBrandMark(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length > 1) {
    return words
      .slice(0, 3)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }

  return name.length <= 6 ? name : name.slice(0, 3).toUpperCase();
}
