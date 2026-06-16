"use client";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = Array.from({ length: totalPages })
    .map((_, index) => index + 1)
    .filter(
      (page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1,
    );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8 font-sans">
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`rounded border border-slate-200 px-4 py-2 text-[14px] font-bold transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed bg-white text-slate-300"
            : "text-[#005da4] hover:bg-slate-50"
        }`}
      >
        First
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`rounded border border-slate-200 px-4 py-2 text-[14px] font-bold transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed bg-white text-slate-300"
            : "text-[#005da4] hover:bg-slate-50"
        }`}
      >
        Previous
      </button>

      <div className="mx-2 flex items-center gap-1">
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const shouldShowEllipsis = previousPage && page - previousPage > 1;

          return (
            <span key={page} className="flex items-center gap-1">
              {shouldShowEllipsis ? (
                <span className="px-2 text-[14px] font-bold text-slate-400">...</span>
              ) : null}
              <button
                type="button"
                onClick={() => onPageChange(page)}
                className={`min-w-10 rounded border px-3 py-2 text-[14px] font-bold transition-colors ${
                  currentPage === page
                    ? "border-[#005da4] bg-[#005da4] text-white"
                    : "border-slate-200 bg-white text-[#005da4] hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`rounded border border-[#005da4] bg-white px-4 py-2 text-[14px] font-bold text-[#005da4] transition-colors hover:bg-slate-50 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Next
      </button>
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`rounded border border-[#005da4] bg-white px-4 py-2 text-[14px] font-bold text-[#005da4] transition-colors hover:bg-slate-50 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Last
      </button>
    </div>
  );
}
