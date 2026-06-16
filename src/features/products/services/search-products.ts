import type { Product } from "../types/product";

export function normalizeVietnamese(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

function containsKeyword(text: string | undefined, keyword: string): boolean {
  if (!text || !keyword) return false;
  return normalizeVietnamese(text).includes(normalizeVietnamese(keyword));
}

export function searchProducts(products: Product[], keyword: string): Product[] {
  if (!keyword.trim()) return [];

  return products.filter((product) => {
    if (containsKeyword(product.name, keyword)) return true;
    if (containsKeyword(product.category, keyword)) return true;
    if (containsKeyword(product.categorySlug, keyword)) return true;
    if (containsKeyword(product.brand, keyword)) return true;
    if (containsKeyword(product.sku, keyword)) return true;
    return product.tags?.some((tag) => containsKeyword(tag, keyword)) ?? false;
  });
}

export function calculateSearchRelevance(product: Product, keyword: string): number {
  const normalizedKeyword = normalizeVietnamese(keyword);
  const normalizedName = normalizeVietnamese(product.name);
  let score = 0;

  if (normalizedName === normalizedKeyword) {
    score += 100;
  } else if (normalizedName.startsWith(normalizedKeyword)) {
    score += 50;
  } else if (normalizedName.includes(normalizedKeyword)) {
    score += 25;
  }

  if (containsKeyword(product.brand, keyword)) score += 15;
  if (containsKeyword(product.category, keyword)) score += 10;
  if (containsKeyword(product.categorySlug, keyword)) score += 8;

  product.tags?.forEach((tag) => {
    if (containsKeyword(tag, keyword)) score += 5;
  });

  return score;
}

export function sortBySearchRelevance(products: Product[], keyword: string): Product[] {
  return [...products].sort(
    (a, b) => calculateSearchRelevance(b, keyword) - calculateSearchRelevance(a, keyword),
  );
}

export function getSearchSuggestions(
  products: Product[],
  keyword: string,
  limit = 6,
): Product[] {
  return searchProducts(products, keyword).slice(0, limit);
}
