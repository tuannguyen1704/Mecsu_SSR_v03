export type BlogCategory =
  | "Buying Guides"
  | "Technical Guides"
  | "Industry News"
  | "Product Comparisons"
  | "Warehouse Insights";

export type BlogContentBlock =
  | {
      type: "h2" | "h3";
      id?: string;
      text: string;
    }
  | {
      type: "paragraph" | "quote";
      text: string;
    }
  | {
      type: "bulletList" | "numberedList";
      items: string[];
    };

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  coverImage: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  featured?: boolean;
}

export interface BlogTocItem {
  id: string;
  title: string;
}
