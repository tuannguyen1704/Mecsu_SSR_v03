import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailShell } from "@/features/products/components/detail/ProductDetailShell";
import {
  getProduct,
  getProductHref,
  getProductImages,
  getProductPageData,
  getProductRouteParams,
  getProductShortDescription,
} from "@/features/products/services/product-service";
import { buildAbsoluteUrl } from "@/features/products/utils/share";

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

  const description = getProductShortDescription(product);
  const productUrl = buildAbsoluteUrl(getProductHref(product));
  const productImages = getProductImages(product);
  const imageUrl = buildAbsoluteUrl(
    product.image || productImages[0] || "/mecsu_logo.png",
  );

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      url: productUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [imageUrl],
    },
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
