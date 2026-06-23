"use client";

import { Edit2, MapPin, Phone, Star, Trash2, User } from "lucide-react";
import type { Address } from "../types/address";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}

export function formatFullAddress(address: Address) {
  return [
    address.streetAddress || address.detailAddress,
    address.wardName || address.ward,
    address.districtName || address.district,
    address.provinceName || address.province,
  ].filter(Boolean).join(", ");
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {address.isDefault ? (
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              <Star size={10} />
              Mặc định
            </span>
          ) : null}
          {(address.districtName || address.district) && !address.wardCode ? (
            <span className="mb-2 ml-2 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              Cần cập nhật địa chỉ mới
            </span>
          ) : null}
          <div className="flex items-start gap-2">
            <User size={16} className="mt-0.5 shrink-0 text-slate-400" />
            <div>
              <h2 className="font-bold text-slate-900">{address.fullName}</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600">
                <Phone size={13} />
                {address.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-2">
        <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="text-sm leading-6 text-slate-600">{formatFullAddress(address)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#163F78]"
        >
          <Edit2 size={14} />
          Chỉnh sửa
        </button>
        <button
          type="button"
          onClick={() => onDelete(address)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={14} />
          Xóa
        </button>
        {!address.isDefault ? (
          <button
            type="button"
            onClick={() => onSetDefault(address)}
            className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#163F78]"
          >
            <Star size={14} />
            Đặt mặc định
          </button>
        ) : null}
      </div>
    </article>
  );
}
