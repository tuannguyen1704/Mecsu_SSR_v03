import {
  HomeBestDeals,
  HomeBlogPreview,
  HomeCategories,
  HomeExploreMore,
  HomeFeaturedBrands,
  HomeHero,
  HomeMoreCategories,
  HomePromotionGrid,
} from "@/features/home";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <HomeHero />
      <HomeCategories />
      <HomePromotionGrid />
      <HomeMoreCategories />
      <HomeBestDeals />
      <HomeFeaturedBrands />
      <HomeBlogPreview />
      <HomeExploreMore />
    </main>
  );
}
