"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUpCircle,
  Blocks,
  Check,
  ChevronRight,
  Database,
  DoorOpen,
  Droplet,
  Factory,
  Monitor,
  PenTool,
  Ruler,
  Settings,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import type { HeaderCategory } from "@/features/categories/data/header-categories";
import { getSeededCategoryImage } from "@/lib/image-placeholders";
import { generateCategoryUrl, toSlug } from "@/lib/routing";

const ICON_MAP = {
  Blocks,
  ArrowUpCircle,
  Database,
  Settings,
  PenTool,
  Monitor,
  Wind,
  Wrench,
  DoorOpen,
  Zap,
  Ruler,
  Droplet,
  Factory,
};

type VisibleSubcategoryItem = {
  name: string;
  apiId?: number;
  href?: string;
};

function HeaderSubcategoryImage({
  imageSrc,
  alt,
}: {
  imageSrc?: string;
  alt: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = imageSrc && failedSrc !== imageSrc ? imageSrc : null;

  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="56px"
      className="object-cover transition-transform group-hover:scale-110"
      onError={() => {
        setFailedSrc(src);
      }}
    />
  );
}

interface HeaderCategoryMenuProps {
  categories: HeaderCategory[];
  catalogApiEnabled: boolean;
  isOpen: boolean;
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onClose: () => void;
}

export default function HeaderCategoryMenu({
  categories,
  catalogApiEnabled,
  isOpen,
  locations,
  selectedLocation,
  onLocationChange,
  onClose,
}: HeaderCategoryMenuProps) {
  const router = useRouter();
  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState<number | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [thumbnailCache, setThumbnailCache] = useState<Record<number, string>>({});

  const visibleSubcategories = useMemo<VisibleSubcategoryItem[]>(() => {
    if (hoveredCategoryIdx === null) {
      return [];
    }

    const category = categories[hoveredCategoryIdx];

    return (
      category.subcategoryItems ??
      category.subcategories.map((name) => ({
        name,
        href: category.subcategoryHrefs?.[name],
      }))
    );
  }, [categories, hoveredCategoryIdx]);

  useEffect(() => {
    if (!isOpen) return;

    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target?.closest("[data-category-menu-panel='true']")) return;

      event.preventDefault();
    };

    document.addEventListener("wheel", preventBackgroundScroll, {
      passive: false,
    });
    document.addEventListener("touchmove", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", preventBackgroundScroll);
      document.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !catalogApiEnabled || visibleSubcategories.length === 0) {
      return;
    }

    const missingIds = Array.from(
      new Set(
        visibleSubcategories
          .map((item) => item.apiId)
          .filter(
            (id): id is number =>
              typeof id === "number" && id > 0 && !thumbnailCache[id],
          ),
      ),
    );

    if (missingIds.length === 0) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        console.info("[catalog-api] Loading category thumbnails", missingIds);

        const response = await fetch(
          `/api/catalog/category-thumbnails?ids=${missingIds.join(",")}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Thumbnail request failed with ${response.status}`);
        }

        const data = (await response.json()) as {
          items?: { id: number; imageUrl: string }[];
        };
        const items = data.items ?? [];

        console.info("[catalog-api] Category thumbnails loaded", items.length);

        if (items.length === 0) {
          return;
        }

        setThumbnailCache((current) => {
          const next = { ...current };

          items.forEach((item) => {
            next[item.id] = item.imageUrl;
          });

          return next;
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.warn("[catalog-api] Category thumbnails fallback", error);
      }
    }, 150);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [catalogApiEnabled, isOpen, thumbnailCache, visibleSubcategories]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-x-0 top-[80px] bottom-0 z-[195] bg-slate-900/45"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -10, x: "-50%" }}
              className="fixed left-1/2 top-[80px] z-[196] hidden h-[520px] w-[calc(100%-2rem)] max-w-7xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] lg:flex"
              data-category-menu-panel="true"
            >
              <div className="no-scrollbar w-[280px] overflow-y-auto border-r border-slate-200 bg-slate-50 py-6">
                {categories.map((category, index) => {
                  const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] || Blocks;
                  const isHovered = hoveredCategoryIdx === index;
                  return (
                    <button
                      key={category.id}
                      onMouseEnter={() => setHoveredCategoryIdx(index)}
                      className={`flex w-full items-center justify-between px-6 py-2.5 transition-colors ${
                        isHovered
                          ? "bg-white text-brand-secondary"
                          : "text-slate-600 hover:bg-white/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={16}
                          className={isHovered ? "text-brand-secondary" : "text-slate-400"}
                        />
                        <span className="text-[12px] font-bold tracking-tight">
                          {category.name}
                        </span>
                      </div>
                      <ChevronRight
                        size={12}
                        className={isHovered ? "text-brand-secondary" : "text-slate-300"}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                {hoveredCategoryIdx !== null ? (
                  <div className="grid grid-cols-4 gap-x-8 gap-y-8">
                    {visibleSubcategories.map((subcategory) => (
                      <button
                        key={`${subcategory.apiId ?? subcategory.name}-${subcategory.name}`}
                        onClick={() => {
                          const category = categories[hoveredCategoryIdx];
                          const href =
                            subcategory.href ??
                            category.subcategoryHrefs?.[subcategory.name] ??
                            `${category.href ?? generateCategoryUrl(category)}/${toSlug(subcategory.name)}`;

                          onClose();
                          router.push(href);
                        }}
                        className="group flex items-start gap-3 text-left"
                      >
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-200 bg-white p-0 transition-all group-hover:border-brand-primary group-hover:shadow-lg group-hover:shadow-blue-500/10">
                          <HeaderSubcategoryImage
                            imageSrc={
                              catalogApiEnabled && subcategory.apiId
                                ? thumbnailCache[subcategory.apiId]
                                : getSeededCategoryImage(subcategory.name)
                            }
                            alt={subcategory.name}
                          />
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <span className="line-clamp-2 max-w-full text-[12px] leading-tight font-bold tracking-tight break-words text-slate-800 transition-colors group-hover:text-brand-secondary">
                            {subcategory.name}
                          </span>
                          <span className="text-[9px] font-medium capitalize tracking-widest text-slate-400">
                            Sẵn kho
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center font-medium italic text-slate-300">
                    Di chuột qua danh mục để xem chi tiết
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLocationModalOpen && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            data-modal-scroll-lock="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded border border-slate-200 bg-white shadow-2xl"
            >
              <div className="relative bg-brand-secondary p-8 text-white">
                <h3 className="text-xl font-bold tracking-widest">Kho hàng khu vực</h3>
                <p className="mt-1 text-xs font-bold capitalize tracking-widest text-white/60">
                  Tối ưu vận chuyển từ kho gần nhất
                </p>
                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="absolute right-8 top-8 text-white/60 transition-all hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-6">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      onLocationChange(location);
                      setIsLocationModalOpen(false);
                    }}
                    className={`flex items-center justify-between rounded border px-6 py-4 transition-all ${
                      selectedLocation === location
                        ? "border-brand-primary bg-brand-primary/10 text-brand-secondary"
                        : "border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-bold tracking-tight">{location}</span>
                    {selectedLocation === location && (
                      <Check size={18} className="text-brand-secondary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
