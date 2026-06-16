import type { Metadata } from "next";
import { CheckoutPageClient } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Hoàn tất đơn hàng của bạn.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-[#f6f8fb] px-4 py-6 lg:px-12 lg:py-8">
      <div className="mx-auto max-w-[1440px]">
        <CheckoutPageClient />
      </div>
    </main>
  );
}
