import type { ProductFilterOption } from "./category-listing";
import type {
  CatalogCategoryBrandDto,
  CatalogCategoryBrandsResponseDto,
} from "../types/catalog-category-brands-api";

export type CategoryBrand = {
  id: string;
  apiId: number;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  productCount: number;
};

export function mapCatalogCategoryBrandDtoToBrand(
  dto: CatalogCategoryBrandDto,
): CategoryBrand {
  return {
    id: String(dto.id),
    apiId: dto.id,
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? null,
    imageUrl: dto.imageUrl ?? null,
    displayOrder: dto.displayOrder ?? 0,
    productCount: dto.productCount ?? 0,
  };
}

export function mapCatalogCategoryBrandsResponse(
  response: CatalogCategoryBrandsResponseDto,
): CategoryBrand[] {
  return response.items.map(mapCatalogCategoryBrandDtoToBrand);
}

export function mapCategoryBrandsToFilterItems(
  brands: CategoryBrand[],
): ProductFilterOption[] {
  return brands.map((brand) => ({
    id: String(brand.apiId),
    label: brand.name,
    count: brand.productCount,
  }));
}

export function createCategoryBrandMap(brands: CategoryBrand[]) {
  return new Map(brands.map((brand) => [brand.apiId, brand]));
}
