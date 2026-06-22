import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function FooterBrandContact() {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-primary text-lg font-black text-white">
          M
        </div>
        <h3 className="text-lg font-black uppercase italic tracking-tight text-white">
          MECSU
        </h3>
      </div>

      <p className="mb-4 text-[13px] leading-relaxed text-slate-400">
        Giải pháp vật tư công nghiệp tiêu chuẩn quốc tế.
      </p>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <Phone size={15} className="shrink-0 text-brand-primary" />
          <a
            href="tel:18008137"
            className="text-[15px] font-bold text-white transition-colors hover:text-yellow-300"
          >
            1800 8137
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail size={15} className="shrink-0 text-brand-primary" />
          <a
            href="mailto:sales@mecsu.vn"
            className="text-[13px] text-slate-400 transition-colors hover:text-white"
          >
            sales@mecsu.vn
          </a>
        </div>
      </div>
    </div>
  );
}

export function FooterSupportContact() {
  return (
    <>
      <p className="mb-5 text-base font-medium text-white">
        Cần hỗ trợ hãy liên hệ với Mecsu.
      </p>

      <ul className="flex flex-col gap-3 text-sm">
        <li className="flex items-start gap-2.5">
          <Phone size={14} className="mt-0.5 shrink-0 text-brand-primary" />
          <span className="text-slate-300">
            <strong className="font-semibold text-white">Tổng đài CSKH:</strong>{" "}
            18008137
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <Mail size={14} className="mt-0.5 shrink-0 text-brand-primary" />
          <span className="text-slate-300">
            <strong className="font-semibold text-white">Email:</strong>{" "}
            <a
              href="mailto:sales@mecsu.vn"
              className="transition-colors hover:text-white"
            >
              sales@mecsu.vn
            </a>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <MapPin size={14} className="mt-1 shrink-0 text-brand-primary" />
          <span className="leading-6 text-slate-300">
            <strong className="font-semibold text-white">Địa chỉ:</strong>{" "}
            B28 - 29/I Đường số 2B, KCN Vĩnh Lộc,
            <br />
            P. Bình Hưng Hòa B, Q. Bình Tân, TP.HCM
          </span>
        </li>
      </ul>

      <Link
        href="/dich-vu-khach-hang"
        className="sr-only"
        aria-label="Dịch vụ khách hàng"
      >
        Dịch vụ khách hàng
      </Link>
    </>
  );
}
