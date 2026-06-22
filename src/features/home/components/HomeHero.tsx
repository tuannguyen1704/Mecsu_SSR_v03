import { getHeaderSearchSuggestions } from "@/features/products/services/product-service";
import { HOME_HERO_DATA } from "../data/hero-data";
import { HeroBackground } from "./HeroBackground";
import { HomeHeroClient } from "./HomeHeroClient";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-64px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6 md:py-12 xl:h-[calc(100vh-80px)] xl:min-h-0 xl:px-12 xl:pt-1 xl:pb-12">
      <HeroBackground
        imageUrl={HOME_HERO_DATA.backgroundImageUrl}
        imageAlt={HOME_HERO_DATA.backgroundAlt}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <HomeHeroClient
          hero={HOME_HERO_DATA}
          suggestions={getHeaderSearchSuggestions()}
        />
      </div>
    </section>
  );
}
