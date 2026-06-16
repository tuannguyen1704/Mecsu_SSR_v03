import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/features/products/data/products";
import { ProductDetailShell } from "@/features/products/components/detail/ProductDetailShell";
import {
  getProductByIdOrSlug,
  getProductShortDescription,
  getProductStaticParams,
} from "@/features/products/services/product-service";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductByIdOrSlug(productId);

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
  const product = getProductByIdOrSlug(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailShell product={product} allProducts={PRODUCTS} />;
}
