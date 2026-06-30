export interface Category {
  id: string;
  apiId?: number;
  name: string;
  slug: string;
  icon: string;
  subcategories: string[];
  description?: string;
}

export interface CategorySubcategory {
  id: string;
  apiId?: number;
  name: string;
  slug: string;
  href: string;
  count?: number;
  description?: string;
  path?: string;
}
