import type { Metadata } from "next";
import { PromotionsPage } from "@/features/promotions/components/PromotionsPage";

export const metadata: Metadata = {
  title: "Ưu đãi và mã giảm giá Mecsu | Khuyến mãi vật tư công nghiệp",
  description:
    "Tổng hợp ưu đãi, mã giảm giá và chương trình khuyến mãi vật tư công nghiệp tại Mecsu. Áp dụng cho đơn hàng doanh nghiệp, vật tư MRO, bulong, dụng cụ và bảo hộ lao động.",
};

export default function CouponsPromoCodesPage() {
  return <PromotionsPage />;
}
