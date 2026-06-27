"use client";

import { useState } from "react";
import Image from "next/image";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import { ProductShareLinks } from "../ProductShareLinks";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  productId: string;
  productUrl: string;
}

export function ProductGallery({
  images,
  productName,
  productId,
  productUrl,
}: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [getSeededCategoryImage(productId)];
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = galleryImages[activeImage] || galleryImages[0];

  return (
    <div className="flex h-fit flex-col gap-4 font-sans">
      <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-slate-100 bg-white p-4">
        <Image
          src={currentImage}
          alt={productName}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="cursor-zoom-in object-contain p-4"
        />

        <div className="absolute right-0 bottom-4 left-0 text-center">
          <span className="text-[13px] text-[#565959]">Click to see full view</span>
        </div>
      </div>

      <div className="scrollbar-none flex h-16 gap-2 overflow-x-auto pb-2 xl:h-20">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onMouseEnter={() => setActiveImage(index)}
            onClick={() => setActiveImage(index)}
            className={`flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-md border-2 bg-white p-1 transition-all duration-200 ${
              activeImage === index
                ? "border-[#007185] shadow-sm"
                : "border-transparent opacity-70 hover:border-[#007185]/40 hover:opacity-100"
            }`}
            aria-label={`Xem ảnh ${index + 1}`}
          >
            <span className="relative h-full w-full">
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </span>
          </button>
        ))}
      </div>

      <ProductShareLinks
        productName={productName}
        productUrl={productUrl}
        imageUrl={currentImage}
      />
    </div>
  );
}
