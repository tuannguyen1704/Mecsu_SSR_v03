import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Category } from "../types/category";

export function CategoryBreadcrumb({ category }: { category: Category }) {
  return (
    <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
      <Link href="/" className="hover:text-blue-600">
        Trang chủ
      </Link>
      <ChevronRight size={16} className="mx-2 text-slate-400" />
      <span className="font-bold text-slate-900">{category.name}</span>
    </nav>
  );
}
