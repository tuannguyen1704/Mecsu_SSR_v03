import { apiGet } from "@/lib/api/api-client";
import type {
  CatalogCategoryProductsQuery,
  CatalogCategoryProductsResponseDto,
} from "../types/catalog-category-products-api";

const DEFAULT_PRODUCT_LISTING_PAGE = 1;
const DEFAULT_PRODUCT_LISTING_PAGE_SIZE = 20;
const MAX_PRODUCT_LISTING_PAGE_SIZE = 100;

function toPositiveInteger(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.floor(value));
}

function buildProductListingQuery(query?: CatalogCategoryProductsQuery) {
  const page = toPositiveInteger(query?.page, DEFAULT_PRODUCT_LISTING_PAGE);
  const pageSize = Math.min(
    MAX_PRODUCT_LISTING_PAGE_SIZE,
    toPositiveInteger(query?.pageSize, DEFAULT_PRODUCT_LISTING_PAGE_SIZE),
  );
  const normalizedQuery: Record<string, string | number | boolean> = {
    page,
    pageSize,
  };
  const keyword = query?.keyword?.trim();

  if (keyword) {
    normalizedQuery.keyword = keyword;
  }

  if (typeof query?.brandId === "number" && Number.isFinite(query.brandId)) {
    normalizedQuery.brandId = Math.floor(query.brandId);
  }

  if (typeof query?.instock === "boolean") {
    normalizedQuery.instock = query.instock;
  }

  return normalizedQuery;
}

export async function fetchCatalogCategoryProducts(
  categoryId: number,
  query?: CatalogCategoryProductsQuery,
): Promise<CatalogCategoryProductsResponseDto> {
  return apiGet<CatalogCategoryProductsResponseDto>(
    `/api/catalog/categories/${categoryId}/products`,
    {
      query: buildProductListingQuery(query),
      revalidate: 60,
    },
  );
}
