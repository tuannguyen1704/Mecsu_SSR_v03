"use client";

import { motion } from "motion/react";
import type { SearchSuggestionItem } from "@/features/products/services/search-products";
import type { HomeHeroData } from "../types/home";
import { HeroSearchBox } from "./HeroSearchBox";
import { HeroStats } from "./HeroStats";

export function HomeHeroClient({
  hero,
  suggestions,
}: {
  hero: HomeHeroData;
  suggestions: SearchSuggestionItem[];
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <h1 className="mb-3 text-[30px] leading-tight font-bold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-[42px] lg:text-[48px]">
        {hero.title}
      </h1>
      <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed font-medium text-slate-200 drop-shadow sm:text-base md:mb-6 md:text-lg">
        {hero.subtitle}
      </p>

      <div className="mx-auto w-full max-w-3xl" data-home-hero-search>
        <HeroSearchBox
          placeholder={hero.searchPlaceholder}
          suggestions={suggestions}
        />
      </div>

      <HeroStats stats={hero.stats} />
    </motion.div>
  );
}
