"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { AccountNavigationSection, AccountUser } from "../types/account";
import { AccountSidebar } from "./AccountSidebar";

interface AccountMobileNavProps {
  user: AccountUser;
  sections: AccountNavigationSection[];
  activeHref?: string;
}

export function AccountMobileNav({
  user,
  sections,
  activeHref,
}: AccountMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="sticky top-20 z-30 border-b border-[#E5EAF2] bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="-ml-2 rounded-lg p-2 transition-colors hover:bg-slate-100"
            aria-label="Mở menu tài khoản"
          >
            <Menu size={24} className="text-slate-700" />
          </button>
          <Link href="/tai-khoan" className="font-bold text-[#163F78]">
            Tài khoản
          </Link>
          <div className="w-10" />
        </div>
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Đóng menu tài khoản"
            className="fixed inset-0 z-[520] bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <aside
            className="fixed inset-y-0 left-0 z-[521] w-[280px] border-r border-slate-200 bg-white"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-[#E5EAF2] p-4">
              <span className="font-bold text-[#163F78]">Tài khoản</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition-colors hover:bg-slate-100"
                aria-label="Đóng menu tài khoản"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            <div onClick={() => setIsOpen(false)}>
              <AccountSidebar user={user} sections={sections} activeHref={activeHref} />
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
