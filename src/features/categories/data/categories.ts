import { HEADER_CATEGORIES } from "./header-categories";
import { toSlug } from "@/lib/routing";
import type { Category } from "../types/category";

export const CATEGORIES: Category[] = HEADER_CATEGORIES.map((category) => ({
  id: category.id,
  name: category.name,
  slug: toSlug(category.name),
  icon: category.icon,
  subcategories: category.subcategories,
}));
