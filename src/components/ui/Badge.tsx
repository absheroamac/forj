import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "open" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: "border border-white/28 text-[#EDEBE7] bg-transparent",
    accent: "border border-[#FE4C02]/50 text-[#FE4C02] bg-transparent",
    open: "text-[#8C8A86] text-[10.5px] tracking-[0.08em]",
    outline: "border border-white/20 text-white/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-medium tracking-[0.01em] px-2 py-1 select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
