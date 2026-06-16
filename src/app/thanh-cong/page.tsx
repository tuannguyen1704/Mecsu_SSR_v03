import type { Metadata } from "next";
import { PaymentSuccessClient } from "@/features/checkout/components/PaymentSuccessClient";

export const metadata: Metadata = {
  title: "Đặt hàng thành công | Mecsu",
  description: "Thông tin xác nhận đơn hàng Mecsu của bạn.",
};

export default function OrderSuccessPage() {
  return <PaymentSuccessClient />;
}
