"use client";

import { useState } from "react";
import Image from "next/image";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-6 text-lg font-semibold uppercase text-white">
        Đăng ký nhận thông tin
      </h3>

      <form
        onSubmit={handleSubmit}
        className="flex h-10 w-full max-w-sm overflow-hidden rounded-sm bg-white"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setSubmitted(false);
          }}
          placeholder="Nhập địa chỉ email của bạn"
          required
          className="min-w-0 flex-1 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="shrink-0 bg-[#347FC2] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2B6FAE]"
        >
          Gửi
        </button>
      </form>

      {submitted ? (
        <p className="mt-3 text-sm text-emerald-300">
          Đăng ký nhận thông tin thành công
        </p>
      ) : (
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
          Đăng ký để nhận những thông tin ưu đãi từ Mecsu, bao gồm thông tin
          sản phẩm mới và các chương trình khuyến mãi
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <a
          href="http://online.gov.vn/Home/WebDetails/71868?AspxAutoDetectCookieSupport=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/logoSaleNoti.png"
            alt="Đã thông báo Bộ Công Thương"
            width={150}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </a>
        <a
          href="https://www.dmca.com/Protection/Status.aspx?ID=be7aa439-eb56-4e40-8cad-5071286d26d5&refurl=https://mecsu.vn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/dmca.png"
            alt="DMCA Protected"
            width={130}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </a>
      </div>
    </div>
  );
}
