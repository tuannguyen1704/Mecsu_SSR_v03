export type FeaturedBrand = {
  id: string;
  name: string;
  colorClass: string;
  weightClass: string;
  prefix?: "bosch" | "sata";
  suffix?: "cdc";
};

export type FeaturedBrandGroup =
  | "trusted"
  | "precision"
  | "automation"
  | "pneumatic"
  | "handTools"
  | "maintenance"
  | "materials";

export const FEATURED_BRAND_GROUPS: Array<{
  id: Exclude<FeaturedBrandGroup, "trusted">;
  label: string;
}> = [
  { id: "precision", label: "Cơ khí chính xác" },
  { id: "automation", label: "Tự động hóa" },
  { id: "pneumatic", label: "Thiết bị khí nén" },
  { id: "handTools", label: "Công cụ cầm tay" },
  { id: "maintenance", label: "Bảo trì công nghiệp" },
  { id: "materials", label: "Vật liệu phụ trợ" },
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
  {
    id: "mitutoyo",
    name: "Mitutoyo",
    colorClass: "text-[#e31e24]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "yg-1",
    name: "YG-1",
    colorClass: "text-[#173f7a]",
    weightClass: "font-black text-2xl sm:text-3xl tracking-tight",
  },
  {
    id: "asahi",
    name: "Asahi",
    colorClass: "text-[#163F78]",
    weightClass: "font-black text-xl sm:text-2xl italic tracking-tight",
  },
  {
    id: "alpen-maykestag",
    name: "Alpen-Maykestag",
    colorClass: "text-[#c7372f]",
    weightClass: "font-bold text-base sm:text-lg tracking-tight",
  },
  {
    id: "autonics",
    name: "Autonics",
    colorClass: "text-[#e76b2f]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "omron",
    name: "OMRON",
    colorClass: "text-[#1474bd]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "schneider",
    name: "Schneider",
    colorClass: "text-[#2f9b46]",
    weightClass: "font-black text-lg sm:text-xl tracking-tight",
  },
  {
    id: "chint",
    name: "CHINT",
    colorClass: "text-[#126eb5]",
    weightClass: "font-black text-xl sm:text-2xl tracking-wider",
  },
  {
    id: "airtac",
    name: "AIRTAC",
    colorClass: "text-[#e0312d]",
    weightClass: "font-black text-xl sm:text-2xl italic tracking-tight",
  },
  {
    id: "camozzi",
    name: "CAMOZZI",
    colorClass: "text-[#163F78]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "smc",
    name: "SMC",
    colorClass: "text-[#173f7a]",
    weightClass: "font-black text-2xl sm:text-3xl italic tracking-tight",
  },
  {
    id: "chiyoda",
    name: "CHIYODA",
    colorClass: "text-[#2676b8]",
    weightClass: "font-black text-lg sm:text-xl tracking-tight",
  },
  {
    id: "stanley",
    name: "STANLEY",
    colorClass: "text-[#171717] bg-[#f4c430] px-2 py-1",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "makita",
    name: "Makita",
    colorClass: "text-[#148b91]",
    weightClass: "font-black text-xl sm:text-2xl italic tracking-tight",
  },
  {
    id: "anex",
    name: "ANEX",
    colorClass: "text-[#d22f2f]",
    weightClass: "font-black text-xl sm:text-2xl tracking-wider",
  },
  {
    id: "bahco",
    name: "BAHCO",
    colorClass: "text-[#e26f21]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "asaki",
    name: "ASAKI",
    colorClass: "text-[#c52f2f]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "3m",
    name: "3M",
    colorClass: "text-[#e2231a]",
    weightClass: "font-black text-3xl sm:text-4xl tracking-tighter",
  },
  {
    id: "bando",
    name: "BANDO",
    colorClass: "text-[#2259a6]",
    weightClass: "font-black text-xl sm:text-2xl italic tracking-tight",
  },
  {
    id: "apollo",
    name: "Apollo",
    colorClass: "text-[#163F78]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight",
  },
  {
    id: "applied-seals",
    name: "Applied Seals",
    colorClass: "text-[#28745d]",
    weightClass: "font-bold text-lg sm:text-xl tracking-tight",
  },
  {
    id: "binh-minh",
    name: "Bình Minh",
    colorClass: "text-[#1975b9]",
    weightClass: "font-black text-xl sm:text-2xl tracking-tight normal-case",
  },
];

const BRAND_BY_ID = new Map(FEATURED_BRANDS.map((brand) => [brand.id, brand]));

const FEATURED_BRAND_GROUP_IDS: Record<FeaturedBrandGroup, string[]> = {
  trusted: ["bosch", "sata", "pisco", "cdc", "selleys", "kst", "nachi", "skf"],
  precision: ["skf", "nachi", "mitutoyo", "yg-1", "asahi", "alpen-maykestag"],
  automation: ["autonics", "omron", "schneider", "chint", "airtac", "camozzi"],
  pneumatic: ["airtac", "smc", "pisco", "cdc", "camozzi", "chiyoda"],
  handTools: ["bosch", "sata", "stanley", "makita", "anex", "bahco", "asaki"],
  maintenance: ["3m", "selleys", "skf", "kst", "bando", "apollo"],
  materials: ["3m", "selleys", "apollo", "applied-seals", "bando", "binh-minh"],
};

export function getFeaturedBrands(group: FeaturedBrandGroup): FeaturedBrand[] {
  return FEATURED_BRAND_GROUP_IDS[group]
    .map((brandId) => BRAND_BY_ID.get(brandId))
    .filter((brand): brand is FeaturedBrand => brand !== undefined);
}
