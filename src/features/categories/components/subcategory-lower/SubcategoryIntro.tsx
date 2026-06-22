"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SubcategoryIntroProps {
  title: string;
  paragraphs: string[];
}

export function SubcategoryIntro({ title, paragraphs }: SubcategoryIntroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-t border-slate-200 bg-white pt-12 pb-4">
      <h2 className="mb-6 text-[28px] font-bold text-[#222]">{title}</h2>

      <div className="relative">
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ${
            isExpanded ? "max-h-[520px]" : "max-h-[120px]"
          }`}
        >
          <div className="space-y-4 text-[15px] leading-[1.6] text-slate-700">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {!isExpanded ? (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
        ) : null}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className="group relative flex items-center gap-1.5 overflow-hidden rounded-sm px-4 py-1.5 text-[15px] font-medium text-[#2071a7] transition-all hover:bg-[#f0f7ff]"
        >
          {isExpanded ? (
            <>
              Thu gọn <ChevronUp size={18} className="translate-y-[0.5px]" />
            </>
          ) : (
            <>
              Xem thêm <ChevronDown size={18} className="translate-y-[0.5px]" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
