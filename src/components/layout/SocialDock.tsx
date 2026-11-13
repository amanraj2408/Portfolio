"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Sparkles 
} from "lucide-react";

export default function SocialDock() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socials = [
    {
      name: "GitHub",
      icon: <GithubIcon className="w-4 h-4" />,
      href: PERSONAL_INFO.github,
      external: true,
      tooltip: "github.com/amanraj2408",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="w-4 h-4" />,
      href: PERSONAL_INFO.linkedIn,
      external: true,
      tooltip: "linkedin.com/in/amanraj24",
    },
    {
      name: "Email",
      icon: <Mail className="w-4 h-4" />,
      href: `mailto:${PERSONAL_INFO.email}`,
      external: false,
      tooltip: PERSONAL_INFO.email,
    },
    {
      name: "Phone",
      icon: <Phone className="w-4 h-4" />,
      href: `tel:${PERSONAL_INFO.phone}`,
      external: false,
      tooltip: PERSONAL_INFO.phoneDisplay,
    },
  ];

  return (
    <aside
      aria-label="Social links and shortcuts"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4"
    >
      {/* Top Subtle Line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-purple-500/40 to-purple-500" />

      {/* Dock Container */}
      <div className="flex flex-col items-center gap-3 p-2 rounded-2xl bg-[#0e1022]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-purple-950/60">
        {socials.map((item) => (
          <div key={item.name} className="relative group">
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 group-hover:text-purple-300"
              aria-label={item.name}
            >
              {item.icon}
            </a>

            {/* Hover Tooltip (Appears to the LEFT because dock is on right side) */}
            <div className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#131424] border border-white/15 text-[11px] font-mono text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg shadow-black/80 z-50">
              {item.tooltip}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#131424] border-r border-t border-white/15 rotate-45" />
            </div>
          </div>
        ))}

        {/* Copy Email Quick Action */}
        <div className="relative group">
          <button
            onClick={copyEmail}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-white/10 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Copy Email Address"
          >
            {copiedEmail ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#131424] border border-white/15 text-[11px] font-mono text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg shadow-black/80 z-50">
            {copiedEmail ? "Email Copied!" : "Quick Copy Email"}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#131424] border-r border-t border-white/15 rotate-45" />
          </div>
        </div>
      </div>

      {/* Bottom Subtle Line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-purple-500/40 to-purple-500" />
    </aside>
  );
}
