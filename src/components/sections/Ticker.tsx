"use client";

import React from "react";
import { TICKER_ITEMS } from "@/data/schedule";

export function Ticker() {
  const content = (
    <div className="flex items-center gap-[34px] flex-none pr-[34px] text-[13.5px] font-medium tracking-[0.01em] whitespace-nowrap text-[#EDEBE7]">
      {TICKER_ITEMS.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          <span>{item}</span>
          <span className="text-[#FE4C02]">/</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      aria-label="FORJ Training Disciplines"
      className="bg-[#0A0A0A] overflow-hidden border-t border-b border-white/[0.14] py-[13px] select-none"
    >
      <div className="flex w-max animate-forj-ticker">
        {content}
        {content}
        {content}
        {content}
      </div>
    </section>
  );
}
