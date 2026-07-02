import { apiGet } from "@/lib/api/api-client";
import type { CatalogProductFiltersResponseDto } from "../types/catalog-product-filters-api";

export async function fetchCatalogProductFilters(): Promise<CatalogProductFiltersResponseDto> {
  return apiGet<CatalogProductFiltersResponseDto>("/api/catalog/products/filters", {
    revalidate: 300,
  });
}
