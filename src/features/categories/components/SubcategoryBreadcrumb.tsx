import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category, CategorySubcategory } from "../types/category";

export function SubcategoryBreadcrumb({
  category,
  subcategory,
}: {
  category: Category;
  subcategory: CategorySubcategory;
}) {
  return (
    <nav className="mb-6 flex items-center text-[13px] font-medium text-slate-500">
      <Link href="/" className="hover:text-blue-600">
        Trang chủ
      </Link>
      <ChevronRight size={14} className="mx-2 text-slate-400" />
      <Link
        href={`/danh-muc/${category.slug}`}
        className="font-bold hover:text-blue-600"
      >
        {category.name}
      </Link>
      <ChevronRight size={14} className="mx-2 text-slate-400" />
      <span className="font-bold text-slate-900">{subcategory.name}</span>
    </nav>
  );
}
