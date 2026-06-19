import Link from "next/link";
import { PackageSearch } from "lucide-react";

export function StockAlertEmptyState() {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#163F78]">
        <PackageSearch size={30} />
      </div>
      <h3 className="mt-5 text-lg font-black text-slate-900">
        Bạn chưa có yêu cầu nhắc hàng nào
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Khi sản phẩm hết hàng, bạn có thể đăng ký để Mecsu thông báo khi hàng có
        trở lại.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1A4A8A]"
      >
        Khám phá sản phẩm
      </Link>
    </div>
  );
}
