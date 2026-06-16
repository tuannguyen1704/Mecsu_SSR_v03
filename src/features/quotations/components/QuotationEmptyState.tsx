import { FileText, Plus } from "lucide-react";

interface QuotationEmptyStateProps {
  onCreate: () => void;
}

export function QuotationEmptyState({ onCreate }: QuotationEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[#E5EAF2] bg-white p-8 text-center lg:p-10">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F6F8FB]">
        <FileText size={32} className="text-slate-400" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-700">
        Chưa có yêu cầu báo giá
      </h3>
      <p className="mx-auto mb-5 max-w-md text-sm text-slate-500">
        Tạo yêu cầu báo giá để MECSU hỗ trợ bạn nhanh hơn.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-xl bg-[#163F78] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-[#1A4A8A]"
      >
        <Plus size={18} />
        Tạo yêu cầu báo giá
      </button>
    </div>
  );
}
