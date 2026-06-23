import type { Product } from "@/features/products/types/product";

export type BrandFilterValue = {
  label: string;
  count: number;
};

export type BrandFilterGroup = {
  title: string;
  searchable?: boolean;
  values: BrandFilterValue[];
};

export type BrandCatalogNode = {
  slug: string;
  title: string;
  description?: string;
  productCount: number;
  filters: BrandFilterGroup[];
  products?: Product[];
  children?: BrandCatalogNode[];
};

export type BrandCatalog = {
  brand: {
    name: string;
    slug: string;
    logo?: string;
    description: string;
    productCount: number;
  };
  root: BrandCatalogNode;
};

export type BrandCatalogBreadcrumb = {
  label: string;
  href?: string;
};
