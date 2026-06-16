"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Home,
  Mail,
  Search,
  Sparkles,
} from "lucide-react";
import {
  featuredStories,
  innovationPosts,
  lifePosts,
  shoppingPosts,
  technicalBlogBanners,
  technicalBlogCategories,
  technicalBlogPosts,
  type TechnicalBlogPost,
} from "../data/technical-blog-data";

const postHref = (post: TechnicalBlogPost) => `/blog/${post.slug}`;

function BlogHeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBanner = technicalBlogBanners[currentIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((current) => (current + 1) % technicalBlogBanners.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] overflow-hidden bg-[#163F78] text-white lg:h-[640px]">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentBanner.image}
              alt="Blog kỹ thuật Mecsu"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#163F78] via-[#163F78]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#163F78] via-[#163F78]/80 to-transparent" />
          </motion.div>

          <div className="absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-[#FFC928]/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/2 rounded-full bg-slate-500/10 blur-[120px]" />

          <div className="absolute inset-0 flex items-center">
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-4 pt-12 pb-20 text-left lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] font-black tracking-[0.3em] uppercase shadow-lg backdrop-blur-md"
              >
                <Sparkles size={14} className="text-[#FFC928]" />
                {currentBanner.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 max-w-4xl text-5xl leading-[1] font-bold tracking-tight md:text-6xl lg:text-8xl"
              >
                {currentBanner.title.text}{" "}
                <span className="bg-gradient-to-r from-[#FFC928] to-white bg-clip-text text-transparent">
                  {currentBanner.title.highlight1}
                </span>{" "}
                {currentBanner.title.and}{" "}
                <span className="bg-gradient-to-r from-white to-[#FFC928] bg-clip-text text-transparent">
                  {currentBanner.title.highlight2}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="max-w-2xl text-lg leading-relaxed font-medium text-slate-300 md:text-xl"
              >
                {currentBanner.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-10"
              >
                <a
                  href="#blog-content"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#FFC928] bg-[#FFC928] px-12 text-[11px] font-black tracking-widest text-[#163F78] uppercase shadow-2xl shadow-[#FFC928]/20 transition-all duration-500 hover:border-white hover:bg-white"
                >
                  Khám phá nội dung
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute right-0 bottom-12 left-0 z-30 mx-auto flex max-w-7xl gap-4 px-4 lg:px-8">
        {technicalBlogBanners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Chuyển đến banner ${index + 1}`}
            className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${
              index === currentIndex ? "w-24 bg-white/20" : "w-6 bg-white/30 hover:bg-white/50"
            }`}
          >
            {index === currentIndex ? (
              <motion.span
                className="absolute top-0 bottom-0 left-0 bg-[#FFC928]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function BlogNavbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-black tracking-wide text-[#163F78] uppercase">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#163F78] text-[#FFC928]">
            <Home size={18} />
          </span>
          Mecsu Blog
        </Link>

        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400 md:flex">
          <Search size={18} />
          Tìm kiếm kiến thức kỹ thuật...
        </div>

        <Link
          href="/dich-vu-khach-hang"
          className="rounded-2xl bg-[#FFC928] px-5 py-3 text-[11px] font-black tracking-widest text-[#163F78] uppercase transition-colors hover:bg-[#f3bd24]"
        >
          Hỗ trợ kỹ thuật
        </Link>
      </div>
    </div>
  );
}

function QuickUpdateItem({ post }: { post: TechnicalBlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={postHref(post)}
        className="group block border-b border-slate-100 pb-6 transition-all duration-300 hover:border-[#FFC928]"
      >
        <h3 className="mb-2 text-[14px] leading-[1.5] font-bold tracking-tight text-slate-800 transition-all duration-300 group-hover:text-[#163F78]">
          {post.title}
        </h3>
        <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">{post.date}</div>
      </Link>
    </motion.div>
  );
}

function TrendingItem({ post }: { post: TechnicalBlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={postHref(post)}
        className="group flex items-center gap-4 border-b border-transparent pb-4 transition-all duration-300 hover:border-slate-100"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#163F78]/5 transition-opacity group-hover:opacity-0" />
        </div>
        <h4 className="line-clamp-2 flex-1 text-[12px] leading-snug font-bold text-slate-700 transition-colors group-hover:text-[#163F78]">
          {post.title}
        </h4>
      </Link>
    </motion.div>
  );
}

function CardPostItem({ post }: { post: TechnicalBlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={postHref(post)}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-500 hover:border-[#FFC928]/40 hover:shadow-2xl hover:shadow-[#163F78]/5"
      >
        <div className="relative aspect-[1.3] shrink-0 overflow-hidden border border-slate-50 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black tracking-widest text-[#163F78] uppercase shadow-sm backdrop-blur-md">
            {post.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="line-clamp-3 flex-1 text-lg leading-[1.3] font-bold text-slate-900 transition-colors group-hover:text-[#163F78]">
            {post.title}
          </h3>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{post.date}</div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-300 transition-all group-hover:bg-[#FFC928] group-hover:text-[#163F78]">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function HorizontalPostItem({ post }: { post: TechnicalBlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={postHref(post)}
        className="group flex flex-col gap-8 overflow-hidden rounded-[2.5rem] border border-slate-50 bg-white p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-[#163F78]/5 sm:flex-row"
      >
        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-[2rem] border border-slate-100 bg-white sm:w-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#163F78]/5 transition-opacity group-hover:opacity-0" />
        </div>
        <div className="flex flex-1 flex-col justify-center py-2">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#FFC928] uppercase">{post.category}</span>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{post.date}</span>
          </div>
          <h2 className="mb-4 text-2xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-[#163F78]">
            {post.title}
          </h2>
          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
          <div className="mt-auto flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase transition-colors group-hover:text-[#163F78]">
            Tiếp tục đọc <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SectionGrid({
  title,
  linkText,
  posts,
}: {
  title: string;
  linkText: string;
  posts: TechnicalBlogPost[];
}) {
  return (
    <section className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex items-center justify-between border-b border-slate-100 pb-6"
      >
        <div className="flex items-center gap-4">
          <div className="h-8 w-1.5 rounded-full bg-[#FFC928] shadow-[0_0_12px_rgba(255,201,40,0.45)]" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        </div>
        <a
          href="#blog-content"
          className="group hidden items-center gap-3 text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase transition-all hover:text-[#163F78] sm:flex"
        >
          {linkText} <ArrowRight size={16} className="text-[#FFC928] transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <CardPostItem key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function MainFeaturedPost({
  post,
  selectedCategory,
}: {
  post: TechnicalBlogPost;
  selectedCategory: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Link
        href={postHref(post)}
        className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-50 bg-white transition-all duration-700 hover:border-[#FFC928]/30 hover:shadow-2xl hover:shadow-[#163F78]/5"
      >
        <div className="relative min-h-[300px] shrink-0 overflow-hidden border border-slate-50 bg-white sm:min-h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-8 left-8 rounded-full bg-white/90 px-5 py-2 text-[10px] font-black tracking-widest text-[#163F78] uppercase shadow-sm backdrop-blur-md">
            Nổi bật
          </div>
        </div>
        <div className="p-8 pb-10 lg:p-10 lg:pb-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[10px] font-black tracking-[0.4em] text-[#FFC928] uppercase">
              {selectedCategory === "Tất cả" ? "Tiêu điểm tuần" : selectedCategory}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{post.date}</span>
          </div>
          <h1 className="mb-6 text-[32px] leading-[1.1] font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#163F78] sm:text-[36px]">
            {post.title}
          </h1>
          <p className="line-clamp-3 text-base leading-[1.6] text-slate-500">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export function TechnicalBlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const filteredPosts = useMemo(
    () =>
      selectedCategory === "Tất cả"
        ? technicalBlogPosts
        : technicalBlogPosts.filter((post) => post.category === selectedCategory),
    [selectedCategory],
  );

  const featuredPost = filteredPosts[0] || technicalBlogPosts[0];
  const otherPosts = filteredPosts.slice(1);
  const latestPosts = useMemo(
    () => [...technicalBlogPosts].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5),
    [],
  );

  const submitNewsletter = () => {
    const normalized = newsletterEmail.trim();
    if (!normalized || !normalized.includes("@")) {
      setNewsletterMessage("Vui lòng nhập email hợp lệ.");
      return;
    }

    setNewsletterMessage("Đã ghi nhận email nhận bản tin kỹ thuật.");
    setNewsletterEmail("");
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <BlogNavbar />
      <BlogHeroSlider />

      <div id="blog-content" className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 py-12">
        <div className="mb-16 grid grid-cols-1 gap-y-12 gap-x-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {otherPosts.slice(0, 4).map((post) => (
                <QuickUpdateItem key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <MainFeaturedPost post={featuredPost} selectedCategory={selectedCategory} />
          </div>

          <aside className="lg:col-span-1">
            <h3 className="mb-3 text-[17px] font-bold text-slate-900">Thịnh hành</h3>
            <div className="mb-6 h-[2px] w-full bg-[#f2651d]" />
            <div className="flex flex-col gap-4">
              {latestPosts.map((post) => (
                <TrendingItem key={post.id} post={post} />
              ))}
              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Tất cả")}
                  className="group flex w-full items-center justify-end gap-1 text-[15px] font-medium text-slate-900 transition-colors hover:text-[#f2651d]"
                >
                  Xem tất cả tin tức
                  <ArrowRight size={18} className="ml-1 text-[#f2651d] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className="mb-20">
          <SectionGrid title="Đổi mới & AI" linkText="Xem thêm Cập nhật" posts={innovationPosts} />
          <SectionGrid title="Danh mục & Tiện ích doanh nghiệp" linkText="Xem thêm Giải pháp B2B" posts={shoppingPosts} />
          <SectionGrid title="Cuộc sống tại Mecsu" linkText="Khám phá Thêm" posts={lifePosts} />
          <SectionGrid title="Câu chuyện nổi bật" linkText="Xem thêm Tin tức" posts={featuredStories} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="space-y-8 lg:col-span-8">
            <h3 className="flex items-center gap-2 border-b pb-4 text-xl font-extrabold text-slate-900">
              Bài viết đáng chú ý
            </h3>
            <div className="space-y-8">
              {otherPosts.slice(4).map((post) => (
                <HorizontalPostItem key={post.id} post={post} />
              ))}
            </div>
          </section>

          <aside className="space-y-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-[#163F78] p-10 text-white"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#FFC928]/20 opacity-50 blur-3xl" />
              <h3 className="relative z-10 mb-4 text-3xl leading-tight font-bold">
                Bản tin kỹ thuật chuyên sâu
              </h3>
              <p className="relative z-10 mb-8 text-sm leading-relaxed text-slate-300">
                Nhận báo cáo thị trường và cập nhật công nghệ vật liệu định kỳ hàng tuần trực tiếp vào hòm thư.
              </p>
              <div className="relative z-10">
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="name@company.com"
                    className="mb-4 h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-6 pl-12 text-sm font-bold text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#FFC928] focus:bg-white/10"
                  />
                </div>
                <button
                  type="button"
                  onClick={submitNewsletter}
                  className="h-14 w-full rounded-2xl border-none bg-[#FFC928] text-[11px] font-black tracking-widest text-[#163F78] uppercase transition-colors hover:bg-white"
                >
                  Đăng ký ngay
                </button>
                {newsletterMessage ? (
                  <p className="mt-4 text-xs font-semibold text-slate-200">{newsletterMessage}</p>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[2.5rem] border border-slate-50 bg-white p-8 shadow-2xl shadow-[#163F78]/5"
            >
              <h3 className="mb-8 border-b border-slate-50 pb-4 text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
                Phân loại dữ liệu
              </h3>
              <div className="flex flex-col gap-3">
                {technicalBlogCategories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`group flex items-center justify-between rounded-2xl px-6 py-4 text-[13px] font-bold transition-all ${
                        isActive
                          ? "bg-[#FFC928] text-[#163F78]"
                          : "bg-slate-50 text-slate-700 hover:bg-[#FFC928]/10 hover:text-[#163F78]"
                      }`}
                    >
                      {category}
                      <ChevronRight
                        size={14}
                        className={`transition-all group-hover:translate-x-1 ${
                          isActive ? "text-[#163F78]" : "text-slate-300 group-hover:text-[#FFC928]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}
