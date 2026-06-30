import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryPageShell } from "@/features/categories/components/SubcategoryPageShell";
import {
  getCategory,
  getCategoryDetailByPath,
  getNestedSubcategoryRouteParams,
  getSubcategory,
  getSubcategoryChild,
} from "@/features/categories/services/category-service";
import { stripHtml } from "@/features/categories/services/catalog-category-detail-mapper";
import {
  listProductsForCategoryPath,
  parseCatalogProductsQuery,
  type ProductListingSearchParams,
} from "@/features/products/services/product-service";

interface NestedSubcategoryRouteProps {
  params: Promise<{
    categoryId: string;
    subSlug: string;
    childSlug: string;
  }>;
  searchParams?: Promise<ProductListingSearchParams>;
}

export async function generateStaticParams() {
  return getNestedSubcategoryRouteParams();
}

export async function generateMetadata({
  params,
}: NestedSubcategoryRouteProps): Promise<Metadata> {
  const { categoryId, subSlug, childSlug } = await params;
  const category = await getCategory(categoryId);
  const categoryDetail = await getCategoryDetailByPath(
    `${categoryId}/${subSlug}/${childSlug}`,
  );

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

  const description =
    stripHtml(categoryDetail?.description || categoryDetail?.longDescription)
      .slice(0, 160) ||
    `Mua ${childSubcategory.name} thuộc danh mục ${parentSubcategory.name} tại MECsu. Xem giá, tình trạng hàng và lựa chọn sản phẩm phù hợp.`;

  return {
    title: `${categoryDetail?.name ?? childSubcategory.name} | ${parentSubcategory.name} | ${category.name} | MECsu`,
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

export default async function NestedSubcategoryPage({
  params,
  searchParams,
}: NestedSubcategoryRouteProps) {
  const { categoryId, subSlug, childSlug } = await params;
  const query = parseCatalogProductsQuery(await searchParams);
  const categoryPath = `${categoryId}/${subSlug}/${childSlug}`;
  const category = await getCategory(categoryId);
  const categoryDetail = await getCategoryDetailByPath(categoryPath);

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

  const productListing = await listProductsForCategoryPath(
    categoryPath,
    category,
    childSubcategory,
    query,
  );

  return (
    <SubcategoryPageShell
      category={category}
      subcategory={childSubcategory}
      products={productListing.products}
      parentSubcategory={parentSubcategory}
      categoryDetail={categoryDetail}
      productCount={productListing.total || categoryDetail?.productCount}
    />
  );
}
