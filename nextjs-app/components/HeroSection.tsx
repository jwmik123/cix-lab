"use client";

import Image from "next/image";
import { useMobile } from "@/hooks/useMobile";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  objectPosition?: {
    mobile: string;
    desktop: string;
  };
  filter?: string;
  priority?: boolean;
}

export default function HeroSection({
  imageSrc = "/uva.jpeg",
  imageAlt = "UvA background",
  objectPosition = {
    mobile: "center -200px",
    desktop: "center 0",
  },
  filter = "grayscale(100%) brightness(1.2) contrast(0.8) sepia(18%)",
  priority = true,
}: HeroSectionProps) {
  const isMobile = useMobile();

  return (
    <section
      className="relative w-full"
      style={{
        height: isMobile ? "200px" : "50vh",
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{
            objectPosition: isMobile
              ? objectPosition.mobile
              : objectPosition.desktop,
            filter: filter,
          }}
          priority={priority}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
