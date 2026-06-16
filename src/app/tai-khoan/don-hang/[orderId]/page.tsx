import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountLayout, OrderDetailPageShell } from "@/features/account";
import {
  getAccountOrderDetail,
  getAccountOrderStaticParams,
} from "@/features/account/services/account-order-service";

interface OrderDetailRouteProps {
  params: Promise<{
    orderId: string;
  }>;
}

export function generateStaticParams() {
  return getAccountOrderStaticParams();
}

export async function generateMetadata({
  params,
}: OrderDetailRouteProps): Promise<Metadata> {
  const { orderId } = await params;
  const order = getAccountOrderDetail(orderId);

  if (!order) {
    return {
      title: "Không tìm thấy đơn hàng",
    };
  }

  return {
    title: `Chi tiết đơn hàng ${order.orderCode}`,
    description: "Theo dõi trạng thái và thông tin chi tiết đơn hàng.",
  };
}

export default async function OrderDetailPage({ params }: OrderDetailRouteProps) {
  const { orderId } = await params;
  const order = getAccountOrderDetail(orderId);

  if (!order) {
    notFound();
  }

  return (
    <AccountLayout activeHref="/tai-khoan/don-hang">
      <OrderDetailPageShell order={order} />
    </AccountLayout>
  );
}
