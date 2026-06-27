"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bookmark,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  Search,
  TrendingUp,
  Truck,
  Wrench,
  Quote,
} from "lucide-react";
import { Breadcrumb as SharedBreadcrumb } from "@/components/shared/Breadcrumb";
import { cn } from "@/lib/utils";
import {
  getAllPublicFaqItems,
  getPublicFaqCategory,
  publicFaqCategories,
  type PublicFaqCategory,
} from "../data/public-support-data";

const iconMap = {
  package: Package,
  "file-check": FileCheck,
  truck: Truck,
  refresh: RefreshCw,
  building: Building2,
  "file-text": FileText,
  quote: Quote,
  download: Download,
  wrench: Wrench,
};

function CategoryIcon({
  iconKey,
  size = 16,
}: {
  iconKey: string;
  size?: number;
}) {
  const Icon = iconMap[iconKey as keyof typeof iconMap] ?? HelpCircle;
  return <Icon size={size} strokeWidth={1.8} />;
}

function Breadcrumb({ category }: { category?: PublicFaqCategory }) {
  return (
    <SharedBreadcrumb
      items={[
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ khách hàng", href: "/dich-vu-khach-hang" },
        ...(category
          ? [
              { label: "FAQs", href: "/faqs" },
              { label: category.name },
            ]
          : [{ label: "FAQs" }]),
      ]}
    />
  );
}

function CategoryButton({
  category,
  href,
  active,
}: {
  category: PublicFaqCategory;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
        active
          ? "border-[#163F78]/30 bg-[#163F78]/5 text-[#163F78]"
          : "border-slate-100 bg-white hover:border-[#163F78]/30 hover:bg-[#163F78]/5",
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          active
            ? "bg-[#163F78]/10 text-[#163F78]"
            : "bg-slate-100 text-slate-500 group-hover:bg-[#163F78]/10 group-hover:text-[#163F78]",
        )}
      >
        <CategoryIcon iconKey={category.iconKey} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium text-slate-700 group-hover:text-[#163F78]">
          {category.name}
        </span>
        <span className="text-[11px] text-slate-400">
          {category.faqs.length} câu hỏi
        </span>
      </span>
      <ChevronRight
        size={14}
        className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#163F78]"
      />
    </Link>
  );
}

function FaqAccordion({
  category,
  searchQuery,
}: {
  category: PublicFaqCategory;
  searchQuery: string;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set([category.faqs[0]?.id ?? ""]),
  );
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFaqs = normalizedQuery
    ? category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(normalizedQuery) ||
          faq.answer.toLowerCase().includes(normalizedQuery),
      )
    : category.faqs;

  const toggleItem = (id: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-[13px] font-medium text-slate-500">
          {filteredFaqs.length} câu hỏi trong mục này
        </h3>
      </div>

      {filteredFaqs.length > 0 ? (
        <div>
          {filteredFaqs.map((faq) => {
            const isOpen = openItems.has(faq.id);
            return (
              <div key={faq.id} className="border-b border-slate-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-[13px] font-semibold text-slate-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "shrink-0 text-slate-400 transition-transform",
                      isOpen && "rotate-180 text-[#163F78]",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-[13px] leading-6 text-slate-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-10 text-center">
          <HelpCircle size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="mb-2 text-[13px] text-slate-500">
            Không tìm thấy kết quả phù hợp
          </p>
        </div>
      )}
    </div>
  );
}

function RootFaqContent() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-slate-800">
          <TrendingUp size={16} className="text-[#163F78]" />
          Câu hỏi phổ biến
        </h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {publicFaqCategories.slice(0, 4).map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              href={`/faqs/${category.id}`}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-slate-800">
          <Bookmark size={16} className="text-[#163F78]" />
          Tất cả danh mục
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {publicFaqCategories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              href={`/faqs/${category.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchResults({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const results = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return getAllPublicFaqItems().filter(
      ({ faq }) =>
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  return (
    <section className="mb-5 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-[14px] font-semibold text-slate-800">
        Kết quả tìm kiếm: {results.length} câu hỏi
      </h2>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map(({ category, faq }) => (
            <div
              key={`${category.id}-${faq.id}`}
              className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="mb-2 text-[11px] font-medium text-[#163F78]">
                {category.name}
              </div>
              <button
                type="button"
                onClick={() => router.push(`/faqs/${category.id}`)}
                className="w-full text-left text-[13px] font-medium text-slate-700 transition-colors hover:text-[#163F78]"
              >
                {faq.question}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <HelpCircle size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="text-[13px] text-slate-500">
            Không tìm thấy câu hỏi phù hợp
          </p>
        </div>
      )}
    </section>
  );
}

function CategoryFaqContent({
  category,
  searchQuery,
}: {
  category: PublicFaqCategory;
  searchQuery: string;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <aside className="hidden shrink-0 lg:block lg:w-[260px]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-[12px] font-semibold tracking-wide text-slate-700 uppercase">
              Danh mục hỗ trợ
            </h3>
          </div>
          <div className="p-2">
            {publicFaqCategories.map((item) => (
              <Link
                key={item.id}
                href={`/faqs/${item.id}`}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-all",
                  item.id === category.id
                    ? "border-l-2 border-[#163F78] bg-[#163F78]/5 font-semibold text-[#163F78]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800",
                )}
              >
                <span
                  className={item.id === category.id ? "text-[#163F78]" : "text-slate-400"}
                >
                  <CategoryIcon iconKey={item.iconKey} />
                </span>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-100 p-3">
            <Link
              href="/dich-vu-khach-hang"
              className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#163F78]"
            >
              <FileCheck size={13} />
              Gửi yêu cầu báo giá
            </Link>
            <Link
              href="/tai-khoan/don-hang"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#163F78]"
            >
              <Package size={13} />
              Theo dõi đơn hàng
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-3 text-[12px] font-semibold text-slate-700">
            Liên hệ Mecsu
          </h4>
          <div className="flex flex-col gap-2">
            <a
              href="tel:18008137"
              className="flex items-center gap-2 text-[12px] text-slate-600 transition-colors hover:text-[#163F78]"
            >
              <Phone size={13} className="text-[#163F78]" />
              1800 8137
            </a>
            <a
              href="mailto:support@mecsu.vn"
              className="flex items-center gap-2 text-[12px] text-slate-600 transition-colors hover:text-[#163F78]"
            >
              <Mail size={13} className="text-[#163F78]" />
              support@mecsu.vn
            </a>
          </div>
          <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
            <Clock size={11} />
            Thứ 2 - Thứ 7, 8:00 - 17:30
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3 lg:hidden">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {publicFaqCategories.map((item) => (
              <CategoryButton
                key={item.id}
                category={item}
                href={`/faqs/${item.id}`}
                active={item.id === category.id}
              />
            ))}
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#163F78]/10 text-[#163F78]">
            <CategoryIcon iconKey={category.iconKey} />
          </span>
          <div>
            <h2 className="text-[16px] font-bold text-slate-900">
              {category.name}
            </h2>
            <p className="text-[12px] text-slate-500">{category.description}</p>
          </div>
        </div>

        <FaqAccordion category={category} searchQuery={searchQuery} />

        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Calendar size={11} />
          <span>Cập nhật lần cuối: 18/05/2026</span>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
              <HelpCircle size={20} className="text-amber-500" />
            </span>
            <div className="flex-1">
              <h3 className="mb-1 text-[14px] font-semibold text-slate-800">
                Bạn vẫn chưa tìm thấy câu trả lời?
              </h3>
              <p className="mb-4 text-[12px] text-slate-500">
                Đội ngũ Mecsu luôn sẵn sàng hỗ trợ bạn tìm đúng sản phẩm và xử
                lý đơn hàng nhanh chóng.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="mailto:support@mecsu.vn"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#163F78] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#0F2F5C]"
                >
                  <MessageCircle size={13} />
                  Liên hệ hỗ trợ
                </a>
                <Link
                  href="/dich-vu-khach-hang"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 transition-colors hover:border-[#163F78] hover:text-[#163F78]"
                >
                  <FileCheck size={13} />
                  Gửi yêu cầu báo giá
                </Link>
                <Link
                  href="/tai-khoan/don-hang"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[12px] font-medium text-slate-700 transition-colors hover:border-[#163F78] hover:text-[#163F78]"
                >
                  <ExternalLink size={13} />
                  Theo dõi đơn hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function PublicFaqPage({ categoryId }: { categoryId?: string }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const category = categoryId ? getPublicFaqCategory(categoryId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="pt-4 pb-2">
            <Breadcrumb category={category} />
          </div>

          <div className={cn("transition-all duration-200", category ? "py-4" : "py-5")}>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
              {category ? `FAQs - ${category.name}` : "Trung tâm hỗ trợ Mecsu"}
            </h1>
            {category ? (
              <p className="mt-1 text-[13px] text-slate-500">
                {category.description}
              </p>
            ) : null}
          </div>

          <div className={cn("pb-5", category ? "pt-1" : "pt-2")}>
            <div className="relative max-w-2xl">
              <Search
                size={16}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Tìm kiếm trong trung tâm hỗ trợ Mecsu..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-[13px] text-slate-700 placeholder:text-slate-400 transition-all focus:border-[#163F78] focus:ring-2 focus:ring-[#163F78]/10 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 lg:py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          {searchQuery.trim() && !category ? (
            <SearchResults searchQuery={searchQuery} />
          ) : null}

          {!category && !searchQuery.trim() ? <RootFaqContent /> : null}

          {category ? (
            <CategoryFaqContent category={category} searchQuery={searchQuery} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
