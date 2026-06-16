"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Package,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: "order" | "system" | "shipping" | "quotation";
  message: string;
  time: string;
  read: boolean;
  orderId?: string;
  icon?: string;
}

interface HeaderAccountMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  notifications: Notification[];
  accountLabel: string;
  onOpenChange: (open: boolean) => void;
  onLoginModalChange: (open: boolean) => void;
  onLogout: () => void;
  onCategoryClose: () => void;
}

type TabType = "all" | "order" | "quotation";

export default function HeaderAccountMenu({
  isOpen,
  isLoggedIn,
  notifications,
  accountLabel,
  onOpenChange,
  onLoginModalChange,
  onLogout,
  onCategoryClose,
}: HeaderAccountMenuProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "order") {
      return notification.type === "order" || notification.type === "shipping";
    }
    if (activeTab === "quotation") {
      return notification.type === "quotation" || notification.type === "system";
    }
    return true;
  });
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => {
          onCategoryClose();
          if (!isLoggedIn) {
            onOpenChange(false);
            onLoginModalChange(true);
            return;
          }
          onOpenChange(!isOpen);
        }}
        className="group flex items-center gap-4"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 shadow-sm transition-all group-hover:border-brand-primary group-hover:bg-slate-50">
          <User size={20} className="text-slate-500 group-hover:text-[#24465B]" />
        </div>
        <div className="hidden text-left leading-tight lg:block">
          <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
            {isLoggedIn ? accountLabel : "Đăng nhập"}
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && isLoggedIn && (
          <>
            <div className="fixed inset-0 z-[290]" onClick={() => onOpenChange(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-6 top-[72px] z-[300] flex max-h-[min(620px,calc(100vh-32px))] w-[380px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
            >
              <button
                className="mx-4 mt-4 flex min-h-14 items-center gap-3 rounded-[14px] border border-[#DCE7F5] bg-[#F8FAFC] px-4 py-3 transition-all hover:border-[#BFD4F2] hover:bg-[#EFF6FF]"
                onClick={() => {
                  onOpenChange(false);
                  router.push("/tai-khoan");
                }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[#6B7280]">
                  <User size={18} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[14px] font-bold leading-tight text-[#173E75]">
                    {accountLabel}
                  </p>
                  <p className="text-[12px] font-medium leading-tight text-[#6B7280]">
                    Xem trung tâm tài khoản
                  </p>
                </div>
                <ChevronRight size={16} className="shrink-0 text-[#173E75]" />
              </button>

              <div className="flex items-center justify-between px-5 pb-3 pt-4">
                <h3 className="text-[18px] font-bold leading-tight text-[#111827]">
                  Thông báo
                </h3>
                {unreadCount > 0 && (
                  <button className="text-[13px] font-medium text-[#2563EB] hover:text-[#1D4ED8]">
                    Đánh dấu đã đọc tất cả
                  </button>
                )}
              </div>

              <div className="flex gap-2 px-5 pb-3">
                {(["all", "order", "quotation"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-md border px-3 py-1.5 text-[13px] font-medium transition-all ${
                      activeTab === tab
                        ? "border-[#173E75] bg-[#173E75] text-white"
                        : "border-[#CBD5E1] bg-white text-[#475569] hover:border-[#94A3B8]"
                    }`}
                  >
                    {tab === "all" ? "Tất cả" : tab === "order" ? "Đơn hàng" : "Báo giá"}
                  </button>
                ))}
              </div>

              <div className="flex h-[360px] shrink-0 flex-col overflow-y-auto px-3">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => {
                    const Icon =
                      notification.type === "shipping" || notification.icon === "success"
                        ? CheckCircle2
                        : notification.type === "quotation"
                          ? FileText
                          : notification.type === "order"
                            ? Package
                            : Bell;
                    return (
                      <button
                        key={notification.id}
                        onClick={() => {
                          if (notification.orderId) {
                            router.push(`/tai-khoan/don-hang/${notification.orderId}`);
                            onOpenChange(false);
                          }
                        }}
                        className={`mb-2 flex gap-3 rounded-md border border-[#F1F5F9] py-4 text-left transition-colors hover:bg-[#F8FAFC] ${
                          !notification.read ? "bg-[#F8FBFF]" : ""
                        }`}
                      >
                        <div className="ml-3 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#ECFDF3]">
                          <Icon size={18} color="#16A34A" />
                        </div>
                        <div className="min-w-0 flex-1 pr-3">
                          {!notification.read && (
                            <span className="mb-0.5 inline-block h-2 w-2 rounded-full bg-[#173E75]" />
                          )}
                          <p className="text-[13px] leading-[18px] text-[#374151]">
                            {notification.message}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="text-[12px] text-[#94A3B8]">
                              {notification.time}
                            </span>
                            {notification.orderId && (
                              <span className="text-[12px] font-semibold text-[#2563EB]">
                                Xem chi tiết
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                      <Bell size={36} className="mx-auto mb-3 text-[#E5E7EB]" />
                      <p className="text-[13px] font-medium text-[#94A3B8]">
                        Không có thông báo nào
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-[#E5E7EB]">
                <button
                  onClick={() => {
                    onOpenChange(false);
                    onLogout();
                  }}
                  className="h-12 w-full border-b border-[#E5E7EB] text-[14px] font-bold text-red-600 transition-colors hover:bg-red-50"
                >
                  Đăng xuất
                </button>
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-14 w-full text-[15px] font-bold text-[#173E75] transition-colors hover:bg-[#F8FAFC]"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
