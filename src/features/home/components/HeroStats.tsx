"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, CheckCircle2, Users } from "lucide-react";
import type { HeroStat, HeroStatIconMap } from "../types/home";

const iconMap: HeroStatIconMap = {
  building: Building2,
  users: Users,
  check: CheckCircle2,
};

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          let startTimestamp: number | undefined;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <div className="mx-auto mt-6 grid w-full max-w-[1100px] grid-cols-1 gap-4 pt-4 sm:grid-cols-3 sm:gap-3 md:mt-8 md:pt-6 lg:mt-10 lg:gap-8 lg:pt-8">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={stat.id}
            className="mx-auto flex w-full max-w-[260px] items-center gap-3 sm:items-start sm:gap-2 md:gap-3 lg:gap-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white sm:mt-0.5 lg:h-12 lg:w-12">
              <Icon size={20} className="lg:h-6 lg:w-6" />
            </div>
            <div className="flex-1 text-left">
              <div className="mb-1 inline-block w-full text-left text-2xl leading-none font-bold tabular-nums text-white lg:text-3xl">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="mt-1 text-[9px] leading-snug font-bold tracking-wide text-slate-300 uppercase sm:text-[10px] lg:mt-1.5 lg:text-[11px] lg:tracking-widest">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
