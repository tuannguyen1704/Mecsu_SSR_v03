export type WishlistStockStatus = "in_stock" | "out_of_stock" | "limited";

export interface WishlistItem {
  id: string;
  productId: string;
  sku: string;
  slug: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stockStatus: WishlistStockStatus;
  stock?: number;
  savedDate?: string;
}
