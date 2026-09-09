"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function WaitlistSection() {
  const [contact, setContact] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError("Please enter your email or WhatsApp number");
      return;
    }
    if (!agreed) {
      setError("Please confirm the agreement checkbox");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <section id="waitlist" className="bg-[#FFFFFF] text-[#0A0A0A] py-[clamp(60px,7.5vw,110px)] border-t border-[#0A0A0A]/10">
      <SectionContainer>
        <div className="flex flex-col lg:flex-row justify-between gap-[clamp(36px,5vw,96px)] items-start">
          {/* Left Column */}
          <Reveal duration={0.7} className="flex-1 basis-[360px]">
            <h2 className="m-0 font-bold text-[clamp(44px,5.8vw,78px)] leading-[1.02] tracking-[-0.035em] text-[#0A0A0A]">
              Not ready yet<span className="text-[#FE4C02]">?</span>
            </h2>
            <p className="m-0 mt-5 font-normal text-[14.5px] md:text-[15px] leading-[1.65] text-[#0A0A0A] max-w-[400px]">
              Join the waitlist. You&apos;ll be first to hear when doors open, and first in line for what comes after founding.
            </p>
          </Reveal>

          {/* Right Form Column */}
          <Reveal
            duration={0.7}
            delay={0.15}
            className="flex-1 basis-[380px] max-w-[540px] w-full"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 border border-[#FE4C02]/40 bg-[#FE4C02]/10 rounded-none flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2.5 text-[#FE4C02] font-semibold text-[16px]">
                    <CheckCircle2 size={20} />
                    <span>You&apos;re on the list.</span>
                  </div>
                  <p className="text-[14px] leading-[1.5] text-[#0A0A0A] m-0">
                    We&apos;ve reserved your priority spot for <strong>{contact}</strong>. We&apos;ll reach out ahead of the October 2026 opening in Meydan.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setContact("");
                      setAgreed(false);
                    }}
                    className="self-start text-[12px] text-[#57544F] hover:text-[#0A0A0A] underline mt-2 cursor-pointer"
                  >
                    Submit another email or number
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[20px]"
                >
                  <div>
                    <label
                      htmlFor="waitlist-input"
                      className="block font-normal text-[13.5px] tracking-tight text-[#0A0A0A] mb-2"
                    >
                      Email or WhatsApp number
                    </label>
                    <input
                      id="waitlist-input"
                      type="text"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="you@email.com"
                      className="w-full font-normal text-[clamp(22px,2.4vw,34px)] tracking-[-0.025em] text-[#0A0A0A] placeholder-[#8C8A86] bg-transparent border-0 border-b border-[#0A0A0A]/20 py-2.5 outline-none focus:border-[#FE4C02] transition-colors rounded-none"
                    />
                    {error && (
                      <span className="text-[12px] text-[#FE4C02] mt-1.5 block font-medium">
                        {error}
                      </span>
                    )}
                  </div>

                  <label className="flex items-center gap-3 text-[12.5px] leading-[1.45] text-[#0A0A0A] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (error) setError("");
                      }}
                      className="w-[15px] h-[15px] accent-[#FE4C02] flex-none cursor-pointer rounded-none border border-[#0A0A0A]/40"
                    />
                    <span>
                      I agree to be contacted by FORJ Fitness about the opening. Opt out any time.
                    </span>
                  </label>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#FE4C02] text-[#0A0A0A] font-semibold text-[12px] md:text-[12.5px] tracking-[0.06em] uppercase px-8 py-3.5 min-h-[48px] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 cursor-pointer rounded-none inline-flex items-center justify-center shadow-none border-0"
                    >
                      BECOME A FOUNDING MEMBER
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
