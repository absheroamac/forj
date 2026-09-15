"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

interface HeroProps {
  price?: number;
  seats?: number;
}

export function Hero({}: HeroProps) {
  return (
    <section
      id="top"
      className="relative bg-[#0A0A0A] w-full min-h-[calc(100vh-74px)] flex flex-col justify-start overflow-hidden border-b border-white/[0.08]"
    >
      {/* 2-Column Split Background: Left Image (full top-to-bottom) + Right Black */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 w-full h-full pointer-events-none">
        {/* Left Column Full-Height Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/hero-img2.webp"
            alt="FORJ Athlete Training"
            fill
            priority
            className="object-cover object-center contrast-[1.08] brightness-[0.92]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Seamless right-side gradient fade */}
          <div className="absolute inset-y-0 right-0 w-44 bg-gradient-to-r from-transparent via-[#0A0A0A]/60 to-[#0A0A0A] hidden lg:block" />

          {/* Top & Bottom gradient vignettes */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

          {/* Mobile dark overlay for legibility */}
          <div className="absolute inset-0 bg-[#0A0A0A]/60 lg:hidden" />
        </div>

        {/* Right Column: Pure Black */}
        <div className="hidden lg:block bg-[#0A0A0A] w-full h-full" />
      </div>

      {/* Foreground Content Container (Split Top / Bottom) */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[clamp(16px,3vw,56px)] pt-[clamp(32px,4vh,60px)] pb-[clamp(32px,4.5vh,64px)] flex flex-col justify-between flex-1">
        {/* 2-Column Body Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full flex-1">
          {/* Left Column Spacer (Allows athlete visual to show through unobstructed) */}
          <div className="hidden lg:block pointer-events-none" />

          {/* Right Column: Top Title + Bottom Aligned Copy & Actions */}
          <div className="flex flex-col justify-between items-start text-left lg:pl-6 h-full w-full">
            {/* Top Part: Eyebrow + Headline */}
            <div>
              <Reveal duration={0.7} delay={0.1}>
                <div className="font-mono text-[11px] sm:text-[12px] tracking-[0.14em] text-white/50 uppercase mb-3">
                  MEYDAN, DUBAI · OPENING OCTOBER 2026
                </div>
              </Reveal>

              <Reveal duration={0.8} delay={0.2}>
                <h1 className="m-0 font-semibold text-[clamp(34px,4.8vw,78px)] leading-[0.98] tracking-[-0.04em] text-white text-left whitespace-normal">
                  <span className="block">Dubai&apos;s first coached</span>
                  <span className="block mt-1 sm:mt-1.5">
                    strength dojo<span className="text-[#FE4C02]">.</span>
                  </span>
                </h1>
              </Reveal>
            </div>

            {/* Bottom Part: Paragraphs & CTA Buttons */}
            <div className="mt-auto pt-10 sm:pt-14 w-full">
              <Reveal duration={0.7} delay={0.3}>
                <p className="m-0 font-normal text-[clamp(16px,1.25vw,20px)] leading-[1.5] tracking-[-0.015em] text-white max-w-[520px]">
                  Small-group coached strength. Eight people to a class. A coach who knows your name.
                </p>
              </Reveal>

              <Reveal duration={0.7} delay={0.38}>
                <p className="m-0 mt-3 font-normal text-[clamp(13px,0.95vw,14.5px)] leading-[1.6] text-[#8C8A86] max-w-[460px]">
                  A limited founding cohort, before the doors open.
                </p>
              </Reveal>

              {/* Action Buttons Row */}
              <Reveal duration={0.7} delay={0.46}>
                <div className="flex items-center gap-4 flex-wrap mt-[clamp(24px,3vh,36px)]">
                  <Button
                    href="#offer"
                    variant="outline"
                    size="lg"
                    className="bg-[#0A0A0A] text-white border border-[#FE4C02] font-semibold text-[11.5px] md:text-[12.5px] tracking-[0.1em] uppercase px-7 py-3.5 md:py-4 min-h-[48px] hover:bg-[#FE4C02] hover:text-[#0A0A0A]"
                  >
                    JOIN THE FOUNDING LIST
                  </Button>
                  <Button
                    href="#waitlist"
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-white/90 border border-white/25 font-semibold text-[11.5px] md:text-[12.5px] tracking-[0.1em] uppercase px-7 py-3.5 md:py-4 min-h-[48px] hover:border-white hover:text-white hover:bg-white/5"
                  >
                    STAY IN TOUCH
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
