"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { HOME_EXPLORE_MORE_LINKS } from "../data/home-explore-more";

export function HomeExploreMore() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-t border-slate-200 bg-white py-16 font-sans">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-800">
          Explore more
        </h2>

        <div className="relative">
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-300 md:grid-cols-4 ${
              isExpanded ? "max-h-none" : "max-h-40 overflow-hidden"
            }`}
          >
            {HOME_EXPLORE_MORE_LINKS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="cursor-pointer border-none bg-transparent text-left text-base font-medium text-[#2071a7] underline-offset-4 transition-all duration-200 hover:text-[#EAB308] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="flex items-center rounded-full px-4 py-2 font-medium text-[#4c7dac] transition-all duration-300 hover:bg-[#4c7dac]/10 active:scale-95"
          >
            {isExpanded ? "See Less" : "See More"}
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
