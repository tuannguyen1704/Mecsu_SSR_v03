"use client";

import Link from "next/link";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  HeadphonesIcon,
  Tag,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { HEADER_CATEGORIES } from "@/features/categories/data/header-categories";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { generateCategoryUrl } from "@/lib/routing";

const BRANDS = [
  { name: "BOSCH", className: "text-[#e22739] font-black text-2xl sm:text-3xl tracking-tighter" },
  { name: "SATA", className: "text-[#296a4b] font-black text-[22px] sm:text-[28px] tracking-tight" },
  { name: "PISCO", className: "text-[#28479e] font-black text-2xl sm:text-3xl tracking-wider" },
  { name: "CDC", className: "text-[#1a4798] font-black text-2xl sm:text-[28px] tracking-tighter italic" },
  { name: "KST", className: "text-[#c63d35] font-black text-2xl sm:text-3xl" },
  { name: "NACHI", className: "text-[#df3634] font-medium text-2xl sm:text-3xl tracking-widest" },
  { name: "SKF", className: "text-[#0d4f9b] font-black text-2xl sm:text-3xl tracking-tighter" },
];

const BENEFITS = [
  {
    title: "Hỗ trợ khách hàng tận tâm",
    description: "Đội ngũ tư vấn chuyên nghiệp, luôn sẵn sàng hỗ trợ nhanh chóng và hiệu quả.",
    icon: HeadphonesIcon,
  },
  {
    title: "Giá tốt mỗi ngày",
    description: "Cung cấp mức giá cạnh tranh cho các sản phẩm và vật tư bạn sử dụng thường xuyên.",
    icon: Tag,
  },
  {
    title: "Giao hàng toàn quốc",
    description: "Hỗ trợ giao hàng nhanh trên toàn quốc với nhiều phương thức vận chuyển linh hoạt.",
    icon: Truck,
  },
  {
    title: "Xử lý đơn nhanh chóng",
    description: "Đơn hàng được xác nhận và xử lý nhanh giúp đảm bảo tiến độ công việc của bạn.",
    icon: Zap,
  },
  {
    title: "Hỗ trợ công nợ doanh nghiệp",
    description: "Chính sách công nợ linh hoạt dành cho khách hàng và doanh nghiệp đủ điều kiện.",
    icon: Building2,
  },
];

export function CartEmptyState() {
  return (
    <div className="flex w-full flex-col bg-[#f6f8fb]">
      <section className="border-b border-slate-100 bg-white px-6 py-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1400px]">
          <h2 className="mb-6 text-[28px] font-bold tracking-tight text-[#1a1a1a]">
            Your cart is empty
          </h2>
          <Link
            href="/"
            className="inline-flex rounded bg-[#163F78] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-[#122f5f]"
          >
            Continue Shopping
          </Link>
        </div>
      </section>

      <CartCommerceSections />
    </div>
  );
}

export function CartCommerceSections() {
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const visibleCategories = isCategoriesExpanded
    ? HEADER_CATEGORIES
    : HEADER_CATEGORIES.slice(0, 12);

  return (
    <>
      <section className="flex w-full justify-center bg-[#f2f2f2] px-6 py-12 lg:px-12">
        <div className="w-full max-w-[1400px]">
          <h3 className="mb-6 text-[27px] font-bold tracking-tight text-[#1a1a1a]">
            Shop Categories
          </h3>
          <div className={`relative ${isCategoriesExpanded ? "mb-12" : ""}`}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visibleCategories.map((category) => (
                <Link
                  key={category.id}
                  href={generateCategoryUrl(category)}
                  className="flex items-center gap-4 rounded bg-white p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getSeededPlaceholder(category.name)}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <span className="line-clamp-2 text-[14px] leading-tight font-medium text-slate-700">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
            {!isCategoriesExpanded ? (
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[120px] bg-linear-to-t from-[#f2f2f2] via-[#f2f2f2]/80 to-transparent" />
            ) : null}
            <div
              className={`absolute ${isCategoriesExpanded ? "-bottom-12" : "-bottom-6"} right-0 left-0 z-10 flex justify-center`}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesExpanded((expanded) => !expanded)}
                className="inline-flex items-center gap-1 rounded px-4 py-2 text-[13px] font-bold text-[#2071a7] transition-colors hover:bg-[#e6f0f5]"
              >
                {isCategoriesExpanded ? "See Less" : "See More"}
                {isCategoriesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center border-t border-slate-100 bg-white px-6 py-[15px] lg:px-12">
        <div className="w-full max-w-[1400px]">
          <div className="mb-8 flex flex-wrap items-baseline gap-2">
            <h3 className="text-[27px] font-bold tracking-tight text-[#1a1a1a]">
              Brands We Carry
            </h3>
            <span className="ml-2 text-[14px] text-slate-600">Thousands of brands!</span>
            <Link href="/" className="ml-1 text-[14px] text-[#2071a7] hover:underline">
              See more
            </Link>
          </div>
          <div className="-mx-4 mt-2 flex flex-wrap items-center gap-2 opacity-95">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className={`flex cursor-pointer select-none items-center justify-center rounded-xl border border-transparent bg-transparent px-4 py-3 uppercase transition-all duration-300 hover:-translate-y-1 hover:border-slate-100 hover:bg-white hover:shadow-xl ${brand.className}`}
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center border-t border-slate-100 bg-[#f8f9fa] px-6 py-[44px] lg:px-12">
        <div className="w-full max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-100 bg-white text-[#2071a7] shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h4 className="mb-2 text-[15px] font-bold text-[#1a1a1a]">
                    {benefit.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center border-t border-slate-100 bg-white pb-12">
        <div className="w-full max-w-[1400px]">
          <div
            className={`relative flex flex-col items-start px-6 py-12 text-left lg:px-12 ${
              isDescriptionExpanded ? "pb-24" : ""
            }`}
          >
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#1a1a1a]">
              Điểm đến đáng tin cậy cho vật tư, thiết bị và dụng cụ công nghiệp
            </h3>

            <div
              className={`relative w-full overflow-hidden text-[15px] text-slate-600 transition-all duration-300 ${
                isDescriptionExpanded ? "max-h-[1000px]" : "max-h-[140px]"
              } space-y-4`}
            >
              <p>
                Mua sắm tại Mecsu và khám phá hàng ngàn sản phẩm chất lượng từ nhiều
                thương hiệu uy tín trong lĩnh vực cơ khí, công nghiệp và xây dựng.
                Chúng tôi cung cấp đa dạng vật tư và thiết bị như bu lông, ốc vít,
                dụng cụ cầm tay, thiết bị điện, vật tư khí nén, thiết bị an toàn lao
                động và nhiều sản phẩm công nghiệp khác giúp doanh nghiệp vận hành
                hiệu quả hơn mỗi ngày.
              </p>
              <p>
                Mecsu mang đến trải nghiệm mua sắm trực tuyến tiện lợi với thông tin
                sản phẩm rõ ràng, tìm kiếm nhanh chóng, giá cả cạnh tranh và nguồn
                hàng ổn định. Dù bạn là xưởng cơ khí, nhà máy sản xuất, đơn vị thi
                công hay doanh nghiệp thương mại, bạn đều có thể dễ dàng tìm thấy sản
                phẩm phù hợp với nhu cầu sử dụng thực tế.
              </p>
              <p>
                Là đơn vị hoạt động trong lĩnh vực vật tư công nghiệp và MRO
                (Maintenance, Repair & Operations), Mecsu cung cấp các sản phẩm và
                linh kiện phục vụ cho bảo trì, sửa chữa và vận hành hệ thống sản xuất.
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Bu lông, ốc vít và phụ kiện liên kết</li>
                <li>Dụng cụ cầm tay và dụng cụ điện</li>
                <li>Thiết bị khí nén và thủy lực</li>
                <li>Vật tư điện công nghiệp</li>
                <li>Thiết bị an toàn lao động</li>
                <li>Vòng bi, bạc đạn và linh kiện cơ khí</li>
                <li>Thiết bị hàn cắt và phụ kiện</li>
                <li>Vật tư nhà xưởng và bảo trì</li>
              </ul>
              <p>
                Với danh mục sản phẩm liên tục được mở rộng, Mecsu giúp doanh nghiệp
                dễ dàng tìm đúng sản phẩm cần thiết, tiết kiệm thời gian tìm kiếm và
                đảm bảo tiến độ công việc với dịch vụ hỗ trợ nhanh chóng và giao hàng
                toàn quốc.
              </p>
              {!isDescriptionExpanded ? (
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[80px] bg-linear-to-t from-white to-transparent" />
              ) : null}
            </div>

            <div
              className={`absolute ${isDescriptionExpanded ? "bottom-8" : "bottom-2"} right-0 left-0 z-10 flex justify-center`}
            >
              <button
                type="button"
                onClick={() => setIsDescriptionExpanded((expanded) => !expanded)}
                className="inline-flex items-center gap-1 rounded border border-transparent bg-white px-4 py-2 text-[13px] font-bold text-[#2071a7] transition-colors hover:border-slate-100 hover:bg-[#e6f0f5]"
              >
                {isDescriptionExpanded ? "See Less" : "See More"}
                {isDescriptionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
