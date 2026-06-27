import type { Product } from "@/features/products/types/product";

export const CATEGORY_LISTING_ITEMS_PER_PAGE = 52;

export interface ProductFilterOption {
  id: string;
  label: string;
  count: number;
}

export function getBrandFilters(products: Product[]): ProductFilterOption[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    counts.set(product.brand, (counts.get(product.brand) || 0) + 1);
  });

  return Array.from(counts.entries()).map(([brand, count]) => ({
    id: brand,
    label: brand,
    count,
  }));
}

export function getFilteredProducts({
  products,
  selectedAvailability,
  selectedBrands,
  sortValue,
}: {
  products: Product[];
  selectedAvailability: string[];
  selectedBrands: string[];
  sortValue: string;
}): Product[] {
  const selectedBrandSet =
    selectedBrands.length > 0 ? new Set(selectedBrands) : null;
  const availabilitySet =
    selectedAvailability.length > 0 ? new Set(selectedAvailability) : null;
  const requiresInStock = availabilitySet?.has("in_stock") ?? false;
  const requiresPreorder = availabilitySet?.has("preorder") ?? false;

  const nextProducts =
    selectedBrandSet || availabilitySet
      ? products.filter((product) => {
          if (selectedBrandSet && !selectedBrandSet.has(product.brand)) {
            return false;
          }

          if (requiresInStock && product.stock <= 0) {
            return false;
          }

          if (requiresPreorder && product.stock > 0) {
            return false;
          }

          return true;
        })
      : [...products];

  if (sortValue === "price-asc") {
    nextProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    nextProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === "newest") {
    nextProducts.reverse();
  } else if (sortValue === "best-selling") {
    nextProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortValue === "stock") {
    nextProducts.sort((a, b) => b.stock - a.stock);
  }

  return nextProducts;
}

export function getPaginatedProducts(
  products: Product[],
  currentPage: number,
  itemsPerPage = CATEGORY_LISTING_ITEMS_PER_PAGE,
): Product[] {
  return products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
}

export function getTotalProductPages(
  products: Product[],
  itemsPerPage = CATEGORY_LISTING_ITEMS_PER_PAGE,
): number {
  return Math.max(1, Math.ceil(products.length / itemsPerPage));
}
