export interface Product {
  id: string;
  sku: string;
  name: string;
  slug?: string;
  category: string;
  categorySlug?: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  unit?: string;
  image?: string;
  images?: string[];
  rating?: number;
  tags?: string[];
  description?: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
}
