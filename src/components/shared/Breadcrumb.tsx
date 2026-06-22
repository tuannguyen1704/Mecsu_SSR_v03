import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2 text-sm text-[#64748B]",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="flex min-w-0 items-center gap-2"
          >
            {index > 0 ? (
              <ChevronRight
                size={14}
                className="shrink-0 text-[#94A3B8]"
                aria-hidden="true"
              />
            ) : null}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="whitespace-nowrap transition-colors hover:text-[#163F78]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "min-w-0 font-medium text-[#334155]",
                  isLast && "line-clamp-1",
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
