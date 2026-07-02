import { apiGet } from "@/lib/api/api-client";
import type {
  CatalogCategoryBrandsQuery,
  CatalogCategoryBrandsResponseDto,
} from "../types/catalog-category-brands-api";

function buildCategoryBrandsQuery(query?: CatalogCategoryBrandsQuery) {
  const normalizedQuery: Record<string, string | boolean> = {};
  const allowedQueryKeys = new Set([
    "keyword",
    "instock",
    "instockVendor",
    "nextDayShipping",
    "discountForApp",
    "partType",
    "stockLevel",
    "partWebSellable",
    "partSellable",
  ]);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (!allowedQueryKeys.has(key)) {
      return;
    }

    if (value === null || typeof value === "undefined") {
      return;
    }

    if (typeof value === "string") {
      const trimmedValue = value.trim();

      if (trimmedValue) {
        normalizedQuery[key] = trimmedValue;
      }

      return;
    }

    normalizedQuery[key] = value;
  });

  return normalizedQuery;
}

export async function fetchCatalogCategoryBrands(
  categoryId: number,
  query?: CatalogCategoryBrandsQuery,
): Promise<CatalogCategoryBrandsResponseDto> {
  return apiGet<CatalogCategoryBrandsResponseDto>(
    `/api/catalog/categories/${categoryId}/brands`,
    {
      query: buildCategoryBrandsQuery(query),
      revalidate: 300,
    },
  );
}
