import { apiGet } from "@/lib/api/api-client";
import type { CatalogCategoryNodeDto } from "../types/catalog-category-api";

const CATEGORY_TREE_REVALIDATE_SECONDS = 3600;

export async function fetchCatalogCategoryTree(
  rootId = 1,
): Promise<CatalogCategoryNodeDto> {
  return apiGet<CatalogCategoryNodeDto>("/api/catalog/categories", {
    query: { rootId },
    cache: "no-store",
    revalidate: CATEGORY_TREE_REVALIDATE_SECONDS,
  });
}
