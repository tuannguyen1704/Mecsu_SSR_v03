import { CATEGORIES } from "../data/categories";
import {
  HEADER_CATEGORIES,
  type HeaderCategory,
} from "../data/header-categories";
import {
  bulongChildSubcategorySlugs,
  subcategoryCountsBySlug,
} from "../data/subcategory-counts";
import { fetchCatalogCategoryTree } from "./catalog-category-api";
import { fetchCatalogCategoryDetail } from "./catalog-category-detail-api";
import {
  mapCatalogCategoryDetail,
  type CategoryDetail,
} from "./catalog-category-detail-mapper";
import { buildCategoryRouteIndex } from "./catalog-category-mapper";
import { toSlug } from "@/lib/routing";
import type { Category, CategorySubcategory } from "../types/category";
import type { CategoryRouteIndex, CategoryRouteNode } from "../types/category-route";

const DEFAULT_CATEGORY_ICON = "Blocks";

let catalogRouteIndexPromise: Promise<CategoryRouteIndex> | undefined;
let mockRouteIndex: CategoryRouteIndex | undefined;
let hasWarnedCatalogApiFallback = false;

function isCatalogApiEnabled() {
  return process.env.MECSU_CATALOG_API_ENABLED === "true";
}

export function getIsCatalogApiEnabled() {
  return isCatalogApiEnabled();
}

function shouldThrowCatalogApiError() {
  return process.env.NODE_ENV === "production";
}

function warnCatalogApiFallback(context: string, error: unknown) {
  if (hasWarnedCatalogApiFallback) {
    return;
  }

  hasWarnedCatalogApiFallback = true;
  console.warn(
    `[catalog] ${context} failed. Falling back to mock categories in development.`,
    error,
  );
}

function normalizeRoutePath(path: string) {
  return decodeURIComponent(path)
    .replace(/^\/?danh-muc\/?/, "")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .join("/");
}

function routeNodeToCategory(node: CategoryRouteNode): Category {
  return {
    id: String(node.apiId),
    apiId: node.apiId,
    name: node.name,
    slug: node.slug,
    icon: DEFAULT_CATEGORY_ICON,
    subcategories: node.children.map((child) => child.name),
    description: node.description,
  };
}

function routeNodeToSubcategory(node: CategoryRouteNode): CategorySubcategory {
  return {
    id: node.path || String(node.apiId),
    apiId: node.apiId,
    name: node.name,
    slug: node.slug,
    href: node.href,
    description: node.description,
    path: node.path,
  };
}

function mockCategoryToDetail(category: Category): CategoryDetail {
  const parsedId = Number.parseInt(category.id, 10);

  return {
    apiId: category.apiId ?? (Number.isNaN(parsedId) ? 0 : parsedId),
    name: category.name,
    slug: category.slug,
    href: `/danh-muc/${category.slug}`,
    description: category.description ?? null,
    longDescription: null,
    productCount: category.subcategories.length,
    imageUrl: null,
    thumbnailUrl: null,
    canonical: null,
  };
}

function mockSubcategoryToDetail(
  category: Category,
  subcategory: CategorySubcategory,
): CategoryDetail {
  return {
    apiId: subcategory.apiId ?? 0,
    name: subcategory.name,
    slug: subcategory.slug,
    href: subcategory.href,
    description: subcategory.description ?? null,
    longDescription: null,
    productCount: subcategory.count ?? 0,
    imageUrl: null,
    thumbnailUrl: null,
    canonical: null,
  };
}

function getMockCategoryDetailByPath(path: string): CategoryDetail | undefined {
  const [categorySlug, subSlug, childSlug] = normalizeRoutePath(path).split("/");
  const category = getCategoryByIdOrSlug(categorySlug || "");

  if (!category) {
    return undefined;
  }

  if (!subSlug) {
    return mockCategoryToDetail(category);
  }

  const subcategory = childSlug
    ? getSubcategoryChildBySlug(category, subSlug, childSlug)
    : getSubcategoryBySlug(category, subSlug);

  return subcategory ? mockSubcategoryToDetail(category, subcategory) : undefined;
}

function getMockCategoryDetailByApiId(id: number): CategoryDetail | undefined {
  const category = CATEGORIES.find(
    (item) => Number.parseInt(item.id, 10) === id,
  );

  return category ? mockCategoryToDetail(category) : undefined;
}

function routeNodeToHeaderCategory(
  node: CategoryRouteNode,
): HeaderCategory {
  return {
    id: String(node.apiId),
    apiId: node.apiId,
    name: node.name,
    slug: node.slug,
    href: node.href,
    icon: DEFAULT_CATEGORY_ICON,
    subcategories: node.children.map((child) => child.name),
    subcategoryItems: node.children.map((child) => ({
      name: child.name,
      apiId: child.apiId,
      href: child.href,
    })),
    subcategoryHrefs: Object.fromEntries(
      node.children.map((child) => [child.name, child.href]),
    ),
  };
}

function buildMockRouteIndex(): CategoryRouteIndex {
  if (mockRouteIndex) {
    return mockRouteIndex;
  }

  const byApiId = new Map<number, CategoryRouteNode>();
  const byPath = new Map<string, CategoryRouteNode>();
  const root: CategoryRouteNode = {
    id: "1",
    apiId: 1,
    name: "Root",
    slug: "",
    path: "",
    href: "/danh-muc",
    depth: 0,
    children: [],
  };

  root.children = CATEGORIES.map((category, categoryIndex) => {
    const apiId = Number.parseInt(category.id, 10) || categoryIndex + 2;
    const categoryNode: CategoryRouteNode = {
      id: category.id,
      apiId,
      name: category.name,
      slug: category.slug,
      path: category.slug,
      href: `/danh-muc/${category.slug}`,
      depth: 1,
      parentId: root.apiId,
      children: [],
    };

    categoryNode.children = getCategorySubcategories(category).map(
      (subcategory, subcategoryIndex) => ({
        id: subcategory.id,
        apiId: -((categoryIndex + 1) * 1000 + subcategoryIndex + 1),
        name: subcategory.name,
        slug: subcategory.slug,
        path: `${category.slug}/${subcategory.slug}`,
        href: subcategory.href,
        depth: 2,
        parentId: categoryNode.apiId,
        children: [],
      }),
    );

    return categoryNode;
  });

  const nodes = root.children.flatMap((category) => [
    category,
    ...category.children,
  ]);

  nodes.forEach((node) => {
    byApiId.set(node.apiId, node);
    byPath.set(node.path, node);
  });

  mockRouteIndex = {
    root,
    nodes,
    byApiId,
    byPath,
  };

  return mockRouteIndex;
}

async function getApiCategoryRouteIndex() {
  if (!catalogRouteIndexPromise) {
    catalogRouteIndexPromise = fetchCatalogCategoryTree()
      .then(buildCategoryRouteIndex)
      .catch((error) => {
        catalogRouteIndexPromise = undefined;
        throw error;
      });
  }

  return catalogRouteIndexPromise;
}

export async function getCategoryRouteIndex(): Promise<CategoryRouteIndex> {
  if (!isCatalogApiEnabled()) {
    return buildMockRouteIndex();
  }

  try {
    return await getApiCategoryRouteIndex();
  } catch (error) {
    if (shouldThrowCatalogApiError()) {
      throw error;
    }

    warnCatalogApiFallback("Catalog category API", error);
    return buildMockRouteIndex();
  }
}

export async function findCategoryByPath(
  path: string,
): Promise<CategoryRouteNode | undefined> {
  const routeIndex = await getCategoryRouteIndex();

  return routeIndex.byPath.get(normalizeRoutePath(path));
}

export async function findCategoryByApiId(
  id: number,
): Promise<CategoryRouteNode | undefined> {
  const routeIndex = await getCategoryRouteIndex();

  return routeIndex.byApiId.get(id);
}

export async function getCategoryDetailByApiId(
  id: number,
): Promise<CategoryDetail | undefined> {
  if (!isCatalogApiEnabled()) {
    return getMockCategoryDetailByApiId(id);
  }

  try {
    const detail = await fetchCatalogCategoryDetail(id);

    if (!detail) {
      return undefined;
    }

    console.info(
      "[catalog-api] Category detail loaded from API",
      id,
      detail.name,
    );

    return mapCatalogCategoryDetail(detail);
  } catch (error) {
    if (shouldThrowCatalogApiError()) {
      throw error;
    }

    warnCatalogApiFallback("Category detail API", error);
    return getMockCategoryDetailByApiId(id);
  }
}

export async function getCategoryDetailByPath(
  path: string,
): Promise<CategoryDetail | undefined> {
  const normalizedPath = normalizeRoutePath(path);

  if (!isCatalogApiEnabled()) {
    return getMockCategoryDetailByPath(normalizedPath);
  }

  try {
    const node = await findCategoryByPath(normalizedPath);

    if (!node) {
      return getMockCategoryDetailByPath(normalizedPath);
    }

    return getCategoryDetailByApiId(node.apiId);
  } catch (error) {
    if (shouldThrowCatalogApiError()) {
      throw error;
    }

    warnCatalogApiFallback("Category detail by path API", error);
    return getMockCategoryDetailByPath(normalizedPath);
  }
}

export async function getHeaderCategories(): Promise<HeaderCategory[]> {
  if (!isCatalogApiEnabled()) {
    console.info("[catalog-api] Header categories using mock fallback");
    return HEADER_CATEGORIES;
  }

  try {
    const routeIndex = await getApiCategoryRouteIndex();
    const categories = routeIndex.root.children.map(routeNodeToHeaderCategory);

    console.info(
      "[catalog-api] Header categories loaded from API",
      categories.length,
    );

    return categories;
  } catch (error) {
    if (shouldThrowCatalogApiError()) {
      throw error;
    }

    warnCatalogApiFallback("Header category API", error);
    console.info("[catalog-api] Header categories using mock fallback");

    return HEADER_CATEGORIES;
  }
}

const mockCategoryAdapter = {
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

const catalogApiAdapter = {
  async listCategories(): Promise<Category[]> {
    const routeIndex = await getCategoryRouteIndex();

    return routeIndex.root.children.map(routeNodeToCategory);
  },
  async getCategoryByIdOrSlug(categoryId: string): Promise<Category | undefined> {
    const routeIndex = await getCategoryRouteIndex();
    const decodedCategoryId = decodeURIComponent(categoryId);
    const normalizedCategoryId = toSlug(decodedCategoryId);
    const node =
      routeIndex.byPath.get(normalizeRoutePath(decodedCategoryId)) ||
      routeIndex.root.children.find(
        (item) =>
          item.id === decodedCategoryId ||
          String(item.apiId) === decodedCategoryId ||
          item.slug === normalizedCategoryId ||
          toSlug(item.name) === normalizedCategoryId,
      );

    return node ? routeNodeToCategory(node) : undefined;
  },
  async listSubcategories(category: Category): Promise<CategorySubcategory[]> {
    const routeIndex = await getCategoryRouteIndex();
    const categoryNode = category.apiId
      ? routeIndex.byApiId.get(category.apiId)
      : routeIndex.byPath.get(category.slug);

    return categoryNode?.children.map(routeNodeToSubcategory) ?? [];
  },
  async getSubcategoryBySlug(
    category: Category,
    subSlug: string,
  ): Promise<CategorySubcategory | undefined> {
    const routeIndex = await getCategoryRouteIndex();
    const categoryNode = category.apiId
      ? routeIndex.byApiId.get(category.apiId)
      : routeIndex.byPath.get(category.slug);
    const normalizedSubSlug = toSlug(decodeURIComponent(subSlug));
    const subcategoryNode = categoryNode?.children.find(
      (item) =>
        item.slug === normalizedSubSlug ||
        item.path === `${category.slug}/${normalizedSubSlug}` ||
        toSlug(item.name) === normalizedSubSlug,
    );

    return subcategoryNode ? routeNodeToSubcategory(subcategoryNode) : undefined;
  },
  async getSubcategoryChildBySlug(
    category: Category,
    parentSlug: string,
    childSlug: string,
  ): Promise<CategorySubcategory | undefined> {
    const routeIndex = await getCategoryRouteIndex();
    const categoryNode = category.apiId
      ? routeIndex.byApiId.get(category.apiId)
      : routeIndex.byPath.get(category.slug);
    const normalizedParentSlug = toSlug(decodeURIComponent(parentSlug));
    const normalizedChildSlug = toSlug(decodeURIComponent(childSlug));
    const parentNode = categoryNode?.children.find(
      (item) => item.slug === normalizedParentSlug || toSlug(item.name) === normalizedParentSlug,
    );
    const childNode = parentNode?.children.find(
      (item) => item.slug === normalizedChildSlug || toSlug(item.name) === normalizedChildSlug,
    );

    return childNode ? routeNodeToSubcategory(childNode) : undefined;
  },
};

function getCategoryAdapter() {
  return isCatalogApiEnabled() ? catalogApiAdapter : mockCategoryAdapter;
}

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
  return getCategoryAdapter().listCategories();
}

export async function getCategory(
  categoryId: string,
): Promise<Category | undefined> {
  return getCategoryAdapter().getCategoryByIdOrSlug(categoryId);
}

export async function listCategorySubcategories(
  category: Category,
): Promise<CategorySubcategory[]> {
  return getCategoryAdapter().listSubcategories(category);
}

export async function getSubcategory(
  category: Category,
  subSlug: string,
): Promise<CategorySubcategory | undefined> {
  return getCategoryAdapter().getSubcategoryBySlug(category, subSlug);
}

export async function getSubcategoryChild(
  category: Category,
  parentSlug: string,
  childSlug: string,
): Promise<CategorySubcategory | undefined> {
  return getCategoryAdapter().getSubcategoryChildBySlug(
    category,
    parentSlug,
    childSlug,
  );
}

export async function getCategoryRouteParams(): Promise<{ categoryId: string }[]> {
  return CATEGORIES.map((category) => ({
    categoryId: category.slug,
  }));
}

export async function getSubcategoryRouteParams(): Promise<
  { categoryId: string; subSlug: string }[]
> {
  const routeParams: { categoryId: string; subSlug: string }[] = [];

  CATEGORIES.forEach((category) => {
    getCategorySubcategories(category).forEach((subcategory) => {
      routeParams.push({
        categoryId: category.slug,
        subSlug: subcategory.slug,
      });
    });
  });

  return routeParams;
}

export async function getNestedSubcategoryRouteParams(): Promise<
  { categoryId: string; subSlug: string; childSlug: string }[]
> {
  return CATEGORIES.flatMap((category) => {
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
