"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function BlogNewsletterCta() {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setNewsletterMessage("Cảm ơn bạn đã đăng ký nhận kiến thức mới nhất từ Mecsu.");
    setEmail("");
  };

  return (
    <section className="bg-slate-100 py-12">
      <div className="mx-auto max-w-[620px] px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#163F78]/10 text-[#163F78]">
          <Send size={22} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Nhận kiến thức mới nhất</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Cập nhật hướng dẫn mua hàng, kiến thức kỹ thuật và xu hướng công nghiệp mới từ Mecsu.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Nhập email của bạn"
            required
            className="h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#163F78] focus:ring-4 focus:ring-[#DCE8F8]"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#163F78] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1a4a8a]"
          >
            Đăng ký
          </button>
        </form>
        {newsletterMessage ? (
          <p className="mt-3 text-sm font-semibold text-emerald-700">{newsletterMessage}</p>
        ) : null}
      </div>
    </section>
  );
}
