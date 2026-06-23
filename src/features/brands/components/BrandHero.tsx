import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type {
  BrandCatalog,
  BrandCatalogBreadcrumb,
  BrandCatalogNode,
} from "../types";

export function BrandHero({
  catalog,
  node,
  breadcrumbs,
}: {
  catalog: BrandCatalog;
  node: BrandCatalogNode;
  breadcrumbs: BrandCatalogBreadcrumb[];
}) {
  return (
    <section className="mb-8 border-b border-slate-200 bg-white pb-7">
      <Breadcrumb className="mb-5" items={breadcrumbs} />
      <div className="mb-3 h-1 w-10 bg-[#FFC72C]" />
      <h1 className="text-3xl font-semibold text-[#0F172A] md:text-4xl">
        {node.title}
      </h1>
      <p className="mt-3 max-w-4xl text-base leading-7 text-[#64748B]">
        {node.description || catalog.brand.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-sm border border-[#BFD0E6] bg-[#F3F7FC] px-3 py-1.5 text-sm font-medium text-[#163F78]">
          {node.productCount} sản phẩm
        </span>
        {node.children?.slice(0, 3).map((child) => (
          <span
            key={child.slug}
            className="rounded-sm border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#475569]"
          >
            {child.title.replace(new RegExp(`\\s+${catalog.brand.name}$`, "i"), "")}
          </span>
        ))}
      </div>
    </section>
  );
}
