"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone / WhatsApp number.");
      return;
    }
    if (!agreed) {
      setError("Please confirm the agreement checkbox to continue.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-[#FFFFFF] text-[#0A0A0A] py-[clamp(60px,7.5vw,110px)] border-t border-[#0A0A0A]/10"
    >
      <SectionContainer>
        <div className="flex flex-col lg:flex-row justify-between gap-[clamp(36px,5vw,96px)] items-start">
          {/* Left Column */}
          <Reveal duration={0.7} className="flex-1 basis-[360px]">
            <h2 className="m-0 font-bold text-[clamp(40px,5.2vw,72px)] leading-[1.02] tracking-[-0.035em] text-[#0A0A0A]">
              Not ready to commit
              <span className="text-[#FE4C02]">?</span>
            </h2>
            <p className="m-0 mt-5 font-normal text-[14.5px] md:text-[15px] leading-[1.65] text-[#57544F] max-w-[420px]">
              Get on the general waitlist for opening updates — separate from the founding list, no commitment either way.
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
                  className="p-6 sm:p-8 border border-[#FE4C02]/40 bg-[#FE4C02]/5 rounded-none flex flex-col gap-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 text-[#FE4C02] font-semibold text-[17px]">
                    <CheckCircle2 size={22} />
                    <span>You&apos;re on the list, {formData.name.split(" ")[0]}!</span>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#2B2927] m-0">
                    We&apos;ve reserved your priority spot for <strong>{formData.email}</strong> ({formData.phone}). We&apos;ll reach out ahead of our October 2026 opening in Meydan.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", phone: "" });
                      setAgreed(false);
                    }}
                    className="self-start text-[12.5px] font-medium text-[#57544F] hover:text-[#FE4C02] underline mt-3 cursor-pointer transition-colors"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 bg-transparent"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="waitlist-name"
                      className="block font-semibold text-[11.5px] tracking-[0.06em] uppercase text-[#57544F] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="waitlist-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full font-normal text-[15px] text-[#0A0A0A] placeholder-[#9E9B97] bg-[#F7F7F6] border border-[#0A0A0A]/15 px-3.5 py-3 outline-none focus:border-[#FE4C02] focus:bg-white transition-all rounded-none"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="waitlist-email"
                      className="block font-semibold text-[11.5px] tracking-[0.06em] uppercase text-[#57544F] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full font-normal text-[15px] text-[#0A0A0A] placeholder-[#9E9B97] bg-[#F7F7F6] border border-[#0A0A0A]/15 px-3.5 py-3 outline-none focus:border-[#FE4C02] focus:bg-white transition-all rounded-none"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="waitlist-phone"
                      className="block font-semibold text-[11.5px] tracking-[0.06em] uppercase text-[#57544F] mb-1.5"
                    >
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="waitlist-phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className="w-full font-normal text-[15px] text-[#0A0A0A] placeholder-[#9E9B97] bg-[#F7F7F6] border border-[#0A0A0A]/15 px-3.5 py-3 outline-none focus:border-[#FE4C02] focus:bg-white transition-all rounded-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <div className="text-[12.5px] text-[#D93800] bg-[#FE4C02]/10 border-l-2 border-[#FE4C02] px-3 py-2 font-medium">
                      {error}
                    </div>
                  )}

                  {/* Agreement Checkbox */}
                  <label className="flex items-start gap-2.5 text-[12.5px] leading-[1.45] text-[#57544F] cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (error) setError("");
                      }}
                      className="w-[16px] h-[16px] mt-0.5 accent-[#FE4C02] flex-none cursor-pointer rounded-none border border-[#0A0A0A]/40"
                    />
                    <span>
                      I&apos;m happy for FORJ Fitness to contact me about the opening. Opt out any time.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#FE4C02] text-[#0A0A0A] font-bold text-[12px] md:text-[12.5px] tracking-[0.08em] uppercase px-8 py-3.5 min-h-[48px] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 cursor-pointer rounded-none inline-flex items-center justify-center gap-2 shadow-none border-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>SUBMITTING...</span>
                        </>
                      ) : (
                        <span>GET UPDATES</span>
                      )}
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
