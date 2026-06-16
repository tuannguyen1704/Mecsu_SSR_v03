import Link from "next/link";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import type { MoreCategoryItem as MoreCategoryItemType } from "../data/more-categories";

export function MoreCategoryItem({ item }: { item: MoreCategoryItemType }) {
  return (
    <Link
      href={item.href}
      className="group/item flex w-[140px] shrink-0 cursor-pointer flex-col items-center gap-3"
    >
      <div className="flex h-[120px] w-full items-center justify-center rounded-xl p-2 transition-transform duration-300 group-hover/item:-translate-y-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getSeededPlaceholder(item.name)}
          alt={item.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover/item:scale-105"
        />
      </div>
      <span className="text-center text-[14px] leading-snug font-normal text-slate-800 transition-colors duration-200 group-hover/item:text-[#24465B]">
        {item.name}
      </span>
    </Link>
  );
}
