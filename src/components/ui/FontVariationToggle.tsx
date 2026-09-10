"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, ArrowUp, Check, Type } from "lucide-react";

type FontVariation = "default" | "stencil-bold" | "stencil-regular";

export function FontVariationToggle() {
  const [fontVariation, setFontVariation] = useState<FontVariation>("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("forj_title_font") as FontVariation | null;
    if (saved === "stencil-bold" || saved === "stencil" as any) {
      applyFont("stencil-bold");
    } else if (saved === "stencil-regular") {
      applyFont("stencil-regular");
    } else {
      applyFont("default");
    }
  }, []);

  const applyFont = (variation: FontVariation) => {
    setFontVariation(variation);
    const html = document.documentElement;
    html.classList.remove("font-stencil-titles", "font-stencil-bold", "font-stencil-regular");

    if (variation === "stencil-bold") {
      html.classList.add("font-stencil-bold", "font-stencil-titles");
      localStorage.setItem("forj_title_font", "stencil-bold");
    } else if (variation === "stencil-regular") {
      html.classList.add("font-stencil-regular");
      localStorage.setItem("forj_title_font", "stencil-regular");
    } else {
      localStorage.setItem("forj_title_font", "default");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getActiveLabel = () => {
    switch (fontVariation) {
      case "stencil-bold":
        return "Big Shoulders Stencil (Bold)";
      case "stencil-regular":
        return "Big Shoulders Stencil (Regular / Not Bold)";
      default:
        return "Default Font (Geist)";
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full py-4 border border-white/10 bg-[#111111]/80 p-5">
        <div className="h-8 bg-white/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full border border-white/15 bg-[#121212] p-5 sm:p-6 transition-all duration-300">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        {/* Left: Info & Status */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#FE4C02]/15 text-[#FE4C02] text-[10px] font-bold tracking-[0.14em] uppercase">
              <Sparkles size={11} />
              Client Review Tool
            </span>
            <span className="text-[#8C8A86] text-[12px]">· 3 Title Typography Variations</span>
          </div>
          <p className="text-white text-[13.5px] font-medium m-0">
            Active Title Font:{" "}
            <span className="text-[#FE4C02] font-semibold">
              {getActiveLabel()}
            </span>
          </p>
        </div>

        {/* Right: 3 Variation Selector Buttons & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Option 1: Default */}
          <button
            type="button"
            onClick={() => applyFont("default")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-[11.5px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 cursor-pointer ${
              fontVariation === "default"
                ? "bg-white text-[#0A0A0A] shadow-md ring-1 ring-white"
                : "bg-[#1A1A1A] text-[#8C8A86] hover:text-white hover:bg-[#222222] border border-white/10"
            }`}
          >
            {fontVariation === "default" && <Check size={14} className="text-[#0A0A0A]" />}
            <span>A: Default (Geist)</span>
          </button>

          {/* Option 2: Big Shoulders Stencil BOLD */}
          <button
            type="button"
            onClick={() => applyFont("stencil-bold")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-[11.5px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 cursor-pointer ${
              fontVariation === "stencil-bold"
                ? "bg-[#FE4C02] text-[#0A0A0A] shadow-lg shadow-[#FE4C02]/20 ring-1 ring-[#FE4C02]"
                : "bg-[#1A1A1A] text-[#8C8A86] hover:text-white hover:bg-[#222222] border border-white/10"
            }`}
          >
            {fontVariation === "stencil-bold" && <Check size={14} className="text-[#0A0A0A]" />}
            <Type size={14} />
            <span>B: Stencil (Bold)</span>
          </button>

          {/* Option 3: Big Shoulders Stencil REGULAR / NOT BOLD */}
          <button
            type="button"
            onClick={() => applyFont("stencil-regular")}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-[11.5px] font-semibold tracking-[0.06em] uppercase transition-all duration-200 cursor-pointer ${
              fontVariation === "stencil-regular"
                ? "bg-[#FE4C02] text-[#0A0A0A] shadow-lg shadow-[#FE4C02]/20 ring-1 ring-[#FE4C02]"
                : "bg-[#1A1A1A] text-[#8C8A86] hover:text-white hover:bg-[#222222] border border-white/10"
            }`}
          >
            {fontVariation === "stencil-regular" && <Check size={14} className="text-[#0A0A0A]" />}
            <Type size={14} />
            <span>C: Stencil (Not Bold)</span>
          </button>

          {/* Scroll to top preview button */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Scroll to top to review Hero title"
            className="flex items-center gap-1.5 px-3 py-2.5 bg-[#181818] hover:bg-white/10 text-[#8C8A86] hover:text-white text-[11.5px] border border-white/10 transition-colors cursor-pointer ml-auto sm:ml-0"
          >
            <ArrowUp size={13} />
            <span className="hidden sm:inline">Preview Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}
