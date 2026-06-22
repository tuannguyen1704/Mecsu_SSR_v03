import Link from "next/link";
import { FooterSupportContact } from "./FooterContact";
import { FooterClient } from "./FooterClient";
import { FooterLinks } from "./FooterLinks";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterSocials } from "./FooterSocials";

const aboutLinks = [
  { label: "Giới thiệu công ty", href: "/gioi-thieu" },
  { label: "Blog kỹ thuật", href: "/blog-ky-thuat" },
  { label: "Trung tâm tài nguyên", href: "/blog" },
  { label: "Khách hàng VIP", href: "#" },
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Liên hệ", href: "#" },
];

const supportLinks = [
  { label: "Câu hỏi thường gặp", href: "/faqs" },
  { label: "Hướng dẫn mua hàng", href: "/faqs/dat-hang" },
  { label: "Hướng dẫn thanh toán", href: "/faqs/thanh-toan" },
  { label: "Dịch vụ khách hàng", href: "/dich-vu-khach-hang" },
  { label: "FAQs", href: "/faqs" },
  { label: "Phương thức giao hàng", href: "/faqs/giao-hang" },
  { label: "Hướng dẫn tạo tài khoản", href: "/faqs/tai-khoan" },
];

export function Footer() {
  return (
    <footer className="relative border-t-[8px] border-brand-primary bg-brand-secondary font-sans text-slate-300">
      <div className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[0.8fr_0.9fr_1.15fr_1.25fr] xl:gap-14">
          <FooterLinks title="Về Mecsu" links={aboutLinks} />
          <FooterLinks title="Hỗ trợ khách hàng" links={supportLinks} />

          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-semibold uppercase text-white">
              Kết nối với Mecsu
            </h3>
            <FooterSocials />
            <FooterSupportContact />
          </div>

          <FooterNewsletter />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-[11px] font-medium leading-relaxed text-slate-500">
              © 2026. Công ty cổ phần Mecsu. Giấy chứng nhận ĐKKD số
              0313039340 do Sở KH&ĐT TP.HCM cấp ngày 23/05/2016
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-5">
            <Link
              href="#"
              className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-white"
            >
              Site map
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="#"
              className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="#"
              className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 transition-colors hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <FooterClient />
    </footer>
  );
}

