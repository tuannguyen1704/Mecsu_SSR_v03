import { CATEGORIES } from "../data/categories";
import {
  bulongChildSubcategorySlugs,
  subcategoryCountsBySlug,
} from "../data/subcategory-counts";
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
  async getSubcategoryChildBySlug(
    category: Category,
    parentSlug: string,
    childSlug: string,
  ): Promise<CategorySubcategory | undefined> {
    return getSubcategoryChildBySlug(category, parentSlug, childSlug);
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
      count: subcategoryCountsBySlug[slug],
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

export function getSubcategoryChildBySlug(
  category: Category,
  parentSlug: string,
  childSlug: string,
): CategorySubcategory | undefined {
  const decodedParentSlug = decodeURIComponent(parentSlug);
  const decodedChildSlug = decodeURIComponent(childSlug);
  const parentSubcategory = getSubcategoryBySlug(category, decodedParentSlug);

  if (!parentSubcategory || parentSubcategory.slug !== "bulong") {
    return undefined;
  }

  if (!bulongChildSubcategorySlugs.includes(decodedChildSlug)) {
    return undefined;
  }

  const childSubcategory = getCategorySubcategories(category).find(
    (subcategory) =>
      subcategory.slug === decodedChildSlug &&
      subcategory.slug !== parentSubcategory.slug,
  );

  if (!childSubcategory) {
    return undefined;
  }

  return {
    ...childSubcategory,
    href: `/danh-muc/${category.slug}/${parentSubcategory.slug}/${childSubcategory.slug}`,
  };
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

export function getSubcategoryRedirectHref(subcategorySlug: string): string | undefined {
  const normalizedSubcategorySlug = toSlug(decodeURIComponent(subcategorySlug));

  if (!normalizedSubcategorySlug) {
    return undefined;
  }

  for (const category of CATEGORIES) {
    const subcategory = getCategorySubcategories(category).find(
      (item) => item.slug === normalizedSubcategorySlug,
    );

    if (!subcategory) {
      continue;
    }

    if (
      normalizedSubcategorySlug !== "bulong" &&
      bulongChildSubcategorySlugs.includes(normalizedSubcategorySlug) &&
      getSubcategoryBySlug(category, "bulong")
    ) {
      return `/danh-muc/${category.slug}/bulong/${normalizedSubcategorySlug}`;
    }

    return `/danh-muc/${category.slug}/${normalizedSubcategorySlug}`;
  }

  return undefined;
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

export async function getSubcategoryChild(
  category: Category,
  parentSlug: string,
  childSlug: string,
): Promise<CategorySubcategory | undefined> {
  return categoryAdapter.getSubcategoryChildBySlug(
    category,
    parentSlug,
    childSlug,
  );
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

export async function getNestedSubcategoryRouteParams(): Promise<
  { categoryId: string; subSlug: string; childSlug: string }[]
> {
  const categories = await listCategories();

  return categories.flatMap((category) => {
    const parentSubcategory = getSubcategoryBySlug(category, "bulong");

    if (!parentSubcategory) {
      return [];
    }

    return getCategorySubcategories(category)
      .filter((subcategory) =>
        bulongChildSubcategorySlugs.includes(subcategory.slug),
      )
      .map((subcategory) => ({
        categoryId: category.slug,
        subSlug: parentSubcategory.slug,
        childSlug: subcategory.slug,
      }));
  });
}
