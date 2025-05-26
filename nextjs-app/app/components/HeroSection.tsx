"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/header-loop.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative container z-10 text-left text-white px-4">
        <div className="">
          <p className="font-raleway text-lg mb-4 text-white/80">
            University of Amsterdam
          </p>
          <h1 className="font-raleway font-medium text-5xl sm:text-6xl md:text-7xl mb-8 leading-tight">
            Creative and Cultural
            <br />
            Industries
          </h1>
          <div className="max-w-2xl mb-10">
            <p className="text-lg sm:text-xl leading-relaxed text-white/90">
              The CI/X: Lab is an interdisciplinary research lab that welcomes
              academics, students, and industry professionals to collaborate on
              research projects and business initiatives that focus on the
              creative and cultural industries from a business-science
              perspective.
            </p>
          </div>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-raleway font-semibold px-8 py-4 rounded text-lg hover:bg-red-700 transition-colors duration-300"
          >
            Research
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
