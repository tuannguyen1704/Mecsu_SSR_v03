export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: string[];
}

export interface CategorySubcategory {
  id: string;
  name: string;
  slug: string;
  href: string;
}
