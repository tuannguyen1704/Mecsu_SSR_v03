import type { Metadata } from "next";
import { TechnicalBlogPageClient } from "@/features/blog";

export const metadata: Metadata = {
  title: "Blog kỹ thuật | Mecsu",
  description:
    "Cập nhật kiến thức kỹ thuật, vật liệu học, cơ khí chính xác và xu hướng công nghiệp từ Mecsu.",
};

export default function TechnicalBlogPage() {
  return <TechnicalBlogPageClient />;
}
