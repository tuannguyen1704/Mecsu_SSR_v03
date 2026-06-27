export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  stock: number;
  minOrderQuantity?: number;
  orderStep?: number;
  unit?: string;
  slug?: string;
}

export interface CartSnapshot {
  items: CartItem[];
}
