import type { Metadata } from "next";
import { BrandListingPage } from "@/features/brands/components/BrandListingPage";

export const metadata: Metadata = {
  title: "Thương hiệu vật tư công nghiệp | Mecsu",
  description:
    "Danh sách thương hiệu vật tư, dụng cụ và thiết bị công nghiệp tại Mecsu.",
};

export default function BrandsPage() {
  return <BrandListingPage />;
}
