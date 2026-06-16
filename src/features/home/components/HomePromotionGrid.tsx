import { HOME_PROMOTIONS } from "../data/home-promotions";
import { PromotionCard } from "./PromotionCard";

export function HomePromotionGrid() {
  return (
    <section className="border-b border-slate-100 bg-white pt-[14px] pb-0">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:px-8">
        {HOME_PROMOTIONS.map((promotion, index) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
