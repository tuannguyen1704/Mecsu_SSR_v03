import { mockAccountOrders } from "../data/account-orders";
import { OrdersListClient } from "./OrdersListClient";

export function OrdersPageShell() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
          Đơn hàng của tôi
        </h1>
        <p className="mt-1 text-slate-500">
          Theo dõi và quản lý đơn hàng của bạn.
        </p>
      </div>

      <OrdersListClient orders={mockAccountOrders} />
    </div>
  );
}
