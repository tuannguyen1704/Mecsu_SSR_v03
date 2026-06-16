import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { AccountInfoPageShell } from "@/features/account";

export const metadata: Metadata = {
  title: "Thông tin tài khoản",
  description: "Quản lý thông tin cá nhân và doanh nghiệp của bạn.",
};

export default function AccountInfoPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/thong-tin-ca-nhan">
      <AccountInfoPageShell />
    </AccountLayout>
  );
}
