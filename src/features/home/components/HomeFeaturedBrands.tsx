import Link from "next/link";
import {
  FEATURED_BRAND_INDUSTRIES,
  FEATURED_BRANDS,
  type FeaturedBrand,
} from "../data/featured-brands";

function BrandPrefix({ type }: { type: FeaturedBrand["prefix"] }) {
  if (type === "bosch") {
    return (
      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-500">
        <div className="h-5 w-4 rounded-sm border-x-2 border-slate-500" />
      </div>
    );
  }

  if (type === "sata") {
    return (
      <div className="mr-2 flex h-8 w-8 flex-col items-center justify-center text-[#296a4b]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 3.5L5.93 9v6L12 18.5l6.07-3.5v-6L12 5.5zM12 8l4.33 2.5v5L12 18l-4.33-2.5v-5L12 8z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return null;
}

function BrandSuffix({ type }: { type: FeaturedBrand["suffix"] }) {
  if (type !== "cdc") return null;

  return (
    <div className="mt-1 ml-2 flex flex-col justify-center text-[8px] leading-none font-bold tracking-normal text-black not-italic sm:text-[10px]">
      <span>씨디씨뉴매틱</span>
      <span>PNEUMATICS CORP.</span>
    </div>
  );
}

export function HomeFeaturedBrands() {
  return (
    <section className="bg-white pt-2 pb-10">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-6 flex items-baseline gap-4">
          <h2 className="text-[32px] font-bold tracking-tight text-slate-900">
            Brands you trust
          </h2>
          <Link
            href="#"
            className="text-[15px] font-medium text-[#326295] hover:underline"
          >
            See more
          </Link>
        </div>

        <div className="mb-12 flex flex-wrap items-center gap-3">
          <button className="rounded-md bg-[#163F78] px-5 py-1.5 text-[14px] font-bold text-white">
            Trusted brands
          </button>

          <div className="mx-2 h-6 w-px bg-slate-300" />

          <span className="mr-2 text-[16px] font-bold text-slate-800">
            By industry
          </span>

          <div className="flex flex-wrap gap-3">
            {FEATURED_BRAND_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                className="rounded-md border border-slate-200 bg-white px-5 py-2 text-[14px] font-medium text-slate-700 transition-all duration-200 hover:border-[#264553] hover:text-[#264553]"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 opacity-95">
          {FEATURED_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className={`select-none rounded-xl p-4 uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg ${brand.weightClass} ${brand.colorClass}`}
            >
              <BrandPrefix type={brand.prefix} />
              {brand.name}
              <BrandSuffix type={brand.suffix} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
