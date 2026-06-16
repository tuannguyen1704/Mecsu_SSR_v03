import type { Metadata } from "next";
import { BlogListingPageShell } from "@/features/blog";

export const metadata: Metadata = {
  title: "Resource Hub | Mecsu",
  description: "Khám phá các hướng dẫn, kiến thức kỹ thuật và xu hướng công nghiệp mới nhất.",
};

export default function BlogPage() {
  return <BlogListingPageShell />;
}
