"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSlotProps {
  id?: string;
  src: string;
  alt: string;
  credit?: string;
  creditHref?: string;
  placeholderText?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export function ImageSlot({
  id,
  src,
  alt,
  credit,
  creditHref,
  caption,
  className = "",
  priority = false,
}: ImageSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      id={id}
      className={cn(
        "group relative w-full h-full overflow-hidden bg-[#0A0A0A]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "object-cover grayscale contrast-105 transition-all duration-700 ease-out group-hover:scale-[1.025]",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />

      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-white/70">
          {caption}
        </div>
      )}

      {credit && creditHref && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <a
            href={creditHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] bg-black/75 backdrop-blur-sm text-white/70 px-2 py-1 rounded hover:text-white"
          >
            {credit}
          </a>
        </div>
      )}
    </div>
  );
}
