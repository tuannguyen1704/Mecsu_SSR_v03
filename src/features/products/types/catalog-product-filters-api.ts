export type CatalogProductFilterValueDto = {
  id?: number;
  value?: string | null;
  slug?: string | null;
  displayOrder?: number | null;
};

export type CatalogProductFilterAttributeDto = {
  id?: number;
  name?: string | null;
  displayName?: string | null;
  allowFiltering?: boolean | null;
  displayFilteringOrder?: number | null;
  values?: CatalogProductFilterValueDto[] | null;
};

export type CatalogProductOriginFilterDto = {
  origin?: string | null;
  count?: number | null;
};

export type CatalogProductFiltersResponseDto = {
  attributes?: {
    total?: number | null;
    items?: CatalogProductFilterAttributeDto[] | null;
  } | null;
  origins?: {
    total?: number | null;
    items?: CatalogProductOriginFilterDto[] | null;
  } | null;
  brands?: unknown;
};
