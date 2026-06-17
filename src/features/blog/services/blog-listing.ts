import type { BlogArticle, BlogCategory } from "../types/blog";

export const BLOG_ARTICLES_PER_PAGE = 6;
export type BlogCategoryFilter = "Tất cả" | BlogCategory;

export function getFilteredBlogArticles({
  activeCategory,
  articles,
  searchTerm,
}: {
  activeCategory: BlogCategoryFilter;
  articles: BlogArticle[];
  searchTerm: string;
}): BlogArticle[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory =
      activeCategory === "Tất cả" || article.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      article.title.toLowerCase().includes(normalizedSearch) ||
      article.excerpt.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

export function getPaginatedBlogArticles(
  articles: BlogArticle[],
  currentPage: number,
  articlesPerPage = BLOG_ARTICLES_PER_PAGE,
): BlogArticle[] {
  return articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  );
}

export function getTotalBlogPages(
  articles: BlogArticle[],
  articlesPerPage = BLOG_ARTICLES_PER_PAGE,
): number {
  return Math.max(1, Math.ceil(articles.length / articlesPerPage));
}
