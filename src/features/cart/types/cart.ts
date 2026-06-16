export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  stock: number;
  slug?: string;
}

export interface CartSnapshot {
  items: CartItem[];
}
