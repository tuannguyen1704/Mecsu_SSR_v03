import { HEADER_LOCATIONS } from "@/features/categories/data/header-categories";
import {
  getHeaderCategories,
  getIsCatalogApiEnabled,
} from "@/features/categories/services/category-service";
import { getHeaderSearchSuggestions } from "@/features/products/services/product-service";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const categories = await getHeaderCategories();

  return (
    <HeaderClient
      categories={categories}
      catalogApiEnabled={getIsCatalogApiEnabled()}
      locations={HEADER_LOCATIONS}
      suggestions={getHeaderSearchSuggestions()}
    />
  );
}
