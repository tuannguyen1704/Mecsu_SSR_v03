"use client";

import { CalendarDays, Clock3, MailCheck, ShieldCheck } from "lucide-react";
import {
  formatDate,
  formatDateTime,
  mockUserProfile,
} from "../data/account-profile";

const statusCardBaseClass =
  "rounded-xl border border-[#E5EAF2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5";

export function AccountSecurityStatusSection() {
  const user = mockUserProfile;

  const statusItems = [
    {
      label: "Email xác thực",
      value: user.security.emailConfirmed ? "Đã xác thực" : "Chưa xác thực",
      icon: MailCheck,
    },
    {
      label: "Loại tài khoản",
      value: user.security.customerGroup,
      icon: ShieldCheck,
    },
    {
      label: "Ngày tham gia",
      value: formatDate(user.security.createdAt),
      icon: CalendarDays,
    },
    {
      label: "Đăng nhập gần nhất",
      value: formatDateTime(user.security.lastSignInAt),
      icon: Clock3,
    },
  ];

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Bảo mật & Trạng thái tài khoản
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className={statusCardBaseClass}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F3F7FC] text-[#163F78]">
                <Icon size={20} />
              </div>
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
