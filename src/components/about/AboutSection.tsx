"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { 
  Sparkles, 
  Radio, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      title: "Real-Time Telemetry",
      subtitle: "MQTT • WebSockets • EMQX",
      icon: <Radio className="w-5 h-5 text-cyan-400" />,
      desc: "Sub-50ms bidirectional telemetry streaming for drone operations and IoT fleets via EMQX distributed brokers.",
      tags: ["MQTT", "EMQX", "WebSockets", "DJI Pilot 2"],
      accent: "from-cyan-500/20 to-cyan-500/5",
      border: "hover:border-cyan-500/40",
    },
    {
      title: "AI & Computer Vision",
      subtitle: "YOLOv8 • PyTorch • OpenCV",
      icon: <Cpu className="w-5 h-5 text-teal-400" />,
      desc: "Edge-ready video stream inference with YOLOv8, RTSP ingestion via MediaMTX, and spatial duplicate alert suppression.",
      tags: ["YOLOv8", "PyTorch", "RTSP", "OpenCV"],
      accent: "from-teal-500/20 to-teal-500/5",
      border: "hover:border-teal-500/40",
    },
    {
      title: "Modern Full-Stack",
      subtitle: "Next.js 16 • React • TypeScript",
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      desc: "High-performance reactive user interfaces, App Router architecture, Node.js and FastAPI microservices with PostgreSQL.",
      tags: ["Next.js", "React", "TypeScript", "Node.js"],
      accent: "from-cyan-500/20 to-cyan-500/5",
      border: "hover:border-cyan-500/40",
    },
    {
      title: "Cloud & Reliability",
      subtitle: "AWS S3 • EC2 • Docker",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      desc: "Docker containerization, S3 cloud flight-log archives, EC2 server administration, and automated CI/CD workflows.",
      tags: ["AWS S3", "Docker", "EC2", "PostgreSQL"],
      accent: "from-emerald-500/20 to-emerald-500/5",
      border: "hover:border-emerald-500/40",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambient radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-cyan-900/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering High-Performance <span className="text-gradient-cyan">Digital Products</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Full-Stack Software Engineer with 2+ years of experience building reliable web applications, distributed backend services, and real-time intelligent platforms.
          </p>
        </div>

        {/* Narrative & Profile Overview Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Aman Raj</span>
              </h3>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                I am a <strong>Full-Stack Software Engineer</strong> with 2+ years of experience building responsive web applications, backend services, and real-time data platforms.
              </p>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                I enjoy solving complex engineering problems and building reliable, scalable software products. My day-to-day focus centers on architecting telemetry pipelines for autonomous drone systems, building edge AI video surveillance platforms, and engineering high-throughput web applications.
              </p>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                My experience includes frontend engineering, API development, database architecture, real-time communication, and AI-powered video analytics.
              </p>
            </div>

            {/* Quick Metrics & Location Column */}
            <div className="lg:col-span-4 flex flex-col gap-3 p-6 rounded-2xl bg-[#070d1a]/80 border border-white/10">
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300 pb-3 border-b border-white/5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">LOCATION</div>
                  <div className="font-semibold text-white">Bengaluru, India</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300 pb-3 border-b border-white/5">
                <Briefcase className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">EXPERIENCE</div>
                  <div className="font-semibold text-white">2+ Years in Production</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                <GraduationCap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">DEGREE</div>
                  <div className="font-semibold text-white">B.Tech (8.58 CGPA) • MAKAUT</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Architectural Pillars: Placed HORIZONTALLY IN A ROW */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Core Engineering Specializations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`glass-panel p-5 rounded-2xl border border-white/10 ${pillar.border} transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl relative overflow-hidden`}
              >
                {/* Subtle top glow */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.accent}`} />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-400 mb-2.5">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                    {pillar.desc}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
