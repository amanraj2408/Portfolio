"use client";

import React, { useEffect, useRef, useState } from "react";
import { Radio, Crosshair, ShieldCheck, Activity, Cpu } from "lucide-react";

export default function HeroVisual3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    altitude: 124.6,
    speed: 14.8,
    heading: 42,
    satellites: 18,
    fps: 60,
    status: "ARMED // TELEMETRY ACTIVE",
  });

  // Simulated live telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        altitude: Number((120 + Math.sin(Date.now() / 2000) * 8).toFixed(1)),
        speed: Number((14 + Math.cos(Date.now() / 1500) * 2.5).toFixed(1)),
        heading: Math.floor((prev.heading + 1) % 360),
        satellites: 18 + (Math.random() > 0.8 ? 1 : 0),
        fps: 59 + Math.round(Math.random()),
        status: "ARMED // SENTINX LINK OK",
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 480);
    let height = (canvas.height = 480);

    const resize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const size = Math.min(rect.width, 480);
        width = canvas.width = size;
        height = canvas.height = size;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotationY = (x / rect.width) * 0.8;
      targetRotationX = (-y / rect.height) * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle nodes for a 3D holographic sphere
    const NUM_POINTS = 160;
    const radius = 140;
    const points: { x: number; y: number; z: number; baseAngle: number; speed: number; size: number; hue: number }[] = [];

    for (let i = 0; i < NUM_POINTS; i++) {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / NUM_POINTS);
      const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        baseAngle: phi,
        speed: 0.003 + Math.random() * 0.002,
        size: 1.2 + Math.random() * 1.8,
        hue: i % 3 === 0 ? 270 : i % 3 === 1 ? 220 : 190, // purple, indigo, cyan
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      rotationX += (targetRotationX - rotationX) * 0.05;
      rotationY += (targetRotationY - rotationY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw background cybernetic rings
      ctx.save();
      ctx.translate(cx, cy);

      // Rotating Outer Radar Arc
      ctx.strokeStyle = "rgba(168, 85, 247, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, radius + 40, time * 0.5, time * 0.5 + Math.PI * 1.2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.beginPath();
      ctx.arc(0, 0, radius + 25, -time * 0.7, -time * 0.7 + Math.PI * 0.8);
      ctx.stroke();

      // Outer dashed circle
      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.arc(0, 0, radius + 55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center glowing core
      const coreGradient = ctx.createRadialGradient(0, 0, 5, 0, 0, radius * 0.8);
      coreGradient.addColorStop(0, "rgba(168, 85, 247, 0.25)");
      coreGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
      coreGradient.addColorStop(1, "rgba(7, 7, 10, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Rotate and project 3D points
      const rotY = time * 0.3 + rotationY;
      const rotX = Math.sin(time * 0.2) * 0.2 + rotationX;

      const projectedPoints: { x2d: number; y2d: number; scale: number; p: typeof points[0] }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Y-axis rotation
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // X-axis rotation
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 350;
        const scale = fov / (fov + z2 + 80);
        const x2d = x1 * scale;
        const y2d = y2 * scale;

        projectedPoints.push({ x2d, y2d, scale, p });
      }

      // Sort by depth (back to front)
      projectedPoints.sort((a, b) => a.scale - b.scale);

      // Draw connection vectors between close nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const dx = projectedPoints[i].x2d - projectedPoints[j].x2d;
          const dy = projectedPoints[i].y2d - projectedPoints[j].y2d;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1300) {
            const alpha = (1 - distSq / 1300) * 0.18 * projectedPoints[i].scale;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(projectedPoints[i].x2d, projectedPoints[i].y2d);
            ctx.lineTo(projectedPoints[j].x2d, projectedPoints[j].y2d);
            ctx.stroke();
          }
        }
      }

      // Draw points with luminous glow
      for (const pt of projectedPoints) {
        const alpha = Math.max(0.15, Math.min(1, pt.scale * pt.scale * 0.9));
        ctx.fillStyle = `hsla(${pt.p.hue}, 90%, 65%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x2d, pt.y2d, pt.p.size * pt.scale, 0, Math.PI * 2);
        ctx.fill();

        // Extra flare on foreground nodes
        if (pt.scale > 1.1) {
          ctx.fillStyle = `hsla(${pt.p.hue}, 100%, 80%, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(pt.x2d, pt.y2d, pt.p.size * pt.scale * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Crosshair & Telemetry Lock Ring
      ctx.strokeStyle = "rgba(147, 197, 253, 0.4)";
      ctx.lineWidth = 1;
      const chSize = 12;
      ctx.beginPath();
      ctx.moveTo(-chSize, 0);
      ctx.lineTo(chSize, 0);
      ctx.moveTo(0, -chSize);
      ctx.lineTo(0, chSize);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-[480px] aspect-square mx-auto select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-indigo-500/15 to-cyan-500/10 blur-3xl -z-10 animate-pulse-glow" />

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform hover:scale-[1.02]"
      />

      {/* Floating HUD Telemetry Pill - Top Left */}
      <div className="absolute top-4 left-0 sm:-left-4 glass-panel px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-slate-300 shadow-xl flex items-center gap-2 backdrop-blur-md">
        <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="text-slate-400">TELEMETRY:</span>
        <span className="text-emerald-400 font-semibold">{telemetry.altitude}m ALT</span>
      </div>

      {/* Floating HUD Telemetry Pill - Bottom Right */}
      <div className="absolute bottom-4 right-0 sm:-right-4 glass-panel px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-slate-300 shadow-xl flex items-center gap-2 backdrop-blur-md">
        <Crosshair className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-slate-400">YOLOv8:</span>
        <span className="text-purple-300 font-semibold">28 FPS INFERENCE</span>
      </div>

      {/* Floating HUD Status Pill - Bottom Left */}
      <div className="hidden sm:flex absolute -bottom-6 left-6 glass-panel px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-400 items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>MQTT / WEBSOCKET // LIVE</span>
      </div>
    </div>
  );
}

