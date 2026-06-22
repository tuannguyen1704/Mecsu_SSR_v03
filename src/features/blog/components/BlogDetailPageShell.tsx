import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import type { BlogArticle } from "../types/blog";
import {
  getBlogArticleContent,
  getBlogTocItems,
  getRelatedBlogArticles,
} from "../services/blog-service";
import { BlogArticleCard } from "./BlogArticleCard";
import { BlogContentRenderer } from "./BlogContentRenderer";
import { BlogNewsletterCta } from "./BlogNewsletterCta";
import { BlogTableOfContents } from "./BlogTableOfContents";

interface BlogDetailPageShellProps {
  article: BlogArticle;
}

export function BlogDetailPageShell({ article }: BlogDetailPageShellProps) {
  const contentBlocks = getBlogArticleContent(article);
  const tocItems = getBlogTocItems(article);
  const relatedArticles = getRelatedBlogArticles(article, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Resource Hub", href: "/blog" },
              { label: article.title },
            ]}
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-4 pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-12 lg:pb-12">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#163F78] transition-colors hover:text-[#0f2f5c]"
          >
            <ArrowLeft size={17} />
            Quay lại Resource Hub
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#163F78]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#163F78]">
              {article.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">{article.publishedDate}</span>
          </div>

          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <User size={17} className="text-[#163F78]" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={17} className="text-[#163F78]" />
              {article.publishedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={17} className="text-[#163F78]" />
              {article.readingTime}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white pb-10">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] overflow-hidden rounded-[24px] border-8 border-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] md:h-[420px] lg:h-[500px]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 1180px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="space-y-6 lg:hidden">
            <BlogTableOfContents items={tocItems} />
          </div>

          <div className="min-w-0 space-y-10">
            <div className="rounded-r-2xl border-l-4 border-[#FFC928] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
              <p className="text-lg leading-8 font-medium text-slate-700 italic">&quot;{article.excerpt}&quot;</p>
            </div>
            <BlogContentRenderer blocks={contentBlocks} />

            <section className="rounded-3xl bg-[#163F78] p-6 text-white shadow-[0_18px_45px_rgba(22,63,120,0.18)] lg:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFC928] text-2xl font-black text-[#163F78]">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-white/60 uppercase">Tác giả</p>
                  <h2 className="mt-2 text-2xl font-bold">{article.author}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
                    Đội ngũ nội dung Mecsu tổng hợp kiến thức từ thực tế mua hàng công nghiệp, dữ liệu kỹ thuật và kinh nghiệm hỗ trợ doanh nghiệp trong quá trình chọn vật tư.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="hidden lg:block">
            <BlogTableOfContents items={tocItems} />
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bài viết liên quan</h2>
            <p className="mt-1 text-sm text-slate-500">Ưu tiên các bài viết cùng danh mục với nội dung bạn đang đọc.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <BlogArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      </section>

      <BlogNewsletterCta />
    </main>
  );
}
