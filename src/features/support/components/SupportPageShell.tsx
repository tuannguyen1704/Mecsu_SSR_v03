"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  MessageCircle,
  Phone,
  Search,
  SendHorizonal,
  ShieldCheck,
  Ticket,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type FaqCategory,
  type SupportRequestFormData,
  type SupportFormErrors,
  type QuickSupportChannel,
  type FaqItem,
  type PolicyItem,
  requestTypeOptions,
  initialSupportFormData,
} from "../types/support";
import {
  faqCategories,
  faqItems,
  policyItems,
  quickSupportChannels,
  heroSupportTags,
} from "../data/support-data";

// Icon resolver
function resolveIcon(iconKey: string) {
  const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    "phone": Phone,
    "message-circle": MessageCircle,
    "ticket": Ticket,
    "mail": Mail,
    "shield-check": ShieldCheck,
    "check-circle-2": CheckCircle2,
    "truck": Truck,
  };
  return icons[iconKey] ?? Ticket;
}

// Get button style for channel
function getChannelButtonClasses(channelId: string) {
  if (channelId === "ticket") {
    return "bg-[#173E75] text-white hover:bg-[#0F2F5C]";
  }
  return "bg-[#F7FAFC] text-[#173E75] hover:bg-[#EAF2FB]";
}

// Hero section with gradient + search
function SupportHero({
  searchQuery,
  onSearchChange,
  onSearch,
}: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-gradient-to-r from-[#173E75] to-[#245A9C] px-5 py-4 text-white shadow-[0_20px_50px_rgba(23,62,117,0.18)] sm:px-6 lg:px-8 lg:py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Left content */}
        <div className="lg:col-span-7">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
              Trung tâm hỗ trợ
            </span>
            <div className="space-y-3">
              <h2 className="max-w-xl text-[28px] font-bold leading-tight text-white sm:text-[32px] lg:text-[38px]">
                Trung tâm hỗ trợ khách hàng
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-white/78 sm:text-[15px] lg:text-base">
                MECSU luôn sẵn sàng hỗ trợ báo giá, đơn hàng, vận chuyển và
                chính sách mua hàng.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {heroSupportTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/92"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right search box */}
        <div className="lg:col-span-5">
          <div className="rounded-[20px] border border-white/12 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
            <div className="rounded-[16px] bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearch();
                    }}
                    placeholder="Tìm kiếm câu hỏi, mã đơn hàng, báo giá…"
                    className="h-12 w-full rounded-[14px] border border-[#E3EAF3] bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-[#173E75] focus:outline-none focus:ring-2 focus:ring-[#173E75]/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={onSearch}
                  className="inline-flex h-12 min-w-[130px] items-center justify-center rounded-[14px] bg-[#F6C343] px-5 text-sm font-semibold text-[#173E75] transition-colors hover:bg-[#f0bb31]"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Quick support channels
function QuickSupportChannels({
  channels,
  onChannelClick,
}: {
  channels: QuickSupportChannel[];
  onChannelClick: (id: string) => void;
}) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {channels.map((channel) => {
        const Icon = resolveIcon(channel.iconKey);

        return (
          <article
            key={channel.id}
            className="group rounded-[18px] border border-[#E3EAF3] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]"
          >
            <div className="flex h-full flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF2FB] text-[#173E75]">
                  <Icon size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-[#0F172A]">
                    {channel.title}
                  </h3>
                  <p className="text-sm leading-5 text-[#64748B]">
                    {channel.description}
                  </p>
                </div>
              </div>

              {channel.href ? (
                <a
                  href={channel.href}
                  target={channel.id === "zalo" ? "_blank" : undefined}
                  rel={channel.id === "zalo" ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group inline-flex w-fit items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    getChannelButtonClasses(channel.id)
                  )}
                >
                  <span>{channel.buttonLabel}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onChannelClick(channel.id)}
                  className={cn(
                    "group inline-flex w-fit items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    getChannelButtonClasses(channel.id)
                  )}
                >
                  <span>{channel.buttonLabel}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

// FAQ Accordion
function FaqSection({
  items,
  categories,
  activeCategory,
  expandedId,
  onCategoryChange,
  onToggle,
}: {
  items: FaqItem[];
  categories: { id: FaqCategory; label: string }[];
  activeCategory: FaqCategory;
  expandedId: string;
  onCategoryChange: (id: FaqCategory) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-[20px] border border-[#E5EAF2] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] lg:text-xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#64748B]">
            Chọn chủ đề để xem nhanh câu trả lời phù hợp với nhu cầu của bạn.
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#173E75] text-white shadow-[0_10px_20px_rgba(23,62,117,0.18)]"
                  : "bg-[#F3F6FA] text-[#334155] hover:bg-[#EAF2FB] hover:text-[#173E75]"
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* FAQ items */}
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#E8EEF5] bg-[#FCFDFE] transition-colors hover:border-[#D8E3F0]"
              >
                <button
                  type="button"
                  onClick={() => onToggle(isExpanded ? "" : item.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-4"
                >
                  <span className="text-[14px] font-semibold leading-5 text-[#0F172A]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "mt-0.5 shrink-0 text-[#64748B] transition-transform duration-200",
                      isExpanded && "rotate-180 text-[#173E75]"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#E8EEF5] px-4 py-3.5 text-sm leading-5 text-[#64748B]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-[#D8E3F0] bg-[#F8FBFE] px-5 py-6 text-center">
            <p className="text-sm text-[#64748B]">
              Chưa tìm thấy câu hỏi phù hợp. Bạn có thể gửi yêu cầu hỗ trợ
              trực tiếp để MECSU phản hồi chi tiết hơn.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Support request form
function SupportRequestForm({
  formData,
  errors,
  onChange,
  onSubmit,
}: {
  formData: SupportRequestFormData;
  errors: SupportFormErrors;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <aside
      id="support-request-form"
      className="rounded-[20px] border border-[#E5EAF2] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] xl:sticky xl:top-24 lg:p-5"
    >
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-bold text-[#0F172A]">Gửi yêu cầu hỗ trợ</h2>
        <p className="text-sm leading-5 text-[#64748B]">
          Mô tả vấn đề của bạn, MECSU sẽ phản hồi sớm nhất.
        </p>
      </div>

      <form className="space-y-3" onSubmit={onSubmit}>
        {/* Họ và tên */}
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-[#0F172A]"
          >
            Họ và tên
          </label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            className={cn(
              "h-11 w-full rounded-xl border px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#173E75]/15",
              errors.fullName
                ? "border-amber-300 bg-amber-50/40"
                : "border-[#E5EAF2] bg-white focus:border-[#173E75]"
            )}
            placeholder="Nhập họ và tên"
          />
          {errors.fullName && (
            <p className="text-xs text-[#9A6A00]">{errors.fullName}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-[#0F172A]"
          >
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            className={cn(
              "h-11 w-full rounded-xl border px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#173E75]/15",
              errors.phone
                ? "border-amber-300 bg-amber-50/40"
                : "border-[#E5EAF2] bg-white focus:border-[#173E75]"
            )}
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && (
            <p className="text-xs text-[#9A6A00]">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#0F172A]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            className={cn(
              "h-11 w-full rounded-xl border px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#173E75]/15",
              errors.email
                ? "border-amber-300 bg-amber-50/40"
                : "border-[#E5EAF2] bg-white focus:border-[#173E75]"
            )}
            placeholder="Nhập email"
          />
          {errors.email && (
            <p className="text-xs text-[#9A6A00]">{errors.email}</p>
          )}
        </div>

        {/* Loại yêu cầu */}
        <div className="space-y-1.5">
          <label
            htmlFor="requestType"
            className="text-sm font-medium text-[#0F172A]"
          >
            Loại yêu cầu
          </label>
          <div className="relative">
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={onChange}
              className={cn(
                "h-11 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-[#173E75]/15",
                errors.requestType
                  ? "border-amber-300 bg-amber-50/40"
                  : "border-[#E5EAF2] focus:border-[#173E75]"
              )}
            >
              <option value="">Chọn loại yêu cầu</option>
              {requestTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          {errors.requestType && (
            <p className="text-xs text-[#9A6A00]">{errors.requestType}</p>
          )}
        </div>

        {/* Mã đơn hàng / mã báo giá */}
        <div className="space-y-1.5">
          <label
            htmlFor="referenceCode"
            className="text-sm font-medium text-[#0F172A]"
          >
            Mã đơn hàng / mã báo giá{" "}
            <span className="text-slate-400">(tuỳ chọn)</span>
          </label>
          <input
            id="referenceCode"
            name="referenceCode"
            value={formData.referenceCode}
            onChange={onChange}
            className="h-11 w-full rounded-xl border border-[#E5EAF2] bg-white px-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:border-[#173E75] focus:outline-none focus:ring-2 focus:ring-[#173E75]/15"
            placeholder="Ví dụ: SO-240126 hoặc Q-240523"
          />
        </div>

        {/* Nội dung cần hỗ trợ */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-sm font-medium text-[#0F172A]"
          >
            Nội dung cần hỗ trợ
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={onChange}
            className={cn(
              "w-full resize-none rounded-xl border px-4 py-3 text-sm leading-6 text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#173E75]/15",
              errors.message
                ? "border-amber-300 bg-amber-50/40"
                : "border-[#E5EAF2] bg-white focus:border-[#173E75]"
            )}
            placeholder="Mô tả chi tiết vấn đề, nhu cầu hoặc thông tin bạn cần MECSU hỗ trợ"
          />
          {errors.message && (
            <p className="text-xs text-[#9A6A00]">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173E75] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0F2F5C]"
        >
          <SendHorizonal size={16} />
          <span>Gửi yêu cầu</span>
        </button>

        <p className="text-xs leading-5 text-[#64748B]">
          Thời gian phản hồi dự kiến: trong vòng 24 giờ làm việc.
        </p>
      </form>
    </aside>
  );
}

// Policy cards
function PolicySection({ items }: { items: PolicyItem[] }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] lg:text-xl">
          Chính sách hỗ trợ
        </h2>
        <p className="mt-1 text-sm leading-5 text-[#64748B]">
          Các thông tin quan trọng giúp doanh nghiệp dễ theo dõi quy trình
          mua hàng và hậu mãi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {items.map((policy) => {
          const Icon = resolveIcon(policy.iconKey);
          return (
            <article
              key={policy.id}
              className="group rounded-[20px] border border-[#E5EAF2] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FB] text-[#173E75]">
                <Icon size={18} />
              </div>
              <div className="space-y-2.5">
                <h3 className="text-base font-semibold text-[#0F172A]">
                  {policy.title}
                </h3>
                <p className="text-sm leading-6 text-[#64748B]">
                  {policy.description}
                </p>
                <Link
                  href={policy.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#173E75] transition-colors hover:text-[#0F2F5C]"
                >
                  Xem chi tiết
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Toast notification
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-xl">
      <div
        className={cn(
          "flex items-center gap-3",
          type === "success"
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        )}
      >
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full",
            type === "success" ? "bg-green-100" : "bg-red-100"
          )}
        >
          {type === "success" ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 3L9 9M9 3L3 9"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <p
          className={cn(
            "text-sm font-medium",
            type === "success" ? "text-green-800" : "text-red-800"
          )}
        >
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded-lg p-1 transition-colors hover:bg-black/10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 3L11 11M11 3L3 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Main shell
export function SupportPageShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [expandedFaqId, setExpandedFaqId] = useState<string>(
    faqItems[0]?.id ?? ""
  );
  const [formData, setFormData] = useState<SupportRequestFormData>(
    initialSupportFormData
  );
  const [formErrors, setFormErrors] = useState<SupportFormErrors>({});
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const filteredFaqItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleSearch = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      setActiveCategory("all");
      setExpandedFaqId(faqItems[0]?.id ?? "");
      return;
    }

    const firstMatch = faqItems.find(
      (item) =>
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery)
    );

    if (firstMatch) {
      setActiveCategory(firstMatch.category);
      setExpandedFaqId(firstMatch.id);
    }
  };

  const handleCategoryChange = (categoryId: FaqCategory) => {
    setActiveCategory(categoryId);
    const nextFaq = faqItems.find(
      (item) => categoryId === "all" || item.category === categoryId
    );
    setExpandedFaqId(nextFaq?.id ?? "");
  };

  const handleChannelClick = (channelId: string) => {
    if (channelId === "ticket") {
      const section = document.getElementById("support-request-form");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: SupportFormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Email chưa đúng định dạng";
    }

    if (!formData.requestType) {
      nextErrors.requestType = "Vui lòng chọn loại yêu cầu";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Vui lòng nhập nội dung cần hỗ trợ";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormData(initialSupportFormData);
    setToast({
      show: true,
      message: "Yêu cầu hỗ trợ đã được gửi thành công",
      type: "success",
    });
  };

  return (
    <div className="space-y-3">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
          Hỗ trợ khách hàng
        </h1>
        <p className="mt-1 text-sm leading-6 text-slate-500 lg:text-base">
          Tìm hỗ trợ nhanh cho báo giá, đơn hàng, vận chuyển và các chính
          sách mua hàng.
        </p>
      </div>

      {/* Hero + search */}
      <SupportHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Quick support channels */}
      <QuickSupportChannels
        channels={quickSupportChannels}
        onChannelClick={handleChannelClick}
      />

      {/* FAQ + Form grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.9fr)] xl:items-start">
        <FaqSection
          items={filteredFaqItems}
          categories={faqCategories}
          activeCategory={activeCategory}
          expandedId={expandedFaqId}
          onCategoryChange={handleCategoryChange}
          onToggle={setExpandedFaqId}
        />

        <SupportRequestForm
          formData={formData}
          errors={formErrors}
          onChange={handleInputChange}
          onSubmit={handleSubmitRequest}
        />
      </section>

      {/* Policy section */}
      <PolicySection items={policyItems} />

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
