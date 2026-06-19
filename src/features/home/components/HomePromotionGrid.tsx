import { HOME_PROMOTIONS } from "../data/home-promotions";
import { PromotionDropController } from "@/features/promotions/components/PromotionDropController";
import { PromotionCard } from "./PromotionCard";

export function HomePromotionGrid() {
  return (
    <PromotionDropController>
      {HOME_PROMOTIONS.map((promotion, index) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          index={index}
        />
      ))}
    </PromotionDropController>
  );
}
