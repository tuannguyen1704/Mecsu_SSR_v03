import { PRODUCTS } from "../data/products";
import type { Product } from "../types/product";
import type { SearchSuggestionItem } from "./search-products";
import type { Category } from "@/features/categories/types/category";
import type { CategorySubcategory } from "@/features/categories/types/category";
import {
  findCategoryByPath,
  getAllCategories,
  getCategorySubcategories,
  getIsCatalogApiEnabled,
} from "@/features/categories/services/category-service";
import { toSlug } from "@/lib/routing";
import { fetchCatalogCategoryProducts } from "./catalog-category-products-api";
import {
  mapCatalogCategoryProductsResponse,
  type ProductListingResult,
} from "./catalog-product-mapper";
import type { CatalogCategoryProductsQuery } from "../types/catalog-category-products-api";

export interface ProductPageData {
  product: Product;
  compatibleProducts: Product[];
}

export type ProductListingSearchParams = Record<
  string,
  string | string[] | undefined
>;

const productAdapter = {
  async listProducts(): Promise<Product[]> {
    return PRODUCTS;
  },
  async getProductByIdOrSlug(productId: string): Promise<Product | undefined> {
    return getProductByIdOrSlug(productId);
  },
  async listProductsForCategory(category: Category): Promise<Product[]> {
    return getProductsForCategory(category);
  },
  async listProductsForSubcategory(
    category: Category,
    subcategory: CategorySubcategory,
  ): Promise<Product[]> {
    return getProductsForSubcategory(category, subcategory);
  },
  async getProductStaticParams(): Promise<{ productId: string }[]> {
    return getProductStaticParams();
  },
};

export function getProductsForCategory(category: Category): Product[] {
  const allowedSubcategorySlugs = new Set(
    category.subcategories.map((subcategory) => toSlug(subcategory)),
  );

  const matchingProducts = PRODUCTS.filter((product) => {
    const categorySlug = product.categorySlug ? toSlug(product.categorySlug) : "";
    const productCategorySlug = toSlug(product.category);

    return (
      allowedSubcategorySlugs.has(categorySlug) ||
      allowedSubcategorySlugs.has(productCategorySlug) ||
      product.tags?.some((tag) => tag.includes(category.slug))
    );
  });

  return matchingProducts.length > 0 ? matchingProducts : PRODUCTS.slice(0, 48);
}

export function getProductHref(product: Product): string {
  return `/san-pham/${product.slug || toSlug(product.name)}`;
}

export function getHeaderSearchProducts(limit = 36): Product[] {
  return PRODUCTS.slice(0, limit);
}

export function getHeaderSearchSuggestions(limit = 36): SearchSuggestionItem[] {
  return PRODUCTS.slice(0, limit).map(toSearchSuggestionItem);
}

function toSearchSuggestionItem(product: Product): SearchSuggestionItem {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    category: product.category,
    categorySlug: product.categorySlug,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    image: product.image,
    tags: product.tags,
  };
}

function shouldThrowCatalogProductsApiError() {
  return process.env.NODE_ENV === "production";
}

function getFirstSearchParamValue(
  searchParams: ProductListingSearchParams | undefined,
  key: string,
) {
  const value = searchParams?.[key];

  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInteger(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return undefined;
  }

  return Math.floor(parsedValue);
}

function parseBooleanParam(value: string | undefined) {
  if (value === "true" || value === "1") {
    return true;
  }

  if (value === "false" || value === "0") {
    return false;
  }

  return undefined;
}

export function parseCatalogProductsQuery(
  searchParams?: ProductListingSearchParams,
): CatalogCategoryProductsQuery {
  const page = parsePositiveInteger(getFirstSearchParamValue(searchParams, "page"));
  const pageSize = parsePositiveInteger(
    getFirstSearchParamValue(searchParams, "pageSize"),
  );
  const brandId = parsePositiveInteger(
    getFirstSearchParamValue(searchParams, "brandId"),
  );
  const instock = parseBooleanParam(
    getFirstSearchParamValue(searchParams, "instock"),
  );
  const keyword = getFirstSearchParamValue(searchParams, "keyword")?.trim();

  return {
    ...(page ? { page } : {}),
    ...(pageSize ? { pageSize: Math.min(100, pageSize) } : {}),
    ...(keyword ? { keyword } : {}),
    ...(brandId ? { brandId } : {}),
    ...(typeof instock === "boolean" ? { instock } : {}),
  };
}

function createMockProductListingResult(
  products: Product[],
  query?: CatalogCategoryProductsQuery,
): ProductListingResult {
  const page = Math.max(1, Math.floor(query?.page ?? 1));
  const pageSize = Math.max(1, Math.min(100, Math.floor(query?.pageSize ?? 20)));

  return {
    products,
    total: products.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(products.length / pageSize)),
    hasPreviousPage: page > 1,
    hasNextPage: page < Math.max(1, Math.ceil(products.length / pageSize)),
  };
}

export async function listProductsForCategoryPath(
  path: string,
  category: Category,
  subcategory: CategorySubcategory,
  query?: CatalogCategoryProductsQuery,
): Promise<ProductListingResult> {
  const mockProducts = getProductsForSubcategory(category, subcategory);

  if (!getIsCatalogApiEnabled()) {
    return createMockProductListingResult(mockProducts, query);
  }

  try {
    const routeNode = await findCategoryByPath(path);

    if (!routeNode) {
      return createMockProductListingResult(mockProducts, query);
    }

    const response = await fetchCatalogCategoryProducts(routeNode.apiId, query);
    const result = mapCatalogCategoryProductsResponse(response);

    console.info("[catalog-api] Category products loaded from API", routeNode.apiId, {
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    });

    return result;
  } catch (error) {
    if (shouldThrowCatalogProductsApiError()) {
      throw error;
    }

    console.warn("[catalog-api] Category products fallback to mock", error);

    return createMockProductListingResult(mockProducts, query);
  }
}

export function getProductStaticParams(): { productId: string }[] {
  const productIds = new Set<string>();

  PRODUCTS.forEach((product) => {
    productIds.add(product.slug || product.id || product.sku);
  });

  return Array.from(productIds).map((productId) => ({ productId }));
}

export function getProductByIdOrSlug(productId: string): Product | undefined {
  const decodedProductId = decodeURIComponent(productId);
  const normalizedProductId = toSlug(decodedProductId);

  return PRODUCTS.find((product) => {
    const identifiers: string[] = [
      product.id,
      product.sku,
      product.slug || "",
      toSlug(product.name),
      `${product.slug || toSlug(product.name)}-${product.sku}`,
    ].filter((identifier) => identifier.length > 0);

    return identifiers.some(
      (identifier) =>
        identifier === decodedProductId || toSlug(identifier) === normalizedProductId,
    );
  });
}

export function getProductShortDescription(product: Product): string {
  return (
    product.shortDescription ||
    `${product.name} thuộc nhóm ${product.category}, thương hiệu ${product.brand}, phù hợp cho nhu cầu mua vật tư công nghiệp và công trình tại Mecsu.`
  );
}

export function getProductDescription(product: Product): string {
  return (
    product.description ||
    `${product.name} là sản phẩm ${product.category} được tuyển chọn cho nhu cầu lắp ghép, bảo trì và thi công. Sản phẩm có mã SKU ${product.sku}, thương hiệu ${product.brand}, đơn vị bán ${product.unit || "Cái"} và được hiển thị theo dữ liệu mock hiện tại trong quá trình migration.`
  );
}

export function getProductSpecifications(product: Product): Record<string, string> {
  return {
    "Mã SKU": product.sku,
    "Thương hiệu": product.brand,
    "Danh mục": product.category,
    "Đơn vị tính": product.unit || "Cái",
    "Tình trạng": product.stock > 0 ? "Sẵn hàng" : "Hết hàng",
    "Số lượng tồn": product.stock.toLocaleString("vi-VN"),
    ...(product.specifications || {}),
  };
}

export function getProductImages(product: Product): string[] {
  const images = [product.image, ...(product.images || [])].filter(Boolean) as string[];

  if (images.length === 0) {
    return [];
  }

  while (images.length < 3) {
    images.push(images[images.length - 1]);
  }

  return images.slice(0, 4);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id &&
      (candidate.categorySlug === product.categorySlug ||
        candidate.category === product.category),
  ).slice(0, limit);
}

export function getProductCategoryTrail(product: Product) {
  const categories = getAllCategories();
  const productCategorySlug = product.categorySlug || toSlug(product.category);

  for (const category of categories) {
    const subcategory = getCategorySubcategories(category).find(
      (item) => item.slug === productCategorySlug || item.name === product.category,
    );

    if (subcategory) {
      return { category, subcategory };
    }
  }

  return { category: undefined, subcategory: undefined };
}

export function getProductsForSubcategory(
  category: Category,
  subcategory: CategorySubcategory,
): Product[] {
  const matchingProducts = PRODUCTS.filter((product) => {
    const categorySlug = product.categorySlug ? toSlug(product.categorySlug) : "";
    const productCategorySlug = toSlug(product.category);

    return (
      categorySlug === subcategory.slug ||
      productCategorySlug === subcategory.slug ||
      product.tags?.some((tag) => tag.includes(subcategory.slug))
    );
  });

  const sourceProducts = matchingProducts.length > 0 ? matchingProducts : PRODUCTS;

  return sourceProducts.slice(0, 72).map((product, index) => ({
    ...product,
    id: `${subcategory.slug}-${product.id}-${index}`,
    category: subcategory.name,
    categorySlug: subcategory.slug,
    tags: [...(product.tags || []), category.slug, subcategory.slug],
  }));
}

export async function listProducts(): Promise<Product[]> {
  return productAdapter.listProducts();
}

export async function getProduct(
  productId: string,
): Promise<Product | undefined> {
  return productAdapter.getProductByIdOrSlug(productId);
}

export async function listProductsForCategory(
  category: Category,
): Promise<Product[]> {
  return productAdapter.listProductsForCategory(category);
}

export async function listProductsForSubcategory(
  category: Category,
  subcategory: CategorySubcategory,
): Promise<Product[]> {
  return productAdapter.listProductsForSubcategory(category, subcategory);
}

export async function getProductRouteParams(): Promise<{ productId: string }[]> {
  return productAdapter.getProductStaticParams();
}

export async function getProductPageData(
  productId: string,
): Promise<ProductPageData | undefined> {
  const product = await getProduct(productId);

  if (!product) {
    return undefined;
  }

  const relatedProducts = getRelatedProducts(product, 10);
  const compatibleProducts =
    relatedProducts.length >= 8
      ? relatedProducts
      : [
          ...relatedProducts,
          ...PRODUCTS.filter((candidate) => candidate.id !== product.id),
        ].slice(0, 10);

  return {
    product,
    compatibleProducts,
  };
}
