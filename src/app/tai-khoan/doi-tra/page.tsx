import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { ReturnsPageShell } from "@/features/returns";

export const metadata: Metadata = {
  title: "Đổi trả",
  description: "Quản lý các yêu cầu đổi trả của bạn.",
};

export default function ReturnsPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/doi-tra">
      <ReturnsPageShell />
    </AccountLayout>
  );
}
