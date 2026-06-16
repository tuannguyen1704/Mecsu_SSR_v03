import Link from "next/link";
import { Plus } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import type { Product } from "../../types/product";
import { getProductHref, getProductCategoryTrail } from "../../services/product-service";

interface ProductSimilarSidebarProps {
  product: Product;
  products: Product[];
}

export function ProductSimilarSidebar({
  product,
  products,
}: ProductSimilarSidebarProps) {
  const { category, subcategory } = getProductCategoryTrail(product);
  const viewAllHref =
    category && subcategory
      ? `/danh-muc/${category.slug}/${subcategory.slug}`
      : `/search?q=${encodeURIComponent(product.category)}`;

  return (
    <aside className="hidden border-l border-slate-100 pl-8 lg:sticky lg:top-24 lg:col-span-3 lg:block xl:col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[16px] font-bold tracking-wider text-[#222] uppercase">
          Sản phẩm tương tự
        </h3>
      </div>
      <div className="flex flex-col gap-6">
        {products.slice(0, 4).map((relatedProduct, index) => (
          <Link
            key={`${relatedProduct.id}-${index}`}
            href={getProductHref(relatedProduct)}
            className="group flex w-full gap-4 text-left transition-all hover:translate-x-1"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-[#f8f8f8] p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={relatedProduct.image || getSeededPlaceholder(relatedProduct.id)}
                alt={relatedProduct.name}
                className="h-full w-full object-contain transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full border border-yellow-500 bg-[#FFD814] p-1.5 shadow-lg">
                  <Plus size={16} className="text-[#0F1111]" strokeWidth={3} />
                </div>
              </div>
            </div>
            <div className="flex flex-col pr-2">
              <h4 className="line-clamp-2 text-[13px] leading-snug font-medium text-[#222] transition-colors group-hover:text-blue-600">
                {relatedProduct.name}
              </h4>
              <div className="mt-1 text-[13px] font-bold text-[#0F1111]">
                {relatedProduct.price.toLocaleString("vi-VN")}đ /{" "}
                {relatedProduct.unit || "cái"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href={viewAllHref}
        className="mt-8 block rounded-sm border border-slate-200 py-2 text-center text-[13px] font-bold text-[#666] uppercase transition-colors hover:bg-slate-50"
      >
        Xem tất cả
      </Link>
    </aside>
  );
}
