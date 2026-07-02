export type CatalogCategoryProductDto = {
  id: number;
  partNumber: string;
  name: string;
  slug: string;
  unitName?: string | null;
  listPrice?: number | null;
  price?: number | null;
  brandId?: number | null;
  brandName?: string | null;
  origin?: string | null;
  stockQuantity?: number | null;
  status?: number | null;
  imageUrls: string[];
  category?: {
    id: number;
    name: string;
  } | null;
  shortDescription?: string | null;
};

export type CatalogCategoryProductsResponseDto = {
  items: CatalogCategoryProductDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type CatalogCategoryProductsQuery = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  brandId?: number;
  instock?: boolean;
  instockVendor?: boolean;
  nextDayShipping?: boolean;
  discountForApp?: boolean;
  partType?: string;
  stockLevel?: string;
  partWebSellable?: boolean;
  partSellable?: boolean;
};
