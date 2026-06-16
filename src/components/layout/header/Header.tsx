import { HEADER_CATEGORIES, HEADER_LOCATIONS } from "@/features/categories/data/header-categories";
import { PRODUCTS } from "@/features/products/data/products";
import HeaderClient from "./HeaderClient";

export default function Header() {
  return (
    <HeaderClient
      categories={HEADER_CATEGORIES}
      locations={HEADER_LOCATIONS}
      products={PRODUCTS}
    />
  );
}
