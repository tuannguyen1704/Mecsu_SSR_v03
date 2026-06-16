"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PackageSearch, Plus } from "lucide-react";
import {
  mockReturnRequests,
  returnStatusFilters,
} from "../data/returns";
import type { ReturnRequestStatus } from "../types/return";
import { CreateReturnModal } from "./CreateReturnModal";
import { ReturnRequestCard } from "./ReturnRequestCard";

type ReturnFilter = "all" | ReturnRequestStatus;

export function ReturnsListClient() {
  const [activeFilter, setActiveFilter] = useState<ReturnFilter>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") {
      return mockReturnRequests;
    }

    return mockReturnRequests.filter((request) => request.status === activeFilter);
  }, [activeFilter]);

  const getStatusCount = (status: ReturnFilter) => {
    if (status === "all") {
      return mockReturnRequests.length;
    }

    return mockReturnRequests.filter((request) => request.status === status).length;
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              Đổi trả
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý các yêu cầu đổi trả của bạn.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#163F78] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a] sm:w-auto"
          >
            <Plus size={18} />
            Tạo yêu cầu đổi trả
          </button>
        </div>

        <div className="rounded-2xl border border-[#E5EAF2] bg-white p-3 lg:p-4">
          <div className="flex flex-wrap gap-2">
            {returnStatusFilters.map((option) => {
              const isActive = activeFilter === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveFilter(option.value)}
                  className={`h-10 whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#163F78] text-white shadow-[0_0_0_3px_rgba(156,185,229,0.8)]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                  <span className="ml-1.5 text-xs opacity-70">
                    ({getStatusCount(option.value)})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <ReturnRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5EAF2] bg-white p-8 text-center lg:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <PackageSearch size={40} className="text-slate-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-800">
              Bạn chưa có yêu cầu đổi trả nào
            </h3>
            <p className="mx-auto mb-6 max-w-md text-slate-500">
              Nếu bạn cần đổi hoặc trả sản phẩm từ đơn hàng đã nhận, hãy tạo yêu cầu đổi trả tại đây.
            </p>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FFC72C] px-6 text-sm font-bold text-[#111827] transition-colors hover:bg-[#E8B931]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>

      <CreateReturnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
