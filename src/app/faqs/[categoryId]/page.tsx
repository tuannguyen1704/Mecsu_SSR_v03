import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getPublicFaqCategory,
  publicFaqCategories,
  PublicFaqPage,
} from "@/features/support";

interface FaqCategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  return publicFaqCategories.map((category) => ({
    categoryId: category.id,
  }));
}

export async function generateMetadata({
  params,
}: FaqCategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getPublicFaqCategory(categoryId);

  if (!category) {
    return {
      title: "FAQs | Mecsu",
      description: "Trung tâm hỗ trợ Mecsu.",
    };
  }

  return {
    title: `FAQs - ${category.name} | Mecsu`,
    description: category.description,
  };
}

export default async function FaqCategoryPage({
  params,
}: FaqCategoryPageProps) {
  const { categoryId } = await params;
  const category = getPublicFaqCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <PublicFaqPage categoryId={categoryId} />
    </Suspense>
  );
}
