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
    <section className="bg-white pt-2 pb-10 mt-5">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[32px]">
            Thương hiệu đáng tin cậy
          </h2>
          <Link
            href="/thuong-hieu"
            className="text-[15px] font-medium text-[#326295] hover:underline"
          >
            Xem thêm
          </Link>
        </div>

        <div className="no-scrollbar mb-8 flex items-center gap-3 overflow-x-auto pb-2 sm:mb-12 md:flex-wrap md:overflow-visible md:pb-0">
          <button className="rounded-md bg-[#163F78] px-5 py-1.5 text-[14px] font-bold text-white">
            Thương hiệu uy tín
          </button>

          <div className="mx-2 h-6 w-px bg-slate-300" />

          <span className="mr-2 text-[16px] font-bold text-slate-800">
            Theo lĩnh vực
          </span>

          <div className="flex shrink-0 gap-3 md:flex-wrap">
            {FEATURED_BRAND_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                className="shrink-0 rounded-md border border-slate-200 bg-white px-5 py-2 text-[14px] font-medium whitespace-nowrap text-slate-700 transition-all duration-200 hover:border-[#264553] hover:text-[#264553]"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-3 opacity-95 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-8 xl:grid-cols-8">
          {FEATURED_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className={`flex min-h-20 min-w-0 select-none items-center justify-center rounded-xl p-3 text-center uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-4 ${brand.weightClass} ${brand.colorClass}`}
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
