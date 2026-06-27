import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CategoryPageShell } from "@/features/categories/components/CategoryPageShell";
import {
  getCategory,
  getCategoryRouteParams,
  getSubcategoryRedirectHref,
} from "@/features/categories/services/category-service";

interface CategoryRouteProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return getCategoryRouteParams();
}

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);

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
  const category = await getCategory(categoryId);

  if (!category) {
    const redirectHref = getSubcategoryRedirectHref(categoryId);

    if (redirectHref) {
      redirect(redirectHref);
    }

    notFound();
  }

  return <CategoryPageShell category={category} />;
}
