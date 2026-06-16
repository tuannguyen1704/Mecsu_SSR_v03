import { PRODUCTS } from "@/features/products/data/products";

export const HOME_BEST_DEALS = PRODUCTS.filter((product) => product.price > 0).slice(
  0,
  10,
);

export function getDeterministicDiscount(seed: string): number {
  const total = seed
    .split("")
    .reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);

  return 10 + (total % 20);
}
