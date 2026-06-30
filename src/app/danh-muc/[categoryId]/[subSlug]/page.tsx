import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryPageShell } from "@/features/categories/components/SubcategoryPageShell";
import {
  getCategory,
  getCategoryDetailByPath,
  getSubcategory,
  getSubcategoryRouteParams,
} from "@/features/categories/services/category-service";
import { stripHtml } from "@/features/categories/services/catalog-category-detail-mapper";
import {
  listProductsForCategoryPath,
  parseCatalogProductsQuery,
  type ProductListingSearchParams,
} from "@/features/products/services/product-service";

interface SubcategoryRouteProps {
  params: Promise<{
    categoryId: string;
    subSlug: string;
  }>;
  searchParams?: Promise<ProductListingSearchParams>;
}

export async function generateStaticParams() {
  return getSubcategoryRouteParams();
}

export async function generateMetadata({
  params,
}: SubcategoryRouteProps): Promise<Metadata> {
  const { categoryId, subSlug } = await params;
  const category = await getCategory(categoryId);
  const categoryDetail = await getCategoryDetailByPath(`${categoryId}/${subSlug}`);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục | MECsu",
    };
  }

  const subcategory = await getSubcategory(category, subSlug);

  if (!subcategory) {
    return {
      title: "Không tìm thấy danh mục con | MECsu",
    };
  }

  const description =
    stripHtml(categoryDetail?.description || categoryDetail?.longDescription)
      .slice(0, 160) ||
    `Mua ${subcategory.name} thuộc danh mục ${category.name} tại MECsu. Xem giá, tình trạng hàng và lựa chọn sản phẩm phù hợp.`;

  return {
    title: `${categoryDetail?.name ?? subcategory.name} | ${category.name} | MECsu`,
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

export default async function SubcategoryPage({
  params,
  searchParams,
}: SubcategoryRouteProps) {
  const { categoryId, subSlug } = await params;
  const query = parseCatalogProductsQuery(await searchParams);
  const category = await getCategory(categoryId);
  const categoryPath = `${categoryId}/${subSlug}`;
  const categoryDetail = await getCategoryDetailByPath(categoryPath);

  if (!category) {
    notFound();
  }

  const subcategory = await getSubcategory(category, subSlug);

  if (!subcategory) {
    notFound();
  }

  const productListing = await listProductsForCategoryPath(
    categoryPath,
    category,
    subcategory,
    query,
  );

  return (
    <SubcategoryPageShell
      category={category}
      subcategory={subcategory}
      products={productListing.products}
      categoryDetail={categoryDetail}
      productCount={productListing.total || categoryDetail?.productCount}
    />
  );
}
