import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailShell } from "@/features/products/components/detail/ProductDetailShell";
import {
  getProduct,
  getProductPageData,
  getProductRouteParams,
  getProductShortDescription,
} from "@/features/products/services/product-service";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export async function generateStaticParams() {
  return getProductRouteParams();
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return {
    title: product.name,
    description: getProductShortDescription(product),
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;
  const productPageData = await getProductPageData(productId);

  if (!productPageData) {
    notFound();
  }

  return (
    <ProductDetailShell
      product={productPageData.product}
      compatibleProducts={productPageData.compatibleProducts}
    />
  );
}
