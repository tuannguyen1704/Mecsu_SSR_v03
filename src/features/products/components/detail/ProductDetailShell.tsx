import type { Product } from "../../types/product";
import {
  getProductDescription,
  getProductImages,
  getProductShortDescription,
  getRelatedProducts,
} from "../../services/product-service";
import { CompatibleProducts } from "./CompatibleProducts";
import { CustomerReviews } from "./CustomerReviews";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductDetailStickyBar } from "./ProductDetailStickyBar";
import { ProductExploreMore } from "./ProductExploreMore";
import { ProductGallery } from "./ProductGallery";
import { ProductInformationSections } from "./ProductInformationSections";
import { ProductPurchasePanel } from "./ProductPurchasePanel";
import { ProductSimilarSidebar } from "./ProductSimilarSidebar";
import { ProductTechSpecs } from "./ProductTechSpecs";

interface ProductDetailShellProps {
  product: Product;
  allProducts: Product[];
}

export function ProductDetailShell({ product, allProducts }: ProductDetailShellProps) {
  const shortDescription = getProductShortDescription(product);
  const description = getProductDescription(product);
  const images = getProductImages(product);
  const relatedProducts = getRelatedProducts(product, 10);
  const compatibleProducts =
    relatedProducts.length >= 8
      ? relatedProducts
      : [
          ...relatedProducts,
          ...allProducts.filter((candidate) => candidate.id !== product.id),
        ].slice(0, 10);

  return (
    <main className="min-h-screen bg-white pb-20">
      <ProductDetailStickyBar product={product} />

      <div className="mx-auto max-w-[1500px] px-4 py-8 pb-4 lg:px-8">
        <ProductBreadcrumb product={product} />
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-4 lg:px-8">
        <section className="mb-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:col-span-4 xl:col-span-4">
            <ProductGallery
              images={images}
              productName={product.name}
              productId={product.id}
            />
          </div>

          <div className="flex flex-col lg:col-span-5 xl:col-span-5">
            <ProductPurchasePanel
              product={product}
              shortDescription={shortDescription}
            />
            <ProductTechSpecs product={product} />
          </div>

          <ProductSimilarSidebar product={product} products={compatibleProducts} />
        </section>

        <ProductInformationSections
          product={product}
          description={description}
          images={images}
        />
        <CompatibleProducts products={compatibleProducts} />
        <CustomerReviews product={product} />
        <ProductExploreMore product={product} products={compatibleProducts} />
      </div>
    </main>
  );
}
