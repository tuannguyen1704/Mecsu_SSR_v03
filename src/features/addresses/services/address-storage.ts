import type { Address } from "../types/address";

export const ADDRESSES_STORAGE_KEY = "mecsu-addresses";

const demoAddresses: Address[] = [
  {
    id: "addr-001",
    fullName: "Nguyễn Văn Minh",
    phone: "0909123456",
    provinceCode: "12",
    provinceName: "Thành phố Hồ Chí Minh",
    wardCode: "268",
    wardName: "Xã Thạnh An",
    streetAddress: "123 Đường Nguyễn Trãi",
    districtName: "Quận 7",
    isDefault: true,
  },
  {
    id: "addr-002",
    fullName: "Trần Thị Lan",
    phone: "0912345678",
    provinceCode: "12",
    provinceName: "Thành phố Hồ Chí Minh",
    wardCode: "268",
    wardName: "Xã Thạnh An",
    streetAddress: "456 Đường Lê Lợi",
    districtName: "Quận 1",
    isDefault: false,
  },
  {
    id: "addr-003",
    fullName: "Công Ty TNHH Mecsu",
    phone: "02812345678",
    provinceCode: "12",
    provinceName: "Thành phố Hồ Chí Minh",
    wardCode: "268",
    wardName: "Xã Thạnh An",
    streetAddress: "789 Đường Xô Viết Nghệ Tĩnh",
    districtName: "Quận Bình Thạnh",
    isDefault: false,
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeDefaultAddress(addresses: Address[]): Address[] {
  const defaultIndex = addresses.findIndex((address) => address.isDefault);

  if (addresses.length === 0) return [];
  if (defaultIndex === -1) {
    return addresses.map((address, index) => ({
      ...address,
      isDefault: index === 0,
    }));
  }

  return addresses.map((address, index) => ({
    ...address,
    isDefault: index === defaultIndex,
  }));
}

export function initializeAddresses() {
  if (!isBrowser()) return;

  const hasExistingValue = window.localStorage.getItem(ADDRESSES_STORAGE_KEY) !== null;
  if (!hasExistingValue) {
    saveAddresses(demoAddresses);
  }
}

export function loadAddresses(): Address[] {
  if (!isBrowser()) return [];

  try {
    const rawValue = window.localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue) as Address[];
    if (!Array.isArray(parsed)) return [];

    return normalizeDefaultAddress(
      parsed
        .filter(
          (address) =>
            address &&
            address.id &&
            address.fullName &&
            address.phone &&
            (address.provinceName || address.province) &&
            (address.wardName || address.ward) &&
            (address.streetAddress || address.detailAddress),
        )
        .map((address) => ({
          ...address,
          provinceCode: address.provinceCode || "",
          provinceName: address.provinceName || address.province || "",
          wardCode: address.wardCode || "",
          wardName: address.wardName || address.ward || "",
          streetAddress: address.streetAddress || address.detailAddress || "",
          districtName: address.districtName || address.district,
        })),
    );
  } catch {
    return [];
  }
}

export function saveAddresses(addresses: Address[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    ADDRESSES_STORAGE_KEY,
    JSON.stringify(normalizeDefaultAddress(addresses)),
  );
}

export function addAddress(address: Address) {
  const currentAddresses = loadAddresses();
  const nextAddresses = address.isDefault
    ? [
        ...currentAddresses.map((currentAddress) => ({
          ...currentAddress,
          isDefault: false,
        })),
        address,
      ]
    : [...currentAddresses, address];

  saveAddresses(nextAddresses);
}

export function updateAddress(address: Address) {
  const nextAddresses = loadAddresses().map((currentAddress) =>
    currentAddress.id === address.id ? address : currentAddress,
  );

  saveAddresses(
    address.isDefault
      ? nextAddresses.map((currentAddress) => ({
          ...currentAddress,
          isDefault: currentAddress.id === address.id,
        }))
      : nextAddresses,
  );
}

export function removeAddress(addressId: string) {
  saveAddresses(loadAddresses().filter((address) => address.id !== addressId));
}

export function setDefaultAddress(addressId: string) {
  saveAddresses(
    loadAddresses().map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    })),
  );
}

export function getTotalAddresses(addresses = loadAddresses()) {
  return addresses.length;
}
