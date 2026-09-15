"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { METHOD_PILLARS } from "@/data/pillars";
import { Reveal } from "@/components/animations/Reveal";

const SHOWCASE_SLIDES = [
  {
    id: "meydan-exterior",
    image: "/images/meydan.webp",
    title: "Meydan Studio",
    subtitle: "Nad Al Sheba / Meydan",
    number: "01",
  },
  {
    id: "dojo-main",
    image: "/images/gym-floor.webp",
    title: "The Dojo Floor",
    subtitle: "Meydan, Dubai",
    number: "02",
  },
  {
    id: "conditioning",
    image: "/images/scroller-03.webp",
    title: "Conditioning Arena",
    subtitle: "Freehand Conditioning",
    number: "03",
  },
  {
    id: "small-group",
    image: "/images/scroller-04.webp",
    title: "Eight-Seat Cohort",
    subtitle: "Coached Progression",
    number: "04",
  },
];

export function MethodSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide effect for Meydan Carousel (advances every 4.5 seconds when not hovered)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Arrow keys listener for keyboard carousel navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSlideIndex((prev) => (prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextPillar = () => {
    setActiveIndex((prev) => (prev + 1) % METHOD_PILLARS.length);
  };

  const prevPillar = () => {
    setActiveIndex((prev) => (prev === 0 ? METHOD_PILLARS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? SHOWCASE_SLIDES.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 45) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="method" className="bg-white text-[#0A0A0A] relative">
      {/* 1. Section Headline & Method Story Narrative */}
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)] pt-[clamp(64px,8vw,120px)] pb-[clamp(48px,6vw,80px)]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-[clamp(40px,5vw,72px)]">
          <Reveal duration={0.7} className="w-full lg:w-auto flex-none">
            <h2 className="m-0 font-semibold text-[clamp(32px,4.6vw,72px)] leading-[1.02] tracking-[-0.04em] text-[#0A0A0A] whitespace-nowrap">
              Back to basics<span className="text-[#FE4C02]">.</span>
            </h2>
          </Reveal>

          <Reveal duration={0.7} delay={0.2} className="w-full lg:max-w-[480px] lg:ml-auto">
            <p className="m-0 font-normal text-[clamp(14px,1.1vw,16px)] leading-[1.65] text-[#57544F]">
              Eight-week cycles. Every week builds on the last — more load, cleaner technique — until you can see the change for yourself.
            </p>
            <p className="m-0 mt-3 font-normal text-[13.5px] leading-[1.6] text-[#8C8A86]">
              Trained for years or it&apos;s day one — you train the same way here, with a plan and people who show up beside you.
            </p>
          </Reveal>
        </div>

        {/* 2. Interactive Method Pillars Carousel (01, 02, 03) */}
        <div className="py-2 sm:py-4 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Column 1: Numbers (01 / 02 / 03) + Controls */}
            <div className="lg:col-span-2 flex flex-col items-start gap-6 select-none">
              <div className="flex lg:flex-col items-center lg:items-start gap-6 lg:gap-4 select-none">
                {METHOD_PILLARS.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`font-semibold text-[clamp(32px,4vw,56px)] leading-none transition-all duration-300 cursor-pointer text-left select-none touch-manipulation ${
                      idx === activeIndex
                        ? "text-[#FE4C02] scale-105 font-bold"
                        : "text-[#0A0A0A]/20 hover:text-[#0A0A0A]/50"
                    }`}
                  >
                    {pillar.number}
                  </button>
                ))}
              </div>

              {/* Progress indicators and Consistent Arrow Navigation */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 select-none">
                  {METHOD_PILLARS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer select-none touch-manipulation ${
                        idx === activeIndex
                          ? "w-8 bg-[#FE4C02]"
                          : "w-2.5 bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/40"
                      }`}
                      aria-label={`Go to step ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Consistent Arrow Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevPillar}
                    aria-label="Previous method pillar"
                    className="w-10 h-10 border border-[#0A0A0A]/20 flex items-center justify-center transition-all duration-200 cursor-pointer hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-[#0A0A0A] active:scale-95"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextPillar}
                    aria-label="Next method pillar"
                    className="w-10 h-10 border border-[#0A0A0A]/20 flex items-center justify-center transition-all duration-200 cursor-pointer hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-[#0A0A0A] active:scale-95"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Dynamic Image (Pre-rendered Stacked Cross-fade) */}
            <div className="lg:col-span-6 relative aspect-[16/11] w-full max-w-[540px] overflow-hidden rounded-none shadow-lg bg-[#0A0A0A]">
              {METHOD_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className={`absolute inset-0 transition-opacity duration-400 ease-out transform-gpu ${
                    idx === activeIndex
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 scale-[1.02] pointer-events-none"
                  }`}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center contrast-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            {/* Column 3: Title & Description Text (Smooth Stacked Transition) */}
            <div className="lg:col-span-4 relative flex flex-col justify-center min-h-[160px] sm:min-h-[180px]">
              {METHOD_PILLARS.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className={`transition-all duration-300 ease-out ${
                    idx === activeIndex
                      ? "opacity-100 translate-y-0 relative z-10"
                      : "opacity-0 translate-y-2 pointer-events-none absolute inset-0 z-0"
                  }`}
                >
                  <h3 className="m-0 font-semibold text-[clamp(28px,3vw,44px)] leading-[1.08] tracking-[-0.035em] text-[#0A0A0A]">
                    {pillar.titleLine1 && pillar.titleLine2 ? (
                      <>
                        <span className="block">{pillar.titleLine1}</span>
                        <span className="block">{pillar.titleLine2}</span>
                      </>
                    ) : (
                      pillar.title
                    )}
                  </h3>
                  <p className="m-0 mt-4 font-normal text-[15px] leading-[1.65] text-[#57544F] max-w-[360px]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Meydan Image Showcase Carousel (Positioned Below Pillars Section) */}
      <div
        className="relative w-full h-[65vh] min-h-[440px] md:h-[80vh] md:min-h-[580px] max-h-[850px] overflow-hidden bg-[#0A0A0A] select-none group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pre-rendered Stacked Slides with Ultra-Smooth Crossfade & Scale */}
        {SHOWCASE_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform-gpu ${
              slideIndex === idx
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-[1.03] z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center brightness-[0.92] contrast-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
          </div>
        ))}

        {/* Centered Floating Badge (Fitness Center in Meydan) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
          <div
            onClick={nextSlide}
            className="pointer-events-auto flex items-stretch gap-2 sm:gap-2.5 group/badge cursor-pointer hover:scale-[1.04] active:scale-95 transition-all duration-300 shadow-2xl select-none"
            title="Click for next image (or use arrow keys)"
          >
            <div className="bg-white text-[#0A0A0A] px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center shadow-lg select-none">
              <span className="font-semibold text-[14px] sm:text-[16px] tracking-[-0.01em] whitespace-nowrap select-none">
                Fitness Center in Meydan
              </span>
            </div>
            <div className="bg-white w-[46px] sm:w-[54px] flex items-center justify-center shadow-lg flex-none select-none">
              <div className="relative w-[18px] sm:w-[20px] h-[14px] sm:h-[16px] transition-transform duration-300 group-hover/badge:translate-x-1">
                <Image
                  src="/arrow-orange.svg"
                  alt="Arrow"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left & Right Arrow Navigation Controls (Consistent Square Bordered Style) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 border border-white/20 bg-[#0A0A0A]/60 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-white shadow-lg active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 border border-white/20 bg-[#0A0A0A]/60 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:border-[#FE4C02] hover:bg-[#FE4C02] hover:text-[#0A0A0A] text-white shadow-lg active:scale-95"
        >
          <ChevronRight size={18} />
        </button>

        {/* Curved Pill Carousel Indicators at Bottom */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex items-center justify-center z-30 pointer-events-none select-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 pointer-events-auto shadow-xl">
            {SHOWCASE_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  slideIndex === idx
                    ? "w-8 bg-[#FE4C02]"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
