"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set playback rate
    video.playbackRate = 0.5;

    // Handle the ended event to ensure looping works
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(console.error);
    };

    // Handle time update to prevent getting stuck near the end
    const handleTimeUpdate = () => {
      // If we're very close to the end, restart the video
      if (video.duration - video.currentTime < 0.1) {
        video.currentTime = 0;
      }
    };

    // Add event listeners
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Ensure video starts playing
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error("Video play failed:", error);
      }
    };

    // Small delay to ensure video is loaded
    setTimeout(playVideo, 100);

    // Cleanup
    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
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
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/header-loop.webm" type="video/webm" />
        <source src="/header-loop.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          filter: "grayscale(100%) brightness(1) contrast(0.8) sepia(18%)",
        }}
      ></div>

      <div className="relative container z-10 text-left text-white px-4">
        <div className="leading-tight">
          <p className="font-raleway text-lg mb-4 text-white/80">
            University of Amsterdam
          </p>
          <h1 className="font-raleway font-medium text-3xl sm:text-6xl md:text-7xl mb-8 leading-tight">
            Creative and Cultural
            <br />
            Industries
          </h1>
          <div className="max-w-2xl mb-10">
            <p className="text-sm sm:text-xl leading-relaxed text-white/90">
              The CI/X: Lab is an interdisciplinary research lab that welcomes
              academics, students, and industry professionals to collaborate on
              research projects and business initiatives that focus on the
              creative and cultural industries from a business-science
              perspective.
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById("mission")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
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
          </button>
        </div>
      </div>
    </section>
  );
}
