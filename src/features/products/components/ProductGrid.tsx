import { memo } from "react";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

export const ProductGrid = memo(function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-sm bg-[#ededed] p-10 text-center">
        <div>
          <h3 className="text-xl font-black text-[#1a1a1a]">
            Không tìm thấy sản phẩm
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Hãy thử bỏ bớt bộ lọc hoặc quay lại danh mục khác.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
