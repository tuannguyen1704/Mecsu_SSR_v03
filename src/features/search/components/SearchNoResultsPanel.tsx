import Link from "next/link";
import { SearchX } from "lucide-react";

const SUGGESTIONS = [
  "Bulong",
  "Vòng bi",
  "Băng keo",
  "3M",
  "Bosch",
  "Dụng cụ cầm tay",
  "Thiết bị khí nén",
];

export function SearchNoResultsPanel({ query }: { query: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-sm border border-[#E2E8F0] bg-white px-5 py-8 text-center sm:px-10 sm:py-12">
      <div className="max-w-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-[#F3F7FC] text-[#163F78]">
          <SearchX size={27} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-[#0F172A] sm:text-2xl">
          Không tìm thấy sản phẩm phù hợp
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
          Không có sản phẩm nào khớp với từ khóa &quot;{query}&quot;. Bạn có
          thể thử từ khóa ngắn hơn, tên thương hiệu hoặc mã sản phẩm.
        </p>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-[#334155]">
            Gợi ý tìm kiếm phổ biến
          </h3>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <Link
                key={suggestion}
                href={`/search?q=${encodeURIComponent(suggestion)}`}
                className="rounded-sm border border-[#D8E1EE] bg-[#F8FAFC] px-3 py-1.5 text-sm text-[#163F78] transition-colors hover:border-[#163F78] hover:bg-[#163F78] hover:text-white"
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/danh-muc"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-[#163F78] px-5 text-sm font-medium text-white hover:bg-[#123463]"
          >
            Xem tất cả danh mục
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-sm border border-[#163F78] bg-white px-5 text-sm font-medium text-[#163F78] hover:bg-[#F3F7FC]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
