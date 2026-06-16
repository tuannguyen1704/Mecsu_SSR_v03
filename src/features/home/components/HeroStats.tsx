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
    <div className="mx-auto mt-10 grid w-full max-w-[1100px] grid-cols-1 gap-8 pt-8 md:grid-cols-3 md:gap-4 lg:gap-8">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={stat.id}
            className="mx-auto flex w-[260px] items-start gap-4 sm:gap-5"
          >
            <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
              <Icon size={24} />
            </div>
            <div className="flex-1 text-left">
              <div className="mb-1 inline-block w-full text-left text-3xl leading-none font-bold tabular-nums text-white">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="mt-1.5 text-[11px] leading-snug font-bold tracking-widest text-slate-300 uppercase">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
