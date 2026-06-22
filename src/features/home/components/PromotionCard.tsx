"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { HomePromotion } from "../data/home-promotions";

type PromotionCardProps = {
  promotion: HomePromotion;
  index: number;
};

export function PromotionCard({ promotion, index }: PromotionCardProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`flex min-w-[84vw] max-w-[360px] shrink-0 snap-start flex-col gap-3 md:min-w-0 md:max-w-none ${index === 0 ? "lg:col-span-2" : "lg:col-span-1"}`}
    >
      <Link
        href={promotion.href}
        className="group relative flex h-[210px] cursor-pointer flex-col justify-between overflow-hidden rounded-md p-5 transition-all duration-500 sm:h-[230px] sm:p-6 lg:h-[260px]"
      >
        <div className="absolute inset-0">
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            sizes={
              index === 0
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 25vw, 100vw"
            }
            className="rounded-t-md object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/30" />
        </div>

        <div className="relative z-10 w-full">
          <h3 className="text-[22px] leading-[1.1] font-bold whitespace-pre-line text-white tracking-tight drop-shadow-md sm:text-[24px] lg:text-[26px]">
            {promotion.title}
          </h3>
        </div>

        <div className="relative z-10">
          <span className="text-[15px] font-bold text-white capitalize underline decoration-white underline-offset-4 transition-colors hover:text-slate-200">
            Mua ngay
          </span>
        </div>
      </Link>

      <p className="text-[12px] leading-snug text-slate-500">
        {promotion.disclaimer}
      </p>
    </motion.div>
  );
}
