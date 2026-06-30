import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CategoryPageShell } from "@/features/categories/components/CategoryPageShell";
import {
  getCategory,
  getCategoryDetailByPath,
  getCategoryRouteParams,
  getSubcategoryRedirectHref,
} from "@/features/categories/services/category-service";
import { stripHtml } from "@/features/categories/services/catalog-category-detail-mapper";

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
  const categoryDetail = await getCategoryDetailByPath(categoryId);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục | MECsu",
    };
  }

  const description =
    stripHtml(categoryDetail?.description || categoryDetail?.longDescription)
      .slice(0, 160) ||
    `Khám phá danh mục ${category.name} với các sản phẩm vật tư công nghiệp chất lượng cao tại MECsu.`;

  return {
    title: `${categoryDetail?.name ?? category.name} | MECsu`,
    description,
    alternates: categoryDetail?.canonical || categoryDetail?.href
      ? {
          canonical: categoryDetail.canonical || categoryDetail.href,
        }
      : undefined,
    openGraph: categoryDetail?.imageUrl
      ? {
          images: [categoryDetail.imageUrl],
        }
      : undefined,
  };
}

export default async function CategoryPage({ params }: CategoryRouteProps) {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  const categoryDetail = await getCategoryDetailByPath(categoryId);

  if (!category) {
    const redirectHref = getSubcategoryRedirectHref(categoryId);

    if (redirectHref) {
      redirect(redirectHref);
    }

    notFound();
  }

  return <CategoryPageShell category={category} categoryDetail={categoryDetail} />;
}
