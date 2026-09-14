"use client";

import React from "react";
import Image from "next/image";
import { FOUNDING_PERKS } from "@/data/perks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

interface FoundingOfferProps {
  price?: number;
  seats?: number;
  showOpenFlags?: boolean;
}

export function FoundingOffer({
  price = 999,
}: FoundingOfferProps) {
  return (
    <section id="offer" className="bg-[#0A0A0A] text-white py-[clamp(64px,8vw,120px)] border-t border-white/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)]">
        {/* Section Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-[clamp(48px,6vw,88px)]">
          <Reveal duration={0.7} className="w-full lg:w-1/2 lg:max-w-[50%]">
            <h2 className="m-0 font-semibold text-[clamp(38px,5vw,76px)] leading-[0.96] tracking-[-0.04em] text-white">
              Become a<br />
              founding member<span className="text-[#FE4C02]">.</span>
            </h2>
          </Reveal>

          <Reveal duration={0.7} delay={0.2} className="w-full lg:max-w-[480px] lg:ml-auto">
            <p className="m-0 font-normal text-[clamp(13.5px,1vw,15px)] leading-[1.65] text-[#8C8A86]">
              A founding seat is a bet on the room before the doors open, at a rate that only exists for this first cohort — held for your full founding year.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Split: Image on Left + Pricing & Perks on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Gym Image */}
          <div className="lg:col-span-6 relative aspect-[4/4.2] sm:aspect-[4/4] lg:aspect-[4/4.3] w-full overflow-hidden rounded-none bg-[#111]">
            <Image
              src="/images/cta-section.webp"
              alt="FORJ Founding Gym Room"
              fill
              priority
              className="object-cover object-center contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Column: Pricing, Perks List, Terms & CTA Button */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-4">
            {/* Price Row: AED 999 /month */}
            <Reveal duration={0.7} delay={0.1}>
              <div className="flex flex-col pb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-[20px] sm:text-[24px] font-medium tracking-tight text-white/80">
                    AED
                  </span>
                  <span className="font-light sm:font-normal text-[clamp(60px,7.5vw,112px)] leading-none tracking-[-0.04em] text-white">
                    {price}
                  </span>
                  <span className="text-[20px] sm:text-[24px] font-normal tracking-tight text-white/80">
                    /month
                  </span>
                </div>
                <span className="text-[12.5px] font-mono tracking-wider text-[#8C8A86] uppercase mt-1">
                  12-MONTH FOUNDING TERM
                </span>
              </div>
            </Reveal>

            {/* Perks List */}
            <div className="flex flex-col border-t border-white/15">
              {FOUNDING_PERKS.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-baseline gap-6 py-5 border-b border-white/15 text-left"
                >
                  <span className="font-medium text-[15px] tracking-wider text-[#FE4C02] flex-none">
                    {perk.number}
                  </span>
                  <span className="text-[15px] sm:text-[16px] leading-[1.5] font-normal text-white/95">
                    {perk.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Terms line */}
            <div className="mt-5">
              <p className="m-0 text-[12px] sm:text-[12.5px] leading-[1.6] text-[#8C8A86]">
                First month collected today. Everything after runs monthly through your member account.
              </p>
            </div>

            {/* CTA Button */}
            <Reveal duration={0.7} delay={0.3}>
              <div className="mt-6 pt-2">
                <Button
                  href="#waitlist"
                  variant="primary"
                  size="lg"
                  className="bg-[#FE4C02] text-[#0A0A0A] font-semibold text-[12px] md:text-[13px] tracking-[0.08em] uppercase px-8 py-4 min-h-[50px] hover:bg-white hover:text-[#0A0A0A]"
                >
                  BECOME A FOUNDING MEMBER
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
