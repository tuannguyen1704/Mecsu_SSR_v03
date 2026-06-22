import Image from "next/image";
import Link from "next/link";
import { HOME_BLOG_PREVIEW_ITEMS } from "../data/home-blog-preview";

export function HomeBlogPreview() {
  return (
    <section className="bg-slate-50 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-baseline sm:gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Kiến thức nổi bật
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Xem thêm bài viết
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {HOME_BLOG_PREVIEW_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/blog/${item.slug}`}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[12px] font-medium tracking-wide text-slate-500 uppercase">
                  {item.category}
                </span>
                <h3 className="mt-2 mb-3 text-xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-[14px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
