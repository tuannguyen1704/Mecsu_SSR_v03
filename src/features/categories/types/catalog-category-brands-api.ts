export type CatalogCategoryBrandDto = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  productCount?: number | null;
};

export type CatalogCategoryBrandsResponseDto = {
  total: number;
  items: CatalogCategoryBrandDto[];
};

export type CatalogCategoryBrandsQuery = {
  keyword?: string;
  instock?: boolean;
  instockVendor?: boolean;
  nextDayShipping?: boolean;
  discountForApp?: boolean;
  partType?: string;
  stockLevel?: string;
  partWebSellable?: boolean;
  partSellable?: boolean;
};
