import Image from "next/image";
import Link from "next/link";
import { FooterBrandContact, FooterSupportContact } from "./FooterContact";
import { FooterClient } from "./FooterClient";
import { FooterLinks } from "./FooterLinks";
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
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <FooterBrandContact />
          <FooterLinks title="Về Mecsu" links={aboutLinks} />
          <FooterLinks title="Hỗ trợ khách hàng" links={supportLinks} />

          <div className="flex flex-col">
            <h3 className="mb-5 border-b border-white/[0.08] pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Kết nối với Mecsu
            </h3>
            <FooterSocials />
            <FooterSupportContact />
          </div>
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
            <div className="flex items-center gap-3">
              <a
                href="http://online.gov.vn/Home/WebDetails/71868?AspxAutoDetectCookieSupport=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="/assets/logoSaleNoti.png"
                  alt="Bộ Công Thương"
                  width={116}
                  height={36}
                  className="h-9 w-auto"
                />
              </a>
              <a
                href="https://www.dmca.com/Protection/Status.aspx?ID=be7aa439-eb56-4e40-8cad-5071286d26d5&refurl=https://mecsu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src="/assets/dmca.png"
                  alt="DMCA"
                  width={116}
                  height={36}
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5">
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

