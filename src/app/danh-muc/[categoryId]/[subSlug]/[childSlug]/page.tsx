import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryPageShell } from "@/features/categories/components/SubcategoryPageShell";
import {
  getCategory,
  getNestedSubcategoryRouteParams,
  getSubcategory,
  getSubcategoryChild,
} from "@/features/categories/services/category-service";
import { listProductsForSubcategory } from "@/features/products/services/product-service";

interface NestedSubcategoryRouteProps {
  params: Promise<{
    categoryId: string;
    subSlug: string;
    childSlug: string;
  }>;
}

export async function generateStaticParams() {
  return getNestedSubcategoryRouteParams();
}

export async function generateMetadata({
  params,
}: NestedSubcategoryRouteProps): Promise<Metadata> {
  const { categoryId, subSlug, childSlug } = await params;
  const category = await getCategory(categoryId);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục | MECsu",
    };
  }

  const parentSubcategory = await getSubcategory(category, subSlug);
  const childSubcategory = await getSubcategoryChild(
    category,
    subSlug,
    childSlug,
  );

  if (!parentSubcategory || !childSubcategory) {
    return {
      title: "Không tìm thấy danh mục con | MECsu",
    };
  }

  return {
    title: `${childSubcategory.name} | ${parentSubcategory.name} | ${category.name} | MECsu`,
    description: `Mua ${childSubcategory.name} thuộc danh mục ${parentSubcategory.name} tại MECsu. Xem giá, tình trạng hàng và lựa chọn sản phẩm phù hợp.`,
  };
}

export default async function NestedSubcategoryPage({
  params,
}: NestedSubcategoryRouteProps) {
  const { categoryId, subSlug, childSlug } = await params;
  const category = await getCategory(categoryId);

  if (!category) {
    notFound();
  }

  const parentSubcategory = await getSubcategory(category, subSlug);
  const childSubcategory = await getSubcategoryChild(
    category,
    subSlug,
    childSlug,
  );

  if (!parentSubcategory || !childSubcategory) {
    notFound();
  }

  const products = await listProductsForSubcategory(category, childSubcategory);

  return (
    <SubcategoryPageShell
      category={category}
      subcategory={childSubcategory}
      products={products}
      parentSubcategory={parentSubcategory}
    />
  );
}
