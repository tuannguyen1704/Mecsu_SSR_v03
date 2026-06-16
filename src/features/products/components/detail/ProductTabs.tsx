"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "../../types/product";

interface ProductTabsProps {
  product: Product;
  description: string;
  specifications: Record<string, string>;
}

const TABS = [
  { id: "description", label: "Mô tả sản phẩm" },
  { id: "specifications", label: "Thông số kỹ thuật" },
  { id: "reviews", label: "Đánh giá" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductTabs({ product, description, specifications }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <section className="border-t border-slate-200 py-8">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-[14px] font-black tracking-[0.12em] uppercase transition-colors ${
              activeTab === tab.id
                ? "border-[#005da4] text-[#005da4]"
                : "border-transparent text-slate-500 hover:text-[#1a1a1a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "description" ? (
        <div className="max-w-4xl text-[15px] leading-7 font-medium text-[#0F1111]">
          <h2 className="mb-3 text-[24px] font-bold text-[#0F1111]">
            Thông tin sản phẩm
          </h2>
          <p>{description}</p>
          <p className="mt-4">
            Chính sách đổi trả của MECSU hỗ trợ kiểm tra sản phẩm sau giao hàng
            theo điều kiện hiện hành. Thông tin trong giai đoạn migration được
            giữ ở mức mock/static để bảo toàn UI và chuẩn bị cho tích hợp API sau.
          </p>
        </div>
      ) : null}

      {activeTab === "specifications" ? (
        <div className="max-w-4xl overflow-hidden rounded-sm border border-slate-200">
          {Object.entries(specifications).map(([label, value]) => (
            <div key={label} className="grid grid-cols-1 border-b border-slate-200 last:border-b-0 md:grid-cols-[220px_1fr]">
              <div className="bg-[#f2f5f7] p-3 text-[14px] font-bold text-[#0F1111] md:border-r md:border-slate-200">
                {label}
              </div>
              <div className="p-3 text-[14px] text-[#0F1111]">{value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === "reviews" ? (
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="mb-2 text-[42px] font-black text-[#1a1a1a]">
              {product.rating || 4.8}
            </div>
            <div className="mb-3 flex text-[#ed6c2d]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  fill="currentColor"
                  stroke="none"
                  className={index < Math.round(product.rating || 4.8) ? "" : "opacity-30"}
                />
              ))}
            </div>
            <p className="text-[13px] font-bold text-slate-500">
              51 đánh giá tạm thời trong giai đoạn migration.
            </p>
          </div>

          <div className="space-y-4">
            {["Chất lượng ổn định", "Giao hàng đúng hẹn"].map((title, index) => (
              <article key={title} className="rounded-sm border border-slate-200 bg-white p-5">
                <div className="mb-2 flex text-[#ed6c2d]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <h3 className="mb-1 text-[15px] font-black text-[#1a1a1a]">{title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-600">
                  Đánh giá mẫu #{index + 1} dùng để giữ bố cục tab reviews trước khi
                  backend đánh giá được tích hợp.
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
