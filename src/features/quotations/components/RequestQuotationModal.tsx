"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  FileText,
  Info,
  Loader2,
  Mail,
  Package,
  Phone,
  Plus,
  Send,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type {
  Priority,
  ProductUnit,
  Quotation,
  QuotationRequestItem,
} from "../types/quotation";
import { createQuotationFromRequest } from "../services/quotation-storage";

interface RequestQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (quotation: Quotation) => void;
  duplicateFrom?: Quotation | null;
  initialItems?: QuotationRequestItem[] | null;
  initialRequestName?: string;
}

type ProductSuggestion = {
  name: string;
  sku: string;
  category: string;
  unit: ProductUnit;
};

const unitOptions: { value: ProductUnit; label: string }[] = [
  { value: "cái", label: "cái" },
  { value: "bộ", label: "bộ" },
  { value: "hộp", label: "hộp" },
  { value: "mét", label: "mét" },
  { value: "kg", label: "kg" },
  { value: "bịch", label: "bịch" },
];

const priorityOptions: { value: Priority; label: string }[] = [
  { value: "normal", label: "Bình thường" },
  { value: "urgent", label: "Cần sớm" },
  { value: "critical", label: "Gấp" },
];

const mockProducts: ProductSuggestion[] = [
  { name: "SKF 6205 ZZ", sku: "SKF6205ZZ", category: "Vòng bi", unit: "cái" },
  { name: "ABB Motor 3-Phase 1.5kW", sku: "ABB3Motor15KW", category: "Motor", unit: "cái" },
  { name: "Mitsubishi PLC FX3U-32MT", sku: "MTSFX3U32MT", category: "PLC", unit: "cái" },
  { name: "Siemens Contactor 3TF52", sku: "SIE3TF52", category: "Contactor", unit: "cái" },
  { name: "Omron Sensor E3Z", sku: "OMRE3Z", category: "Cảm biến", unit: "cái" },
  { name: "Bulong Inox 304 DIN933 M3x20", sku: "B01M1001035TH01", category: "Bulong", unit: "cái" },
  { name: "Phe Gài Trục Thép 65Mn DIN471 D3x0.4", sku: "B01M1001035TH00", category: "Phe gài", unit: "bịch" },
];

function createEmptyItem(): QuotationRequestItem {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    productName: "",
    productCode: "",
    quantity: 1,
    unit: "cái",
    notes: "",
  };
}

function createItemsFromQuotation(quotation: Quotation): QuotationRequestItem[] {
  return quotation.items.map((item) => ({
    id: `item-copy-${item.id}-${Date.now()}`,
    productName: item.name,
    productCode: item.sku,
    quantity: item.quantity,
    unit: item.unit,
    notes: item.notes || "",
  }));
}

export function RequestQuotationModal({
  isOpen,
  onClose,
  onSuccess,
  duplicateFrom,
  initialItems,
  initialRequestName,
}: RequestQuotationModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasInitializedOpenRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [desiredDeadline, setDesiredDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [items, setItems] = useState<QuotationRequestItem[]>([createEmptyItem()]);
  const [generalNotes, setGeneralNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [submittedQuotation, setSubmittedQuotation] = useState<Quotation | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const handleClose = useCallback(() => {
    if (isDirty && !submittedQuotation) {
      const confirmed = window.confirm(
        "Bạn có chắc muốn đóng? Dữ liệu chưa được lưu sẽ bị mất.",
      );
      if (!confirmed) return;
    }
    onClose();
  }, [isDirty, onClose, submittedQuotation]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      hasInitializedOpenRef.current = false;
      return;
    }

    if (hasInitializedOpenRef.current) return;
    hasInitializedOpenRef.current = true;

    const timer = window.setTimeout(() => {
      if (duplicateFrom) {
        setRequestName(`${duplicateFrom.requestName} - tạo lại`);
        setDesiredDeadline("");
        setPriority(duplicateFrom.priority || "normal");
        setItems(createItemsFromQuotation(duplicateFrom));
        setGeneralNotes(duplicateFrom.generalNotes || "");
        setIsDirty(true);
        setSubmittedQuotation(null);
        setFiles([]);
        setErrors({});
        return;
      }

      if (initialItems && initialItems.length > 0) {
        setRequestName(initialRequestName || "Báo giá từ giỏ hàng");
        setDesiredDeadline("");
        setPriority("normal");
        setItems(initialItems);
        setGeneralNotes("Yêu cầu báo giá từ giỏ hàng.");
        setFiles([]);
        setErrors({});
        setIsSubmitting(false);
        setIsDirty(true);
        setSubmittedQuotation(null);
        setShowSuggestions(null);
        return;
      }

      setRequestName("");
      setDesiredDeadline("");
      setPriority("normal");
      setItems([createEmptyItem()]);
      setGeneralNotes("");
      setFiles([]);
      setErrors({});
      setIsSubmitting(false);
      setIsDirty(false);
      setSubmittedQuotation(null);
      setShowSuggestions(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [duplicateFrom, initialItems, initialRequestName, isOpen]);

  const summary = useMemo(
    () => ({
      lineCount: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      fileCount: files.length,
      priority: priorityOptions.find((option) => option.value === priority)?.label,
    }),
    [files.length, items, priority],
  );

  const handleAddItem = () => {
    markDirty();
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const handleRemoveItem = (id: string) => {
    markDirty();
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const handleUpdateItem = (
    id: string,
    field: keyof QuotationRequestItem,
    value: string | number,
  ) => {
    markDirty();
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleProductNameChange = (id: string, value: string) => {
    handleUpdateItem(id, "productName", value);

    if (value.length >= 2) {
      setSuggestions(
        mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.sku.toLowerCase().includes(value.toLowerCase()),
        ),
      );
      setShowSuggestions(id);
    } else {
      setShowSuggestions(null);
    }
  };

  const handleSelectProduct = (itemId: string, product: ProductSuggestion) => {
    markDirty();
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              productName: product.name,
              productCode: product.sku,
              unit: product.unit,
            }
          : item,
      ),
    );
    setShowSuggestions(null);
  };

  const validateAndAddFiles = (newFiles: File[]) => {
    markDirty();
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "image/png",
      "image/jpeg",
    ];

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    newFiles.forEach((file) => {
      if (file.size > maxSize) {
        invalidFiles.push(`${file.name} (quá 10MB)`);
      } else if (!allowedTypes.includes(file.type)) {
        invalidFiles.push(`${file.name} (định dạng không hỗ trợ)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        files: `Không thể tải: ${invalidFiles.join(", ")}`,
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, files: "" }));
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!requestName.trim()) {
      nextErrors.requestName = "Vui lòng nhập tên yêu cầu";
    }

    items.forEach((item, index) => {
      if (!item.productName.trim()) {
        nextErrors[`item_${index}_name`] = "Vui lòng nhập tên sản phẩm";
      }
      if (!item.quantity || item.quantity < 1) {
        nextErrors[`item_${index}_qty`] = "Số lượng phải lớn hơn 0";
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      const newQuotation = createQuotationFromRequest({
        requestName,
        desiredDeadline,
        priority,
        items,
        generalNotes,
        attachmentNames: files.map((file) => file.name),
        contactInfo: {
          name: "Nguyễn Văn A",
          phone: "0900 000 000",
          email: "customer@mecsu.vn",
        },
      });

      setSubmittedQuotation(newQuotation);
      setIsDirty(false);
      onSuccess(newQuotation);
    } catch {
      setErrors({ submit: "Không thể gửi yêu cầu. Vui lòng thử lại." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNew = () => {
    setSubmittedQuotation(null);
    setRequestName("");
    setDesiredDeadline("");
    setPriority("normal");
    setItems([createEmptyItem()]);
    setGeneralNotes("");
    setFiles([]);
    setErrors({});
    setIsDirty(false);
  };

  if (!isOpen || typeof document === "undefined") return null;

  const content = submittedQuotation ? (
    <ModalFrame maxWidth="max-w-[520px]" onBackdropClick={onClose}>
      <div className="max-h-[calc(100dvh-48px)] overflow-y-auto p-8">
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ECFDF5]">
            <CheckCircle size={40} className="text-[#16A34A]" />
          </div>
          <h2 className="mb-2 text-[22px] font-extrabold text-[#173E75]">
            Yêu cầu báo giá đã được gửi thành công
          </h2>
          <p className="mb-6 max-w-[360px] text-sm leading-6 text-slate-500">
            Đội ngũ MECSU đã nhận được yêu cầu của bạn và sẽ phản hồi trong thời
            gian sớm nhất.
          </p>
          <div className="mb-6 rounded-xl border border-[#E5EAF2] bg-[#F8FAFD] px-6 py-4">
            <p className="mb-1 text-xs text-slate-500">Mã yêu cầu</p>
            <p className="text-xl font-bold text-[#173E75]">
              {submittedQuotation.code}
            </p>
          </div>
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <span>Phụ trách:</span>
            <span className="font-semibold text-[#173E75]">
              {submittedQuotation.salesRep.name}
            </span>
          </div>
          <div className="flex w-full max-w-[340px] flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push("/tai-khoan");
              }}
              className="h-11 flex-1 rounded-[14px] border border-[#E8B93A] bg-[#F4C84A] font-extrabold text-[#173E75] transition-colors hover:bg-[#E8B93A]"
            >
              Về tài khoản
            </button>
            <button
              type="button"
              onClick={handleCreateNew}
              className="h-11 flex-1 rounded-[14px] border border-[#DDE5F0] bg-white font-semibold text-slate-700 transition-colors hover:bg-[#F6F8FC]"
            >
              Tạo yêu cầu mới
            </button>
          </div>
        </div>
      </div>
    </ModalFrame>
  ) : (
    <ModalFrame maxWidth="max-w-[720px]" onBackdropClick={handleClose}>
      <div className="max-h-[calc(100dvh-48px)] overflow-y-auto">
        <div className="px-7 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-extrabold text-[#173E75]">
                Yêu cầu báo giá mới
              </h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Gửi danh sách sản phẩm cần báo giá, đội ngũ MECSU sẽ phản hồi
                trong thời gian sớm nhất.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] text-slate-500 transition-colors hover:bg-[#EEF3FA]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="mx-7 mb-5 flex items-start gap-3 rounded-[14px] border border-[#D9E5F6] bg-[#F8FAFD] p-4">
          <Clock size={20} className="mt-0.5 shrink-0 text-[#4F7FC3]" />
          <div>
            <p className="text-sm font-semibold text-[#173E75]">
              Thời gian phản hồi dự kiến
            </p>
            <p className="mt-1 text-[13px] leading-5 text-slate-500">
              Đội ngũ MECSU sẽ phản hồi yêu cầu báo giá trong vòng 4-24 giờ làm
              việc.
            </p>
          </div>
        </div>

        {errors.submit ? (
          <div className="px-7 pb-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {errors.submit}
            </div>
          </div>
        ) : null}

        <div className="space-y-6 px-7 pb-6">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <FileText size={16} className="text-[#4F7FC3]" />
              <h3 className="text-[15px] font-bold text-[#173E75]">
                Thông tin yêu cầu
              </h3>
            </div>
            <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
              <FieldError error={errors.requestName}>
                <input
                  type="text"
                  placeholder="VD: Báo giá linh kiện điện tử tháng 6"
                  value={requestName}
                  onChange={(event) => {
                    markDirty();
                    setRequestName(event.target.value);
                  }}
                  className={inputClass(Boolean(errors.requestName))}
                />
              </FieldError>
              <input
                type="date"
                value={desiredDeadline}
                onChange={(event) => {
                  markDirty();
                  setDesiredDeadline(event.target.value);
                }}
                className={inputClass(false)}
              />
              <select
                value={priority}
                onChange={(event) => {
                  markDirty();
                  setPriority(event.target.value as Priority);
                }}
                className={inputClass(false)}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <div className="mb-2 flex items-center gap-2">
              <Package size={16} className="text-[#4F7FC3]" />
              <h3 className="text-[15px] font-bold text-[#173E75]">
                Sản phẩm cần báo giá
              </h3>
            </div>
            <p className="mb-4 text-[13px] text-slate-500">
              Thêm từng sản phẩm, số lượng và thông tin kỹ thuật nếu có.
            </p>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-4 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#173E75]">
                      Sản phẩm #{index + 1}
                    </span>
                    {items.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5EAF2] bg-white transition-colors hover:bg-red-50"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    ) : null}
                  </div>

                  <div className="relative mb-3">
                    <FieldError error={errors[`item_${index}_name`]}>
                      <input
                        type="text"
                        placeholder="Nhập tên hoặc mã sản phẩm"
                        value={item.productName}
                        onChange={(event) =>
                          handleProductNameChange(item.id, event.target.value)
                        }
                        className={inputClass(Boolean(errors[`item_${index}_name`]))}
                      />
                    </FieldError>
                    {showSuggestions === item.id && suggestions.length > 0 ? (
                      <div className="absolute left-0 top-[48px] z-20 max-h-[220px] w-full overflow-y-auto rounded-xl border border-[#E5EAF2] bg-white shadow-lg">
                        {suggestions.map((product) => (
                          <button
                            type="button"
                            key={product.sku}
                            onClick={() => handleSelectProduct(item.id, product)}
                            className="flex w-full items-center gap-3 border-b border-[#F1F5F9] px-4 py-3 text-left transition-colors last:border-0 hover:bg-[#F8FAFD]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFD]">
                              <Package size={16} className="text-[#4F7FC3]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-[#173E75]">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                SKU: {product.sku} • {product.category}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <FieldError error={errors[`item_${index}_qty`]}>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleUpdateItem(
                            item.id,
                            "quantity",
                            Number.parseInt(event.target.value, 10) || 1,
                          )
                        }
                        className={cn(inputClass(Boolean(errors[`item_${index}_qty`])), "sm:w-[140px]")}
                      />
                    </FieldError>
                    <select
                      value={item.unit}
                      onChange={(event) =>
                        handleUpdateItem(item.id, "unit", event.target.value)
                      }
                      className={cn(inputClass(false), "sm:w-[140px]")}
                    >
                      {unitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Thương hiệu, model, xuất xứ, thông số kỹ thuật..."
                    value={item.notes || ""}
                    onChange={(event) =>
                      handleUpdateItem(item.id, "notes", event.target.value)
                    }
                    className={cn(inputClass(false), "mt-3")}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddItem}
              className="mt-4 flex h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-[#D9E5F6] bg-white font-semibold text-[#173E75] transition-colors hover:bg-[#F6F8FC]"
            >
              <Plus size={16} />
              Thêm sản phẩm
            </button>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <Info size={16} className="text-[#4F7FC3]" />
              <h3 className="text-[15px] font-bold text-[#173E75]">
                Thông tin bổ sung
              </h3>
            </div>

            <textarea
              placeholder="Nhập yêu cầu đặc biệt, thời gian giao hàng, điều kiện thanh toán..."
              value={generalNotes}
              onChange={(event) => {
                markDirty();
                setGeneralNotes(event.target.value);
              }}
              className="h-[110px] w-full resize-none rounded-xl border border-[#DDE5F0] bg-white px-3.5 py-3 text-sm text-[#173E75] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#4F7FC3] focus:ring-4 focus:ring-[rgba(79,127,195,0.12)]"
            />

            <div
              role="button"
              tabIndex={0}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                validateAndAddFiles(Array.from(event.dataTransfer.files));
              }}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              className={cn(
                "mt-4 cursor-pointer rounded-2xl border border-dashed p-6 text-center transition-colors",
                isDragging
                  ? "border-[#4F7FC3] bg-blue-50"
                  : "border-[#BFD3F2] bg-[#F8FAFD] hover:border-[#4F7FC3]",
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(event) =>
                  validateAndAddFiles(Array.from(event.target.files || []))
                }
                className="hidden"
              />
              <Upload size={24} className="mx-auto mb-2 text-[#4F7FC3]" />
              <p className="text-sm text-slate-500">
                Kéo thả file hoặc bấm để tải lên
              </p>
              <p className="mt-1 text-xs text-slate-400">
                PDF, Excel, Word, PNG, JPG (tối đa 10MB)
              </p>
            </div>
            {errors.files ? (
              <p className="mt-1 text-[13px] text-red-600">{errors.files}</p>
            ) : null}

            {files.length > 0 ? (
              <div className="mt-3 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center justify-between rounded-xl border border-[#E5EAF2] bg-white px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FileText size={18} className="shrink-0 text-[#4F7FC3]" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#173E75]">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-4 rounded-2xl border border-[#E5EAF2] bg-[#F8FAFD] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-[#4F7FC3]" />
                  <span className="text-sm font-semibold text-[#173E75]">
                    Thông tin liên hệ
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/tai-khoan/thong-tin-ca-nhan")}
                  className="text-[13px] text-[#4F7FC3] hover:underline"
                >
                  Chỉnh sửa
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4F7FC3] text-lg font-bold text-white">
                  N
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#173E75]">
                      Nguyễn Văn A
                    </span>
                    <span className="rounded-full bg-[#F4C84A] px-2 py-0.5 text-[10px] font-bold text-[#173E75]">
                      VIP
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone size={12} />
                      0900 000 000
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={12} />
                      customer@mecsu.vn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="border-t border-[#E5EAF2] bg-[#F8FAFD] px-7 py-2.5">
          <p className="text-center text-[13px] text-slate-500">
            {summary.lineCount} sản phẩm • {summary.totalQuantity} số lượng •{" "}
            {summary.fileCount} tệp đính kèm • Ưu tiên: {summary.priority}
          </p>
        </div>

        <div className="sticky bottom-0 border-t border-[#E5EAF2] bg-white px-7 py-3.5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[360px] text-xs leading-5 text-slate-500">
              MECSU sẽ phản hồi báo giá qua email hoặc số điện thoại đã đăng ký.
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-11 rounded-xl border border-[#DDE5F0] bg-white px-5 font-semibold text-slate-700 transition-colors hover:bg-[#F6F8FC] disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex h-11 items-center gap-2 rounded-xl border border-[#E8B93A] bg-[#F4C84A] px-5 font-bold text-[#173E75] transition-colors hover:bg-[#E8B93A] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Gửi yêu cầu
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalFrame>
  );

  return createPortal(content, document.body);
}

function ModalFrame({
  children,
  maxWidth,
  onBackdropClick,
}: {
  children: React.ReactNode;
  maxWidth: string;
  onBackdropClick: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Đóng modal"
        className="absolute inset-0 bg-slate-950/60"
        onClick={onBackdropClick}
      />
      <div className="relative z-10 flex min-h-dvh items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "w-[calc(100vw-32px)] overflow-hidden rounded-[22px] border border-[#E5EAF2] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]",
            maxWidth,
          )}
          style={{ maxHeight: "calc(100dvh - 48px)" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-[#173E75] outline-none transition-all placeholder:text-[#94A3B8] focus:ring-4",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-[#DDE5F0] focus:border-[#4F7FC3] focus:ring-[rgba(79,127,195,0.12)]",
  );
}

function FieldError({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      {error ? <p className="mt-1 text-[13px] text-red-600">{error}</p> : null}
    </div>
  );
}
