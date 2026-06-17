import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CalendarDays, Clock, Layers } from "lucide-react";
import type { BlogArticle, BlogCategory } from "../types/blog";
import { BlogListingClient } from "./BlogListingClient";

interface BlogListingPageShellProps {
  articles: BlogArticle[];
  categories: BlogCategory[];
  featuredArticle: BlogArticle;
}

export function BlogListingPageShell({
  articles,
  categories,
  featuredArticle,
}: BlogListingPageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#163F78]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#163F78]">
                <BookOpen size={14} />
                Mecsu Knowledge Base
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">Resource Hub</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 lg:text-base">
                Khám phá kiến thức, hướng dẫn và xu hướng mới nhất trong ngành công nghiệp.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-xl border border-[#D8E1EE] bg-slate-50 px-4 py-3">
                  <p className="text-2xl font-bold text-[#163F78]">{articles.length}</p>
                  <p className="text-xs font-semibold text-slate-500">Tổng bài viết</p>
                </div>
                <div className="rounded-xl border border-[#D8E1EE] bg-slate-50 px-4 py-3">
                  <p className="text-2xl font-bold text-[#163F78]">{categories.length}</p>
                  <p className="text-xs font-semibold text-slate-500">Danh mục</p>
                </div>
              </div>
            </div>
            <div className="relative h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 lg:h-[320px]">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8ed7c159bf?auto=format&fit=crop&w=1100&q=80"
                alt="Resource Hub"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Bài viết nổi bật</h2>
              <p className="mt-1 text-sm text-slate-500">Nội dung được chọn lọc cho đội mua hàng và kỹ thuật.</p>
            </div>
          </div>
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group grid overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white transition-all duration-300 hover:shadow-xl lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
          >
            <div className="relative min-h-[260px] overflow-hidden bg-slate-100 lg:min-h-[360px]">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 rounded-full bg-[#FFC928] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#163F78]">
                Featured
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 lg:p-8">
              <span className="text-[12px] font-bold tracking-wide text-[#163F78] uppercase">
                {featuredArticle.category}
              </span>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#163F78] lg:text-3xl">
                {featuredArticle.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 lg:text-base">
                {featuredArticle.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={16} />
                  {featuredArticle.publishedDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={16} />
                  {featuredArticle.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers size={16} />
                  {featuredArticle.author}
                </span>
              </div>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#163F78]">
                Đọc bài viết
                <ArrowRight size={17} className="text-[#FFC928] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <BlogListingClient articles={articles} categories={categories} />
    </main>
  );
}
