"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { METHOD_PILLARS } from "@/data/pillars";
import { Reveal } from "@/components/animations/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PARALLAX_SLIDES = [
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
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [desktopSlideIndex, setDesktopSlideIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const pillarsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Horizontal Parallax - Active ONLY on Desktop
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".parallax-panel-desktop");
        const totalPanels = panels.length;
        if (!panels.length || !trackRef.current || !sectionRef.current) return;

        // Master horizontal tween pinning the section on desktop
        const masterTween = gsap.to(panels, {
          xPercent: -100 * (totalPanels - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const currentSlide = Math.min(
                Math.round(self.progress * (totalPanels - 1)),
                totalPanels - 1
              );
              setDesktopSlideIndex(currentSlide);
            },
            snap: {
              snapTo: 1 / (totalPanels - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power1.inOut",
            },
            end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
            invalidateOnRefresh: true,
          },
        });

        // Individual image parallax inside each panel
        panels.forEach((panel) => {
          const img = panel.querySelector(".parallax-inner-img");
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -5 },
              {
                xPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: masterTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Mobile horizontal scroll tracking
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.min(
        Math.max(Math.round(scrollLeft / clientWidth), 0),
        PARALLAX_SLIDES.length - 1
      );
      if (newIndex !== mobileSlideIndex) {
        setMobileSlideIndex(newIndex);
      }
    }
  };

  const scrollToMobileSlide = (idx: number) => {
    if (!mobileScrollRef.current) return;
    mobileScrollRef.current.scrollTo({
      left: idx * mobileScrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  // Pillars Story Scroll (Framer Motion)
  const { scrollYProgress: pillarProgress } = useScroll({
    target: pillarsContainerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(pillarProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveIndex(0);
    } else if (latest < 0.70) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <section id="method" className="bg-white text-[#0A0A0A] relative">
      {/* 1. Full-Screen Showcase: Desktop GSAP Parallax (lg:block) + Mobile Native Swipe (lg:hidden) */}
      
      {/* DESKTOP VIEW: GSAP Horizontal Pinning */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      >
        <div
          ref={trackRef}
          className="flex flex-row h-screen w-[400vw] will-change-transform transform-gpu"
        >
          {PARALLAX_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="parallax-panel-desktop relative w-screen h-screen min-w-[100vw] min-h-[100vh] flex-none overflow-hidden bg-[#0A0A0A]"
            >
              <div className="parallax-inner-img relative w-[114vw] h-full -left-[7vw] will-change-transform transform-gpu">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.92] contrast-[1.06]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Centered Floating 2-Container Dojo Badge (Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
          <div className="pointer-events-auto flex items-stretch gap-2 sm:gap-2.5 group/badge cursor-pointer hover:scale-[1.04] transition-transform duration-300 shadow-2xl select-none">
            <div className="bg-white text-[#0A0A0A] px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center shadow-lg select-none">
              <span className="font-semibold text-[14px] sm:text-[16px] tracking-[-0.01em] whitespace-nowrap select-none">
                Dojo in Meydan, Dubai
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

        {/* Curved Pill Carousel Indicator at Bottom (Desktop) */}
        <div className="absolute bottom-8 inset-x-0 flex items-center justify-center z-30 pointer-events-none select-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto shadow-lg">
            {PARALLAX_SLIDES.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  desktopSlideIndex === idx
                    ? "w-8 bg-[#FE4C02]"
                    : "w-2.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Hardware-Accelerated Native Touch Swipe Carousel */}
      <div className="lg:hidden relative w-full bg-[#0A0A0A] overflow-hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex flex-row w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {PARALLAX_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="w-full min-w-full h-[65vh] min-h-[400px] max-h-[560px] relative snap-center flex-none overflow-hidden bg-[#0A0A0A]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center brightness-[0.92] contrast-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Centered Floating 2-Container Dojo Badge (Mobile) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
          <div className="pointer-events-auto flex items-stretch gap-2 group/badge shadow-2xl select-none active:scale-95 transition-transform duration-200">
            <div className="bg-white text-[#0A0A0A] px-5 py-3 flex items-center justify-center shadow-lg select-none">
              <span className="font-semibold text-[13.5px] tracking-[-0.01em] whitespace-nowrap select-none">
                Dojo in Meydan, Dubai
              </span>
            </div>
            <div className="bg-white w-[42px] flex items-center justify-center shadow-lg flex-none select-none">
              <div className="relative w-[16px] h-[13px]">
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

        {/* Curved Pill Carousel Indicator at Bottom (Mobile) */}
        <div className="absolute bottom-5 inset-x-0 flex items-center justify-center z-20 pointer-events-none select-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto shadow-lg">
            {PARALLAX_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToMobileSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  mobileSlideIndex === idx
                    ? "w-7 bg-[#FE4C02]"
                    : "w-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. Section Headline & Method Story Narrative */}
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)] pt-[clamp(64px,8vw,120px)] pb-[clamp(48px,6vw,96px)]">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-[clamp(48px,6vw,88px)]">
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

        {/* 3. Interactive Storytelling Showcase (Pillars) */}
        <div ref={pillarsContainerRef} className="relative min-h-[1600px] lg:min-h-[2600px]">
          {/* Showcase Content */}
          <div className="sticky top-20 sm:top-24 py-6 sm:py-8 bg-white z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Column 1: Numbers (01 / 02 / 03) */}
              <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-6 lg:gap-4 select-none">
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

              {/* Column 2: Dynamic Image (Pre-rendered Stacked Cross-fade: ZERO Blinking / ZERO Unmounting) */}
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

            {/* Progress indicators */}
            <div className="flex items-center gap-2 mt-8 select-none">
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
          </div>

          {/* Generous Scroll-Driving Spacers so Fast Scrollers Don't Miss Any Points */}
          <div className="h-[450px] lg:h-[750px]" />
          <div className="h-[450px] lg:h-[750px]" />
          <div className="h-[450px] lg:h-[750px]" />
        </div>
      </div>
    </section>
  );
}
