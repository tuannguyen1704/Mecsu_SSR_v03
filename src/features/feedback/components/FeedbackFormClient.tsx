"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MessageSquareText, Star } from "lucide-react";
import {
  feedbackStatusClasses,
  feedbackStatusLabels,
  feedbackTypeOptions,
  recentFeedbackItems,
} from "../data/feedback";
import type { FeedbackFormData, RecentFeedbackItem } from "../types/feedback";

const initialFormData: FeedbackFormData = {
  subject: "",
  type: "",
  rating: 0,
  content: "",
};

type FeedbackFormErrors = Partial<Record<keyof FeedbackFormData, string>>;

function validateFeedbackForm(formData: FeedbackFormData) {
  const errors: FeedbackFormErrors = {};

  if (!formData.subject.trim()) {
    errors.subject = "Vui lòng nhập chủ đề";
  }
  if (!formData.type) {
    errors.type = "Vui lòng chọn loại góp ý";
  }
  if (!formData.rating) {
    errors.rating = "Vui lòng chọn mức độ hài lòng";
  }
  if (!formData.content.trim()) {
    errors.content = "Vui lòng nhập nội dung góp ý";
  }

  return errors;
}

export function FeedbackFormClient() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [hoverRating, setHoverRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [feedbackItems, setFeedbackItems] = useState<RecentFeedbackItem[]>(recentFeedbackItems);

  const selectedTypeLabel = useMemo(() => {
    return feedbackTypeOptions.find((option) => option.value === formData.type)?.label || "Khác";
  }, [formData.type]);

  const updateForm = <Key extends keyof FeedbackFormData>(key: Key, value: FeedbackFormData[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSuccessMessage("");
  };

  const handleSubmit = () => {
    const nextErrors = validateFeedbackForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const nextFeedback: RecentFeedbackItem = {
      id: `FB-TEMP-${Date.now()}`,
      subject: formData.subject.trim(),
      type: selectedTypeLabel,
      date: "Hôm nay",
      status: "recorded",
    };

    setFeedbackItems((current) => [nextFeedback, ...current].slice(0, 5));
    setFormData(initialFormData);
    setHoverRating(0);
    setSuccessMessage("Cảm ơn bạn đã gửi góp ý.");
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] lg:p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FB] text-[#163F78]">
            <MessageSquareText size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Feedback form</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Gửi góp ý nhanh để đội ngũ Mecsu ghi nhận và cải thiện trải nghiệm mua hàng.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Chủ đề</span>
            <input
              value={formData.subject}
              onChange={(event) => updateForm("subject", event.target.value)}
              placeholder="Nhập chủ đề góp ý"
              className="mt-2 h-11 w-full rounded-xl border border-[#D8E1EE] bg-white px-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
            />
            {errors.subject ? <span className="mt-1.5 block text-xs font-medium text-red-600">{errors.subject}</span> : null}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Loại góp ý</span>
            <select
              value={formData.type}
              onChange={(event) => updateForm("type", event.target.value as FeedbackFormData["type"])}
              className="mt-2 h-11 w-full rounded-xl border border-[#D8E1EE] bg-white px-4 text-sm text-slate-800 outline-none transition-colors focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
            >
              <option value="">Chọn loại góp ý</option>
              {feedbackTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.type ? <span className="mt-1.5 block text-xs font-medium text-red-600">{errors.type}</span> : null}
          </label>

          <div>
            <span className="text-sm font-semibold text-slate-700">Mức độ hài lòng</span>
            <div className="mt-2 rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => {
                  const ratingValue = index + 1;
                  const activeLevel = hoverRating || formData.rating;
                  const isActive = ratingValue <= activeLevel;

                  return (
                    <button
                      key={ratingValue}
                      type="button"
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => updateForm("rating", ratingValue)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                      aria-label={`Chọn ${ratingValue} sao`}
                    >
                      <Star
                        size={25}
                        className={isActive ? "fill-[#EABF3B] text-[#EABF3B]" : "text-slate-300"}
                      />
                    </button>
                  );
                })}
                <span className="ml-1 text-sm font-medium text-slate-500">
                  {formData.rating ? `${formData.rating}/5` : "Chưa chọn"}
                </span>
              </div>
            </div>
            {errors.rating ? <span className="mt-1.5 block text-xs font-medium text-red-600">{errors.rating}</span> : null}
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Nội dung góp ý</span>
            <textarea
              value={formData.content}
              onChange={(event) => updateForm("content", event.target.value)}
              placeholder="Chia sẻ chi tiết trải nghiệm, vấn đề gặp phải hoặc đề xuất của bạn"
              className="mt-2 min-h-[150px] w-full rounded-xl border border-[#D8E1EE] bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
            />
            {errors.content ? <span className="mt-1.5 block text-xs font-medium text-red-600">{errors.content}</span> : null}
          </label>

          {successMessage ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              {successMessage}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setFormData(initialFormData);
                setErrors({});
                setHoverRating(0);
                setSuccessMessage("");
              }}
              className="h-11 rounded-xl border border-[#D8E1EE] bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Xóa nội dung
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="h-11 rounded-xl bg-[#163F78] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a]"
            >
              Gửi góp ý
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-[#E5EAF2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
          <h2 className="text-lg font-bold text-slate-900">Góp ý gần đây</h2>
          <p className="mt-1 text-sm text-slate-500">Danh sách mô phỏng trong phiên làm việc hiện tại.</p>
          <div className="mt-4 space-y-3">
            {feedbackItems.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#EDF1F6] bg-[#F8FAFC] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">{item.subject}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.type} · {item.date}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${feedbackStatusClasses[item.status]}`}>
                    {feedbackStatusLabels[item.status]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
