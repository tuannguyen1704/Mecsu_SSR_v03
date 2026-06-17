"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { BlogArticleCard } from "./BlogArticleCard";
import { BlogNewsletterCta } from "./BlogNewsletterCta";
import type { BlogArticle, BlogCategory } from "../types/blog";
import {
  BLOG_ARTICLES_PER_PAGE,
  type BlogCategoryFilter,
  getFilteredBlogArticles,
  getPaginatedBlogArticles,
  getTotalBlogPages,
} from "../services/blog-listing";

interface BlogListingClientProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
}

export function BlogListingClient({ articles, categories }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategoryFilter>("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(
    () =>
      getFilteredBlogArticles({
        activeCategory,
        articles,
        searchTerm,
      }),
    [activeCategory, articles, searchTerm],
  );

  const totalPages = getTotalBlogPages(
    filteredArticles,
    BLOG_ARTICLES_PER_PAGE,
  );
  const visibleArticles = getPaginatedBlogArticles(
    filteredArticles,
    currentPage,
    BLOG_ARTICLES_PER_PAGE,
  );

  const updateCategory = (category: BlogCategoryFilter) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveCategory("Tất cả");
    setSearchTerm("");
    setCurrentPage(1);
  };


  return (
    <>
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="relative">
            <Search size={20} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Tìm kiếm theo tiêu đề hoặc mô tả bài viết..."
              className="h-12 w-full rounded-xl border border-[#D8E1EE] bg-slate-50 pr-12 pl-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:bg-white focus:ring-4 focus:ring-[#DCE8F8]"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => updateSearch("")}
                className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["Tất cả", ...categories].map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateCategory(category as BlogCategoryFilter)}
                  className={`h-10 whitespace-nowrap rounded-lg border px-5 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "border-[#163F78] bg-[#163F78] text-white shadow-[0_0_0_3px_rgba(156,185,229,0.55)]"
                      : "border-slate-300 bg-white text-slate-600 hover:border-[#163F78] hover:text-[#163F78]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bài viết mới nhất</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredArticles.length} bài viết phù hợp
              </p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Trang {currentPage} / {totalPages}
            </p>
          </div>

          {visibleArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleArticles.map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#E5EAF2] bg-white p-10 text-center shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
              <h3 className="text-xl font-bold text-slate-900">Không tìm thấy bài viết phù hợp.</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Hãy thử xóa bộ lọc hoặc dùng từ khóa ngắn hơn để tìm bài viết khác.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#FFC928] px-6 text-sm font-bold text-[#111827] transition-colors hover:bg-[#e8b931]"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

          {visibleArticles.length > 0 ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#163F78] hover:text-[#163F78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-lg border text-sm font-bold transition-colors ${
                    currentPage === page
                      ? "border-[#163F78] bg-[#163F78] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#163F78] hover:text-[#163F78]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#163F78] hover:text-[#163F78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <BlogNewsletterCta />
    </>
  );
}

