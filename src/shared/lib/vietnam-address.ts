import provinceData from "@/shared/data/vietnam-address/province.json";
import wardData from "@/shared/data/vietnam-address/ward.json";

export type VietnamProvince = {
  name: string;
  slug: string;
  type: "tinh" | "thanh-pho";
  name_with_type: string;
  code: string;
};

export type VietnamWard = {
  name: string;
  type: "phuong" | "xa" | "dac-khu" | string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
};

const provinces = Object.values(provinceData) as VietnamProvince[];
const wards = Object.values(wardData) as VietnamWard[];

const wardsByProvinceCode = new Map<string, VietnamWard[]>();

for (const ward of wards) {
  const provinceWards = wardsByProvinceCode.get(ward.parent_code) ?? [];
  provinceWards.push(ward);
  wardsByProvinceCode.set(ward.parent_code, provinceWards);
}

export function normalizeVietnameseText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function getProvinces() {
  return provinces;
}

export function getProvinceByCode(code: string) {
  return provinces.find((province) => province.code === code);
}

export function getWardsByProvinceCode(provinceCode: string) {
  return wardsByProvinceCode.get(provinceCode) ?? [];
}

export function getWardByCode(provinceCode: string, wardCode: string) {
  return getWardsByProvinceCode(provinceCode).find(
    (ward) => ward.code === wardCode,
  );
}

export function searchProvinces(keyword: string) {
  const normalizedKeyword = normalizeVietnameseText(keyword);
  if (!normalizedKeyword) return provinces;

  return provinces.filter((province) =>
    normalizeVietnameseText(
      `${province.name} ${province.name_with_type} ${province.slug}`,
    ).includes(normalizedKeyword),
  );
}

export function searchWards(provinceCode: string, keyword: string) {
  const provinceWards = getWardsByProvinceCode(provinceCode);
  const normalizedKeyword = normalizeVietnameseText(keyword);
  if (!normalizedKeyword) return provinceWards;

  return provinceWards.filter((ward) =>
    normalizeVietnameseText(
      `${ward.name} ${ward.name_with_type} ${ward.slug}`,
    ).includes(normalizedKeyword),
  );
}
