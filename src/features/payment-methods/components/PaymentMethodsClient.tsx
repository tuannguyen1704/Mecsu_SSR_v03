"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard, Plus, Trash2, Wallet } from "lucide-react";
import {
  addPaymentMethod,
  getTotalPaymentMethods,
  initializePaymentMethods,
  loadPaymentMethods,
  removePaymentMethod,
  setDefaultPaymentMethod,
  updatePaymentMethod,
} from "../services/payment-method-storage";
import type { PaymentMethod, PaymentMethodFormData } from "../types/payment-method";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { PaymentMethodFormModal } from "./PaymentMethodFormModal";

const initialFormData: PaymentMethodFormData = {
  type: "bank_transfer",
  displayName: "",
  accountName: "",
  maskedValue: "",
  isDefault: false,
};

function validatePaymentMethod(formData: PaymentMethodFormData) {
  const errors: Partial<Record<keyof PaymentMethodFormData, string>> = {};

  if (!formData.type) {
    errors.type = "Vui lòng chọn loại phương thức";
  }
  if (!formData.displayName.trim()) {
    errors.displayName = "Vui lòng nhập tên hiển thị";
  }
  if (!formData.accountName.trim()) {
    errors.accountName = "Vui lòng nhập chủ tài khoản";
  }
  if (!formData.maskedValue.trim()) {
    errors.maskedValue = "Vui lòng nhập giá trị hiển thị";
  }

  return errors;
}

function methodToFormData(method: PaymentMethod): PaymentMethodFormData {
  return {
    type: method.type,
    displayName: method.displayName,
    accountName: method.accountName,
    maskedValue: method.maskedValue,
    isDefault: method.isDefault,
  };
}

export function PaymentMethodsClient() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [formData, setFormData] = useState<PaymentMethodFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentMethodFormData, string>>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    initializePaymentMethods();
    const timeoutId = window.setTimeout(() => setMethods(loadPaymentMethods()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeoutId = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const totalMethods = useMemo(() => getTotalPaymentMethods(methods), [methods]);

  const refreshMethods = () => setMethods(loadPaymentMethods());

  const handleOpenCreate = () => {
    setEditingMethod(null);
    setFormData({ ...initialFormData, isDefault: methods.length === 0 });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData(methodToFormData(method));
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMethod(null);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = () => {
    const nextErrors = validatePaymentMethod(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const normalizedMethod: PaymentMethod = {
      id: editingMethod?.id || `pm-${Date.now()}`,
      type: formData.type,
      displayName: formData.displayName.trim(),
      accountName: formData.accountName.trim(),
      maskedValue: formData.maskedValue.trim(),
      isDefault: formData.isDefault || methods.length === 0,
    };

    if (editingMethod) {
      updatePaymentMethod(normalizedMethod);
      setToast("Đã cập nhật phương thức thanh toán");
    } else {
      addPaymentMethod(normalizedMethod);
      setToast("Đã thêm phương thức thanh toán");
    }

    refreshMethods();
    handleCloseModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    removePaymentMethod(deleteTarget.id);
    refreshMethods();
    setDeleteTarget(null);
    setToast("Đã xóa phương thức thanh toán");
  };

  const handleSetDefault = (method: PaymentMethod) => {
    setDefaultPaymentMethod(method.id);
    refreshMethods();
    setToast("Đã đặt phương thức mặc định");
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              Phương thức thanh toán
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý các phương thức thanh toán hiển thị cho tài khoản của bạn.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a] sm:w-auto"
          >
            <Plus size={18} />
            Thêm phương thức
          </button>
        </div>

        <div className="rounded-2xl border border-[#E5EAF2] bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F8FB]">
                <Wallet size={20} className="text-[#163F78]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#163F78]">{totalMethods}</p>
                <p className="text-sm text-slate-500">Tổng phương thức</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-500">
              Các phương thức này được lưu tạm trong trình duyệt và dành cho tích hợp checkout ở phase sau.
            </p>
          </div>
        </div>

        {methods.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {methods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
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
                <CreditCard size={40} className="text-slate-300" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-slate-800">
                Bạn chưa có phương thức thanh toán nào
              </h2>
              <p className="mb-6 text-slate-500">
                Thêm phương thức để chuẩn bị cho quy trình thanh toán nhanh hơn trong các phase sau.
              </p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 rounded-xl bg-[#EABF3B] px-6 py-3 text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-[#D9AF2F]"
              >
                <Plus size={18} />
                Thêm phương thức
              </button>
            </div>
          </div>
        )}
      </div>

      <PaymentMethodFormModal
        isOpen={isModalOpen}
        editingMethod={editingMethod}
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
            aria-label="Đóng xác nhận xóa phương thức"
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setDeleteTarget(null)}
          />
          <section
            className="relative w-full max-w-sm rounded-2xl border border-[#E5EAF2] bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.22)]"
            role="dialog"
            aria-modal="true"
            aria-label="Xác nhận xóa phương thức thanh toán"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h2 className="mb-2 text-center text-lg font-bold text-slate-900">
              Xóa phương thức
            </h2>
            <p className="mb-6 text-center text-sm leading-6 text-slate-600">
              Bạn có chắc muốn xóa phương thức {deleteTarget.displayName} không?
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
