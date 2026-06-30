import Image from "next/image";
import type { Product } from "@/features/products/types/product";
import type { Category, CategorySubcategory } from "../types/category";
import { CategoryListingClient } from "./CategoryListingClient";
import {
  stripHtml,
  type CategoryDetail,
} from "../services/catalog-category-detail-mapper";
import { SubcategoryCarousel } from "./subcategory-lower/SubcategoryCarousel";
import { SubcategoryBreadcrumb } from "./SubcategoryBreadcrumb";
import { SubcategoryLowerSections } from "./subcategory-lower";

interface SubcategoryPageShellProps {
  category: Category;
  subcategory: CategorySubcategory;
  products: Product[];
  parentSubcategory?: CategorySubcategory;
  categoryDetail?: CategoryDetail;
  productCount?: number;
}

export function SubcategoryPageShell({
  category,
  subcategory,
  products,
  parentSubcategory,
  categoryDetail,
  productCount,
}: SubcategoryPageShellProps) {
  const parentName = parentSubcategory?.name ?? category.name;
  const detailDescription = stripHtml(
    categoryDetail?.description || categoryDetail?.longDescription,
  );

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-5 lg:px-12">
      <SubcategoryBreadcrumb
        category={category}
        subcategory={subcategory}
        parentSubcategory={parentSubcategory}
      />

      <section className="mb-5 flex flex-col gap-5 md:flex-row md:items-stretch">
        {categoryDetail?.imageUrl || categoryDetail?.thumbnailUrl ? (
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm md:h-auto md:w-40 md:self-stretch">
            <Image
              src={categoryDetail.imageUrl || categoryDetail.thumbnailUrl || ""}
              alt={categoryDetail.name}
              fill
              sizes="128px"
              className="object-contain p-2"
            />
          </div>
        ) : null}

        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl">
            {subcategory.name}
          </h1>
          <p className="max-w-3xl text-base leading-7 font-normal text-slate-600">
            {detailDescription ||
              `Khám phá sản phẩm ${subcategory.name} thuộc danh mục ${parentName}, được tuyển chọn cho nhu cầu mua vật tư công nghiệp, công trình và sản xuất.`}
            {categoryDetail?.productCount ? (
              <span className="ml-1 text-slate-500">
                ({categoryDetail.productCount.toLocaleString("vi-VN")} sản phẩm)
              </span>
            ) : null}
          </p>
        </div>
      </section>

      <SubcategoryCarousel
        category={category}
        currentSubcategory={subcategory}
        parentSubcategory={parentSubcategory}
      />

      <CategoryListingClient
        title={subcategory.name}
        products={products}
        productCountLabel={
          typeof productCount === "number"
            ? `${productCount.toLocaleString("vi-VN")} sản phẩm`
            : undefined
        }
      />
      <SubcategoryLowerSections
        category={category}
        subcategory={subcategory}
        products={products}
      />
    </main>
  );
}
