import type { Product } from "../../types/product";
import { getProductSpecifications } from "../../services/product-service";

interface ProductTechSpecsProps {
  product: Product;
}

const preferredRows = [
  "Dùng Cho Trục",
  "Vật Liệu",
  "Bề Rộng Rãnh Sử Dụng",
  "Đường Kính Rãnh Sử Dụng",
  "Đường Kính Trong",
];

export function ProductTechSpecs({ product }: ProductTechSpecsProps) {
  const specs = getDerivedSpecs(product);

  return (
    <section className="mt-4 font-sans">
      <div className="rounded-t-sm bg-[#132832] px-3 py-2 text-[18px] font-bold text-white">
        Thông số kỹ thuật
      </div>
      <div className="border border-t-0 border-slate-200 text-[14px]">
        {preferredRows.map((label) => (
          <div key={label} className="grid grid-cols-[160px_1fr] border-b border-slate-200 last:border-b-0">
            <div className="border-r border-slate-200 bg-[#f2f5f7] p-2 font-bold">
              {label}:
            </div>
            <div className="p-2">{specs[label]}</div>
          </div>
        ))}
      </div>
      <a
        href="#product-detail-specs"
        className="mt-2 inline-block text-[15px] font-bold text-[#005da4] hover:underline"
      >
        Tài liệu tham khảo
      </a>
    </section>
  );
}

export function getDerivedSpecs(product: Product): Record<string, string> {
  const existingSpecs = getProductSpecifications(product);

  return {
    "Dùng Cho Trục": existingSpecs["Dùng Cho Trục"] || "36 mm",
    "Vật Liệu": existingSpecs["Vật Liệu"] || product.specifications?.["Vật liệu"] || "Thép 65Mn",
    "Bề Rộng Rãnh Sử Dụng": existingSpecs["Bề Rộng Rãnh Sử Dụng"] || "1.85 mm",
    "Đường Kính Rãnh Sử Dụng": existingSpecs["Đường Kính Rãnh Sử Dụng"] || "34 mm",
    "Đường Kính Trong": existingSpecs["Đường Kính Trong"] || "33.2 mm",
    "Độ Dày": existingSpecs["Độ Dày"] || "1.75 mm",
    "Tiêu Chuẩn": existingSpecs["Tiêu Chuẩn"] || product.specifications?.["Tiêu chuẩn"] || "DIN 471",
    "Thương Hiệu": product.brand,
    "Mã SKU": product.sku,
    "Danh Mục": product.category,
    "Đơn Vị Tính": product.unit || "Cái",
    "Tình Trạng": product.stock > 0 ? "Sẵn hàng" : "Hết hàng",
  };
}
