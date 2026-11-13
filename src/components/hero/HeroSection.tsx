"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SpotlightBeam from "./SpotlightBeam";
import HeroVisual3D from "./HeroVisual3D";
import { 
  ArrowRight, 
  FileText, 
  Mail, 
  Phone,
  Sparkles, 
  Code2, 
  Terminal, 
  Zap,
  Check
} from "lucide-react";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Cycle animated roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Signature Overhead Spotlight Beam */}
      <SpotlightBeam />

      {/* Grid background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 -z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Brand, Hero Typography, Dynamic Roles, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Top Pill / Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-mono text-purple-300 tracking-wide uppercase">
                {PERSONAL_INFO.location}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-300">
                React • Next.js • Python • AI
              </span>
            </div>

            {/* Sub-headline from reference: "A Creative" */}
            <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase mb-2">
              A Creative Engineer & Architect
            </div>

            {/* Large Brand Typography */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-white">
              <span className="block text-gradient">AMAN RAJ</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                FULL-STACK
              </span>
              <span className="block text-stroke-purple font-outline">
                ENGINEER
              </span>
            </h1>

            {/* Dynamic Animated Role Text */}
            <div className="h-10 sm:h-12 mt-4 flex items-center justify-center lg:justify-start gap-2">
              <Code2 className="w-5 h-5 text-purple-400 flex-shrink-0 animate-pulse" />
              <div className="relative overflow-hidden h-8 flex items-center">
                <span 
                  key={roleIndex}
                  className="font-mono text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
                >
                  {PERSONAL_INFO.roles[roleIndex]}
                </span>
              </div>
            </div>

            {/* Core Subtitle & Value Proposition */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium max-w-xl leading-relaxed">
              <strong className="text-white font-semibold">{PERSONAL_INFO.heroTagline}</strong>
              <span className="block mt-1 text-slate-400 text-sm sm:text-base font-normal">
                {PERSONAL_INFO.heroSubtext}
              </span>
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-purple-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg"
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-mono text-xs text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Social Links (Hero quick strip) */}
            <div className="mt-8 flex items-center gap-4 text-slate-400 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-widest text-[10px]">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>

          </div>

          {/* Right Column: 3D Holographic Telemetry Visual Element */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <HeroVisual3D />
          </div>

        </div>

        {/* Bottom Fast Metrics Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-4 rounded-2xl flex flex-col items-center text-center group hover:border-purple-500/30 transition-colors"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-indigo-300 font-mono">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
