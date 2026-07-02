import type {
  CatalogProductFilterAttributeDto,
  CatalogProductFiltersResponseDto,
} from "../types/catalog-product-filters-api";
import type { ProductFilterGroup, ProductFilterOption } from "../types/product-filter-group";

const AVAILABILITY_FILTERS: ProductFilterOption[] = [
  { id: "in_stock", label: "Sẵn hàng tại kho", value: "instock:true" },
  {
    id: "express",
    label: "Giao hàng nhanh 2H",
    value: "nextDayShipping:true",
    disabled: true,
  },
  {
    id: "preorder",
    label: "Đặt hàng (7-14 ngày)",
    value: "instockVendor:true",
  },
];

const STOCK_LEVEL_FILTERS: ProductFilterOption[] = [
  { id: "out_of_stock", label: "Hết hàng", value: "out_of_stock" },
  { id: "low_stock", label: "Sắp hết hàng", value: "low_stock" },
  { id: "normal_stock", label: "Còn hàng", value: "normal_stock" },
  { id: "high_stock", label: "Tồn nhiều", value: "high_stock" },
];

const FALLBACK_MATERIAL_FILTERS: ProductFilterOption[] = [
  { id: "steel", label: "Thép", value: "Thép", count: 1200, disabled: true },
  { id: "inox304", label: "Inox 304", value: "Inox 304", count: 850, disabled: true },
  { id: "inox316", label: "Inox 316", value: "Inox 316", count: 320, disabled: true },
  {
    id: "carbon-steel",
    label: "Thép Carbon",
    value: "Thép Carbon",
    count: 450,
    disabled: true,
  },
  { id: "aluminum", label: "Nhôm", value: "Nhôm", count: 120, disabled: true },
  { id: "brass", label: "Đồng", value: "Đồng", count: 85, disabled: true },
];

const FALLBACK_ORIGIN_FILTERS: ProductFilterOption[] = [
  { id: "vn", label: "Việt Nam", value: "Việt Nam", count: 420, disabled: true },
  { id: "jp", label: "Nhật Bản", value: "Nhật Bản", count: 280, disabled: true },
  { id: "kr", label: "Hàn Quốc", value: "Hàn Quốc", count: 160, disabled: true },
  { id: "cn", label: "Trung Quốc", value: "Trung Quốc", count: 980, disabled: true },
  { id: "de", label: "Đức", value: "Đức", count: 90, disabled: true },
  { id: "us", label: "Mỹ", value: "Mỹ", count: 74, disabled: true },
];

export function getBaseProductFilterGroups(): ProductFilterGroup[] {
  return [
    {
      id: "availability",
      title: "Sẵn có & Giao hàng",
      queryKey: "availability",
      options: AVAILABILITY_FILTERS,
    },
    {
      id: "stockLevel",
      title: "Tình trạng tồn kho",
      queryKey: "stockLevel",
      options: STOCK_LEVEL_FILTERS,
    },
    // partType currently only exposes Quote. Keep backend query support, but
    // hide the group until it provides more customer-useful choices.
  ];
}

export function getFallbackProductFilterGroups(): ProductFilterGroup[] {
  return [
    ...getBaseProductFilterGroups(),
    {
      id: "material",
      title: "Vật liệu",
      queryKey: "material",
      options: FALLBACK_MATERIAL_FILTERS,
    },
    {
      id: "origin",
      title: "Xuất xứ",
      queryKey: "origin",
      searchable: true,
      options: FALLBACK_ORIGIN_FILTERS,
    },
  ];
}

export function mapCatalogProductFiltersResponse(
  response?: CatalogProductFiltersResponseDto,
): ProductFilterGroup[] {
  return [
    ...getBaseProductFilterGroups(),
    {
      id: "material",
      title: "Vật liệu",
      queryKey: "material",
      options: mapMaterialOptions(response?.attributes?.items),
    },
    {
      id: "origin",
      title: "Xuất xứ",
      queryKey: "origin",
      searchable: true,
      options: mapOriginOptions(response),
    },
  ].filter((group) => group.options.length > 0);
}

function mapMaterialOptions(
  attributes: CatalogProductFilterAttributeDto[] | null | undefined,
): ProductFilterOption[] {
  const materialAttributes = (attributes || []).filter((attribute) => {
    const title = `${attribute.displayName || ""} ${attribute.name || ""}`;

    return attribute.allowFiltering !== false && /vật liệu|material/i.test(title);
  });
  const values = new Map<string, ProductFilterOption>();

  materialAttributes.forEach((attribute) => {
    (attribute.values || []).forEach((item) => {
      const label = item.value?.trim();

      if (!label || values.has(label)) {
        return;
      }

      values.set(label, {
        id: item.slug || String(item.id ?? label),
        label,
        value: label,
        disabled: true,
      });
    });
  });

  return values.size > 0 ? Array.from(values.values()) : FALLBACK_MATERIAL_FILTERS;
}

function mapOriginOptions(
  response?: CatalogProductFiltersResponseDto,
): ProductFilterOption[] {
  const origins = response?.origins?.items || [];
  const options = origins
    .map((item): ProductFilterOption | undefined => {
      const label = item.origin?.trim();

      if (!label) {
        return undefined;
      }

      return {
        id: label,
        label,
        value: label,
        count: item.count ?? undefined,
        disabled: true,
      };
    })
    .filter((item): item is ProductFilterOption => Boolean(item));

  return options.length > 0 ? options : FALLBACK_ORIGIN_FILTERS;
}
