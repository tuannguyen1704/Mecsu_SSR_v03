"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  Download,
  Edit,
  FileCheck,
  FileText,
  Headphones,
  HelpCircle,
  History,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Quote,
  RefreshCw,
  Search,
  Send,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { Breadcrumb as SharedBreadcrumb } from "@/components/shared/Breadcrumb";
import { Toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { publicFaqCategories } from "../data/public-support-data";

type ToastState = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
};

const iconMap = {
  package: Package,
  history: History,
  "file-check": FileCheck,
  "help-circle": HelpCircle,
  refresh: RefreshCw,
  edit: Edit,
  download: Download,
  headphones: Headphones,
  "file-text": FileText,
  quote: Quote,
  building: Building2,
  truck: Truck,
  wrench: Wrench,
  clipboard: ClipboardList,
};

interface ActionCardProps {
  iconKey: keyof typeof iconMap;
  title: string;
  href?: string;
  highlighted?: boolean;
  onClick?: () => void;
}

function Breadcrumb() {
  return (
    <SharedBreadcrumb
      items={[
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ khách hàng" },
      ]}
    />
  );
}

function ActionCard({
  iconKey,
  title,
  href,
  highlighted,
  onClick,
}: ActionCardProps) {
  const Icon = iconMap[iconKey];
  const className = cn(
    "group relative flex min-h-[76px] cursor-pointer items-center gap-3 rounded-lg border bg-white p-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm",
    highlighted
      ? "border-[#163F78]/40 bg-gradient-to-r from-[#163F78]/5 to-transparent hover:border-[#163F78]/60"
      : "border-slate-200 hover:border-[#163F78]/40 hover:bg-blue-50/30",
  );
  const content = (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors",
          highlighted
            ? "bg-[#163F78]/10 text-[#163F78]"
            : "bg-slate-100 text-slate-500 group-hover:bg-[#163F78]/10 group-hover:text-[#163F78]",
        )}
      >
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <span
        className={cn(
          "text-[13px] font-semibold leading-tight transition-colors",
          highlighted
            ? "text-[#163F78]"
            : "text-slate-600 group-hover:text-slate-800",
        )}
      >
        {title}
      </span>
      <ChevronRight
        size={16}
        className="ml-auto text-slate-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function TopicCard({
  title,
  questions,
  iconKey,
  href,
}: {
  title: string;
  questions: string[];
  iconKey: keyof typeof iconMap;
  href: string;
}) {
  const Icon = iconMap[iconKey];

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-150 hover:border-slate-300 hover:shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-[#163F78]">
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <h3 className="text-[13px] font-bold text-slate-700">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <ul className="mb-3 flex flex-col gap-2">
          {questions.map((question) => (
            <li key={question}>
              <Link
                href={href}
                className="group flex items-start gap-2 text-[12px] text-slate-500 transition-colors hover:text-[#163F78]"
              >
                <span className="mt-0.5 shrink-0 text-slate-300 group-hover:text-[#163F78]/50">
                  •
                </span>
                <span>{question}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-[12px] font-semibold text-[#163F78] transition-colors hover:text-[#0F2F5C]"
        >
          Xem tất cả
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

function BenefitCard({
  iconKey,
  title,
  description,
}: {
  iconKey: keyof typeof iconMap;
  title: string;
  description: string;
}) {
  const Icon = iconMap[iconKey];

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#163F78]/30 hover:shadow-md">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-[#163F78]/10 text-[#163F78]">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 className="mb-1.5 text-[13px] font-bold leading-snug text-slate-800">
        {title}
      </h3>
      <p className="text-[12px] leading-relaxed text-slate-500">
        {description}
      </p>
    </article>
  );
}

export function PublicCustomerServicePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const showInfo = (message: string) => {
    setToast({ show: true, message, type: "info" });
  };

  const scrollToContact = () => {
    document
      .getElementById("mecsu-public-contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/faqs?search=${encodeURIComponent(query)}`);
  };

  const highlightedActions: ActionCardProps[] = [
    {
      iconKey: "package",
      title: "Theo dõi đơn hàng",
      href: "/tai-khoan/don-hang",
      highlighted: true,
    },
    {
      iconKey: "quote",
      title: "Yêu cầu báo giá",
      href: "/dich-vu-khach-hang",
      highlighted: true,
    },
    {
      iconKey: "refresh",
      title: "Đổi/trả hàng",
      href: "/tai-khoan/doi-tra",
      highlighted: true,
    },
  ];

  const actionCards: ActionCardProps[] = [
    { iconKey: "history", title: "Lịch sử mua hàng", href: "/tai-khoan/don-hang" },
    {
      iconKey: "help-circle",
      title: "Hỗ trợ sản phẩm",
      href: "/faqs/thong-tin-san-pham",
    },
    { iconKey: "edit", title: "Hủy/chỉnh sửa đơn", href: "/tai-khoan/don-hang" },
    { iconKey: "download", title: "Tải hóa đơn", href: "/tai-khoan/don-hang" },
    {
      iconKey: "headphones",
      title: "Tư vấn kỹ thuật",
      href: "/faqs/tu-van-ky-thuat",
    },
  ];

  const benefitCards = [
    {
      iconKey: "quote" as const,
      title: "Báo giá nhanh cho đơn lớn",
      description:
        "Gửi danh sách mã hàng, Mecsu hỗ trợ báo giá phù hợp cho doanh nghiệp.",
    },
    {
      iconKey: "file-check" as const,
      title: "Hóa đơn VAT & chứng từ",
      description:
        "Hỗ trợ xuất hóa đơn và lưu trữ chứng từ mua hàng đầy đủ.",
    },
    {
      iconKey: "wrench" as const,
      title: "Tư vấn chọn sản phẩm",
      description:
        "Kiểm tra thông số, quy cách, vật liệu và mã tương đương.",
    },
    {
      iconKey: "package" as const,
      title: "Theo dõi đơn rõ ràng",
      description:
        "Dễ dàng kiểm tra trạng thái xử lý, giao hàng và lịch sử mua.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <div className="mb-4">
            <Breadcrumb />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
            <div className="min-w-0 flex-1">
              <h1 className="mb-1.5 text-2xl font-bold tracking-tight text-slate-900 lg:text-[26px]">
                Dịch vụ khách hàng
              </h1>
              <p className="max-w-2xl text-[13px] leading-snug text-slate-500">
                Mecsu hỗ trợ bạn từ tìm sản phẩm, đặt hàng, thanh toán đến giao
                hàng và đổi trả.
              </p>
            </div>

            <form onSubmit={handleSearch} className="w-full shrink-0 lg:w-[360px]">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm kiếm trong trung tâm hỗ trợ Mecsu..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-[13px] text-slate-700 placeholder:text-slate-400 transition-all focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/15 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-6 lg:py-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-[15px] font-bold tracking-tight text-slate-800 uppercase lg:text-base">
            Bạn muốn thực hiện việc gì?
          </h2>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {highlightedActions.map((card) => (
              <ActionCard key={card.title} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {actionCards.map((card) => (
              <ActionCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/60 py-6 lg:py-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-[15px] font-bold tracking-tight text-slate-800 uppercase lg:text-base">
            Chủ đề hỗ trợ
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {publicFaqCategories.map((category) => (
              <TopicCard
                key={category.id}
                title={category.name}
                iconKey={category.iconKey as keyof typeof iconMap}
                href={`/faqs/${category.id}`}
                questions={category.faqs.slice(0, 2).map((faq) => faq.question)}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="mecsu-public-contact"
        className="bg-gradient-to-br from-[#163F78] to-[#1a4a8a] py-8 lg:py-10"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Users size={20} className="text-[#FFC72C]" />
                </span>
                <h2 className="text-xl font-bold tracking-tight text-white lg:text-[22px]">
                  Hỗ trợ từ đội ngũ Mecsu
                </h2>
              </div>
              <p className="max-w-lg text-[13px] leading-relaxed text-white/70">
                Mecsu hỗ trợ bạn từ tìm đúng mã sản phẩm, kiểm tra thông số kỹ
                thuật, báo giá số lượng lớn đến xử lý đơn hàng và đổi trả.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                  <BadgeCheck size={14} />
                  Đội ngũ chuyên nghiệp
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white">
                  <CalendarClock size={14} />
                  Phản hồi nhanh
                </span>
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[340px]">
              <div className="rounded-xl bg-white p-5 shadow-xl">
                <h3 className="mb-4 flex items-center gap-2 text-[14px] font-bold text-slate-900">
                  <Headphones size={18} className="text-[#163F78]" />
                  Liên hệ Mecsu
                </h3>
                <div className="mb-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => showInfo("Kênh chat sẽ được kết nối trong phase backend.")}
                    className="group flex items-center gap-3 rounded-lg bg-blue-50 p-2.5 text-left transition-colors hover:bg-blue-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#163F78]/10 text-[#163F78]">
                      <MessageCircle size={16} />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold text-slate-800">
                        Chat với tư vấn viên
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Phản hồi trong vài phút
                      </span>
                    </span>
                  </button>

                  <a
                    href="tel:18008137"
                    className="group flex items-center gap-3 rounded-lg bg-blue-50 p-2.5 transition-colors hover:bg-blue-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#163F78]/10 text-[#163F78]">
                      <Phone size={16} />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold text-slate-800">
                        Gọi hotline
                      </span>
                      <span className="text-[13px] font-bold text-[#163F78]">
                        1800 8137
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:support@mecsu.vn"
                    className="group flex items-center gap-3 rounded-lg bg-blue-50 p-2.5 transition-colors hover:bg-blue-100"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#163F78]/10 text-[#163F78]">
                      <Mail size={16} />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold text-slate-800">
                        Gửi email hỗ trợ
                      </span>
                      <span className="text-[13px] font-bold text-[#163F78]">
                        support@mecsu.vn
                      </span>
                    </span>
                  </a>
                </div>

                <div className="border-t border-slate-200 pt-4 text-[12px] text-slate-700">
                  <div className="mb-2 flex items-start gap-2">
                    <CalendarClock size={14} className="mt-0.5 text-slate-400" />
                    <div>
                      <div className="mb-0.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                        Thời gian hỗ trợ
                      </div>
                      <div>Thứ 2 - Thứ 6, 8:00 - 17:30</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-slate-500">
                    <CalendarClock size={14} className="mt-0.5 text-slate-400" />
                    <div>
                      <div className="mb-0.5 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                        Ngoài giờ làm việc
                      </div>
                      <div>Gửi yêu cầu, Mecsu phản hồi sớm nhất</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-6 lg:py-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-5 text-center">
            <h2 className="mb-2 text-[15px] font-bold tracking-tight text-slate-800 uppercase lg:text-base">
              Lợi ích cho khách hàng doanh nghiệp
            </h2>
            <p className="mx-auto max-w-lg text-[13px] text-slate-500">
              Mecsu đồng hành cùng doanh nghiệp tối ưu quy trình mua sắm vật tư
              công nghiệp.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefitCards.map((card) => (
              <BenefitCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-6 lg:py-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-50">
              <HelpCircle size={22} className="text-[#FFC72C]" />
            </span>
            <h2 className="mb-2 text-[15px] font-bold tracking-tight text-slate-900 lg:text-base">
              Chưa tìm thấy câu trả lời?
            </h2>
            <p className="mb-5 text-[13px] leading-snug text-slate-500">
              Gửi yêu cầu hỗ trợ, đội ngũ Mecsu sẽ liên hệ xử lý cho bạn.
            </p>
            <div className="flex flex-col justify-center gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C55A2B] px-6 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#a84a22]"
              >
                <Send size={14} />
                Gửi yêu cầu hỗ trợ
              </button>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-[13px] font-semibold text-slate-600 transition-colors hover:border-[#163F78] hover:text-[#163F78]"
              >
                <BookOpen size={14} />
                Xem câu hỏi thường gặp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {toast.show ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((current) => ({ ...current, show: false }))}
        />
      ) : null}
    </div>
  );
}
