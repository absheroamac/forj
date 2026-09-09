"use client";

import React from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/animations/Reveal";

export function HeroVisual() {
  return (
    <section className="relative w-full h-[clamp(340px,58vw,660px)] overflow-hidden bg-[#0A0A0A]">
      {/* High impact grayscale hero image */}
      <ImageSlot
        id="v2-hero"
        src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?fm=jpg&q=75&auto=format&fit=crop&sat=-100&w=1900"
        alt="HERO — Chris coaching / the room"
        credit="Photo by Sven Mieke on Unsplash"
        creditHref="https://unsplash.com/@sxoxm"
        priority
      />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/75 via-[#0A0A0A]/15 to-transparent pointer-events-none" />

      {/* Floating documentary captions */}
      <div className="absolute left-[clamp(16px,2.4vw,32px)] right-[clamp(16px,2.4vw,32px)] top-[clamp(16px,2.2vw,26px)] flex justify-between items-center gap-5 flex-wrap pointer-events-none z-10">
        <Reveal delay={0.4} direction="none">
          <span className="text-[13px] font-medium tracking-[0.01em] text-white/90 drop-shadow-sm">
            Fig. 01 — The floor, Meydan
          </span>
        </Reveal>
        <Reveal delay={0.5} direction="none">
          <span className="text-[13px] font-medium tracking-[0.01em] text-white/90 drop-shadow-sm">
            Opening October 2026
          </span>
        </Reveal>
      </div>
    </section>
  );
}
