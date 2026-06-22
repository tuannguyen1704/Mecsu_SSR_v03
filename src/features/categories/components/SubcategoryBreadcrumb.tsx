import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type { Category, CategorySubcategory } from "../types/category";

export function SubcategoryBreadcrumb({
  category,
  subcategory,
}: {
  category: Category;
  subcategory: CategorySubcategory;
}) {
  return (
    <Breadcrumb
      className="mb-6"
      items={[
        { label: "Trang chủ", href: "/" },
        { label: category.name, href: `/danh-muc/${category.slug}` },
        { label: subcategory.name },
      ]}
    />
  );
}
