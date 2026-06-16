import Link from "next/link";
import { HOME_BLOG_PREVIEW_ITEMS } from "../data/home-blog-preview";

export function HomeBlogPreview() {
  return (
    <section className="bg-slate-50 py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-8 flex items-baseline gap-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Trending guides
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Explore our Resource Hub
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {HOME_BLOG_PREVIEW_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/blog/${item.slug}`}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

