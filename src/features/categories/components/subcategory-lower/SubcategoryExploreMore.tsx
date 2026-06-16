import Link from "next/link";
import type { ExploreMoreLink } from "../../data/subcategory-content";

interface SubcategoryExploreMoreProps {
  links: ExploreMoreLink[];
}

export function SubcategoryExploreMore({ links }: SubcategoryExploreMoreProps) {
  return (
    <section className="border-t border-slate-200 bg-white py-12">
      <h2 className="mb-3 text-[24px] font-bold text-[#222]">Explore More Products</h2>
      <div className="grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2 lg:grid-cols-4">
        {links.map((link, index) => (
          <Link
            key={`${link.href}-${link.label}-${index}`}
            href={link.href}
            className="text-[16px] leading-[1.3] text-[#007185] transition-all hover:font-bold hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
