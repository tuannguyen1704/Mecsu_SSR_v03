import type { Metadata } from "next";
import { CartPageClient } from "@/features/cart";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Xem và quản lý giỏ hàng.",
};

export default function CartPage() {
  return (
    <main>
      <CartPageClient />
    </main>
  );
}
