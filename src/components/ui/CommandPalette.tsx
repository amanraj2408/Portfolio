"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { 
  Search, 
  X, 
  ArrowRight, 
  Terminal, 
  FileText, 
  Mail, 
  Phone, 
  Layers, 
  Sparkles,
  Command as CommandIcon,
  Check
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      label: "View & Download Resume",
      category: "Documents",
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      label: "Jump to Featured Projects",
      category: "Navigation",
      icon: <Layers className="w-4 h-4 text-teal-400" />,
      perform: () => {
        onClose();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Jump to Technology Stack",
      category: "Navigation",
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onClose();
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Jump to Experience Timeline",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onClose();
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Copy Email Address (amanraj5687@gmail.com)",
      category: "Contact",
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 800);
      },
    },
    {
      label: "Call Phone (+91-7277045036)",
      category: "Contact",
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        window.location.href = `tel:${PERSONAL_INFO.phone}`;
        onClose();
      },
    },
    {
      label: "Open LinkedIn Profile",
      category: "Social",
      icon: <LinkedinIcon className="w-4 h-4 text-blue-400" />,
      perform: () => {
        window.open(PERSONAL_INFO.linkedIn, "_blank");
        onClose();
      },
    },
    {
      label: "Open GitHub Profile (@amanraj2408)",
      category: "Social",
      icon: <GithubIcon className="w-4 h-4 text-slate-300" />,
      perform: () => {
        window.open(PERSONAL_INFO.github, "_blank");
        onClose();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-[#070d1a] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((action, i) => (
              <button
                key={i}
                onClick={action.perform}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                    {action.icon}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {action.label}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {action.category}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
              </button>
            ))
          ) : (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching commands for "{query}".
            </div>
          )}
        </div>

        {/* Bottom Shortcut Guide */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/5 text-[11px] font-mono text-slate-500">
          <span>Navigate with mouse or enter</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
}
