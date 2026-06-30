export type CatalogCategoryProductDto = {
  id: number;
  partNumber: string;
  name: string;
  slug: string;
  unitName?: string | null;
  listPrice?: number | null;
  price?: number | null;
  brandId?: number | null;
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
  brandId?: number;
  instock?: boolean;
};
