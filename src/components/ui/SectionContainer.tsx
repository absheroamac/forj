import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({
  children,
  className = "",
  id,
  ...props
}: SectionContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "w-full px-[clamp(16px,2.4vw,32px)] mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
