import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryPageShell } from "@/features/categories/components/SubcategoryPageShell";
import {
  getAllCategories,
  getCategoryByIdOrSlug,
  getCategorySubcategories,
  getSubcategoryBySlug,
} from "@/features/categories/services/category-service";
import { getProductsForSubcategory } from "@/features/products/services/product-service";

interface SubcategoryRouteProps {
  params: Promise<{
    categoryId: string;
    subSlug: string;
  }>;
}

export function generateStaticParams() {
  return getAllCategories().flatMap((category) =>
    getCategorySubcategories(category).map((subcategory) => ({
      categoryId: category.slug,
      subSlug: subcategory.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: SubcategoryRouteProps): Promise<Metadata> {
  const { categoryId, subSlug } = await params;
  const category = getCategoryByIdOrSlug(categoryId);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục | MECsu",
    };
  }

  const subcategory = getSubcategoryBySlug(category, subSlug);

  if (!subcategory) {
    return {
      title: "Không tìm thấy danh mục con | MECsu",
    };
  }

  return {
    title: `${subcategory.name} | ${category.name} | MECsu`,
    description: `Mua ${subcategory.name} thuộc danh mục ${category.name} tại MECsu. Xem giá, tình trạng hàng và lựa chọn sản phẩm phù hợp.`,
  };
}

export default async function SubcategoryPage({ params }: SubcategoryRouteProps) {
  const { categoryId, subSlug } = await params;
  const category = getCategoryByIdOrSlug(categoryId);

  if (!category) {
    notFound();
  }

  const subcategory = getSubcategoryBySlug(category, subSlug);

  if (!subcategory) {
    notFound();
  }

  const products = getProductsForSubcategory(category, subcategory);

  return (
    <SubcategoryPageShell
      category={category}
      subcategory={subcategory}
      products={products}
    />
  );
}
