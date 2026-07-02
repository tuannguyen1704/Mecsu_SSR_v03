import type { Product } from "@/features/products/types/product";

export const CATEGORY_LISTING_ITEMS_PER_PAGE = 52;

export interface ProductFilterOption {
  id: string;
  label: string;
  count: number;
}

export function getBrandFilters(products: Product[]): ProductFilterOption[] {
  const counts = new Map<string, { label: string; count: number }>();

  products.forEach((product) => {
    const id = product.brandId ? String(product.brandId) : product.brand;
    const current = counts.get(id);

    counts.set(id, {
      label: product.brand,
      count: (current?.count || 0) + 1,
    });
  });

  return Array.from(counts.entries()).map(([id, item]) => ({
    id,
    label: item.label,
    count: item.count,
  }));
}

export function getFilteredProducts({
  products,
  selectedAvailability,
  selectedBrands,
  sortValue,
  applyClientSort = true,
}: {
  products: Product[];
  selectedAvailability: string[];
  selectedBrands: string[];
  sortValue: string;
  applyClientSort?: boolean;
}): Product[] {
  const selectedBrandSet =
    selectedBrands.length > 0 ? new Set(selectedBrands) : null;
  const availabilitySet =
    selectedAvailability.length > 0 ? new Set(selectedAvailability) : null;
  const requiresInStock =
    availabilitySet?.has("in_stock") || availabilitySet?.has("instock:true") || false;
  const requiresPreorder =
    availabilitySet?.has("preorder") ||
    availabilitySet?.has("instockVendor:true") ||
    false;

  const nextProducts =
    selectedBrandSet || availabilitySet
      ? products.filter((product) => {
          const productBrandId = product.brandId ? String(product.brandId) : "";

          if (
            selectedBrandSet &&
            !selectedBrandSet.has(productBrandId) &&
            !selectedBrandSet.has(product.brand)
          ) {
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

  if (!applyClientSort) {
    return nextProducts;
  }

  if (sortValue === "price_asc") {
    nextProducts.sort(comparePriceAscending);
  } else if (sortValue === "price_desc") {
    nextProducts.sort(comparePriceDescending);
  } else if (sortValue === "name_asc") {
    nextProducts.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  } else if (sortValue === "name_desc") {
    nextProducts.sort((a, b) => b.name.localeCompare(a.name, "vi"));
  } else if (sortValue === "stock") {
    nextProducts.sort((a, b) => b.stock - a.stock);
  }

  return nextProducts;
}

function hasDisplayPrice(product: Product) {
  return Number.isFinite(product.price) && product.price > 0;
}

function compareMissingPriceLast(a: Product, b: Product) {
  return Number(!hasDisplayPrice(a)) - Number(!hasDisplayPrice(b));
}

function comparePriceAscending(a: Product, b: Product) {
  return (
    compareMissingPriceLast(a, b) ||
    a.price - b.price ||
    a.name.localeCompare(b.name, "vi")
  );
}

function comparePriceDescending(a: Product, b: Product) {
  return (
    compareMissingPriceLast(a, b) ||
    b.price - a.price ||
    a.name.localeCompare(b.name, "vi")
  );
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
