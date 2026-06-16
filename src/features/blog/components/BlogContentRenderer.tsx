import type { BlogContentBlock } from "../types/blog";

interface BlogContentRendererProps {
  blocks: BlogContentBlock[];
}

export function BlogContentRenderer({ blocks }: BlogContentRendererProps) {
  return (
    <article className="space-y-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={`${block.type}-${block.text}`}
              id={block.id}
              className="scroll-mt-28 border-b border-slate-100 pb-4 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3 key={`${block.type}-${block.text}`} className="text-xl font-bold text-slate-900">
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={`${block.type}-${index}`} className="text-[16px] leading-8 text-slate-600 lg:text-[17px]">
              {block.text}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`${block.type}-${index}`}
              className="rounded-r-2xl border-l-4 border-[#FFC928] bg-white p-5 text-lg font-medium leading-8 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.04)]"
            >
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "bulletList") {
          return (
            <ul key={`${block.type}-${index}`} className="space-y-3 rounded-2xl border border-[#E5EAF2] bg-white p-5">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-7 text-slate-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FFC928]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "numberedList") {
          return (
            <ol key={`${block.type}-${index}`} className="space-y-3 rounded-2xl border border-[#E5EAF2] bg-white p-5">
              {block.items.map((item, itemIndex) => (
                <li key={item} className="flex gap-3 text-[15px] leading-7 text-slate-600">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#163F78] text-xs font-bold text-white">
                    {itemIndex + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </article>
  );
}


