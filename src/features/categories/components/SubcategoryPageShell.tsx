import type { Product } from "@/features/products/types/product";
import type { Category, CategorySubcategory } from "../types/category";
import { CategoryListingClient } from "./CategoryListingClient";
import { SubcategoryCarousel } from "./subcategory-lower/SubcategoryCarousel";
import { SubcategoryBreadcrumb } from "./SubcategoryBreadcrumb";
import { SubcategoryLowerSections } from "./subcategory-lower";

interface SubcategoryPageShellProps {
  category: Category;
  subcategory: CategorySubcategory;
  products: Product[];
  parentSubcategory?: CategorySubcategory;
}

export function SubcategoryPageShell({
  category,
  subcategory,
  products,
  parentSubcategory,
}: SubcategoryPageShellProps) {
  const parentName = parentSubcategory?.name ?? category.name;

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-5 lg:px-12">
      <SubcategoryBreadcrumb
        category={category}
        subcategory={subcategory}
        parentSubcategory={parentSubcategory}
      />

      <section className="mb-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#1a1a1a] md:text-3xl">
          {subcategory.name}
        </h1>
        <p className="max-w-3xl text-sm leading-6 font-normal text-slate-600 md:text-lg">
          Khám phá sản phẩm {subcategory.name} thuộc danh mục {parentName},
          được tuyển chọn cho nhu cầu mua vật tư công nghiệp, công trình và sản
          xuất.
        </p>
      </section>

      <SubcategoryCarousel
        category={category}
        currentSubcategory={subcategory}
        parentSubcategory={parentSubcategory}
      />

      <CategoryListingClient title={subcategory.name} products={products} />
      <SubcategoryLowerSections
        category={category}
        subcategory={subcategory}
        products={products}
      />
    </main>
  );
}
