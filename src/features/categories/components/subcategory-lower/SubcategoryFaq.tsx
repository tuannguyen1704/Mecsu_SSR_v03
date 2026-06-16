"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SubcategoryFaqItem } from "../../data/subcategory-content";

interface SubcategoryFaqProps {
  items: SubcategoryFaqItem[];
}

export function SubcategoryFaq({ items }: SubcategoryFaqProps) {
  return (
    <section className="bg-white pt-4 pb-12">
      <h2 className="mb-8 text-[28px] font-bold text-[#222]">Câu hỏi thường gặp</h2>
      <div className="max-w-7xl">
        {items.map((item) => (
          <FaqItem key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ item }: { item: SubcategoryFaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-sm border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50/50"
      >
        <span className="pr-8 text-[16px] font-bold text-[#1a1a1a] transition-colors group-hover:text-[#2071a7]">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-[#2071a7] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-100 px-6 pt-4 pb-6 text-[15px] leading-[1.6] text-slate-700">
          {item.answer}
        </div>
      </div>
    </div>
  );
}
