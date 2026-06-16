import { PRODUCTS } from "../data/products";
import type { Product } from "../types/product";
import type { Category } from "@/features/categories/types/category";
import type { CategorySubcategory } from "@/features/categories/types/category";
import {
  getAllCategories,
  getCategorySubcategories,
} from "@/features/categories/services/category-service";
import { toSlug } from "@/lib/routing";

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
