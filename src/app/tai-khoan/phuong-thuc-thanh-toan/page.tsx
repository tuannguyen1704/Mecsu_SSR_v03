import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { PaymentMethodsPageShell } from "@/features/payment-methods";

export const metadata: Metadata = {
  title: "Phương thức thanh toán | Mecsu",
  description: "Quản lý các phương thức thanh toán của bạn.",
};

export default function PaymentMethodsPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/phuong-thuc-thanh-toan">
      <PaymentMethodsPageShell />
    </AccountLayout>
  );
}
