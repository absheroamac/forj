"use client";

import React from "react";
import Image from "next/image";
import { WEEKLY_SCHEDULE } from "@/data/schedule";
import { Reveal } from "@/components/animations/Reveal";

export function WeeklySchedule() {
  return (
    <section id="week" className="bg-[#0A0A0A] text-white py-[clamp(64px,8vw,120px)] border-t border-white/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-[clamp(44px,6vw,72px)]">
          <Reveal duration={0.7} className="flex-none">
            <h2 className="m-0 font-semibold text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.04em] text-white">
              One week at FORJ
              <span className="text-[#FE4C02]">.</span>
            </h2>
          </Reveal>

          <Reveal duration={0.7} delay={0.2} className="w-full lg:max-w-[440px] lg:ml-auto">
            <p className="m-0 font-normal text-[clamp(13.5px,1vw,15px)] leading-[1.65] text-[#8C8A86]">
              Monday to Friday you build — structured, progressive, capped at eight. The weekend belongs to the crew: bigger sessions, partner formats, and the door open for a friend.
            </p>
          </Reveal>
        </div>

        {/* Stacked 3 by 3 (3x2) Grid Layout with Complete Borders */}
        <Reveal duration={0.8} delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/20 bg-[#0A0A0A]">
            {WEEKLY_SCHEDULE.map((card) => (
              <div
                key={card.id}
                className="border-r border-b border-white/20 flex flex-col justify-between bg-[#0A0A0A] hover:bg-white/[0.02] transition-colors duration-200"
              >
                {/* Card Header Row: 01 | MONDAY */}
                <div className="px-6 py-4 border-b border-white/20 flex justify-between items-center bg-white/[0.01]">
                  <span className="font-mono text-[12px] sm:text-[13px] tracking-wider text-[#8C8A86]">
                    {card.number}
                  </span>
                  <span className="font-medium text-[11.5px] sm:text-[12px] tracking-[0.14em] text-white/85 uppercase">
                    {card.day}
                  </span>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[210px] sm:min-h-[230px] flex-1">
                  {/* Top: FORJ Logo Wordmark + Workout Name & Subtitle */}
                  <div>
                    <div className="flex items-center gap-2">
                      {/* FORJ Logo Wordmark */}
                      <div className="relative h-[16px] sm:h-[18px] w-[33px] sm:w-[37px] flex-none">
                        <Image
                          src="/forj-wordmark.png"
                          alt="FORJ"
                          fill
                          className="object-contain object-left mix-blend-lighten"
                        />
                      </div>

                      {/* Workout Name in Orange */}
                      <span className="font-bold text-[20px] sm:text-[23px] tracking-tight text-[#FE4C02] uppercase leading-none title-font">
                        {card.name}
                      </span>
                    </div>

                    <p className="m-0 mt-2 font-normal text-[14px] sm:text-[15px] text-white/90">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Bottom: One-liner Description */}
                  <div className="mt-8 pt-2">
                    <p className="m-0 font-normal text-[13px] sm:text-[13.5px] leading-[1.6] text-[#8C8A86]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
