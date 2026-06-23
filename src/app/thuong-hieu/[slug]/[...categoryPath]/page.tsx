import type { Metadata } from "next";
import {
  BrandCategoryNotFound,
  BrandDetailPage,
  BrandNotFound,
} from "@/features/brands/components/BrandDetailPage";
import {
  buildBrandBreadcrumbs,
  getBrandCatalog,
  getBrandCatalogStaticPaths,
  mergeDuplicateFilterGroups,
  resolveBrandCatalogNode,
} from "@/features/brands/utils/brand-catalog";

interface BrandCategoryPageProps {
  params: Promise<{ slug: string; categoryPath: string[] }>;
}

export function generateStaticParams() {
  return getBrandCatalogStaticPaths().map(({ brandSlug, categoryPath }) => ({
    slug: brandSlug,
    categoryPath,
  }));
}

export async function generateMetadata({
  params,
}: BrandCategoryPageProps): Promise<Metadata> {
  const { slug, categoryPath } = await params;
  const catalog = getBrandCatalog(slug);
  const node = catalog
    ? resolveBrandCatalogNode(catalog, categoryPath)
    : null;

  return node
    ? {
        title: `${node.title} | Mecsu`,
        description: node.description || catalog?.brand.description,
      }
    : { title: "Không tìm thấy danh mục thương hiệu | Mecsu" };
}

export default async function BrandCategoryPage({
  params,
}: BrandCategoryPageProps) {
  const { slug, categoryPath } = await params;
  const catalog = getBrandCatalog(slug);

  if (!catalog) return <BrandNotFound />;

  const resolvedNode = resolveBrandCatalogNode(catalog, categoryPath);
  if (!resolvedNode) return <BrandCategoryNotFound brandSlug={slug} />;

  const node = {
    ...resolvedNode,
    filters: mergeDuplicateFilterGroups(resolvedNode.filters),
  };

  return (
    <BrandDetailPage
      catalog={catalog}
      node={node}
      currentPath={categoryPath}
      breadcrumbs={buildBrandBreadcrumbs(catalog, categoryPath)}
    />
  );
}
