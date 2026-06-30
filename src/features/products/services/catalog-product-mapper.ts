import type { Product } from "../types/product";
import type {
  CatalogCategoryProductDto,
  CatalogCategoryProductsResponseDto,
} from "../types/catalog-category-products-api";

export type ProductListingResult = {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export function mapCatalogProductToProduct(
  dto: CatalogCategoryProductDto,
): Product {
  const images = (dto.imageUrls || []).filter(Boolean);
  const price = Math.round(dto.price ?? dto.listPrice ?? 0);
  const originalPrice =
    typeof dto.listPrice === "number" ? Math.round(dto.listPrice) : undefined;

  return {
    id: String(dto.id),
    apiId: dto.id,
    sku: dto.partNumber,
    name: dto.name,
    slug: dto.slug,
    category: dto.category?.name || "Danh mục",
    apiCategoryId: dto.category?.id,
    brand: dto.brandId ? `Brand ${dto.brandId}` : "Mecsu",
    brandId: dto.brandId ?? undefined,
    price,
    originalPrice:
      typeof originalPrice === "number" && originalPrice > price
        ? originalPrice
        : undefined,
    stock: dto.stockQuantity ?? 0,
    unit: dto.unitName || "Cái",
    image: images[0],
    images: images.slice(1),
    rating: 4,
    shortDescription: dto.shortDescription || undefined,
    description: dto.shortDescription || undefined,
    origin: dto.origin ?? undefined,
    status: dto.status ?? undefined,
  };
}

export function mapCatalogCategoryProductsResponse(
  response: CatalogCategoryProductsResponseDto,
): ProductListingResult {
  return {
    products: response.items.map(mapCatalogProductToProduct),
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    hasPreviousPage: response.hasPreviousPage,
    hasNextPage: response.hasNextPage,
  };
}
