import Link from "next/link";
import { Search, SearchX } from "lucide-react";

interface SearchEmptyStateProps {
  query?: string;
  type: "empty-query" | "no-results";
}

const SEARCH_SUGGESTIONS = [
  "Bulong",
  "Vòng bi",
  "Băng keo",
  "3M",
  "Bosch",
  "Dụng cụ cầm tay",
  "Thiết bị khí nén",
];

export function SearchEmptyState({ query, type }: SearchEmptyStateProps) {
  const isEmptyQuery = type === "empty-query";

  return (
    <section className="mx-auto mt-6 max-w-[820px] rounded-sm border border-[#E2E8F0] bg-white px-4 py-6 text-center sm:mt-8 sm:px-10 sm:py-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-[#F3F7FC] text-[#163F78]">
        {isEmptyQuery ? <Search size={27} /> : <SearchX size={27} />}
      </div>

      <h1 className="mt-5 text-xl font-semibold text-[#0F172A] sm:text-2xl">
        {isEmptyQuery
          ? "Nhập từ khóa để tìm kiếm sản phẩm"
          : "Không tìm thấy sản phẩm phù hợp"}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">
        {isEmptyQuery
          ? "Tìm nhanh theo tên sản phẩm, thương hiệu, SKU hoặc nhóm vật tư công nghiệp."
          : `Không có sản phẩm nào khớp với từ khóa "${query}". Hãy thử kiểm tra lại chính tả, tìm bằng từ khóa ngắn hơn hoặc dùng tên thương hiệu/mã sản phẩm.`}
      </p>

      {!isEmptyQuery ? (
        <>
          <div className="mt-7 border-t border-[#E2E8F0] pt-6">
            <h2 className="text-sm font-medium text-[#334155]">
              Gợi ý tìm kiếm phổ biến
            </h2>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map((suggestion) => (
                <Link
                  key={suggestion}
                  href={`/search?q=${encodeURIComponent(suggestion)}`}
                  className="rounded-sm border border-[#D8E1EE] bg-white px-3 py-1.5 text-sm text-[#475569] transition-colors hover:border-[#163F78] hover:bg-[#F3F7FC] hover:text-[#163F78]"
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/danh-muc"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-[#163F78] px-5 text-sm font-medium text-white transition-colors hover:bg-[#123463]"
            >
              Xem tất cả danh mục
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-[#163F78] bg-white px-5 text-sm font-medium text-[#163F78] transition-colors hover:bg-[#F3F7FC]"
            >
              Về trang chủ
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SEARCH_SUGGESTIONS.map((suggestion) => (
            <Link
              key={suggestion}
              href={`/search?q=${encodeURIComponent(suggestion)}`}
              className="rounded-sm border border-[#D8E1EE] bg-white px-3 py-1.5 text-sm text-[#475569] transition-colors hover:border-[#163F78] hover:bg-[#F3F7FC] hover:text-[#163F78]"
            >
              {suggestion}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
