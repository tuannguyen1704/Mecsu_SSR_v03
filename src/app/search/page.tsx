import type { Metadata } from "next";
import { SearchPageShell, getSearchResults } from "@/features/search";
import { getAllCategories } from "@/features/categories/services/category-service";

interface SearchPageProps {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
}

async function getQuery(searchParams?: SearchPageProps["searchParams"]) {
  const params = await searchParams;
  const rawQuery = params?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;

  return query?.trim() ?? "";
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = await getQuery(searchParams);

  if (!query) {
    return {
      title: "Tìm kiếm sản phẩm",
      description:
        "Tìm kiếm sản phẩm, thương hiệu, SKU và nhóm vật tư công nghiệp trên Mecsu.",
    };
  }

  return {
    title: `Tìm kiếm: ${query}`,
    description: `Kết quả tìm kiếm sản phẩm cho từ khóa ${query}.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = await getQuery(searchParams);
  const products = getSearchResults(query);
  const categories = getAllCategories();

  return <SearchPageShell query={query} products={products} categories={categories} />;
}
