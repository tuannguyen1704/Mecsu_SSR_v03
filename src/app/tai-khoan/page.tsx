import type { Metadata } from "next";
import { AccountLayout, AccountOverview } from "@/features/account";

export const metadata: Metadata = {
  title: "Tài khoản của tôi",
  description: "Quản lý thông tin tài khoản, đơn hàng và yêu cầu báo giá.",
};

export default function AccountDashboardPage() {
  return (
    <AccountLayout>
      <AccountOverview />
    </AccountLayout>
  );
}
