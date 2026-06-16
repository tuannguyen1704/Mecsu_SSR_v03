import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicFaqPage } from "@/features/support";

export const metadata: Metadata = {
  title: "FAQs | Mecsu",
  description: "Trung tâm hỗ trợ Mecsu và các câu hỏi thường gặp.",
};

export default function FaqsPage() {
  return (
    <Suspense fallback={null}>
      <PublicFaqPage />
    </Suspense>
  );
}
