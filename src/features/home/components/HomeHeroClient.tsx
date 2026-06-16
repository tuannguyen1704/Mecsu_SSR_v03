"use client";

import { motion } from "motion/react";
import type { HomeHeroData } from "../types/home";
import { HeroSearchBox } from "./HeroSearchBox";
import { HeroStats } from "./HeroStats";

export function HomeHeroClient({ hero }: { hero: HomeHeroData }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h1 className="mb-3 text-3xl leading-tight font-bold tracking-tight text-white drop-shadow-md md:text-[48px]">
        {hero.title}
      </h1>
      <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed font-medium text-slate-200 drop-shadow md:text-lg">
        {hero.subtitle}
      </p>

      <div className="mx-auto w-full max-w-3xl" data-home-hero-search>
        <HeroSearchBox placeholder={hero.searchPlaceholder} />
      </div>

      <HeroStats stats={hero.stats} />
    </motion.div>
  );
}
