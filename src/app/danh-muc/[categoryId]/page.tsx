import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageShell } from "@/features/categories/components/CategoryPageShell";
import {
  getAllCategories,
  getCategoryByIdOrSlug,
} from "@/features/categories/services/category-service";

interface CategoryRouteProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    categoryId: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategoryByIdOrSlug(categoryId);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục | MECsu",
    };
  }

  return {
    title: `${category.name} | MECsu`,
    description: `Khám phá danh mục ${category.name} với các sản phẩm vật tư công nghiệp chất lượng cao tại MECsu.`,
  };
}

export default async function CategoryPage({ params }: CategoryRouteProps) {
  const { categoryId } = await params;
  const category = getCategoryByIdOrSlug(categoryId);

  if (!category) {
    notFound();
  }

  return <CategoryPageShell category={category} />;
}
