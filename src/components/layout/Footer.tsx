"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  Clock, 
  Sparkles,
  Heart
} from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const updateTime = () => {
      // Bengaluru time (IST, UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040407] border-t border-white/10 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-10 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1px]">
                <div className="w-full h-full bg-[#07070a] rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                  AR
                </div>
              </div>
              <span className="font-extrabold text-white text-base tracking-wider">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              Full-Stack Software Engineer • Modern Web • Real-Time Telemetry • AI & Vision Integration.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300">
              <Clock className="w-3.5 h-3.5" />
              <span>Bengaluru, India (IST):</span>
              <span className="text-white font-semibold">{time || "Loading..."}</span>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-4">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © {year} Aman Raj. Built with Next.js 16, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Designed for creative engineering & real-world scale</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
