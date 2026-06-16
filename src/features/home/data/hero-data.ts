import type { HomeHeroData } from "../types/home";

export const HOME_HERO_DATA: HomeHeroData = {
  title: "Tìm kiếm và mua vật tư công nghiệp nhanh hơn",
  subtitle:
    "Từ linh kiện lắp ráp, vật tư nhà xưởng đến thiết bị công nghiệp — Mecsu giúp doanh nghiệp tìm kiếm, báo giá và đặt hàng nhanh chóng trên một nền tảng duy nhất.",
  searchPlaceholder: "Tìm kiếm sản phẩm công nghiệp...",
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  backgroundAlt: "Construction Equipment & Progress",
  stats: [
    {
      id: "business-accounts",
      icon: "building",
      end: 15000,
      suffix: "+",
      label: "Business Accounts",
    },
    {
      id: "supply-partners",
      icon: "users",
      end: 1000,
      suffix: "+",
      label: "Verified Supply Partners",
    },
    {
      id: "on-time-deliveries",
      icon: "check",
      end: 98,
      suffix: "%",
      label: "On-Time Deliveries",
    },
  ],
};
