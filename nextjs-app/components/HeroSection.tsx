"use client";

import Image from "next/image";
import { useMobile } from "@/hooks/useMobile";

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  height?: string;
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
  height = "h-[50vh]",
  objectPosition = {
    mobile: "center -200px",
    desktop: "center 0",
  },
  filter = "grayscale(100%) brightness(1.2) contrast(0.8) sepia(18%)",
  priority = true,
}: HeroSectionProps) {
  const isMobile = useMobile();

  return (
    <section className={`relative ${height}`}>
      <div className="absolute inset-0">
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
        />
      </div>
    </section>
  );
}
