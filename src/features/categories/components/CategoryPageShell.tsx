import Link from "next/link";
import { CategoryBreadcrumb } from "./CategoryBreadcrumb";
import { CategoryHero } from "./CategoryHero";
import { CategorySubcategoryGrid } from "./CategorySubcategoryGrid";
import {
  getAllCategories,
  getCategorySubcategories,
} from "../services/category-service";
import type { Category } from "../types/category";

export function CategoryPageShell({ category }: { category: Category }) {
  const categories = getAllCategories();
  const subcategories = getCategorySubcategories(category);

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-12 lg:px-12">
      <CategoryBreadcrumb category={category} />
      <CategoryHero category={category} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Shop Related Categories
          </h2>
          <ul className="space-y-4">
            {categories.map((relatedCategory) => (
              <li key={relatedCategory.id}>
                <Link
                  href={`/danh-muc/${relatedCategory.slug}`}
                  className={`block text-lg transition-colors hover:underline ${
                    relatedCategory.id === category.id
                      ? "font-bold text-[#EAB308]"
                      : "text-[#2071a7]"
                  }`}
                >
                  {relatedCategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-span-3">
          <CategorySubcategoryGrid
            category={category}
            subcategories={subcategories}
          />
        </div>
      </div>
    </main>
  );
}
