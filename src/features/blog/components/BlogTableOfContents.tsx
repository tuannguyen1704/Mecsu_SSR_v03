"use client";

import { useState } from "react";
import { ChevronDown, List } from "lucide-react";
import type { BlogTocItem } from "../types/blog";

interface BlogTableOfContentsProps {
  items: BlogTocItem[];
}

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tocLinks = (
    <nav className="space-y-2" aria-label="Mục lục bài viết">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-[#F6F8FB] hover:text-[#163F78]"
          onClick={() => setIsOpen(false)}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="sticky top-28 hidden rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:block">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
          <List size={17} className="text-[#163F78]" />
          Table of Contents
        </div>
        {tocLinks}
      </aside>

      <section className="rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-3 text-left text-sm font-bold text-slate-900"
          aria-expanded={isOpen}
        >
          <span className="inline-flex items-center gap-2">
            <List size={17} className="text-[#163F78]" />
            Table of Contents
          </span>
          <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen ? <div className="mt-3 border-t border-slate-100 pt-3">{tocLinks}</div> : null}
      </section>
    </>
  );
}
