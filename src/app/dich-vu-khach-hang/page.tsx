import type { Metadata } from "next";
import { PublicCustomerServicePage } from "@/features/support";

export const metadata: Metadata = {
  title: "Dịch vụ khách hàng | Mecsu",
  description:
    "Mecsu hỗ trợ bạn từ tìm sản phẩm, đặt hàng, thanh toán đến giao hàng và đổi trả.",
};

export default function CustomerSupportPage() {
  return <PublicCustomerServicePage />;
}
