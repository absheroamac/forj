"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";

export function CoachSection() {
  return (
    <section
      id="coach"
      className="bg-[#F2F1EE] text-[#0A0A0A] grid grid-cols-1 lg:grid-cols-2 items-stretch"
    >
      {/* Coach Visual */}
      <div className="relative min-h-[clamp(380px,46vw,720px)] w-full overflow-hidden bg-[#111]">
        <Image
          src="/images/trainer.webp"
          alt="Chris Jones — Founding Coach"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover object-center contrast-[1.05] transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>

      {/* Coach Bio Content */}
      <div className="flex flex-col justify-between gap-[clamp(32px,4.5vw,64px)] p-[clamp(36px,5vw,88px)] px-[clamp(24px,4vw,64px)]">
        <Reveal duration={0.7} delay={0.1}>
          <div>
            <h2 className="m-0 mb-[clamp(20px,2.4vw,32px)] font-semibold text-[clamp(34px,4.2vw,62px)] leading-[1.02] tracking-[-0.04em] text-[#0A0A0A]">
              Your coach,
              <br />
              on the floor<span className="text-[#FE4C02]">.</span>
            </h2>

            <p className="m-0 font-normal text-[clamp(15.5px,1.25vw,19px)] leading-[1.55] tracking-[-0.012em] text-[#3A3835] max-w-[44ch]">
              Chris Jones has spent fifteen years coaching — beginners on day one and athletes chasing a number. FORJ is the room he set out to build: small enough to see everyone, serious enough to get somewhere.
            </p>
          </div>
        </Reveal>

        <Reveal duration={0.6} delay={0.25}>
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-[#0A0A0A]/20 flex-wrap">
            <span className="font-medium text-[13.5px] tracking-[0.02em] text-[#0A0A0A]">
              Founding coach
            </span>
            <a
              href="https://www.instagram.com/chris.jonesfitness?utm_source=forj-website&utm_medium=referral&utm_campaign=founding_presale"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[13.5px] tracking-[0.02em] text-[#FE4C02] hover:text-[#0A0A0A] transition-colors inline-flex items-center gap-1"
            >
              @chris.jonesfitness ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
