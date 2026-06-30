import type { CatalogCategoryDetailDto } from "../types/catalog-category-detail-api";

export type CategoryDetail = {
  apiId: number;
  name: string;
  slug: string;
  href: string;
  description?: string | null;
  longDescription?: string | null;
  productCount: number;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  canonical?: string | null;
};

export function mapCatalogCategoryDetail(
  dto: CatalogCategoryDetailDto,
): CategoryDetail {
  const imageUrl = dto.images[0]?.fullUrl ?? null;

  return {
    apiId: dto.id,
    name: dto.name,
    slug: dto.slug,
    href: dto.canonical || dto.slugUrl || `/danh-muc/${dto.slug}`,
    description: dto.description,
    longDescription: dto.longDescription,
    productCount: dto.productCount,
    imageUrl,
    thumbnailUrl: dto.images[0]?.thumbUrl ?? imageUrl,
    canonical: dto.canonical,
  };
}

export function stripHtml(value?: string | null) {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
