"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, CircleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[500] rounded-2xl border px-5 py-4 shadow-xl",
        type === "success"
          ? "border-green-200 bg-green-50 text-green-800"
          : type === "error"
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-blue-200 bg-blue-50 text-blue-800"
      )}
    >
      <div className="flex items-center gap-3">
        {type === "success" && (
          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
        )}
        {type === "error" && (
          <CircleAlert size={18} className="text-red-600 shrink-0" />
        )}
        {type === "info" && (
          <CircleAlert size={18} className="text-blue-600 shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 shrink-0 rounded-lg p-1 transition-colors hover:bg-black/10"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

type UseToastReturn = {
  toast: { show: boolean; message: string; type: ToastType };
  setToast: (toast: { show: boolean; message: string; type: ToastType }) => void;
  ToastComponent: () => React.ReactNode;
};

export function useToast(): UseToastReturn {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: ToastType;
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const ToastComponent = () => {
    if (!toast.show) return <></>;
    return (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    );
  };

  return { toast, setToast, ToastComponent };
}
