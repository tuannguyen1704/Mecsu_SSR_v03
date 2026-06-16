import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { SupportPageShell } from "@/features/support";

export const metadata: Metadata = {
  title: "Hỗ trợ khách hàng",
  description: "Trung tâm hỗ trợ khách hàng - FAQ, chính sách và gửi yêu cầu hỗ trợ.",
};

export default function SupportPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/ho-tro">
      <SupportPageShell />
    </AccountLayout>
  );
}
