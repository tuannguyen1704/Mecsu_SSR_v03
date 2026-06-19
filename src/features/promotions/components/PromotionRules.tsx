"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const rules = [
  "Mã giảm giá cần được nhập ở bước thanh toán nếu chương trình yêu cầu mã.",
  "Ưu đãi tự động sẽ áp dụng khi đơn hàng đủ điều kiện.",
  "Một số chương trình không áp dụng đồng thời với khuyến mãi khác.",
  "Ưu đãi có thể phụ thuộc vào tồn kho, số lượng mua, nhóm sản phẩm hoặc giá trị đơn hàng.",
  "Mecsu có thể điều chỉnh hoặc kết thúc chương trình theo thời gian áp dụng.",
];

export function PromotionRules() {
  const [expanded, setExpanded] = useState(false);
  const visibleRules = expanded ? rules : rules.slice(0, 3);

  return (
    <div className="rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] p-4 lg:p-5">
      <ul className="space-y-2">
        {visibleRules.map((rule) => (
          <li key={rule} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#163F78]" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#163F78] hover:underline"
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
        <ChevronDown
          size={16}
          className={cn("transition-transform", expanded && "rotate-180")}
        />
      </button>
    </div>
  );
}
