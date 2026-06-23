export type BrandIndustry =
  | "Tất cả"
  | "Cơ khí chính xác"
  | "Tự động hóa"
  | "Thiết bị khí nén"
  | "Công cụ cầm tay"
  | "Bảo trì công nghiệp"
  | "Vật liệu phụ trợ";

export type Brand = {
  id: string;
  name: string;
  industry: Exclude<BrandIndustry, "Tất cả">;
  logo?: string;
};

export const BRAND_INDUSTRIES: BrandIndustry[] = [
  "Tất cả",
  "Cơ khí chính xác",
  "Tự động hóa",
  "Thiết bị khí nén",
  "Công cụ cầm tay",
  "Bảo trì công nghiệp",
  "Vật liệu phụ trợ",
];

export const BRAND_ALPHABET = [
  "Tất cả",
  "0-9",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
];

const brandNames = [
  "3Keego", "3M", "ABB", "Adela", "Advindeq", "Airtac", "Alpen-Maykestag",
  "AMF", "Anex", "Apech", "Apex", "Apollo", "Applied Seals", "ASADA",
  "ASAHI", "Asahi (Auto)", "Asaki", "Asama", "Asia", "ASOH",
  "ASTRO PRODUCTS", "ATM", "Autonics", "Bahco", "Bakuma", "Bando", "Barker",
  "BBK", "Berlin", "BESTTOOL", "BICTOOL", "Bình Minh", "BlueBird",
  "Bollhoff", "Bondhus", "Bosch", "Bosi", "BROWN", "Buyoung", "C&U",
  "C-Mart", "Cadisun", "Cadivi", "Camozzi", "CDC", "Century", "Champion",
  "Chint", "Chiyoda", "Clamptek", "CMTEC", "COMPACT TOOLS", "Conotec",
  "Conso", "Crossman", "Crown", "DaiChang", "DAINISHO (Omi kogyo)",
  "DAIWA ADTECH", "DeltaPlus", "DELVO", "Deton", "Dewalt", "DIFFUL",
  "Dijet", "Dog X", "Dogyu Industrial", "Dong-A", "DONGBO CHAIN", "Doukan",
  "Duy Tân", "DYZV", "Eastern Seiko", "Easun", "Eight", "ELESA", "Elite",
  "Elora", "EMKA", "ENDO", "Engineer", "Esco", "Ethos", "Everest", "Excia",
  "EXEN", "EZO",
];

const industries = BRAND_INDUSTRIES.slice(1) as Exclude<
  BrandIndustry,
  "Tất cả"
>[];

function toBrandId(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const MOCK_BRANDS: Brand[] = brandNames.map((name, index) => ({
  id: toBrandId(name),
  name,
  industry: industries[index % industries.length],
  logo: undefined,
}));

export function getBrandLetter(name: string) {
  const firstCharacter = name.trim().charAt(0).toUpperCase();
  return /\d/.test(firstCharacter) ? "0-9" : firstCharacter;
}
