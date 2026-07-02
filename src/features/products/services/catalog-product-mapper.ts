import type { Product } from "../types/product";
import type { CategoryBrand } from "@/features/categories/services/catalog-category-brands-mapper";
import type { ProductFilterOption } from "@/features/categories/services/category-listing";
import type { ProductFilterGroup } from "../types/product-filter-group";
import type {
  CatalogCategoryProductDto,
  CatalogCategoryProductsResponseDto,
} from "../types/catalog-category-products-api";

type CatalogProductMapperOptions = {
  brandMap?: Map<number, CategoryBrand>;
};

export type ProductListingResult = {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  usesServerPagination?: boolean;
  brandFilters?: ProductFilterOption[];
  filterGroups?: ProductFilterGroup[];
};

export function mapCatalogProductToProduct(
  dto: CatalogCategoryProductDto,
  options: CatalogProductMapperOptions = {},
): Product {
  const images = (dto.imageUrls || []).filter(Boolean);
  const hasSalePrice =
    typeof dto.price === "number" && Number.isFinite(dto.price) && dto.price > 0;
  const hasListPrice =
    typeof dto.listPrice === "number" &&
    Number.isFinite(dto.listPrice) &&
    dto.listPrice > 0;
  const salePrice = hasSalePrice ? dto.price : undefined;
  const listPrice = hasListPrice ? dto.listPrice : undefined;
  const price = Math.round(
    typeof salePrice === "number"
      ? salePrice
      : typeof listPrice === "number"
        ? listPrice
        : 0,
  );
  const originalPrice =
    typeof salePrice === "number" &&
    typeof listPrice === "number" &&
    listPrice > salePrice
      ? Math.round(listPrice)
      : undefined;
  const discount =
    typeof originalPrice === "number" && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;
  const brandFromMap = dto.brandId
    ? options.brandMap?.get(dto.brandId)?.name
    : undefined;
  const brand =
    dto.brandName ||
    brandFromMap ||
    (dto.brandId ? `Brand ${dto.brandId}` : "Đang cập nhật");

  return {
    id: String(dto.id),
    apiId: dto.id,
    sku: dto.partNumber,
    name: dto.name,
    slug: dto.slug,
    category: dto.category?.name || "Danh mục",
    apiCategoryId: dto.category?.id,
    brand,
    brandId: dto.brandId ?? undefined,
    price,
    originalPrice,
    discount: typeof discount === "number" && discount > 0 ? discount : undefined,
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
  options: CatalogProductMapperOptions = {},
): ProductListingResult {
  return {
    products: response.items.map((item) =>
      mapCatalogProductToProduct(item, options),
    ),
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    hasPreviousPage: response.hasPreviousPage,
    hasNextPage: response.hasNextPage,
    usesServerPagination: true,
  };
}
