"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CheckCircle,
  DollarSign,
  Eye,
  HeadphonesIcon,
  Heart,
  Package,
  Phone,
  Receipt,
  Search,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useCart } from "@/features/cart";
import {
  accountOrderStatusLabels,
  mockAccountOrders,
} from "../data/account-orders";
import type { AccountOrderStatus } from "../types/account";
import { StatCard } from "./StatCard";

const moduleCards = [
  {
    title: "Địa chỉ giao hàng",
    description: "Quản lý địa chỉ giao hàng của bạn",
    href: "/tai-khoan/dia-chi",
    icon: Package,
    tone: "navy" as const,
  },
  {
    title: "Thanh toán",
    description: "Phương thức thanh toán và thông tin VAT",
    href: "/tai-khoan/thanh-toan",
    icon: CheckCircle,
    tone: "green" as const,
  },
  {
    title: "Bảo mật",
    description: "Đổi mật khẩu và bảo vệ tài khoản",
    href: "/tai-khoan/bao-mat",
    icon: CheckCircle,
    tone: "purple" as const,
  },
  {
    title: "Wishlist",
    description: "Danh sách sản phẩm yêu thích",
    href: "/tai-khoan/danh-sach",
    icon: Heart,
    tone: "red" as const,
  },
  {
    title: "Đổi trả",
    description: "Yêu cầu đổi trả sản phẩm",
    href: "/tai-khoan/doi-tra",
    icon: Package,
    tone: "yellow" as const,
  },
  {
    title: "Hỗ trợ",
    description: "Liên hệ và gửi ticket hỗ trợ",
    href: "/tai-khoan/ho-tro",
    icon: Phone,
    tone: "green" as const,
  },
  {
    title: "Email Marketing",
    description: "Cài đặt nhận email từ Mecsu",
    href: "/tai-khoan/marketing-email",
    icon: Search,
    tone: "purple" as const,
  },
] as const;

type QuickAction = {
  label: string;
  subtitle: string;
  href: string;
  icon: typeof Truck;
  variant: "primary" | "secondary";
};

const quickActions: QuickAction[] = [
  {
    label: "Theo dõi đơn hàng",
    subtitle: "Kiểm tra tình trạng giao hàng",
    href: "/tai-khoan/don-hang",
    icon: Truck,
    variant: "secondary",
  },
  {
    label: "Tải hóa đơn VAT",
    subtitle: "Xuất hóa đơn điện tử",
    href: "/tai-khoan/don-hang",
    icon: Receipt,
    variant: "secondary",
  },
  {
    label: "Nhắc hàng",
    subtitle: "Theo dõi sản phẩm có hàng",
    href: "/tai-khoan/nhac-hang",
    icon: BellRing,
    variant: "secondary",
  },
  {
    label: "Liên hệ hỗ trợ",
    subtitle: "Chat hoặc gửi ticket",
    href: "/dich-vu-khach-hang",
    icon: HeadphonesIcon,
    variant: "secondary",
  },
];

function parseVietnameseDate(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} đ`;
}

function formatCompactPrice(value: number) {
  if (value < 1_000_000) return formatPrice(value);

  return `${(value / 1_000_000).toLocaleString("vi-VN", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}tr`;
}

function getStatusTone(status: AccountOrderStatus) {
  if (status === "completed") return "bg-green-100 text-green-700";
  if (status === "cancelled") return "bg-red-100 text-red-700";
  if (status === "processing") return "bg-amber-100 text-amber-700";
  if (status === "shipping") return "bg-blue-100 text-blue-700";

  return "bg-slate-100 text-slate-700";
}

function readWishlistCount() {
  if (typeof window === "undefined") return 12;

  try {
    const raw = window.localStorage.getItem("mecsu-wishlist");
    if (!raw) return 12;
    const parsed = JSON.parse(raw) as unknown[];
    return Array.isArray(parsed) ? parsed.length : 12;
  } catch {
    return 12;
  }
}

export function AccountOverview() {
  const { addItem } = useCart();
  const [wishlistCount, setWishlistCount] = useState(12);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setWishlistCount(readWishlistCount());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const orders = useMemo(
    () =>
      [...mockAccountOrders].sort(
        (a, b) => parseVietnameseDate(b.orderDate) - parseVietnameseDate(a.orderDate),
      ),
    [],
  );
  const recentOrders = orders.slice(0, 3);
  const completedOrders = orders.filter((order) => order.status === "completed");
  const processingOrders = orders.filter((order) =>
    ["pending", "processing", "shipping"].includes(order.status),
  );
  const totalOrderValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const uniqueOrderItems = useMemo(() => {
    const seen = new Set<string>();
    return orders
      .flatMap((order) =>
        order.items.map((item) => ({
          ...item,
          orderDate: order.orderDate,
        })),
      )
      .filter((item) => {
        if (seen.has(item.sku)) return false;
        seen.add(item.sku);
        return true;
      })
      .slice(0, 4);
  }, [orders]);

  return (
    <div className="space-y-3">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Tài khoản của tôi
        </h1>
        <p className="text-slate-500 mt-1">
          Quản lý đơn hàng, nhắc hàng, địa chỉ giao hàng và thông tin doanh nghiệp.
        </p>
      </div>

      {/* Stats Overview Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Package}
          value={processingOrders.length}
          label="Đơn hàng đang xử lý"
          iconColor="yellow"
        />
        <StatCard
          icon={CheckCircle}
          value={completedOrders.length}
          label="Đơn hàng hoàn tất"
          iconColor="green"
        />
        <StatCard
          icon={Heart}
          value={wishlistCount}
          label="Sản phẩm yêu thích"
          iconColor="red"
        />
        <StatCard
          icon={DollarSign}
          value={formatCompactPrice(totalOrderValue)}
          label="Tổng giá trị đơn hàng"
          iconColor="blue"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <h2 className="mb-2 text-lg font-bold text-slate-900">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isPrimary = action.variant === "primary";

            return (
              <Link
                key={action.label}
                href={action.href}
                className={`
                  flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center
                  transition-all duration-300 group
                  ${isPrimary
                    ? "bg-[#163F78] border-[#163F78] hover:bg-[#1a4a8a]"
                    : "bg-white border-[#E5EAF2] hover:border-[#163F78]/30"
                  }
                `}
              >
                <div className={`
                  flex h-9 w-9 items-center justify-center rounded-full
                  transition-all duration-300 group-hover:scale-110
                  ${isPrimary
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600 group-hover:bg-[#163F78]/10 group-hover:text-[#163F78]"
                  }
                `}>
                  <Icon size={20} />
                </div>
                <div className="space-y-0">
                  <span className={`block text-sm font-medium line-clamp-2 ${isPrimary ? "text-white" : "text-slate-700"}`}>
                    {action.label}
                  </span>
                  {action.subtitle && (
                    <span className={`block text-[10px] line-clamp-1 ${isPrimary ? "text-white/70" : "text-slate-400"}`}>
                      {action.subtitle}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Đơn hàng gần đây</h2>
          <Link
            href="/tai-khoan/don-hang"
            className="flex items-center gap-1 text-sm font-medium text-[#163F78] transition-colors hover:text-[#1a4a8a]"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/tai-khoan/don-hang/${order.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E5EAF2] p-4 transition-all hover:border-[#163F78]/30 hover:bg-slate-50/60"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Package size={20} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">{order.orderCode}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${getStatusTone(order.status)}`}>
                      {accountOrderStatusLabels[order.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {order.orderDate} • {order.items.length} sản phẩm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-[#163F78]">
                  {formatPrice(order.totalAmount)}
                </span>
                <span
                  className="flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  <Eye size={16} />
                  Chi tiết
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Reorder */}
      <div className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Mua lại nhanh</h2>
          <Link
            href="/tai-khoan/don-hang?tab=reorder"
            className="flex items-center gap-1 text-sm font-medium text-[#163F78] transition-colors hover:text-[#1a4a8a]"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {uniqueOrderItems.map((item, index) => {
            const stockLevel = index === 0 ? 863 : index === 1 ? 50 : index === 2 ? 1500 : 2469;

            return (
              <article
                key={item.sku}
                className="group rounded-xl border border-[#E5EAF2] overflow-hidden transition-all duration-300 hover:border-[#163F78]/30"
              >
                <div className="aspect-square bg-slate-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-slate-200 rounded-lg" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        stockLevel > 100
                          ? "bg-green-100 text-green-600"
                          : stockLevel > 0
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {stockLevel > 0 ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="line-clamp-2 text-sm font-medium text-slate-900 transition-colors group-hover:text-[#163F78]">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">SKU: {item.sku}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-bold text-[#163F78]">Liên hệ</span>
                    <button
                      type="button"
                      disabled={stockLevel <= 0}
                      onClick={() =>
                        addItem(
                          {
                            id: item.sku,
                            name: item.name,
                            sku: item.sku,
                            price: 0,
                            image: "",
                            stock: stockLevel,
                            category: "",
                            brand: "",
                          },
                          1,
                        )
                      }
                      className="rounded-lg bg-[#FFC72C] p-2 transition-colors hover:bg-[#E8B931] disabled:cursor-not-allowed disabled:bg-slate-200"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingCart size={16} className="text-[#111827]" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Account Modules Grid */}
      <div className="rounded-md border border-[#E5EAF2] bg-white p-3 lg:p-4">
        <h2 className="mb-3 text-lg font-bold text-slate-900">Quản lý tài khoản</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moduleCards.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-xl border border-[#E5EAF2] bg-white p-4 transition-all duration-300 hover:border-[#163F78]/30"
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    module.tone === "navy"
                      ? "bg-[#163F78]/10 text-[#163F78]"
                      : module.tone === "yellow"
                        ? "bg-[#FFC72C]/20 text-[#B8941F]"
                        : module.tone === "green"
                          ? "bg-green-100 text-green-600"
                          : module.tone === "purple"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-red-100 text-red-600"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#163F78]">
                  {module.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{module.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
