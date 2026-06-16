"use client";

import Link from "next/link";
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
      className={`flex flex-col gap-3 ${index === 0 ? "lg:col-span-2" : "lg:col-span-1"}`}
    >
      <Link
        href={promotion.href}
        className="group relative flex h-[240px] cursor-pointer flex-col justify-between overflow-hidden rounded-md p-6 transition-all duration-500 lg:h-[260px]"
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={promotion.image}
            alt={promotion.title}
            className="h-full w-full rounded-t-md object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/30" />
        </div>

        <div className="relative z-10 w-full">
          <h3 className="text-[26px] leading-[1.1] font-bold whitespace-pre-line text-white tracking-tight drop-shadow-md">
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
