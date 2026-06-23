import type { Metadata } from "next";
import { BrandListingPage } from "@/features/brands/components/BrandListingPage";

export const metadata: Metadata = {
  title: "Thương hiệu vật tư công nghiệp | Mecsu",
  description:
    "Danh sách thương hiệu vật tư, dụng cụ và thiết bị công nghiệp tại Mecsu.",
};

interface BrandsPageProps {
  searchParams?: Promise<{ group?: string | string[] }>;
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
  const params = await searchParams;
  const group = Array.isArray(params?.group) ? params.group[0] : params?.group;

  return <BrandListingPage initialGroup={group} />;
}
