"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "dark" | "outline" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  target,
  rel,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer select-none";

  const sizeStyles = {
    sm: "text-[12px] px-4 py-2.5 min-h-[38px]",
    md: "text-[12px] md:text-[13px] px-5 py-3.5 min-h-[44px]",
    lg: "text-[13px] px-7 py-5 min-h-[56px] tracking-[0.09em]",
  };

  const variantStyles = {
    primary:
      "bg-[#FE4C02] text-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A] active:bg-[#e04302]",
    secondary:
      "bg-white text-[#0A0A0A] hover:bg-[#FE4C02] hover:text-[#0A0A0A] active:bg-[#EDEBE7]",
    dark:
      "bg-[#0A0A0A] text-white hover:bg-[#FE4C02] hover:text-[#0A0A0A] active:bg-[#1a1a1a]",
    outline:
      "bg-transparent text-white border border-white/40 hover:bg-[#FE4C02] hover:text-[#0A0A0A] hover:border-[#FE4C02] active:opacity-90",
    link:
      "bg-transparent text-[#FE4C02] p-0 min-h-0 normal-case tracking-normal border-b border-[#FE4C02]/50 hover:border-[#FE4C02] font-medium text-[12px] md:text-[13px]",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    const isAnchor = href.startsWith("#");
    return (
      <motion.div
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="inline-block"
      >
        <Link
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={combinedClasses}
          scroll={isAnchor}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={combinedClasses}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
