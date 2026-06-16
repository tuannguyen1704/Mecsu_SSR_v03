import {
  BadgeCheck,
  CheckCircle2,
  PackageCheck,
  Settings,
  Truck,
  XCircle,
} from "lucide-react";
import type { AccountOrderDetail } from "../types/account";

const timelineIcons = {
  pending: CheckCircle2,
  processing: Settings,
  shipping: Truck,
  completed: BadgeCheck,
  cancelled: XCircle,
};

interface OrderDetailTimelineProps {
  order: AccountOrderDetail;
}

export function OrderDetailTimeline({ order }: OrderDetailTimelineProps) {
  const isCancelled = order.status === "cancelled";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-6">
      <div className="mb-6 flex items-center gap-3">
        <PackageCheck size={20} className="text-[#163F78]" />
        <h2 className="text-lg font-bold text-slate-900">Trạng thái đơn hàng</h2>
      </div>

      {isCancelled ? (
        <div className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
            <XCircle size={22} />
          </div>
          <div>
            <p className="font-bold text-red-700">Đã hủy</p>
            <p className="mt-1 text-sm text-red-600">
              Đơn hàng đã được hủy. Vui lòng liên hệ hỗ trợ nếu bạn cần thêm thông tin.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-5 bottom-5 left-5 hidden w-0.5 bg-slate-200 md:block" />
          <div className="grid gap-4 md:grid-cols-4 md:gap-3">
            {order.timeline.map((step, index) => {
              const Icon = timelineIcons[step.id as keyof typeof timelineIcons] ?? CheckCircle2;
              const isDone = step.completed || step.active;

              return (
                <div
                  key={step.id}
                  className="relative flex gap-3 rounded-xl border border-[#E5EAF2] bg-white p-3 md:block md:border-0 md:bg-transparent md:p-0"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-sm md:mx-auto">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-full ${
                        isDone ? "bg-[#163F78] text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="min-w-0 md:mt-3 md:text-center">
                    <p
                      className={`text-sm font-bold ${
                        isDone ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-400">{step.date}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500 md:px-1">
                      {step.description}
                    </p>
                  </div>
                  {index < order.timeline.length - 1 ? (
                    <div
                      className={`absolute top-5 left-[calc(50%+1.25rem)] hidden h-0.5 w-[calc(100%-2.5rem)] md:block ${
                        step.completed ? "bg-[#163F78]" : "bg-slate-200"
                      }`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
