import { ApiClientError, apiGet } from "@/lib/api/api-client";
import type { CatalogCategoryDetailDto } from "../types/catalog-category-detail-api";

const CATEGORY_DETAIL_REVALIDATE_SECONDS = 3600;

export async function fetchCatalogCategoryDetail(
  id: number,
): Promise<CatalogCategoryDetailDto | null> {
  try {
    return await apiGet<CatalogCategoryDetailDto>(
      `/api/catalog/categories/${id}`,
      {
        revalidate: CATEGORY_DETAIL_REVALIDATE_SECONDS,
      },
    );
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
