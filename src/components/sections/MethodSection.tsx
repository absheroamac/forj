"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
    image: "/images/meydan.jpeg",
    title: "Meydan Studio",
    subtitle: "Nad Al Sheba / Meydan",
    number: "01",
  },
  {
    id: "dojo-main",
    image: "/images/gym-floor.jpg",
    title: "The Dojo Floor",
    subtitle: "Meydan, Dubai",
    number: "02",
  },
  {
    id: "conditioning",
    image: "/images/scroller-03.png",
    title: "Conditioning Arena",
    subtitle: "Freehand Conditioning",
    number: "03",
  },
  {
    id: "small-group",
    image: "/images/scroller-04.png",
    title: "Eight-Seat Cohort",
    subtitle: "Coached Progression",
    number: "04",
  },
];

export function MethodSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pillarsContainerRef = useRef<HTMLDivElement>(null);

  // Rock-Solid GSAP ScrollTrigger Horizontal Parallax
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".parallax-panel");
      const totalPanels = panels.length;
      if (!panels.length || !trackRef.current || !sectionRef.current) return;

      // Master horizontal tween pinning the section
      const masterTween = gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
          end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.round(self.progress * (totalPanels - 1)),
              totalPanels - 1
            );
            setActiveSlide(idx);
          },
        },
      });

      // Individual image parallax inside each panel
      panels.forEach((panel) => {
        const img = panel.querySelector(".parallax-inner-img");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
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
    },
    { scope: sectionRef }
  );

  // Pillars Story Scroll (Framer Motion)
  const { scrollYProgress: pillarProgress } = useScroll({
    target: pillarsContainerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(pillarProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  const activePillar = METHOD_PILLARS[activeIndex];

  return (
    <section id="method" className="bg-white text-[#0A0A0A] relative">
      {/* 1. Full-Screen Multi-Image Parallax Sliding Showcase (GSAP Pinned) */}
      <div
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      >
        {/* Horizontal Slide Track */}
        <div
          ref={trackRef}
          className="flex flex-row h-screen w-[400vw] will-change-transform"
        >
          {PARALLAX_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="parallax-panel relative w-screen h-screen min-w-[100vw] min-h-[100vh] flex-none overflow-hidden bg-[#0A0A0A]"
            >
              {/* Parallax Image Element */}
              <div className="parallax-inner-img relative w-[114vw] h-full -left-[7vw] will-change-transform">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.92] contrast-[1.06]"
                />
              </div>

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Centered Floating 2-Container Dojo Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="pointer-events-auto flex items-stretch gap-2 sm:gap-2.5 group/badge cursor-pointer hover:scale-[1.04] transition-transform duration-300 shadow-2xl">
            {/* Left Container: Location Text */}
            <div className="bg-white text-[#0A0A0A] px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center shadow-lg">
              <span className="font-semibold text-[14px] sm:text-[16px] tracking-[-0.01em] whitespace-nowrap">
                Dojo in Meydan, Dubai
              </span>
            </div>

            {/* Right Container: Orange Arrow Icon */}
            <div className="bg-white w-[46px] sm:w-[54px] flex items-center justify-center shadow-lg flex-none">
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
      </div>

      {/* 2. Section Headline & Method Story Narrative */}
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,3vw,56px)] pt-[clamp(64px,8vw,120px)] pb-[clamp(48px,6vw,96px)]">
        {/* Section Headline & Description: Strict 2 Lines */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-[clamp(48px,6vw,88px)]">
          <Reveal duration={0.7} className="w-full lg:w-auto flex-none">
            <h2 className="m-0 font-semibold text-[clamp(32px,4.6vw,72px)] leading-[1.02] tracking-[-0.04em] text-[#0A0A0A]">
              <span className="block whitespace-nowrap">Train like it means</span>
              <span className="block whitespace-nowrap">
                something<span className="text-[#FE4C02]">.</span>
              </span>
            </h2>
          </Reveal>

          <Reveal duration={0.7} delay={0.2} className="w-full lg:max-w-[460px] lg:ml-auto">
            <p className="m-0 font-normal text-[clamp(14px,1.1vw,16px)] leading-[1.65] text-[#57544F]">
              Before machines decided your workout, training was simple: pick the weight up, move it well, do it better than last week. FORJ runs that way on purpose. Eight-week cycles where every week builds on the last — same movements, more load, cleaner technique. By week eight you don&apos;t just feel different. You measure different.
            </p>
          </Reveal>
        </div>

        {/* 3. Interactive Scroll-Driven Storytelling Showcase */}
        <div ref={pillarsContainerRef} className="relative min-h-[1400px]">
          {/* Sticky Showcase Content */}
          <div className="sticky top-24 py-6 bg-white/95 backdrop-blur-sm z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Column 1: Numbers (01 / 02 / 03) */}
              <div className="lg:col-span-2 flex lg:flex-col items-start gap-4">
                {METHOD_PILLARS.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`font-semibold text-[clamp(36px,4.2vw,56px)] leading-none transition-all duration-300 cursor-pointer text-left ${
                      idx === activeIndex
                        ? "text-[#FE4C02] scale-105 font-bold"
                        : "text-[#0A0A0A]/20 hover:text-[#0A0A0A]/50"
                    }`}
                  >
                    {pillar.number}
                  </button>
                ))}
              </div>

              {/* Column 2: Dynamic Image (Smooth Cross-fade & Scale) */}
              <div className="lg:col-span-6 relative aspect-[16/11] w-full max-w-[540px] overflow-hidden rounded-none shadow-lg bg-[#0A0A0A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activePillar.image}
                      alt={activePillar.alt}
                      fill
                      className="object-cover object-center contrast-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Column 3: Title & Description Text */}
              <div className="lg:col-span-4 flex flex-col justify-center min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <h3 className="m-0 font-semibold text-[clamp(28px,3vw,44px)] leading-[1.08] tracking-[-0.035em] text-[#0A0A0A]">
                      {activePillar.title}
                    </h3>
                    <p className="m-0 mt-4 font-normal text-[15px] leading-[1.65] text-[#57544F] max-w-[360px]">
                      {activePillar.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center gap-2 mt-8">
              {METHOD_PILLARS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 bg-[#FE4C02]"
                      : "w-2.5 bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/40"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Scroll Driving Spacer Height */}
          <div className="h-[400px]" />
          <div className="h-[400px]" />
          <div className="h-[400px]" />
        </div>
      </div>
    </section>
  );
}
