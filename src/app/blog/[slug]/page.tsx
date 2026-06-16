import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPageShell } from "@/features/blog";
import {
  getBlogArticleBySlug,
  getBlogStaticParams,
} from "@/features/blog/services/blog-service";

interface BlogDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: BlogDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return {
    title: `${article.title} | Mecsu`,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailRouteProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetailPageShell article={article} />;
}
