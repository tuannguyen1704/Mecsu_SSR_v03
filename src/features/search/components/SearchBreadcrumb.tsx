import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { getCategoryTrailBySearchQuery } from "@/features/categories/services/category-service";

export function SearchBreadcrumb({ query }: { query: string }) {
  const categoryTrail = getCategoryTrailBySearchQuery(query);

  if (categoryTrail?.subcategory) {
    return (
      <Breadcrumb
        className="mb-6"
        items={[
          { label: "Trang chủ", href: "/" },
          {
            label: categoryTrail.category.name,
            href: `/danh-muc/${categoryTrail.category.slug}`,
          },
          { label: categoryTrail.subcategory.name },
        ]}
      />
    );
  }

  if (categoryTrail) {
    return (
      <Breadcrumb
        className="mb-6"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: categoryTrail.category.name },
        ]}
      />
    );
  }

  return (
    <Breadcrumb
      className="mb-6"
      items={[
        { label: "Trang chủ", href: "/" },
        { label: "Tìm kiếm" },
      ]}
    />
  );
}
