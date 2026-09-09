"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

interface FoundingRateBarProps {
  price?: number;
  seats?: number;
  showOpenFlags?: boolean;
}

export function FoundingRateBar({
  price = 999,
  seats = 20,
}: FoundingRateBarProps) {
  return (
    <section className="bg-[#0A0A0A] border-y border-white/10 w-full overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto">
        <Reveal duration={0.6}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {/* Cell 1: Tier & Status */}
            <div className="p-5 lg:px-7 lg:py-6 flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#8C8A86]">
                  FOUNDING TIER
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#FE4C02] text-[10.5px] font-medium tracking-[0.08em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE4C02] animate-pulse" />
                  OPEN
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[17px] lg:text-[18px] font-medium text-white tracking-tight">
                  {seats} Seats Total
                </span>
                <span className="text-[12.5px] text-[#8C8A86]">
                  · First month at signup
                </span>
              </div>
            </div>

            {/* Cell 2: Locked Rate */}
            <div className="p-5 lg:px-7 lg:py-6 flex flex-col justify-between gap-2.5">
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#8C8A86]">
                LOCKED RATE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] lg:text-[24px] font-semibold tracking-[-0.03em] text-white">
                  AED {price}
                </span>
                <span className="text-[12.5px] text-[#8C8A86]">
                  / month · Locked for life
                </span>
              </div>
            </div>

            {/* Cell 3: Experience / Cycle */}
            <div className="p-5 lg:px-7 lg:py-6 flex flex-col justify-between gap-2.5">
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#8C8A86]">
                THE PROGRAM
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[15px] lg:text-[16px] font-medium text-white tracking-tight">
                  8-Week Cycles
                </span>
                <span className="text-[12.5px] text-[#8C8A86]">
                  · Capped at 8 per class
                </span>
              </div>
            </div>

            {/* Cell 4: Direct Interactive CTA */}
            <Link
              href="#offer"
              className="group p-5 lg:px-7 lg:py-6 flex items-center justify-between bg-white/[0.02] hover:bg-[#FE4C02] transition-colors duration-200 cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#8C8A86] group-hover:text-[#0A0A0A] transition-colors">
                  OCTOBER 2026
                </span>
                <span className="text-[14px] lg:text-[15px] font-semibold text-white group-hover:text-[#0A0A0A] tracking-[0.02em] uppercase transition-colors">
                  Become a founding member
                </span>
              </div>
              <div className="w-9 h-9 rounded-none border border-white/20 group-hover:border-[#0A0A0A] group-hover:bg-[#0A0A0A] flex items-center justify-center transition-colors">
                <ArrowUpRight
                  size={18}
                  className="text-white group-hover:text-[#FE4C02] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
