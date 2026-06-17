"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import type { Product } from "../../types/product";
import { getDerivedSpecs } from "./ProductTechSpecs";

interface ProductInformationSectionsProps {
  product: Product;
  description: string;
  images: string[];
}

export function ProductInformationSections({
  product,
  description,
  images,
}: ProductInformationSectionsProps) {
  const realImages = getRealImages(product, images);
  const specs = getDerivedSpecs(product);

  return (
    <section
      id="product-info"
      className="border-t border-slate-200 px-0 py-4 font-sans"
    >
      <h2 className="mb-4 text-[24px] font-bold text-[#0F1111]">
        Thông tin sản phẩm
      </h2>

      <div className="space-y-4">
        <InfoAccordion title="Hình ảnh thực tế" defaultOpen>
          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
            {realImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-square overflow-hidden rounded-sm border border-slate-100 bg-slate-50"
              >
                <Image
                  src={image}
                  alt={`${product.name} thực tế ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </InfoAccordion>

        <InfoAccordion title="Chi tiết sản phẩm" defaultOpen>
          <div
            id="product-detail-specs"
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <div className="space-y-0.5">
              {Object.entries(specs).map(([label, value]) => (
                <InfoRow key={label} label={label} value={value} />
              ))}
            </div>

            <div className="flex min-h-[260px] items-center justify-center rounded-sm border border-slate-100 bg-white p-4">
              <TechnicalDrawingPlaceholder product={product} />
            </div>
          </div>
        </InfoAccordion>
      </div>

      <div className="mt-6 space-y-4 text-[14px] leading-[1.7] text-[#0F1111]">
        <p>{description}</p>
        <p>
          Sản phẩm được sử dụng trong các ứng dụng lắp ráp, bảo trì và sản xuất
          công nghiệp, nơi yêu cầu vật tư có kích thước ổn định, thông số rõ ràng
          và khả năng thay thế thuận tiện. Khi đặt mua, bạn nên đối chiếu SKU,
          tiêu chuẩn, vật liệu và kích thước với bản vẽ hoặc yêu cầu kỹ thuật
          thực tế.
        </p>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="mb-2 text-[13px] font-bold text-[#0F1111]">
          Bảo hành & Hỗ trợ
        </h3>
        <p className="mb-4 text-[13px] leading-normal text-[#0F1111]">
          Chính sách đổi trả của MECSU: đảm bảo đổi trả tự nguyện trong 30 ngày
          đối với các mặt hàng đủ điều kiện. Dữ liệu bảo hành chi tiết sẽ được
          đồng bộ khi backend sản phẩm thật được tích hợp.
        </p>
      </div>
    </section>
  );
}

function InfoAccordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-[#092b34] bg-[#092b34] px-4 py-2.5 transition-colors hover:bg-[#0c3a45]"
      >
        <span className="text-[17px] font-bold text-white">{title}</span>
        <ChevronUp
          size={20}
          className={`text-white transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 py-2">{children}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_1fr] border-b border-slate-200 py-2 last:border-0">
      <div className="text-[13px] font-bold text-[#0F1111]">{label}</div>
      <div className="text-[13px] text-[#0F1111]">{value}</div>
    </div>
  );
}

function TechnicalDrawingPlaceholder({ product }: { product: Product }) {
  return (
    <div className="relative h-[230px] w-full max-w-[360px] rounded-sm border border-dashed border-slate-300 bg-[linear-gradient(90deg,#f8fafc_24px,transparent_1px),linear-gradient(#f8fafc_24px,transparent_1px)] bg-[size:28px_28px] p-5">
      <div className="absolute inset-x-10 top-1/2 h-16 -translate-y-1/2 rounded-full border-4 border-[#132832]" />
      <div className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#132832] bg-white" />
      <div className="absolute top-8 right-8 text-right text-[11px] font-bold text-slate-500">
        {product.sku}
      </div>
      <div className="absolute bottom-7 left-7 right-7 border-t border-[#132832]" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#132832]">
        TECHNICAL DRAWING
      </div>
    </div>
  );
}

function getRealImages(product: Product, images: string[]) {
  const candidates = [...images, product.image].filter(Boolean) as string[];

  while (candidates.length < 4) {
    candidates.push(getSeededCategoryImage(`${product.id}-real-${candidates.length}`));
  }

  return candidates.slice(0, 4);
}
