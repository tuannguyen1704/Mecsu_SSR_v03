import Link from "next/link";
import type {
  BrandCatalog,
  BrandCatalogBreadcrumb,
  BrandCatalogNode,
} from "../types";
import { BrandHero } from "./BrandHero";
import { BrandProductSection } from "./BrandProductSection";
import { BrandRelatedCategories } from "./BrandRelatedCategories";

export function BrandDetailPage({
  catalog,
  node,
  currentPath,
  breadcrumbs,
}: {
  catalog: BrandCatalog;
  node: BrandCatalogNode;
  currentPath: string[];
  breadcrumbs: BrandCatalogBreadcrumb[];
}) {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-12">
      <BrandHero catalog={catalog} node={node} breadcrumbs={breadcrumbs} />
      <BrandRelatedCategories
        brandSlug={catalog.brand.slug}
        currentPath={currentPath}
      >
        {node.children || []}
      </BrandRelatedCategories>
      <BrandProductSection catalog={catalog} node={node} />
    </main>
  );
}

export function BrandNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-16 text-center">
      <div className="w-full rounded-sm border border-[#E2E8F0] bg-white px-6 py-14">
        <div className="mx-auto mb-4 h-1 w-10 bg-[#FFC72C]" />
        <h1 className="text-2xl font-semibold text-[#0F172A]">
          Không tìm thấy thương hiệu
        </h1>
        <p className="mt-3 text-[#64748B]">
          Thương hiệu này hiện chưa có dữ liệu trên Mecsu.
        </p>
        <Link
          href="/thuong-hieu"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-sm bg-[#163F78] px-5 text-sm font-medium text-white"
        >
          Quay lại danh sách thương hiệu
        </Link>
      </div>
    </main>
  );
}

export function BrandCategoryNotFound({ brandSlug }: { brandSlug: string }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-16 text-center">
      <div className="w-full rounded-sm border border-[#E2E8F0] bg-white px-6 py-14">
        <div className="mx-auto mb-4 h-1 w-10 bg-[#FFC72C]" />
        <h1 className="text-2xl font-semibold text-[#0F172A]">
          Không tìm thấy danh mục thương hiệu
        </h1>
        <p className="mt-3 text-[#64748B]">
          Danh mục này hiện chưa có dữ liệu trên Mecsu.
        </p>
        <Link
          href={`/thuong-hieu/${brandSlug}`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-sm bg-[#163F78] px-5 text-sm font-medium text-white"
        >
          Quay lại thương hiệu
        </Link>
      </div>
    </main>
  );
}
