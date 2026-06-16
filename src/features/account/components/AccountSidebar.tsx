"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut } from "lucide-react";
import { logout } from "@/features/auth";
import type { AccountNavigationSection, AccountUser } from "../types/account";
import { accountIconMap } from "./account-icons";

interface AccountSidebarProps {
  user: AccountUser;
  sections: AccountNavigationSection[];
  activeHref?: string;
  onClose?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function isActive(href: string, activeHref: string): boolean {
  if (activeHref === href) return true;
  if (href === "/tai-khoan") return false;
  return activeHref.startsWith(href + "/");
}

export function AccountSidebar({
  user,
  sections,
  activeHref = "/tai-khoan",
  onClose,
}: AccountSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const resolvedActiveHref = activeHref === "/tai-khoan" && pathname !== "/tai-khoan"
    ? pathname
    : activeHref;

  const handleLogout = async () => {
    await logout();
    onClose?.();
    router.push("/");
  };

  return (
    <aside className="overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="border-b border-[#E5EAF2] bg-[#163F78] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-lg font-bold text-white backdrop-blur">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-bold text-white">{user.name}</h3>
            <p className="truncate text-sm text-white/80">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="p-3">
        {sections.map((section) => (
          <div key={section.id} className="mb-3">
            <div className="px-4 py-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              {section.label}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = accountIconMap[item.icon];
                const active = isActive(item.href, resolvedActiveHref);

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                        active
                          ? "bg-[#163F78] text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`shrink-0 transition-transform duration-200 ${
                          active
                            ? "text-white"
                            : "text-slate-400 group-hover:scale-110 group-hover:text-slate-600"
                        }`}
                      />
                      <span className="truncate text-sm font-medium">{item.label}</span>
                      {active ? (
                        <ChevronRight size={14} className="ml-auto shrink-0 text-white/70" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="mt-4 border-t border-[#E5EAF2] pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-red-600 transition-all duration-200 hover:bg-red-50"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
