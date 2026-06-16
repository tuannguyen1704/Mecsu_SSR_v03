import type { Metadata } from "next";
import { AccountLayout } from "@/features/account";
import { WishlistPageShell } from "@/features/wishlist";

export const metadata: Metadata = {
  title: "Danh sách yêu thích | Mecsu",
  description:
    "Theo dõi các sản phẩm bạn quan tâm và thêm nhanh vào giỏ hàng hoặc yêu cầu báo giá.",
};

export default function WishlistPage() {
  return (
    <AccountLayout activeHref="/tai-khoan/danh-sach">
      <WishlistPageShell />
    </AccountLayout>
  );
}
