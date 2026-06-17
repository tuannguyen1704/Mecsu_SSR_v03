"use client";

import { useState, useEffect } from "react";
import { X, Save, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserBusinessInfo } from "../types/account";

interface BusinessInfoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UserBusinessInfo;
  onSave: (data: UserBusinessInfo) => void;
}

export function BusinessInfoEditModal({
  isOpen,
  onClose,
  data,
  onSave,
}: BusinessInfoEditModalProps) {
  const [formData, setFormData] = useState<UserBusinessInfo>(data);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserBusinessInfo, string>>
  >({});

  useEffect(() => {
    if (isOpen) {
      const timeoutId = window.setTimeout(() => {
        setFormData(data);
        setErrors({});
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [data, isOpen]);

  const handleChange = (field: keyof UserBusinessInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserBusinessInfo, string>> = {};

    if (
      formData.taxCode &&
      !/^[0-9]{10,14}$/.test(formData.taxCode)
    ) {
      newErrors.taxCode = "Mã số thuế không hợp lệ (10-14 số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[401] flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5EAF2] bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Building2 size={20} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Chỉnh sửa thông tin doanh nghiệp
                </h2>
                <p className="text-xs text-slate-500">
                  Cập nhật thông tin công ty của bạn
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 transition-colors hover:bg-slate-100"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <form
            onSubmit={handleSubmit}
            className="max-h-[calc(90vh-140px)] overflow-y-auto p-6"
          >
            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tên công ty
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full rounded-xl border border-[#E5EAF2] bg-white px-4 py-2.5 text-sm transition-colors focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20"
                  placeholder="Tên công ty"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  value={formData.taxCode}
                  onChange={(e) => handleChange("taxCode", e.target.value)}
                  className={cn(
                    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors",
                    "focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20",
                    errors.taxCode ? "border-red-400" : "border-[#E5EAF2]"
                  )}
                  placeholder="0123456789"
                />
                {errors.taxCode && (
                  <p className="mt-1 text-xs text-red-500">{errors.taxCode}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Địa chỉ công ty
                </label>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={(e) =>
                    handleChange("companyAddress", e.target.value)
                  }
                  className="w-full rounded-xl border border-[#E5EAF2] bg-white px-4 py-2.5 text-sm transition-colors focus:border-[#163F78] focus:outline-none focus:ring-2 focus:ring-[#163F78]/20"
                  placeholder="Địa chỉ đầy đủ của công ty"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E5EAF2] pt-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#E5EAF2] px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#163F78] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a4a8a] shadow-sm"
              >
                <Save size={16} />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6L5 9L10 3"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-800">
              Cập nhật thông tin doanh nghiệp thành công!
            </p>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="ml-2 rounded-lg p-1 transition-colors hover:bg-green-100"
            >
              <X size={14} className="text-green-600" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
