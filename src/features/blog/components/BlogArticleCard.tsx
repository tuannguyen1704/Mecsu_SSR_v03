import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";
import type { BlogArticle } from "../types/blog";

interface BlogArticleCardProps {
  article: BlogArticle;
}

export function BlogArticleCard({ article }: BlogArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:border-[#C9D7EA] hover:shadow-xl hover:shadow-slate-200/70"
    >
      <div className="absolute right-0 bottom-0 left-0 z-10 h-[3px] origin-left scale-x-0 bg-[#FFC928] transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[12px] font-bold tracking-wide text-[#163F78] uppercase">
          {article.category}
        </span>
        <h3 className="mt-2 mb-3 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-[#163F78]">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-[14px] leading-relaxed text-slate-600">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <User size={14} />
            {article.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {article.readingTime}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs font-semibold text-slate-400">{article.publishedDate}</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors group-hover:border-[#FFC928] group-hover:bg-[#FFC928] group-hover:text-[#163F78]">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
