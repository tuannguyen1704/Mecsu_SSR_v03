import type {
  BrandCatalog,
  BrandCatalogBreadcrumb,
  BrandCatalogNode,
  BrandFilterGroup,
} from "../types";
import { BRAND_CATALOGS } from "../data/brand-catalog.mock";

export function getBrandCatalog(brandSlug: string) {
  return BRAND_CATALOGS.find((catalog) => catalog.brand.slug === brandSlug);
}

export function resolveBrandCatalogNode(
  catalog: BrandCatalog,
  categoryPath: string[],
) {
  let current = catalog.root;

  for (const slug of categoryPath) {
    const child = current.children?.find((item) => item.slug === slug);
    if (!child) return null;
    current = child;
  }

  return current;
}

export function buildBrandBreadcrumbs(
  catalog: BrandCatalog,
  categoryPath: string[],
): BrandCatalogBreadcrumb[] {
  const breadcrumbs: BrandCatalogBreadcrumb[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Thương hiệu", href: "/thuong-hieu" },
    {
      label: catalog.brand.name,
      href: categoryPath.length > 0 ? `/thuong-hieu/${catalog.brand.slug}` : undefined,
    },
  ];
  let current = catalog.root;
  const path: string[] = [];

  categoryPath.forEach((slug, index) => {
    const child = current.children?.find((item) => item.slug === slug);
    if (!child) return;
    path.push(slug);
    const isLast = index === categoryPath.length - 1;
    breadcrumbs.push({
      label: child.title.replace(new RegExp(`\\s+${catalog.brand.name}$`, "i"), ""),
      href: isLast
        ? undefined
        : `/thuong-hieu/${catalog.brand.slug}/${path.join("/")}`,
    });
    current = child;
  });

  return breadcrumbs;
}

export function mergeDuplicateFilterGroups(
  filters: BrandFilterGroup[],
): BrandFilterGroup[] {
  const groups = new Map<string, BrandFilterGroup>();

  filters.forEach((group) => {
    const key = group.title.trim().toLocaleLowerCase("vi");
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        ...group,
        values: [...group.values],
      });
      return;
    }

    const values = new Map(
      existing.values.map((value) => [value.label.toLocaleLowerCase("vi"), value]),
    );
    group.values.forEach((value) => {
      const valueKey = value.label.toLocaleLowerCase("vi");
      const previous = values.get(valueKey);
      values.set(valueKey, {
        label: value.label,
        count: Math.max(previous?.count || 0, value.count),
      });
    });
    existing.values = Array.from(values.values());
    existing.searchable = existing.searchable || group.searchable;
  });

  return Array.from(groups.values());
}

export function buildBrandChildUrl(
  brandSlug: string,
  currentPath: string[],
  childSlug: string,
) {
  return `/thuong-hieu/${brandSlug}/${[...currentPath, childSlug].join("/")}`;
}

export function getBrandCatalogStaticPaths() {
  const paths: Array<{ brandSlug: string; categoryPath: string[] }> = [];

  const visit = (
    catalog: BrandCatalog,
    node: BrandCatalogNode,
    currentPath: string[],
  ) => {
    node.children?.forEach((child) => {
      const childPath = [...currentPath, child.slug];
      paths.push({ brandSlug: catalog.brand.slug, categoryPath: childPath });
      visit(catalog, child, childPath);
    });
  };

  BRAND_CATALOGS.forEach((catalog) => visit(catalog, catalog.root, []));
  return paths;
}
