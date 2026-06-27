"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, MapPin, Plus, Trash2 } from "lucide-react";
import {
  addAddress,
  getTotalAddresses,
  initializeAddresses,
  loadAddresses,
  removeAddress,
  setDefaultAddress,
  updateAddress,
} from "../services/address-storage";
import type { Address, AddressFormData } from "../types/address";
import { AddressCard } from "./AddressCard";
import { AddressFormModal } from "./AddressFormModal";

const initialFormData: AddressFormData = {
  fullName: "",
  phone: "",
  provinceCode: "",
  provinceName: "",
  wardCode: "",
  wardName: "",
  streetAddress: "",
  note: "",
  isDefault: false,
};

function validateAddress(formData: AddressFormData) {
  const errors: Partial<Record<keyof AddressFormData, string>> = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên";
  }
  if (!formData.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại";
  } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
    errors.phone = "Số điện thoại không hợp lệ";
  }
  if (!formData.provinceCode || !formData.provinceName) {
    errors.provinceCode = "Vui lòng chọn tỉnh/thành phố";
  }
  if (!formData.wardCode || !formData.wardName) {
    errors.wardCode = "Vui lòng chọn phường/xã";
  }
  if (!formData.streetAddress.trim()) {
    errors.streetAddress = "Vui lòng nhập địa chỉ cụ thể";
  }

  return errors;
}

function addressToFormData(address: Address): AddressFormData {
  return {
    fullName: address.fullName,
    phone: address.phone,
    provinceCode: address.provinceCode || "",
    provinceName: address.provinceName || address.province || "",
    wardCode: address.wardCode || "",
    wardName: address.wardName || address.ward || "",
    streetAddress: address.streetAddress || address.detailAddress || "",
    note: address.note || "",
    districtCode: address.districtCode,
    districtName: address.districtName || address.district,
    isDefault: address.isDefault,
  };
}

export function AddressesClient() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    initializeAddresses();
    const timeoutId = window.setTimeout(() => setAddresses(loadAddresses()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeoutId = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const totalAddresses = useMemo(() => getTotalAddresses(addresses), [addresses]);

  const refreshAddresses = () => setAddresses(loadAddresses());

  const handleOpenCreate = () => {
    setEditingAddress(null);
    setFormData({ ...initialFormData, isDefault: addresses.length === 0 });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData(addressToFormData(address));
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = () => {
    const nextErrors = validateAddress(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const normalizedAddress: Address = {
      id: editingAddress?.id || `addr-${Date.now()}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      provinceCode: formData.provinceCode,
      provinceName: formData.provinceName,
      wardCode: formData.wardCode,
      wardName: formData.wardName,
      streetAddress: formData.streetAddress.trim(),
      note: formData.note.trim() || undefined,
      districtCode: editingAddress?.districtCode,
      districtName: editingAddress?.districtName || editingAddress?.district,
      isDefault: formData.isDefault || addresses.length === 0,
    };

    if (editingAddress) {
      updateAddress(normalizedAddress);
      setToast("Đã cập nhật địa chỉ");
    } else {
      addAddress(normalizedAddress);
      setToast("Đã thêm địa chỉ mới");
    }

    refreshAddresses();
    handleCloseModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    removeAddress(deleteTarget.id);
    refreshAddresses();
    setDeleteTarget(null);
    setToast("Đã xóa địa chỉ");
  };

  const handleSetDefault = (address: Address) => {
    setDefaultAddress(address.id);
    refreshAddresses();
    setToast("Đã đặt địa chỉ mặc định");
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              Địa chỉ của tôi
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý địa chỉ giao hàng để thanh toán và giao hàng nhanh hơn.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a] sm:w-auto"
          >
            <Plus size={18} />
            Thêm địa chỉ
          </button>
        </div>

        <div className="rounded-2xl border border-[#E5EAF2] bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F8FB]">
                <Home size={20} className="text-[#163F78]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#163F78]">{totalAddresses}</p>
                <p className="text-sm text-slate-500">Tổng số địa chỉ</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Những địa chỉ này được lưu tạm trong trình duyệt và được chuẩn bị cho tích hợp checkout ở phase sau.
            </p>
          </div>
        </div>

        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleOpenEdit}
                onDelete={setDeleteTarget}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-12">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <MapPin size={40} className="text-slate-300" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-slate-800">
                Bạn chưa có địa chỉ nào
              </h2>
              <p className="mb-6 text-slate-500">
                Thêm địa chỉ để Mecsu có thể giao hàng nhanh và chính xác hơn.
              </p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 rounded-xl bg-[#EABF3B] px-6 py-3 text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#D9AF2F]"
              >
                <Plus size={18} />
                Thêm địa chỉ
              </button>
            </div>
          </div>
        )}
      </div>

      <AddressFormModal
        isOpen={isModalOpen}
        editingAddress={editingAddress}
        formData={formData}
        errors={errors}
        onChange={setFormData}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {deleteTarget ? (
        <div className="fixed inset-0 z-[550] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Đóng xác nhận xóa địa chỉ"
            className="absolute inset-0 bg-slate-950/60"
            onClick={() => setDeleteTarget(null)}
          />
          <section
            className="relative w-full max-w-sm rounded-2xl border border-[#E5EAF2] bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
            role="dialog"
            aria-modal="true"
            aria-label="Xác nhận xóa địa chỉ"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h2 className="mb-2 text-center text-lg font-bold text-slate-900">
              Xóa địa chỉ
            </h2>
            <p className="mb-6 text-center text-sm leading-6 text-slate-600">
              Bạn có chắc muốn xóa địa chỉ của {deleteTarget.fullName} không?
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="h-11 flex-1 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed right-4 bottom-4 z-[560] max-w-sm rounded-xl border border-[#D8E1EE] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-lg">
          {toast}
        </div>
      ) : null}
    </>
  );
}
