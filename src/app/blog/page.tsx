import type { Metadata } from "next";
import { BlogListingPageShell } from "@/features/blog";
import { getBlogListingData } from "@/features/blog/services/blog-service";

export const metadata: Metadata = {
  title: "Resource Hub | Mecsu",
  description: "Khám phá các hướng dẫn, kiến thức kỹ thuật và xu hướng công nghiệp mới nhất.",
};

export default async function BlogPage() {
  const blogListingData = await getBlogListingData();

  return <BlogListingPageShell {...blogListingData} />;
}
