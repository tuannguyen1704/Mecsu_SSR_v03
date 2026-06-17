import type { Product } from "@/features/products/types/product";

export const CATEGORY_LISTING_ITEMS_PER_PAGE = 12;

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
  let nextProducts = [...products];

  if (selectedBrands.length > 0) {
    nextProducts = nextProducts.filter((product) =>
      selectedBrands.includes(product.brand),
    );
  }

  if (selectedAvailability.includes("in_stock")) {
    nextProducts = nextProducts.filter((product) => product.stock > 0);
  }

  if (selectedAvailability.includes("preorder")) {
    nextProducts = nextProducts.filter((product) => product.stock <= 0);
  }

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
