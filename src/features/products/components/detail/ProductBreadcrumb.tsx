import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type { Product } from "../../types/product";
import { getProductCategoryTrail } from "../../services/product-service";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { category, subcategory } = getProductCategoryTrail(product);

  return (
    <Breadcrumb
      items={[
        { label: "Trang chủ", href: "/" },
        ...(category
          ? [
              {
                label: category.name,
                href: `/danh-muc/${category.slug}`,
              },
            ]
          : []),
        ...(category && subcategory
          ? [
              {
                label: subcategory.name,
                href: `/danh-muc/${category.slug}/${subcategory.slug}`,
              },
            ]
          : []),
        { label: product.name },
      ]}
    />
  );
}
