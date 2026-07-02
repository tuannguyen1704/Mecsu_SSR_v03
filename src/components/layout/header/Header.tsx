import {
  HEADER_CATEGORIES,
  HEADER_LOCATIONS,
} from "@/features/categories/data/header-categories";
import {
  getHeaderCategories,
  getIsCatalogApiEnabled,
} from "@/features/categories/services/category-service";
import { getHeaderSearchSuggestions } from "@/features/products/services/product-service";
import {
  shouldThrowCatalogApiError,
  warnCatalogApiFallback,
} from "@/lib/api/catalog-api-fallback";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const categories = await getSafeHeaderCategories();

  return (
    <HeaderClient
      categories={categories}
      catalogApiEnabled={getIsCatalogApiEnabled()}
      locations={HEADER_LOCATIONS}
      suggestions={getHeaderSearchSuggestions()}
    />
  );
}

async function getSafeHeaderCategories() {
  try {
    return await getHeaderCategories();
  } catch (error) {
    if (shouldThrowCatalogApiError()) {
      throw error;
    }

    warnCatalogApiFallback(
      "Header server component",
      error,
      "mock header categories",
    );

    return HEADER_CATEGORIES;
  }
}
