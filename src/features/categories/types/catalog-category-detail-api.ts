export type CatalogCategoryImageDto = {
  imageId: number;
  fullUrl: string;
  thumbUrl: string;
};

export type CatalogCategoryDetailDto = {
  id: number;
  name: string;
  slug: string;
  slugUrl: string;
  description?: string | null;
  longDescription?: string | null;
  lft: number;
  rgt: number;
  depth: number;
  visibility: number;
  productCount: number;
  canonical?: string | null;
  images: CatalogCategoryImageDto[];
};
