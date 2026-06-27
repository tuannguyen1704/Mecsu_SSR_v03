import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HOME_PROMOTIONS } from "@/features/home/data/home-promotions";
import {
  HOME_BEST_DEALS,
  getDeterministicDiscount,
} from "@/features/home/data/home-best-deals";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import { getProductHref } from "@/features/products/services/product-service";
import type { Product } from "@/features/products/types/product";
import { mockPromotions } from "../data/mockPromotions";
import type { Promotion } from "../types";
import { FeaturedPromotionCard } from "./FeaturedPromotionCard";
import { PromotionRules } from "./PromotionRules";

const featuredPromotions: Promotion[] = [
  {
    ...mockPromotions[0],
    category: "Vật liệu xây dựng",
    title: "Giảm 15% cho đơn hàng vật liệu dự án",
    description: "Tối ưu chi phí mua vật tư cho công trình và đơn hàng dự án.",
    condition: "Áp dụng cho đơn hàng vật liệu dự án đủ điều kiện.",
    imageUrl: HOME_PROMOTIONS[0]?.image,
    href: "#uu-dai-san-pham",
  },
  {
    ...mockPromotions[1],
    category: "Bulong & Ốc vít",
    title: "Ưu đãi 20% cho vật tư lắp ghép công trình",
    description: "Dành cho nhóm bulong, ốc vít và vật tư lắp ghép đạt chuẩn.",
    condition: "Áp dụng cho vật tư lắp ghép công trình đủ điều kiện.",
    imageUrl: HOME_PROMOTIONS[1]?.image,
    href: "#uu-dai-san-pham",
  },
  {
    ...mockPromotions[2],
    category: "Dụng cụ",
    title: "Tặng bộ phụ kiện khi mua máy thi công",
    description: "Nhận thêm phụ kiện hỗ trợ thi công khi mua máy trong danh sách.",
    condition: "Quà tặng áp dụng tự động khi đơn hàng đủ điều kiện.",
    imageUrl: HOME_PROMOTIONS[2]?.image,
    href: "#uu-dai-san-pham",
  },
  {
    ...mockPromotions[3],
    category: "Bảo hộ lao động",
    title: "Combo bảo hộ cho đội thi công",
    description: "Ưu đãi dành cho gói bảo hộ mua theo đội nhóm và công trình.",
    condition: "Ưu đãi tự động áp dụng khi đơn hàng đủ điều kiện.",
    imageUrl: HOME_PROMOTIONS[3]?.image,
    href: "#uu-dai-san-pham",
  },
];

const whyChooseUs = [
  {
    label: "Kho hàng",
    title: "Danh mục vật tư đa dạng",
    description:
      "Hỗ trợ nhiều nhóm sản phẩm từ bulong, dụng cụ, bảo hộ lao động đến vật tư MRO cho nhu cầu mua hàng doanh nghiệp.",
    image: HOME_PROMOTIONS[0]?.image,
  },
  {
    label: "Giao hàng",
    title: "Giao hàng nhanh cho đơn hàng dự án",
    description:
      "Hỗ trợ xử lý đơn hàng số lượng lớn, đơn hàng cần gấp và nhu cầu vật tư cho công trình.",
    image: HOME_PROMOTIONS[1]?.image,
  },
  {
    label: "Hỗ trợ",
    title: "Tư vấn kỹ thuật chuyên sâu",
    description:
      "Đội ngũ hỗ trợ giúp khách hàng chọn đúng vật tư, đúng tiêu chuẩn và đúng ứng dụng.",
    image: HOME_PROMOTIONS[2]?.image,
  },
];

const services = [
  {
    label: "Tư vấn",
    title: "Tư vấn vật tư theo nhu cầu",
    description:
      "Hỗ trợ chọn đúng vật tư theo ứng dụng, tiêu chuẩn kỹ thuật và môi trường sử dụng.",
    link: "Liên hệ",
    href: "/dich-vu-khach-hang",
  },
  {
    label: "Hợp đồng",
    title: "Cung ứng theo hợp đồng dài hạn",
    description:
      "Giải pháp mua hàng định kỳ cho nhà máy, đội bảo trì và công trình lớn.",
    link: "Liên hệ",
    href: "/dich-vu-khach-hang",
  },
  {
    label: "Báo giá",
    title: "Hỗ trợ báo giá số lượng lớn",
    description:
      "Tiếp nhận yêu cầu mua hàng doanh nghiệp và phản hồi báo giá phù hợp theo số lượng.",
    link: "Yêu cầu báo giá",
    href: "/dich-vu-khach-hang",
  },
  {
    label: "Kỹ thuật",
    title: "Kiểm tra tương thích sản phẩm",
    description:
      "Hỗ trợ đối chiếu thông số, kích thước và tiêu chuẩn trước khi đặt hàng.",
    link: "Liên hệ",
    href: "/dich-vu-khach-hang",
  },
];

const brandNames = ["Milwaukee", "DEWALT", "Stanley", "Bosch", "Makita", "3M"];

export function PromotionsPage() {
  const dealProducts = HOME_BEST_DEALS.slice(0, 5);

  return (
    <main className="bg-[#F6F4EF] text-[#111827]">
      <section className="px-4 pt-6 lg:px-8 lg:pt-8">
        <div className="mx-auto max-w-[1280px]">
          <Breadcrumb
            className="mb-5"
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Ưu đãi và mã giảm giá" },
            ]}
          />

          <div className="relative min-h-[520px] overflow-hidden rounded-md bg-[#111827] lg:min-h-[620px]">
            <Image
              src={HOME_PROMOTIONS[0]?.image || "/assets/promotions/NhaMay.png"}
              alt="Kho vật tư công nghiệp Mecsu"
              fill
              priority
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="relative flex min-h-[520px] items-end px-6 py-10 lg:min-h-[620px] lg:px-12 lg:py-14">
              <div className="max-w-3xl text-white">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-white/75">
                  Ưu đãi và mã giảm giá
                </p>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                  Ưu đãi vật tư công nghiệp cho doanh nghiệp
                </h1>
                <p className="mt-5 max-w-2xl text-base font-normal leading-7 text-white/82 md:text-lg">
                  Mã giảm giá, ưu đãi tự động và chương trình khuyến mãi cho đơn
                  hàng dự án, vật tư MRO, dụng cụ và bảo hộ lao động.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#uu-dai-noi-bat"
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F3F4F6]"
                  >
                    Khám phá ưu đãi
                  </Link>
                  <Link
                    href="#uu-dai-san-pham"
                    className="inline-flex h-12 items-center justify-center rounded-sm border border-white/50 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Xem sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] space-y-20 px-4 py-16 lg:px-8 lg:py-20">
        <section>
          <SectionHeader
            label="Ưu điểm"
            title="Tại sao doanh nghiệp chọn chúng tôi"
            subtitle="Giải pháp cung ứng vật tư công nghiệp toàn diện cho nhà máy, công trình và đội bảo trì."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <EditorialImageCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section id="uu-dai-noi-bat">
          <SectionHeader
            label="Khuyến mãi"
            title="Ưu đãi nổi bật cho đơn hàng doanh nghiệp"
            subtitle="Các chương trình khuyến mãi đang áp dụng cho vật tư công nghiệp, đơn hàng dự án và sản phẩm MRO."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredPromotions.map((promotion) => (
              <FeaturedPromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            label="Dịch vụ"
            title="Dịch vụ mua hàng chuyên sâu cho doanh nghiệp"
            subtitle="Hỗ trợ doanh nghiệp tối ưu quy trình mua vật tư, báo giá và cung ứng theo nhu cầu thực tế."
          />
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="relative min-h-[360px] overflow-hidden rounded-md border border-[#D8D2C8] bg-white lg:col-span-2">
              <Image
                src={HOME_PROMOTIONS[3]?.image || "/assets/promotions/NhaMay03.jpg"}
                alt="Dịch vụ mua hàng doanh nghiệp"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/75">
                  Mua hàng doanh nghiệp
                </p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight">
                  Đồng hành từ tư vấn vật tư đến báo giá số lượng lớn
                </h3>
              </div>
            </div>
            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            title="Thương hiệu nổi bật"
            subtitle="Các thương hiệu vật tư, dụng cụ và thiết bị được khách hàng doanh nghiệp tin dùng."
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {brandNames.map((brand) => (
              <div
                key={brand}
                className="flex h-24 items-center justify-center rounded-sm border border-[#D8D2C8] bg-white px-4 text-center text-lg font-semibold tracking-wide text-[#1F2937]"
              >
                {brand}
              </div>
            ))}
          </div>
        </section>

        <section id="uu-dai-san-pham">
          <SectionHeader title="Ưu đãi sản phẩm dành cho bạn" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {dealProducts.map((product) => (
              <DealProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Điều kiện và quy định áp dụng" />
          <PromotionRules />
        </section>

        <section className="rounded-md border border-[#D8D2C8] bg-white p-6 lg:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827]">
            Mua vật tư công nghiệp tiết kiệm hơn
          </h2>
          <p className="mt-4 max-w-4xl text-base font-normal leading-8 text-slate-600">
            Trang ưu đãi giúp khách hàng doanh nghiệp dễ dàng theo dõi mã giảm
            giá, chương trình khuyến mãi và ưu đãi tự động cho vật tư công
            nghiệp, dụng cụ, bảo hộ lao động và sản phẩm MRO. Các chương trình
            được cập nhật nhằm hỗ trợ doanh nghiệp tối ưu chi phí mua hàng và
            chủ động hơn trong kế hoạch cung ứng.
          </p>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      {label ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[#163F78]">
          {label}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#111827] md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base font-normal leading-7 text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function EditorialImageCard({
  label,
  title,
  description,
  image,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <article className="overflow-hidden rounded-md border border-[#D8D2C8] bg-white">
      <div className="p-6">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
        <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#111827]">
          {title}
        </h3>
        <p className="mt-3 text-sm font-normal leading-7 text-slate-600">
          {description}
        </p>
        <Link
          href="/dich-vu-khach-hang"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#163F78] hover:underline"
        >
          Xem thêm
          <ArrowRight size={15} />
        </Link>
      </div>
      <div className="relative h-56 bg-slate-200">
        <Image
          src={image || "/assets/promotions/NhaMay.png"}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}

function ServiceCard({
  label,
  title,
  description,
  link,
  href,
}: {
  label: string;
  title: string;
  description: string;
  link: string;
  href: string;
}) {
  return (
    <article className="rounded-md border border-[#D8D2C8] bg-white p-5">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-tight text-[#111827]">
        {title}
      </h3>
      <p className="mt-3 text-sm font-normal leading-7 text-slate-600">
        {description}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#163F78] hover:underline"
      >
        {link}
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}

function DealProductCard({ product }: { product: Product }) {
  const discount = product.discount || getDeterministicDiscount(product.id);
  const salePrice = product.price;
  const originalPrice =
    product.originalPrice || Math.round(salePrice / (1 - discount / 100));
  const image = product.image || getSeededCategoryImage(product.id);

  return (
    <article className="flex flex-col rounded-md border border-[#D8D2C8] bg-white p-4">
      <Link href={getProductHref(product)} className="flex flex-1 flex-col">
        <div className="relative mb-4 aspect-square bg-[#F6F4EF]">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 mix-blend-multiply"
          />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          {product.brand}
        </p>
        <h3 className="mt-2 line-clamp-2 min-h-[3rem] text-sm font-medium leading-6 text-[#111827]">
          {product.name}
        </h3>
        <div className="mt-4 space-y-1">
          <p className="text-sm font-normal text-slate-500 line-through">
            {originalPrice.toLocaleString("vi-VN")} đ
          </p>
          <div className="flex items-end justify-between gap-3">
            <p className="text-xl font-semibold text-[#111827]">
              {salePrice.toLocaleString("vi-VN")} đ
            </p>
            <span className="text-sm font-medium text-[#163F78]">
              -{discount}%
            </span>
          </div>
          <p className="text-sm font-normal text-green-700">
            {product.stock > 0 ? "Sẵn hàng" : "Hàng đang về"}
          </p>
        </div>
      </Link>
      <Link
        href={getProductHref(product)}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-sm border border-[#163F78] px-4 text-sm font-medium text-[#163F78] transition-colors hover:bg-[#163F78] hover:text-white"
      >
        Xem sản phẩm
      </Link>
    </article>
  );
}
