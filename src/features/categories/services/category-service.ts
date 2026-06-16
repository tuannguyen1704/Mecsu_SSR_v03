import { CATEGORIES } from "../data/categories";
import { toSlug } from "@/lib/routing";
import type { Category, CategorySubcategory } from "../types/category";

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryByIdOrSlug(categoryId: string): Category | undefined {
  const decodedCategoryId = decodeURIComponent(categoryId);

  return CATEGORIES.find(
    (category) =>
      category.id === decodedCategoryId ||
      category.slug === decodedCategoryId ||
      toSlug(category.name) === decodedCategoryId,
  );
}

export function getCategorySubcategories(category: Category): CategorySubcategory[] {
  return category.subcategories.map((subcategory, index) => {
    const slug = toSlug(subcategory);

    return {
      id: `${category.id}-${index}-${slug}`,
      name: subcategory,
      slug,
      href: `/danh-muc/${category.slug}/${slug}`,
    };
  });
}

export function getSubcategoryBySlug(
  category: Category,
  subSlug: string,
): CategorySubcategory | undefined {
  const decodedSubSlug = decodeURIComponent(subSlug);

  return getCategorySubcategories(category).find(
    (subcategory) => subcategory.slug === decodedSubSlug,
  );
}
