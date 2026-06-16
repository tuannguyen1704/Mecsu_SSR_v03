import { getSeededPlaceholder } from "@/lib/image-placeholders";
import {
  accountOrderStatusLabels,
  mockAccountOrders,
} from "../data/account-orders";
import type {
  AccountOrder,
  AccountOrderDetail,
  AccountOrderStatus,
  AccountOrderTimelineStep,
} from "../types/account";

const customerProfiles = [
  {
    name: "Nguyễn Văn A",
    phone: "0900 000 000",
    address: "123 Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM",
  },
  {
    name: "Trần Minh Khang",
    phone: "0912 345 678",
    address: "Khu công nghiệp Tân Bình, Phường Tây Thạnh, Quận Tân Phú, TP.HCM",
  },
  {
    name: "Lê Hoàng Nam",
    phone: "0988 120 456",
    address: "Số 45 Quốc lộ 13, Phường Hiệp Bình Phước, TP. Thủ Đức, TP.HCM",
  },
];

const timelineOrder: AccountOrderStatus[] = [
  "pending",
  "processing",
  "shipping",
  "completed",
];

const timelineStepLabels: Record<AccountOrderStatus, string> = {
  pending: "Đã xác nhận",
  processing: "Đang xử lý",
  shipping: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const timelineDescriptions: Record<AccountOrderStatus, string> = {
  pending: "Đơn hàng đã được ghi nhận và chờ xác nhận cuối.",
  processing: "Kho MECsu đang chuẩn bị và kiểm tra sản phẩm.",
  shipping: "Đơn hàng đã bàn giao cho đơn vị vận chuyển.",
  completed: "Đơn hàng đã giao thành công.",
  cancelled: "Đơn hàng đã được hủy theo yêu cầu hoặc hết hiệu lực.",
};

function parseVietnameseDate(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: string, days: number) {
  const parsedDate = parseVietnameseDate(date);
  parsedDate.setDate(parsedDate.getDate() + days);

  return parsedDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrencyBase(value: number) {
  return Math.round(value / 1000) * 1000;
}

function buildTimeline(order: AccountOrder): AccountOrderTimelineStep[] {
  if (order.status === "cancelled") {
    return [
      {
        id: "cancelled",
        label: timelineStepLabels.cancelled,
        date: addDays(order.orderDate, 1),
        description: timelineDescriptions.cancelled,
        completed: true,
        active: true,
      },
    ];
  }

  const activeIndex = timelineOrder.indexOf(order.status);

  return timelineOrder.map((status, index) => {
    const dateValue = index <= activeIndex ? addDays(order.orderDate, index) : "--";
    const timestampValue =
      index <= activeIndex
        ? new Date(
            new Date().setHours(
              8 + index * 3,
              (index * 15) % 60,
              Math.floor(Math.random() * 60),
              0
            )
          ).toISOString()
        : undefined;

    return {
      id: status,
      label: timelineStepLabels[status],
      date: dateValue,
      timestamp: timestampValue,
      description: timelineDescriptions[status],
      completed: index < activeIndex || order.status === "completed",
      active: index === activeIndex,
    };
  });
}

function hydrateLineItems(order: AccountOrder, subtotal: number) {
  const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);
  const fallbackUnitPrice = Math.max(1000, formatCurrencyBase(subtotal / totalQuantity));

  return order.items.map((item, index) => ({
    ...item,
    image: item.image ?? getSeededPlaceholder(item.name),
    unitPrice: item.unitPrice ?? fallbackUnitPrice + index * 1500,
  }));
}

export function getAllAccountOrders() {
  return mockAccountOrders;
}

export function getAccountOrderById(orderId: string) {
  return mockAccountOrders.find(
    (order) => order.id === orderId || order.orderCode === orderId,
  );
}

export function getAccountOrderDetail(orderId: string): AccountOrderDetail | null {
  const order = getAccountOrderById(orderId);

  if (!order) {
    return null;
  }

  const profile =
    customerProfiles[
      mockAccountOrders.findIndex((mockOrder) => mockOrder.id === order.id) %
        customerProfiles.length
    ];
  const shippingFee = order.totalAmount >= 5000000 ? 0 : 45000;
  const grandTotal = order.totalAmount;
  const subtotal = Math.max(0, formatCurrencyBase((grandTotal - shippingFee) / 1.1));
  const vat = Math.max(0, grandTotal - subtotal - shippingFee);

  return {
    ...order,
    items: hydrateLineItems(order, subtotal),
    estimatedDeliveryDate:
      order.status === "completed" || order.status === "cancelled"
        ? addDays(order.orderDate, 3)
        : addDays(order.orderDate, 5),
    paymentMethod:
      order.status === "pending" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng (COD)",
    paymentStatus: order.status === "cancelled" ? "Đã hủy" : "Đã thanh toán",
    shippingMethod: order.status === "shipping" ? "Giao hàng nhanh" : "Giao tiêu chuẩn",
    customerName: profile.name,
    customerPhone: profile.phone,
    shippingAddress: profile.address,
    subtotal,
    shippingFee,
    vat,
    grandTotal,
    timeline: buildTimeline(order),
    transactionCode:
      order.status === "cancelled" ? undefined : `TXN-${order.orderCode.replace("ORD-", "")}`,
  };
}

export function getAccountOrderStaticParams() {
  return mockAccountOrders.map((order) => ({
    orderId: order.id,
  }));
}

export function getAccountOrderStatusLabel(status: AccountOrderStatus) {
  return accountOrderStatusLabels[status];
}
