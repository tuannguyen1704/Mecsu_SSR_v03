import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { AccountStockAlertsPage } from "@/features/account/stock-alerts/AccountStockAlertsPage";

export const metadata: Metadata = {
  title: "Nhắc hàng",
  description:
    "Theo dõi các sản phẩm bạn đã đăng ký nhận thông báo khi có hàng trở lại.",
};

export default function StockAlertsPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/nhac-hang">
      <AccountStockAlertsPage />
    </AccountLayout>
  );
}
