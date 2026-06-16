import Link from "next/link";
import { Package, Search } from "lucide-react";

interface SearchEmptyStateProps {
  query?: string;
  type: "empty-query" | "no-results";
}

export function SearchEmptyState({ query, type }: SearchEmptyStateProps) {
  const isEmptyQuery = type === "empty-query";
  const Icon = isEmptyQuery ? Search : Package;

  return (
    <section className="flex min-h-[420px] flex-col items-center justify-center rounded-xl bg-[#f5f5f5] px-6 py-14 text-center">
      <Icon className="mb-5 h-20 w-20 text-slate-300" strokeWidth={1.4} />
      <h1 className="mb-3 text-2xl font-black tracking-tight text-[#1a1a1a] md:text-3xl">
        {isEmptyQuery
          ? "Nhập từ khóa để tìm kiếm sản phẩm"
          : "Không tìm thấy sản phẩm phù hợp"}
      </h1>
      <p className="mx-auto max-w-xl text-[15px] leading-relaxed font-medium text-slate-500">
        {isEmptyQuery ? (
          "Sử dụng thanh tìm kiếm để tra nhanh sản phẩm, thương hiệu, SKU hoặc nhóm vật tư cần mua."
        ) : (
          <>
            Không có sản phẩm nào phù hợp với từ khóa{" "}
            <span className="font-black text-[#005da4]">&quot;{query}&quot;</span>.
            Vui lòng thử từ khóa khác hoặc tiếp tục mua sắm.
          </>
        )}
      </p>

      {isEmptyQuery ? null : (
        <Link
          href="/"
          className="mt-8 rounded-sm bg-[#005da4] px-7 py-3 text-[13px] font-black tracking-[0.18em] text-white uppercase transition-colors hover:bg-[#004b85]"
        >
          Tiếp tục mua sắm
        </Link>
      )}
    </section>
  );
}
