import Link from "next/link";
import { FEATURED_BRANDS } from "@/features/home/data/featured-brands";

export function BrandDealsSection() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURED_BRANDS.slice(0, 8).map((brand) => (
        <Link
          key={brand.id}
          href="#uu-dai-san-pham"
          className="flex h-24 items-center justify-center rounded-sm border border-[#E2E8F0] bg-white px-4 text-center transition-colors hover:border-[#163F78]"
        >
          <span className={`${brand.colorClass} ${brand.weightClass}`}>
            {brand.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
