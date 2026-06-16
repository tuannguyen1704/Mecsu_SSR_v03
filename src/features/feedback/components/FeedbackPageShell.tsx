import Link from "next/link";
import { ArrowRight, HeadphonesIcon, Lightbulb, ShieldCheck } from "lucide-react";
import { feedbackCategoryCards } from "../data/feedback";
import { FeedbackFormClient } from "./FeedbackFormClient";

export function FeedbackPageShell() {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-2xl bg-[#163F78] p-5 text-white shadow-[0_16px_40px_rgba(22,63,120,0.18)] lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white/90">
              <Lightbulb size={14} />
              Phản hồi khách hàng
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-tight lg:text-3xl">Góp ý</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 lg:text-[15px]">
              Chia sẻ trải nghiệm của bạn để Mecsu cải thiện dịch vụ.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EABF3B] text-[#111827]">
                <ShieldCheck size={21} />
              </div>
              <div>
                <p className="text-sm font-bold">Cam kết ghi nhận</p>
                <p className="mt-1 text-xs leading-5 text-white/75">
                  Mọi góp ý được dùng để cải thiện trải nghiệm mua hàng và hỗ trợ khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {feedbackCategoryCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
            <h2 className="text-base font-bold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p>
          </article>
        ))}
      </section>

      <FeedbackFormClient />

      <section className="rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FB] text-[#163F78]">
              <HeadphonesIcon size={21} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cần hỗ trợ gấp?</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Nếu vấn đề cần xử lý ngay, hãy liên hệ đội ngũ dịch vụ khách hàng của Mecsu.
              </p>
            </div>
          </div>
          <Link
            href="/dich-vu-khach-hang"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#EABF3B] px-5 text-sm font-bold text-[#111827] transition-colors hover:bg-[#d8ad2c]"
          >
            Liên hệ dịch vụ khách hàng
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
