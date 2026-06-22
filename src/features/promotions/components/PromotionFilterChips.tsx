import { cn } from "@/lib/utils";

interface PromotionFilterChipsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function PromotionFilterChips({
  categories,
  activeCategory,
  onChange,
}: PromotionFilterChipsProps) {
  return (
    <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              "shrink-0 snap-start rounded-md border px-3 py-2 text-xs whitespace-nowrap transition-colors",
              active
                ? "border-[#163F78] bg-[#163F78] font-medium text-white"
                : "border-[#E2E8F0] bg-white font-normal text-slate-600 hover:border-[#163F78] hover:text-[#163F78]",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
