"use client";

import React from "react";

export default function SpotlightBeam() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[750px] overflow-hidden pointer-events-none -z-10 select-none">
      {/* Origin Light Bulb / Source Point */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-[2px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-purple-400/30 rounded-full blur-xl" />

      {/* Main Overhead Conic Spotlight Beam */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] md:w-[1200px] h-[700px] opacity-70"
        style={{
          background: "conic-gradient(from 180deg at 50% 0%, transparent 38%, rgba(192, 132, 252, 0.08) 46%, rgba(255, 255, 255, 0.22) 50%, rgba(129, 140, 248, 0.12) 54%, transparent 62%)",
          filter: "blur(20px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Intense Center Core Ray */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] h-[600px] opacity-40 mix-blend-screen"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(168,85,247,0.18) 40%, rgba(99,102,241,0.05) 75%, transparent 100%)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          filter: "blur(12px)",
        }}
      />

      {/* Ambient Radial Spotlight Floor Bounce */}
      <div className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[350px] bg-gradient-to-t from-purple-600/15 via-indigo-500/10 to-transparent rounded-full blur-3xl opacity-60" />

      {/* Floating Light Dust Particles */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-radial from-white/10 to-transparent rounded-full blur-2xl animate-pulse-glow" />
    </div>
  );
}

