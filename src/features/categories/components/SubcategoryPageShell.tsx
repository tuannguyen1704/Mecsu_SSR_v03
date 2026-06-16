import type { Product } from "@/features/products/types/product";
import type { Category, CategorySubcategory } from "../types/category";
import { CategoryListingClient } from "./CategoryListingClient";
import { SubcategoryBreadcrumb } from "./SubcategoryBreadcrumb";
import { SubcategoryLowerSections } from "./subcategory-lower";

interface SubcategoryPageShellProps {
  category: Category;
  subcategory: CategorySubcategory;
  products: Product[];
}

export function SubcategoryPageShell({
  category,
  subcategory,
  products,
}: SubcategoryPageShellProps) {
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-12">
      <SubcategoryBreadcrumb category={category} subcategory={subcategory} />

      <section className="mb-8">
        <h1 className="mb-3 text-3xl font-black tracking-tight text-[#1a1a1a] md:text-4xl">
          {subcategory.name}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed font-medium text-slate-600 md:text-lg">
          Khám phá sản phẩm {subcategory.name} thuộc danh mục {category.name},
          được tuyển chọn cho nhu cầu mua vật tư công nghiệp, công trình và sản
          xuất.
        </p>
      </section>

      <CategoryListingClient
        title={subcategory.name}
        products={products}
      />
      <SubcategoryLowerSections
        category={category}
        subcategory={subcategory}
        products={products}
      />
    </main>
  );
}
