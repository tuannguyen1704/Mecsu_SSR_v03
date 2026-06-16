import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { FeedbackPageShell } from "@/features/feedback";

export const metadata: Metadata = {
  title: "Góp ý | Mecsu",
  description: "Gửi góp ý và phản hồi về trải nghiệm sử dụng Mecsu.",
};

export default function FeedbackPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/gop-y">
      <FeedbackPageShell />
    </AccountLayout>
  );
}
