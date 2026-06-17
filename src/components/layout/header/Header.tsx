import { HEADER_CATEGORIES, HEADER_LOCATIONS } from "@/features/categories/data/header-categories";
import { getHeaderSearchSuggestions } from "@/features/products/services/product-service";
import HeaderClient from "./HeaderClient";

export default function Header() {
  return (
    <HeaderClient
      categories={HEADER_CATEGORIES}
      locations={HEADER_LOCATIONS}
      suggestions={getHeaderSearchSuggestions()}
    />
  );
}
