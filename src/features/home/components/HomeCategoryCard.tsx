import Link from "next/link";
import {
  ArrowUpCircle,
  Blocks,
  Database,
  DoorOpen,
  Droplet,
  Factory,
  Monitor,
  PenTool,
  Ruler,
  Settings,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import type { HeaderCategory } from "@/features/categories/data/header-categories";
import { getSeededPlaceholder } from "@/lib/image-placeholders";
import { generateCategoryUrl, toSlug } from "@/lib/routing";

const iconMap = {
  Blocks,
  Settings,
  Wrench,
  Zap,
  PenTool,
  ArrowUpCircle,
  Database,
  Wind,
  Monitor,
  DoorOpen,
  Ruler,
  Droplet,
  Factory,
};

export function HomeCategoryCard({ category }: { category: HeaderCategory }) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || Wrench;
  const categoryUrl = generateCategoryUrl(category);
  const subcategories = category.subcategories.slice(0, 4);

  return (
    <div className="flex h-full flex-col bg-transparent">
      <Link
        href={categoryUrl}
        className="mb-3 rounded-md bg-[#F2F2F2] p-4 shadow-sm transition-colors hover:bg-slate-100"
      >
        <h3 className="text-[17px] leading-tight font-bold text-slate-900">
          {category.name}
        </h3>
      </Link>

      <div className="flex flex-col gap-2">
        <ul className="flex flex-col gap-1">
          {subcategories.map((subcategory) => (
            <li
              key={`${category.id}-${subcategory}`}
              className="group flex cursor-pointer items-center gap-3"
            >
              <Link
                href={`${categoryUrl}/${toSlug(subcategory)}`}
                className="flex w-full items-center gap-4 text-left"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-100 bg-slate-50 transition-all duration-200 group-hover:bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSeededPlaceholder(subcategory)}
                    alt={subcategory}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-[15px] leading-snug font-medium text-slate-700 transition-all duration-200 group-hover:font-bold group-hover:text-slate-900">
                  {subcategory}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-1">
          <Link
            href={categoryUrl}
            className="group flex cursor-pointer items-center gap-1 text-[15px] font-medium text-blue-600 hover:underline"
          >
            Shop all
            <Icon size={0} className="hidden" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
