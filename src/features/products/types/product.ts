export interface Product {
  id: string;
  apiId?: number;
  sku: string;
  name: string;
  slug?: string;
  category: string;
  apiCategoryId?: number;
  categorySlug?: string;
  brand: string;
  brandId?: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock: number;
  status?: number;
  unit?: string;
  origin?: string;
  minOrderQuantity?: number;
  orderStep?: number;
  lowQuantityFee?: number;
  image?: string;
  images?: string[];
  rating?: number;
  tags?: string[];
  description?: string;
  shortDescription?: string;
  specifications?: Record<string, string>;
}
