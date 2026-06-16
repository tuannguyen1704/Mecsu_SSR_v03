import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "../../types/product";
import { getProductCategoryTrail } from "../../services/product-service";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { category, subcategory } = getProductCategoryTrail(product);

  return (
    <nav className="flex flex-wrap items-center text-sm font-medium text-slate-500">
      <Link href="/" className="whitespace-nowrap hover:text-blue-600">
        Trang chủ
      </Link>
      <ChevronRight size={14} className="mx-2 shrink-0 text-slate-400" />
      {category ? (
        <>
          <Link href={`/danh-muc/${category.slug}`} className="whitespace-nowrap hover:text-blue-600">
            {category.name}
          </Link>
          <ChevronRight size={14} className="mx-2 shrink-0 text-slate-400" />
        </>
      ) : null}
      {category && subcategory ? (
        <>
          <Link
            href={`/danh-muc/${category.slug}/${subcategory.slug}`}
            className="whitespace-nowrap hover:text-blue-600"
          >
            {subcategory.name}
          </Link>
          <ChevronRight size={14} className="mx-2 shrink-0 text-slate-400" />
        </>
      ) : null}
      <span className="line-clamp-1 font-bold text-slate-900">{product.name}</span>
    </nav>
  );
}
