"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Eye, Cpu, RefreshCw, CheckCircle2, AlertTriangle, Video } from "lucide-react";

export default function VisionSimulator() {
  const [breachActive, setBreachActive] = useState(true);
  const [confidence, setConfidence] = useState(94.2);
  const [suppressedCount, setSuppressedCount] = useState(4);
  const [fps, setFps] = useState(28.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(Number((92 + Math.random() * 6).toFixed(1)));
      setFps(Number((27.8 + Math.random() * 1.5).toFixed(1)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerBreach = () => {
    setBreachActive(true);
    setSuppressedCount((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] bg-[#070913] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-4 font-mono select-none">
      
      {/* Simulated Surveillance Camera Noise & Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Top Camera HUD Info */}
      <div className="relative z-10 flex items-center justify-between text-[11px] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-white font-bold tracking-wider">CAM-02 // PERIMETER NORTH</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-purple-400">RTSP: MediaMTX</span>
          <span className="text-emerald-400">{fps} FPS</span>
        </div>
      </div>

      {/* Center Simulated Bounding Box */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        {breachActive ? (
          <div className="relative w-48 sm:w-56 h-36 sm:h-44 border-2 border-red-500/80 rounded-lg bg-red-500/10 flex flex-col justify-between p-2 animate-pulse">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-red-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-red-400" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-red-400" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-red-400" />

            {/* Label */}
            <div className="self-start px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>YOLOv8 // PERSON: {confidence}%</span>
            </div>

            <div className="self-end px-2 py-0.5 rounded bg-black/80 border border-red-500/40 text-[9px] text-red-300">
              INTRUSION CONFIRMED
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 text-xs py-8">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/60 mx-auto mb-2" />
            <span>Perimeter Secure. No intrusion detected.</span>
          </div>
        )}
      </div>

      {/* Bottom AI Analytics Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" /> INFERENCE
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">PyTorch / CUDA</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-yellow-400" /> SUPPRESSED
          </span>
          <span className="font-bold text-yellow-400 text-xs sm:text-sm">{suppressedCount} Redundant</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
          <button
            onClick={() => setBreachActive(!breachActive)}
            className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-200 transition-colors cursor-pointer py-1 font-bold text-[10px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{breachActive ? "CLEAR" : "TRIGGER"}</span>
          </button>
        </div>
      </div>

    </div>
  );
}

