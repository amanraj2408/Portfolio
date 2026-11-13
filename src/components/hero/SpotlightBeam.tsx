"use client";

import React from "react";

export default function SpotlightBeam() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[850px] overflow-hidden pointer-events-none -z-10 select-none">
      {/* Origin Light Emitter Point at top ceiling */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-95 blur-[1px]" />
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-96 h-16 bg-cyan-400/35 rounded-full blur-2xl" />

      {/* Primary Overhead Conic Spotlight Beam */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] sm:w-[980px] md:w-[1300px] h-[800px] opacity-85"
        style={{
          background: "conic-gradient(from 180deg at 50% 0%, transparent 37%, rgba(56, 189, 248, 0.22) 45%, rgba(255, 255, 255, 0.4) 50%, rgba(20, 184, 166, 0.22) 55%, transparent 63%)",
          filter: "blur(24px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Intense Center Volumetric Core Ray */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] h-[680px] opacity-50 mix-blend-screen"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(56,189,248,0.3) 40%, rgba(20,184,166,0.1) 80%, transparent 100%)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          filter: "blur(14px)",
        }}
      />

      {/* Ambient Radial Spotlight Floor Bounce on the 3D Workstation */}
      <div className="absolute top-[260px] left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-t from-cyan-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl opacity-75" />

      {/* Floating Cyan/Teal Light Flairs */}
      <div className="absolute top-40 left-1/4 w-72 h-72 bg-cyan-500/12 rounded-full blur-3xl" />
      <div className="absolute top-60 right-1/4 w-80 h-80 bg-teal-500/12 rounded-full blur-3xl" />
    </div>
  );
}
