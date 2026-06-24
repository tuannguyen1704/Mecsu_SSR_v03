import type { ReactNode } from "react";
import {
  accountNavigationSections,
  mockAccountUser,
} from "../data/account-mock-data";
import { AccountMobileNav } from "./AccountMobileNav";
import { AccountSidebar } from "./AccountSidebar";

interface AccountLayoutProps {
  children: ReactNode;
  activeHref?: string;
}

export function AccountLayout({
  children,
  activeHref = "/tai-khoan",
}: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-[#EEF1F5]">
      <AccountMobileNav
        user={mockAccountUser}
        sections={accountNavigationSections}
        activeHref={activeHref}
      />

      <div className="mx-auto px-2 pt-1 pb-3 lg:px-3 lg:pt-2 lg:pb-4">
        <div className="flex items-start gap-4">
          <div className="sticky top-4 hidden max-h-[calc(100dvh-2rem)] w-[280px] shrink-0 self-start overflow-y-auto overscroll-contain pr-1 lg:block">
            <AccountSidebar
              user={mockAccountUser}
              sections={accountNavigationSections}
              activeHref={activeHref}
            />
          </div>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
