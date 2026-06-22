import { CATEGORIES } from "../data/categories";
import { toSlug } from "@/lib/routing";
import type { Category, CategorySubcategory } from "../types/category";

const categoryAdapter = {
  async listCategories(): Promise<Category[]> {
    return CATEGORIES;
  },
  async getCategoryByIdOrSlug(categoryId: string): Promise<Category | undefined> {
    return getCategoryByIdOrSlug(categoryId);
  },
  async listSubcategories(category: Category): Promise<CategorySubcategory[]> {
    return getCategorySubcategories(category);
  },
  async getSubcategoryBySlug(
    category: Category,
    subSlug: string,
  ): Promise<CategorySubcategory | undefined> {
    return getSubcategoryBySlug(category, subSlug);
  },
};

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

export function getCategoryTrailBySearchQuery(query: string): {
  category: Category;
  subcategory?: CategorySubcategory;
} | null {
  const normalizedQuery = toSlug(query.trim());

  if (!normalizedQuery) {
    return null;
  }

  for (const category of CATEGORIES) {
    const subcategory = getCategorySubcategories(category).find(
      (item) => item.slug === normalizedQuery,
    );

    if (subcategory) {
      return { category, subcategory };
    }
  }

  const category = CATEGORIES.find(
    (item) => item.slug === normalizedQuery,
  );

  return category ? { category } : null;
}

export async function listCategories(): Promise<Category[]> {
  return categoryAdapter.listCategories();
}

export async function getCategory(
  categoryId: string,
): Promise<Category | undefined> {
  return categoryAdapter.getCategoryByIdOrSlug(categoryId);
}

export async function listCategorySubcategories(
  category: Category,
): Promise<CategorySubcategory[]> {
  return categoryAdapter.listSubcategories(category);
}

export async function getSubcategory(
  category: Category,
  subSlug: string,
): Promise<CategorySubcategory | undefined> {
  return categoryAdapter.getSubcategoryBySlug(category, subSlug);
}

export async function getCategoryRouteParams(): Promise<{ categoryId: string }[]> {
  const categories = await listCategories();

  return categories.map((category) => ({
    categoryId: category.slug,
  }));
}

export async function getSubcategoryRouteParams(): Promise<
  { categoryId: string; subSlug: string }[]
> {
  const categories = await listCategories();

  return categories.flatMap((category) =>
    getCategorySubcategories(category).map((subcategory) => ({
      categoryId: category.slug,
      subSlug: subcategory.slug,
    })),
  );
}
