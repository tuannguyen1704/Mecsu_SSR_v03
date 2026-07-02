import type { Product } from "../types/product";

export function getProductDisplayId(product: Product) {
  const rawId = product.brandId ?? product.apiId ?? product.id;
  const numericId = typeof rawId === "number" ? rawId : Number(rawId);

  if (Number.isFinite(numericId) && numericId >= 0) {
    return Math.floor(numericId).toString().padStart(7, "0");
  }

  return String(rawId);
}
