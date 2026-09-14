"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WEEKLY_SCHEDULE } from "@/data/schedule";
import { Reveal } from "@/components/animations/Reveal";

export function WeeklySchedule() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : clientWidth;
    const index = Math.min(
      Math.max(Math.round(scrollLeft / cardWidth), 0),
      WEEKLY_SCHEDULE.length - 1
    );
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    checkScroll();
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  return (
    <section
      id="week"
      className="bg-[#0A0A0A] text-white py-[clamp(64px,8vw,120px)] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)]">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-[clamp(36px,5vw,60px)]">
          <Reveal duration={0.7} className="flex-none">
            <h2 className="m-0 font-semibold text-[clamp(38px,5vw,76px)] leading-[1.02] tracking-[-0.04em] text-white">
              One week at FORJ<span className="text-[#FE4C02]">.</span>
            </h2>
          </Reveal>

          <Reveal duration={0.7} delay={0.2} className="w-full lg:max-w-[540px] lg:ml-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <p className="m-0 font-normal text-[clamp(13.5px,1vw,15px)] leading-[1.65] text-[#8C8A86] max-w-[400px]">
              Monday to Friday you train — structured, progressive, capped at eight. Saturday and Sunday you sweat together — bigger partner and team sessions. Bring a friend.
            </p>

            {/* Desktop Navigation Arrows */}
            <div className="flex items-center gap-2 flex-none">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                aria-label="Previous day"
                className={`w-10 h-10 border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollLeft
                    ? "hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-white"
                    : "opacity-30 cursor-not-allowed text-[#8C8A86]"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                aria-label="Next day"
                className={`w-10 h-10 border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  canScrollRight
                    ? "hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-white"
                    : "opacity-30 cursor-not-allowed text-[#8C8A86]"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Responsive Carousel Track */}
        <Reveal duration={0.8} delay={0.15}>
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 pt-1"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {WEEKLY_SCHEDULE.map((card, idx) => (
              <div
                key={card.id}
                className={`w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] flex-none snap-start border border-white/20 flex flex-col justify-between bg-[#0A0A0A] hover:border-white/40 transition-all duration-200 ${
                  activeIndex === idx ? "border-white/50" : ""
                }`}
              >
                {/* Card Header Row: 01 | MONDAY */}
                <div className="px-6 py-4 border-b border-white/20 flex justify-between items-center bg-white/[0.02]">
                  <span className="font-mono text-[12px] sm:text-[13px] tracking-wider text-[#8C8A86]">
                    {card.number}
                  </span>
                  <span className="font-medium text-[11.5px] sm:text-[12px] tracking-[0.14em] text-white/85 uppercase">
                    {card.day}
                  </span>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] flex-1">
                  {/* Top: FORJ Logo Wordmark + Workout Name & Subtitle */}
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="relative h-[16px] sm:h-[18px] w-[33px] sm:w-[37px] flex-none">
                        <Image
                          src="/forj-wordmark.webp"
                          alt="FORJ"
                          fill
                          className="object-contain object-left mix-blend-lighten"
                        />
                      </div>
                      <span className="font-bold text-[20px] sm:text-[23px] tracking-tight text-[#FE4C02] uppercase leading-none title-font">
                        {card.name}
                      </span>
                    </div>

                    <p className="m-0 mt-2.5 font-normal text-[14px] sm:text-[15px] text-white/90">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Bottom: Description */}
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

        {/* Carousel Pill Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8 select-none">
          {WEEKLY_SCHEDULE.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-[#FE4C02]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to day ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
