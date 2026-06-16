"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { getSeededPlaceholder } from "@/lib/image-placeholders";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  productId: string;
}

export function ProductGallery({ images, productName, productId }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [getSeededPlaceholder(productId)];
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = galleryImages[activeImage] || galleryImages[0];

  return (
    <div className="flex h-fit flex-col gap-4 font-sans">
      <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-slate-100 bg-white p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage}
          alt={productName}
          className="max-h-full max-w-full cursor-zoom-in object-contain"
        />

        <div className="absolute top-0 right-0">
          <button
            type="button"
            className="p-2 text-slate-500 transition-colors hover:text-slate-700"
            aria-label="Chia sẻ sản phẩm"
          >
            <Share2 size={24} />
          </button>
        </div>

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="max-h-full max-w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
