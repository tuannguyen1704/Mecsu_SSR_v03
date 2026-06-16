import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types/product";

interface SubcategoryTopSellersProps {
  subcategoryName: string;
  products: Product[];
}

export function SubcategoryTopSellers({
  subcategoryName,
  products,
}: SubcategoryTopSellersProps) {
  return (
    <section className="border-t border-slate-200 bg-white py-6">
      <h2 className="mb-4 text-[22px] font-bold text-[#222]">
        Shop Top Sellers in {subcategoryName}
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
