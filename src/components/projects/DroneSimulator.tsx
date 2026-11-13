"use client";

import React, { useState, useEffect } from "react";
import { Radio, Navigation, BatteryCharging, Wind, Compass, MapPin, Play, Pause } from "lucide-react";

export default function DroneSimulator() {
  const [active, setActive] = useState(true);
  const [alt, setAlt] = useState(128.4);
  const [speed, setSpeed] = useState(14.2);
  const [battery, setBattery] = useState(86);
  const [pitch, setPitch] = useState(4.2);
  const [roll, setRoll] = useState(-2.1);
  const [waypoint, setWaypoint] = useState("WP-04 (Perimeter Alpha)");

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setAlt((prev) => Number((prev + (Math.random() - 0.48) * 1.5).toFixed(1)));
      setSpeed((prev) => Number((prev + (Math.random() - 0.5) * 0.8).toFixed(1)));
      setPitch((prev) => Number(((Math.sin(Date.now() / 1000) * 6)).toFixed(1)));
      setRoll((prev) => Number(((Math.cos(Date.now() / 1200) * 4)).toFixed(1)));
    }, 600);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] bg-[#080914] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-4 font-mono select-none">
      
      {/* Background Radar Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Radar Sweep Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full border border-indigo-500/20 relative">
          <div className="w-40 h-40 rounded-full border border-indigo-500/30 absolute inset-8" />
          <div className="w-24 h-24 rounded-full border border-indigo-500/40 absolute inset-16" />
          {/* Rotating radar line */}
          <div className="w-full h-full rounded-full animate-radar origin-center"
               style={{
                 background: "conic-gradient(from 0deg, rgba(99, 102, 241, 0.25) 0deg, transparent 60deg, transparent 360deg)"
               }}
          />
        </div>
      </div>

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${active ? "bg-emerald-400" : "bg-yellow-400"} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-emerald-500" : "bg-yellow-500"}`} />
          </span>
          <span className="text-white font-bold tracking-wider">SENTINX // DJI PILOT 2</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-purple-400">MQTT: EMQX-CLUSTER-01</span>
          <span className="text-emerald-400">WS: 34ms</span>
        </div>
      </div>

      {/* Center Simulated Drone Coordinates */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        {/* Drone Icon with attitude tilt */}
        <div 
          className="relative w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-400/50 flex items-center justify-center text-indigo-300 shadow-xl shadow-indigo-500/20 transition-transform duration-300"
          style={{ transform: `rotate(${pitch * 2}deg) translateY(${roll}px)` }}
        >
          <Navigation className="w-8 h-8 text-cyan-300 fill-cyan-400/30" />
          <div className="absolute -top-1 w-2 h-2 rounded-full bg-red-400 animate-ping" />
        </div>

        <div className="mt-3 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
          <span className="text-slate-400">GPS:</span> 12.9716° N, 77.5946° E • <span className="text-purple-300">{waypoint}</span>
        </div>
      </div>

      {/* Bottom HUD Telemetry Strip */}
      <div className="relative z-10 grid grid-cols-4 gap-2 text-[10px] sm:text-xs">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Radio className="w-3 h-3 text-indigo-400" /> ALTITUDE
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">{alt} m</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Wind className="w-3 h-3 text-cyan-400" /> AIRSPEED
          </span>
          <span className="font-bold text-cyan-300 text-xs sm:text-sm">{speed} m/s</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <BatteryCharging className="w-3 h-3 text-emerald-400" /> BATTERY
          </span>
          <span className="font-bold text-emerald-400 text-xs sm:text-sm">{battery}%</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
          <button
            onClick={() => setActive(!active)}
            className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 transition-colors cursor-pointer py-1 font-bold"
          >
            {active ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{active ? "PAUSE" : "RESUME"}</span>
          </button>
        </div>
      </div>

    </div>
  );
}

