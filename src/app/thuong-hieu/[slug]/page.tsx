import type { Metadata } from "next";
import {
  BrandDetailPage,
  BrandNotFound,
} from "@/features/brands/components/BrandDetailPage";
import { BRAND_CATALOGS } from "@/features/brands/data/brand-catalog.mock";
import {
  buildBrandBreadcrumbs,
  getBrandCatalog,
  mergeDuplicateFilterGroups,
} from "@/features/brands/utils/brand-catalog";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRAND_CATALOGS.map((catalog) => ({ slug: catalog.brand.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getBrandCatalog(slug);

  return catalog
    ? {
        title: `${catalog.brand.name} | Thương hiệu Mecsu`,
        description: catalog.brand.description,
      }
    : { title: "Không tìm thấy thương hiệu | Mecsu" };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const catalog = getBrandCatalog(slug);

  if (!catalog) return <BrandNotFound />;

  const node = {
    ...catalog.root,
    filters: mergeDuplicateFilterGroups(catalog.root.filters),
  };

  return (
    <BrandDetailPage
      catalog={catalog}
      node={node}
      currentPath={[]}
      breadcrumbs={buildBrandBreadcrumbs(catalog, [])}
    />
  );
}
