import Link from "next/link";
import type { Product } from "../../types/product";
import {
  getProductCategoryTrail,
  getProductHref,
} from "../../services/product-service";
import {
  getCategorySubcategories,
} from "@/features/categories/services/category-service";

interface ProductExploreMoreProps {
  product: Product;
  products: Product[];
}

export function ProductExploreMore({ product, products }: ProductExploreMoreProps) {
  const { category, subcategory } = getProductCategoryTrail(product);
  const productLinks = products.slice(0, 10).map((item) => ({
    label: item.name,
    href: getProductHref(item),
  }));
  const subcategoryLinks =
    category
      ? getCategorySubcategories(category)
          .filter((item) => item.slug !== subcategory?.slug)
          .slice(0, 8)
          .map((item) => ({ label: item.name, href: item.href }))
      : [];

  const uniqueLinks = new Map<string, { label: string; href: string }>();
  [...productLinks, ...subcategoryLinks].forEach((link) => {
    const key = `${link.href}|${link.label}`;
    if (!uniqueLinks.has(key)) {
      uniqueLinks.set(key, link);
    }
  });

  return (
    <section className="border-t border-slate-200 py-12">
      <h2 className="mb-3 text-[24px] font-bold text-[#222]">Explore More Products</h2>
      <div className="grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2 lg:grid-cols-4">
        {Array.from(uniqueLinks.values())
          .slice(0, 16)
          .map((link, index) => (
            <Link
              key={`${link.href}-${index}`}
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
