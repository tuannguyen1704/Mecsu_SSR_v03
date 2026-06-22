"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Factory, Menu } from "lucide-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AUTH_STATE_CHANGED_EVENT,
  getCurrentUser,
  logout,
} from "@/features/auth/services/mock-auth-service";
import type { MockAuthUser } from "@/features/auth/types/auth";
import type { HeaderCategory } from "@/features/categories/data/header-categories";
import { useCart } from "@/features/cart";
import type { SearchSuggestionItem } from "@/features/products/services/search-products";
import {
  CATEGORY_MENU_OPEN_EVENT,
  PROMOTION_PANEL_OPEN_EVENT,
} from "@/features/promotions/events";
import HeaderAccountMenu from "./HeaderAccountMenu";
import HeaderCartButton from "./HeaderCartButton";
import HeaderSearch from "./HeaderSearch";
import MobileHeader from "./MobileHeader";

const AuthModal = dynamic(
  () => import("@/features/auth/components/AuthModal"),
  { ssr: false },
);

const HeaderCategoryMenu = dynamic(() => import("./HeaderCategoryMenu"), {
  ssr: false,
});

interface HeaderClientProps {
  categories: HeaderCategory[];
  locations: string[];
  suggestions: SearchSuggestionItem[];
}

const mockNotifications = [
  {
    id: "2",
    type: "shipping" as const,
    message:
      "Đơn hàng 01175S2509001043 vừa được giao thành công. Cảm ơn bạn đã đặt hàng tại Mecsu.",
    time: "2 tháng trước",
    read: true,
    icon: "success",
  },
];

export default function HeaderClient({
  categories,
  locations,
  suggestions,
}: HeaderClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const pathSegments = pathname.split("/").filter(Boolean);
  const isSubcategoryPage =
    pathSegments[0] === "danh-muc" && pathSegments.length >= 3;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [mockUser, setMockUser] = useState<MockAuthUser | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomepageSearchSticky, setIsHomepageSearchSticky] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    locations[0] ?? "TP. Hồ Chí Minh",
  );
  const { totalProducts, subtotal } = useCart();
  const isMockLoggedIn = Boolean(mockUser);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMockUser(getCurrentUser());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleAuthStateChanged = () => {
      setMockUser(getCurrentUser());
      setIsProfileOpen(false);
    };

    window.addEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthStateChanged);

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthStateChanged);
    };
  }, []);

  const isAccountPage = pathname.startsWith("/tai-khoan");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const searchElement = document.querySelector("[data-home-hero-search]");

    if (!searchElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setIsHomepageSearchSticky(!entries[0]?.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(searchElement);

    return () => {
      observer.disconnect();
    };
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow =
      isCategoryOpen || isMobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCategoryOpen, isMobileOpen]);

  useEffect(() => {
    const handlePromotionPanelOpen = () => {
      setIsCategoryOpen(false);
    };

    window.addEventListener(PROMOTION_PANEL_OPEN_EVENT, handlePromotionPanelOpen);

    return () => {
      window.removeEventListener(
        PROMOTION_PANEL_OPEN_EVENT,
        handlePromotionPanelOpen,
      );
    };
  }, []);

  const headerPosition = isAccountPage ? "relative" : isSubcategoryPage ? "relative" : "sticky top-0";

  return (
    <header
      className={`z-[300] flex w-full flex-col ${headerPosition}`}
    >
      <div
        className={`border-b border-slate-200 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-sm xl:backdrop-blur-md"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-3 sm:gap-4 sm:px-4 xl:h-20 xl:gap-12 xl:px-12">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/mecsu-sologan.png"
              alt="MECSU Logo"
              width={178}
              height={64}
              priority
              className="h-12 w-auto max-w-[132px] object-contain sm:h-14 sm:max-w-[154px] xl:h-16 xl:max-w-none"
            />
          </Link>

          <button
            onClick={() => {
              if (!isCategoryOpen) {
                window.dispatchEvent(new Event(CATEGORY_MENU_OPEN_EVENT));
              }

              setIsCategoryOpen((open) => !open);
            }}
            className="group relative hidden h-12 shrink-0 items-center gap-4 overflow-hidden rounded-md bg-[#163F78] px-6 text-[13px] font-bold tracking-widest text-white shadow-md transition-all hover:brightness-110 xl:flex"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <Menu
              size={20}
              className="text-brand-primary"
            />
            Danh mục
            <ChevronDown
              size={16}
              className="shrink-0"
            />
          </button>

          <div className="hidden flex-1 items-center xl:flex">
            {isHomePage ? (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={
                    isHomepageSearchSticky ? "w-full" : "hidden w-full"
                  }
                >
                  <HeaderSearch suggestions={suggestions} />
                </motion.div>
                <div className={isHomepageSearchSticky ? "hidden" : "block"}>
                  <TrustBadges />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <HeaderSearch suggestions={suggestions} />
              </motion.div>
            )}
          </div>

          <nav className="ml-auto hidden items-center gap-10 xl:flex">
            <HeaderAccountMenu
              isOpen={isProfileOpen}
              isLoggedIn={isMockLoggedIn}
              notifications={mockNotifications}
              accountLabel={mockUser?.fullName ?? "Tài khoản"}
              onCategoryClose={() => setIsCategoryOpen(false)}
              onLoginModalChange={setIsLoginModalOpen}
              onLogout={async () => {
                await logout();
                setIsProfileOpen(false);
                setMockUser(null);
                router.push("/");
              }}
              onOpenChange={setIsProfileOpen}
            />
            <HeaderCartButton cartCount={totalProducts} cartTotal={subtotal} />
          </nav>

          <MobileHeader
            categories={categories}
            cartCount={totalProducts}
            isOpen={isMobileOpen}
            suggestions={suggestions}
            onAccountClick={() => {
              if (isMockLoggedIn) {
                router.push("/tai-khoan");
                return;
              }
              setIsLoginModalOpen(true);
            }}
            onOpenChange={setIsMobileOpen}
          />
        </div>
      </div>

      {isCategoryOpen ? (
        <HeaderCategoryMenu
          categories={categories}
          isOpen={isCategoryOpen}
          locations={locations}
          selectedLocation={selectedLocation}
          onClose={() => setIsCategoryOpen(false)}
          onLocationChange={setSelectedLocation}
        />
      ) : null}
      {isLoginModalOpen ? (
        <AuthModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={(user) => {
            setMockUser(user);
            setIsProfileOpen(false);
          }}
        />
      ) : null}
    </header>
  );
}

function TrustBadges() {
  return (
    <div className="flex items-center gap-10 border-l border-slate-200 pl-10">
      <TrustBadge icon="iso" title="Chuẩn ISO/DIN" subtitle="100% Chính hãng" />
      <TrustBadge
        icon="factory"
        title="Sẵn kho cực lớn"
        subtitle="Giao hỏa tốc 2h"
      />
    </div>
  );
}

function TrustBadge({
  icon,
  title,
  subtitle,
}: {
  icon: "iso" | "factory";
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          icon === "iso" ? "bg-blue-50" : "bg-amber-50"
        }`}
      >
        {icon === "iso" ? (
          <CheckCircle2 size={18} className="text-[#24465B]" />
        ) : (
          <Factory size={18} className="text-brand-primary" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-bold tracking-tight text-slate-800">
          {title}
        </span>
        <span className="text-[10px] font-medium tracking-widest text-slate-400">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
