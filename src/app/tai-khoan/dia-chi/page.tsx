import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { AddressesPageShell } from "@/features/addresses";

export const metadata: Metadata = {
  title: "Địa chỉ của tôi | Mecsu",
  description: "Quản lý địa chỉ giao hàng.",
};

export default function AddressesPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/dia-chi">
      <AddressesPageShell />
    </AccountLayout>
  );
}
