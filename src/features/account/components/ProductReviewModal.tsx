import { useState } from "react";
import Image from "next/image";
import { X, ImagePlus, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  image?: string;
}

export interface ProductReviewInput {
  rating: number;
  comment: string;
  images: string[];
}

interface ProductReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmit: (review: ProductReviewInput) => void;
}

const RATING_LABELS = ["Rất tệ", "Tạm ổn", "Bình thường", "Tốt", "Rất tốt"];

export function ProductReviewModal({
  isOpen,
  onClose,
  product,
  onSubmit,
}: ProductReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    onSubmit({ rating, comment, images });
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setRating(0);
    setHoverRating(0);
    setComment("");
    setImages([]);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImages((prev) => {
          if (prev.length >= 5) return prev;
          return [...prev, result];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const displayRating = hoverRating || rating;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      data-modal-scroll-lock="true"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.38)",
        backdropFilter: "blur(6px)",
      }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[520px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F7] px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-[#173E75]">
              Đánh giá sản phẩm
            </h2>
            <p className="mt-1 text-sm text-[#7B8BA5]">{product.name}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7FB] text-[#7B8BA5] transition-colors hover:bg-[#EEF4FF] hover:text-[#173E75]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E5EAF2] bg-slate-50 p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  SP
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#243B5A] line-clamp-2">
                {product.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">SKU: {product.sku}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Đánh giá của bạn
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= displayRating;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="rounded p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={
                        isActive ? "text-[#F6B800]" : "text-[#D8DEE8]"
                      }
                      fill={isActive ? "#F6B800" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
              {displayRating > 0 && (
                <span className="ml-2 text-sm text-[#7B8BA5]">
                  {RATING_LABELS[displayRating - 1]}
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Nhận xét của bạn
            </p>
            <textarea
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-24 w-full rounded-xl border border-[#E2E8F0] bg-white p-3 text-sm text-[#243B5A] placeholder:text-[#A0AEC0] transition-all focus:border-[#4F7FC2] focus:outline-none focus:shadow-[0_0_0_4px_rgba(79,127,194,0.12)]"
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Hình ảnh (tối đa 5)
            </p>
            <div className="flex flex-wrap gap-2">
              {images.map((preview, idx) => (
                <div
                  key={idx}
                  className="relative h-16 w-16 overflow-hidden rounded-lg border border-[#E2E8F0]"
                >
                  <Image
                    src={preview}
                    alt=""
                    fill
                    unoptimized
                    sizes="64px"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E5484D] text-white"
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 transition-colors hover:border-slate-400">
                  <ImagePlus size={20} className="text-slate-400" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#EDF1F7] px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="h-10 rounded-xl border border-[#E2E8F0] bg-[#F5F7FB] px-5 text-sm font-medium text-[#243B5A] transition-colors hover:bg-[#EEF4FF]"
          >
            Để sau
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:bg-[#CBD5E1] hover:bg-[#0F2F5D] disabled:hover:bg-[#CBD5E1] bg-[#173E75]"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Đang gửi...
              </>
            ) : (
              "Gửi đánh giá"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
