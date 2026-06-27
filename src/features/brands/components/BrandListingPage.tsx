"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { getCurrentUser } from "@/features/auth/services/mock-auth-service";
import { cn } from "@/lib/utils";
import {
  BRAND_ALPHABET,
  BRAND_INDUSTRIES,
  getBrandLetter,
  MOCK_BRANDS,
  type Brand,
  type BrandIndustry,
} from "../data/mock-brands";
import { BrandLogo } from "./BrandLogo";

const GROUP_TO_INDUSTRY: Record<string, BrandIndustry> = {
  precision: "Cơ khí chính xác",
  automation: "Tự động hóa",
  pneumatic: "Thiết bị khí nén",
  handTools: "Công cụ cầm tay",
  maintenance: "Bảo trì công nghiệp",
  materials: "Vật liệu phụ trợ",
};

const AuthModal = dynamic(
  () => import("@/features/auth/components/AuthModal"),
  { ssr: false },
);

export function BrandListingPage({
  initialGroup,
}: {
  initialGroup?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState("Tất cả");
  const [activeIndustry, setActiveIndustry] = useState<BrandIndustry>(
    initialGroup ? GROUP_TO_INDUSTRY[initialGroup] || "Tất cả" : "Tất cả",
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleQuotationClick = () => {
    if (getCurrentUser()) {
      router.push("/dich-vu-khach-hang");
      return;
    }

    setIsAuthModalOpen(true);
  };

  const filteredBrands = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");

    return MOCK_BRANDS.filter((brand) => {
      const matchesSearch =
        !normalizedQuery ||
        brand.name.toLocaleLowerCase("vi").includes(normalizedQuery);
      const matchesLetter =
        activeLetter === "Tất cả" ||
        getBrandLetter(brand.name) === activeLetter;
      const matchesIndustry =
        activeIndustry === "Tất cả" || brand.industry === activeIndustry;

      return matchesSearch && matchesLetter && matchesIndustry;
    }).sort((left, right) => left.name.localeCompare(right.name, "vi"));
  }, [activeIndustry, activeLetter, query]);

  const groupedBrands = useMemo(() => {
    const groups = new Map<string, Brand[]>();

    filteredBrands.forEach((brand) => {
      const letter = getBrandLetter(brand.name);
      groups.set(letter, [...(groups.get(letter) || []), brand]);
    });

    return Array.from(groups.entries()).sort(([left], [right]) => {
      if (left === "0-9") return -1;
      if (right === "0-9") return 1;
      return left.localeCompare(right);
    });
  }, [filteredBrands]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          <Breadcrumb
            className="mb-4"
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Thương hiệu" },
            ]}
          />
          <div className="mb-3 h-1 w-10 bg-[#FFC72C]" />
          <h1 className="text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            Thương hiệu
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#64748B]">
            Khám phá các thương hiệu vật tư, dụng cụ và thiết bị công nghiệp
            được khách hàng doanh nghiệp tin dùng tại Mecsu.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="rounded-md border border-[#E2E8F0] bg-white p-4 sm:p-5">
          <div className="relative">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm kiếm thương hiệu..."
              className="h-12 w-full rounded-md border border-[#CBD5E1] bg-white pl-11 pr-4 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/10"
            />
          </div>

          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
            {BRAND_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveIndustry(industry)}
                className={cn(
                  "shrink-0 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  activeIndustry === industry
                    ? "border-[#163F78] bg-[#163F78] text-white"
                    : "border-[#E2E8F0] bg-white text-[#334155] hover:border-[#BFD0E6] hover:bg-[#F3F7FC] hover:text-[#163F78]",
                )}
              >
                {industry}
              </button>
            ))}
          </div>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {BRAND_ALPHABET.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setActiveLetter(letter)}
                className={cn(
                  "flex h-9 min-w-9 shrink-0 items-center justify-center rounded-md border px-2.5 text-sm font-medium transition-colors",
                  activeLetter === letter
                    ? "border-[#163F78] bg-[#163F78] text-white"
                    : "border-[#E2E8F0] bg-white text-[#334155] hover:border-[#BFD0E6] hover:bg-[#F8FAFC] hover:text-[#163F78]",
                )}
              >
                {letter}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 text-sm text-[#64748B]">
          Tìm thấy{" "}
          <strong className="font-semibold text-[#0F172A]">
            {filteredBrands.length}
          </strong>{" "}
          thương hiệu
        </div>

        {filteredBrands.length > 0 ? (
          <div className="mt-6 space-y-9">
            {groupedBrands.map(([letter, brands]) => (
              <section key={letter}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-6 w-1 bg-[#FFC72C]" />
                  <h2 className="text-2xl font-semibold text-[#163F78]">
                    {letter}
                  </h2>
                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/thuong-hieu/${brand.id}`}
                      className="group flex min-h-24 items-center gap-4 rounded-md border border-[#E2E8F0] bg-white px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#163F78] hover:shadow-[0_6px_18px_rgba(15,23,42,0.05)] sm:px-5"
                    >
                      <BrandLogo brand={brand} />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold text-[#0F172A]">
                          {brand.name}
                        </h3>
                        <p className="mt-1 truncate text-xs text-[#64748B]">
                          {brand.industry}
                        </p>
                      </div>
                      <ArrowRight
                        size={17}
                        className="ml-3 shrink-0 text-[#163F78] transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-md border border-[#E2E8F0] bg-[#F3F7FC] px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-[#0F172A]">
              Không tìm thấy thương hiệu phù hợp
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Hãy thử từ khóa, chữ cái hoặc nhóm ngành hàng khác.
            </p>
          </div>
        )}

        <section className="mt-10 rounded-sm border border-[#E2E8F0] bg-white px-5 py-6 sm:px-7 sm:py-7 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <div className="mb-3 h-1 w-10 bg-[#FFC72C]" />
            <h2 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
              Không tìm thấy thương hiệu bạn cần?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">
              Liên hệ Mecsu để được hỗ trợ tìm đúng thương hiệu, mã hàng hoặc
              sản phẩm thay thế phù hợp với nhu cầu mua hàng doanh nghiệp.
            </p>
          </div>

          <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row lg:mt-0 lg:w-auto lg:shrink-0">
            <Link
              href="/dich-vu-khach-hang"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-[#163F78] px-5 text-sm font-medium text-white transition-colors hover:bg-[#123463] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163F78] focus-visible:ring-offset-2"
            >
              Liên hệ hỗ trợ
            </Link>
            <button
              type="button"
              onClick={handleQuotationClick}
              className="inline-flex h-11 items-center justify-center rounded-sm border border-[#163F78] bg-white px-5 text-sm font-medium text-[#163F78] transition-colors hover:bg-[#F3F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163F78] focus-visible:ring-offset-2"
            >
              Gửi yêu cầu báo giá
            </button>
          </div>
        </section>
      </div>

      {isAuthModalOpen ? (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => {
            setIsAuthModalOpen(false);
            router.push("/dich-vu-khach-hang");
          }}
        />
      ) : null}
    </main>
  );
}
