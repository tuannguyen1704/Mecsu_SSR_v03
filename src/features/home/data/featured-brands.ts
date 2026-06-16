export type FeaturedBrand = {
  id: string;
  name: string;
  colorClass: string;
  weightClass: string;
  prefix?: "bosch" | "sata";
  suffix?: "cdc";
};

export const FEATURED_BRAND_INDUSTRIES = [
  "Cơ khí chính xác",
  "Tự động hóa",
  "Thiết bị khí nén",
  "Công cụ cầm tay",
  "Bảo trì công nghiệp",
  "Vật liệu phụ trợ",
];

export const FEATURED_BRANDS: FeaturedBrand[] = [
  {
    id: "bosch",
    name: "BOSCH",
    prefix: "bosch",
    colorClass: "text-[#e22739]",
    weightClass:
      "font-black text-2xl sm:text-3xl tracking-tighter flex items-center",
  },
  {
    id: "sata",
    name: "SATA",
    prefix: "sata",
    colorClass: "text-[#296a4b]",
    weightClass:
      "font-black text-[22px] sm:text-[28px] tracking-tight flex items-center",
  },
  {
    id: "pisco",
    name: "PISCO",
    colorClass: "text-[#28479e]",
    weightClass: "font-black text-2xl sm:text-3xl tracking-wider",
  },
  {
    id: "cdc",
    name: "CDC",
    suffix: "cdc",
    colorClass: "text-[#1a4798]",
    weightClass:
      "font-black text-2xl sm:text-[28px] tracking-tighter italic flex items-center",
  },
  {
    id: "selleys",
    name: "SELLEYS",
    colorClass: "text-white bg-[#273a8a] px-2 py-0.5 sm:px-3 sm:py-1",
    weightClass: "font-black text-xl sm:text-[22px] italic tracking-wider",
  },
  {
    id: "kst",
    name: "KST",
    colorClass: "text-[#c63d35]",
    weightClass: "font-black text-2xl sm:text-3xl",
  },
  {
    id: "nachi",
    name: "NACHI",
    colorClass: "text-[#df3634]",
    weightClass: "font-medium text-2xl sm:text-3xl tracking-widest",
  },
  {
    id: "skf",
    name: "SKF",
    colorClass: "text-[#0d4f9b]",
    weightClass: "font-black text-2xl sm:text-3xl tracking-tighter",
  },
];
