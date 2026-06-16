import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { QuotationsPageShell } from "@/features/quotations";

export const metadata: Metadata = {
  title: "Yêu cầu báo giá",
  description: "Quản lý các yêu cầu báo giá của bạn.",
};

export default function QuotationsPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/bao-gia">
      <QuotationsPageShell />
    </AccountLayout>
  );
}
