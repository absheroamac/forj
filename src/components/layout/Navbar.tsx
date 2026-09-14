"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "#method", label: "THE METHOD" },
  { href: "#week", label: "THE WEEK" },
  { href: "#coach", label: "COACH" },
  { href: "#offer", label: "MEMBERSHIP" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to Content */}
      <a
        href="#offer"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:bg-[#FE4C02] focus:text-[#0A0A0A] focus:px-4 focus:py-3 focus:font-medium focus:text-[13px]"
      >
        Skip to founding membership
      </a>

      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="w-full px-[clamp(16px,2.4vw,32px)] flex items-center justify-between gap-[clamp(16px,3vw,40px)] min-h-[74px]">
          {/* Logo */}
          <Link
            href="#top"
            className="flex items-center flex-none mr-auto py-2 group"
          >
            <div className="relative h-[44px] md:h-[52px] w-[120px] md:w-[145px] transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/forj-logo.webp"
                alt="FORJ Fitness"
                fill
                priority
                className="object-contain object-left mix-blend-lighten transition-opacity group-hover:opacity-90"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[clamp(18px,2.5vw,36px)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11.5px] font-medium tracking-[0.14em] text-white/80 hover:text-[#FE4C02] transition-colors duration-150 py-2 uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:block flex-none">
            <Button
              href="#offer"
              variant="outline"
              size="sm"
              className="text-[11.5px] tracking-[0.14em] font-semibold uppercase px-5 py-2.5 min-h-[38px] border-[#FE4C02] text-white hover:bg-[#FE4C02] hover:text-[#0A0A0A]"
            >
              JOIN THE FOUNDING LIST
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8C8A86] hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/10 bg-[#0A0A0A] px-6 py-5 flex flex-col gap-4"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[13px] font-medium tracking-[0.1em] text-[#8C8A86] hover:text-white py-1 uppercase"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  href="#offer"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  JOIN THE FOUNDING LIST
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
