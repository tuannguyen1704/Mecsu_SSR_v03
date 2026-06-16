import type { LucideIcon } from "lucide-react";

export type HeroStatIcon = "building" | "users" | "check";

export type HeroStat = {
  id: string;
  icon: HeroStatIcon;
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export type HomeHeroData = {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  backgroundImageUrl: string;
  backgroundAlt: string;
  stats: HeroStat[];
};

export type HeroStatIconMap = Record<HeroStatIcon, LucideIcon>;
