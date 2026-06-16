import type { Product } from "../../types/product";
import { ProductGrid } from "../ProductGrid";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 py-8">
      <h2 className="mb-4 text-[22px] font-bold text-[#222]">
        Sản phẩm liên quan
      </h2>
      <div className="rounded-sm bg-[#ededed] p-4">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
