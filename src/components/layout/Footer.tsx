import React from "react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { FontVariationToggle } from "@/components/ui/FontVariationToggle";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/[0.08]">
      <SectionContainer className="pt-[clamp(40px,5vw,80px)] pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[clamp(24px,3.4vw,52px)]">
          {/* Brand */}
          <div>
            <div className="text-[#FE4C02] text-[12.5px] font-medium tracking-[0.01em] mb-3.5">
              FORJ Fitness
            </div>
            <p className="text-[#8C8A86] text-[13.5px] leading-[1.7] m-0">
              A studio with a dojo philosophy.
              <br />
              Meydan, Dubai · Opening October 2026
            </p>
          </div>

          {/* Visit */}
          <div>
            <div className="text-[#FE4C02] text-[12.5px] font-medium tracking-[0.01em] mb-3.5">
              Visit
            </div>
            <p className="text-[#B4B2AE] text-[13.5px] leading-[1.7] m-0">
              Azizi Riviera 9, Retail 01
              <br />
              <span className="text-[#8C8A86]">Al Merkadh, Meydan, Dubai, UAE</span>
            </p>
          </div>

          {/* Follow */}
          <div>
            <div className="text-[#FE4C02] text-[12.5px] font-medium tracking-[0.01em] mb-3.5">
              Follow
            </div>
            <p className="text-[#B4B2AE] text-[13.5px] leading-[1.7] m-0 flex flex-col gap-1">
              <a
                href="https://www.instagram.com/forjdxb?utm_source=forj-website&utm_medium=referral&utm_campaign=founding_presale"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @forjdxb ↗
              </a>
              <a
                href="https://www.instagram.com/chris.jonesfitness?utm_source=forj-website&utm_medium=referral&utm_campaign=founding_presale"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @chris.jonesfitness ↗
              </a>
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[#FE4C02] text-[12.5px] font-medium tracking-[0.01em] mb-3.5">
              Contact
            </div>
            <p className="text-[#B4B2AE] text-[13.5px] leading-[1.7] m-0 flex flex-col gap-1">
              <a
                href="mailto:forjfitnessdxb@gmail.com"
                className="hover:text-white transition-colors"
              >
                forjfitnessdxb@gmail.com
              </a>
              <a
                href="tel:+971503741223"
                className="hover:text-white transition-colors"
              >
                +971 50 374 1223
              </a>
            </p>
          </div>
        </div>

        {/* Client Review Font Switcher Toolbar */}
        <div className="mt-[clamp(32px,4vw,56px)]">
          <FontVariationToggle />
        </div>

        {/* Bottom bar */}
        <div className="mt-[clamp(24px,3vw,40px)] py-[clamp(18px,2vw,26px)] border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] tracking-[0.1em] text-[#8C8A86]">
          <span>© 2026 FORJ Fitness · 25 Degrees North</span>
          <span>Opening October 2026 · Meydan, Dubai</span>
        </div>
      </SectionContainer>
    </footer>
  );
}
