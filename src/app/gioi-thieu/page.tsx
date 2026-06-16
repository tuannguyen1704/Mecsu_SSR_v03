import type { Metadata } from "next";
import { AboutUsPageClient } from "@/features/about";

export const metadata: Metadata = {
  title: "Giới thiệu Mecsu | Mecsu",
  description:
    "Mecsu là nền tảng vật tư công nghiệp dành cho doanh nghiệp sản xuất, hỗ trợ tìm kiếm, báo giá và mua hàng nhanh chóng.",
};

export default function AboutPage() {
  return <AboutUsPageClient />;
}
