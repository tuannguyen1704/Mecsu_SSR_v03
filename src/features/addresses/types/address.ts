export interface Address {
  id: string;
  fullName: string;
  phone: string;
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  streetAddress: string;
  note?: string;
  districtCode?: string;
  districtName?: string;
  province?: string;
  district?: string;
  ward?: string;
  detailAddress?: string;
  isDefault: boolean;
}

export interface AddressFormData {
  fullName: string;
  phone: string;
  provinceCode: string;
  provinceName: string;
  wardCode: string;
  wardName: string;
  streetAddress: string;
  note: string;
  districtCode?: string;
  districtName?: string;
  isDefault: boolean;
}
