import type { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { HomeCategories } from "@/features/home";

export const metadata: Metadata = {
  title: "Danh mục sản phẩm | Mecsu",
  description:
    "Khám phá danh mục vật tư, dụng cụ và thiết bị công nghiệp tại Mecsu.",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-6 lg:px-12">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Danh mục sản phẩm" },
          ]}
        />
      </div>
      <HomeCategories />
    </main>
  );
}
