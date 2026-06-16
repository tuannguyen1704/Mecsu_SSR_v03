import type { Metadata } from "next";
import { AccountLayout, OrdersPageShell } from "@/features/account";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi",
  description: "Theo dõi và quản lý đơn hàng của bạn.",
};

export default function OrdersPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/don-hang">
      <OrdersPageShell />
    </AccountLayout>
  );
}
