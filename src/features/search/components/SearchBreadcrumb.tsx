import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SearchBreadcrumb() {
  return (
    <nav className="mb-6 flex items-center gap-2 text-[13px] font-bold text-slate-500">
      <Link href="/" className="transition-colors hover:text-[#005da4]">
        Trang chủ
      </Link>
      <ChevronRight size={14} className="text-slate-300" />
      <span className="text-[#1a1a1a]">Tìm kiếm</span>
    </nav>
  );
}
