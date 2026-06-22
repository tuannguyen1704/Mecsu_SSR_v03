import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type { Category } from "../types/category";

export function CategoryBreadcrumb({ category }: { category: Category }) {
  return (
    <Breadcrumb
      className="mb-8"
      items={[
        { label: "Trang chủ", href: "/" },
        { label: category.name },
      ]}
    />
  );
}
