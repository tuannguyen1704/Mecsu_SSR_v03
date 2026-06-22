import { Breadcrumb } from "@/components/shared/Breadcrumb";

export function SearchBreadcrumb() {
  return (
    <Breadcrumb
      className="mb-6"
      items={[
        { label: "Trang chủ", href: "/" },
        { label: "Tìm kiếm" },
      ]}
    />
  );
}
