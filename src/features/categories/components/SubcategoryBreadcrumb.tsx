import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type { Category, CategorySubcategory } from "../types/category";

export function SubcategoryBreadcrumb({
  category,
  subcategory,
  parentSubcategory,
}: {
  category: Category;
  subcategory: CategorySubcategory;
  parentSubcategory?: CategorySubcategory;
}) {
  const items = [
    { label: "Trang chủ", href: "/" },
    { label: category.name, href: `/danh-muc/${category.slug}` },
    ...(parentSubcategory
      ? [
          {
            label: parentSubcategory.name,
            href: `/danh-muc/${category.slug}/${parentSubcategory.slug}`,
          },
        ]
      : []),
    { label: subcategory.name },
  ];

  return (
    <Breadcrumb
      className="mb-6"
      items={items}
    />
  );
}
