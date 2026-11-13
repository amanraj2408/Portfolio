"use client";

import React, { useState } from "react";
import { PERSONAL_INFO, GITHUB_FEATURED_REPOS } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/Icons";
import { 
  Sparkles, 
  GitFork, 
  Star, 
  ExternalLink, 
  Code2, 
  Flame, 
  GitCommit,
  BookOpen
} from "lucide-react";

export default function GitHubActivitySection() {
  const [filterLang, setFilterLang] = useState<string>("All");

  // Generate 52 weeks x 7 days contribution grid simulation
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const languages = [
    { name: "TypeScript", percent: 45, color: "bg-blue-500" },
    { name: "JavaScript", percent: 35, color: "bg-yellow-400" },
    { name: "Python", percent: 12, color: "bg-emerald-500" },
    { name: "Dart", percent: 5, color: "bg-cyan-400" },
    { name: "Other", percent: 3, color: "bg-purple-500" },
  ];

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>06 // OPEN-SOURCE & ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            GitHub <span className="text-gradient-cyan">Activity</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Continuous engineering discipline, open-source repositories, and verified code contributions.
          </p>
        </div>

        {/* GitHub Profile Banner Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            
            {/* User Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                <img
                  src="https://avatars.githubusercontent.com/u/106879974?v=4"
                  alt="Aman Raj GitHub Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Aman Raj</h3>
                  <span className="font-mono text-xs text-cyan-400">@amanraj2408</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">
                  Full-Stack Developer | MERN & Java/Spring Boot | Cloud & DevOps Enthusiast • 10+ production-ready web apps.
                </p>
              </div>
            </div>

            {/* GitHub Action & Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-bold text-white font-mono">39</div>
                  <div className="text-[10px] text-slate-400 font-mono">Public Repos</div>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-lg font-bold text-emerald-400 font-mono">500+</div>
                  <div className="text-[10px] text-slate-400 font-mono">Contributions</div>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:via-teal-200 hover:to-emerald-300 shadow-md shadow-cyan-950/40 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Interactive Contribution Grid */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                <span>Contribution Frequency (Past Year)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-950/60" />
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-600/60" />
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                <span>More</span>
              </div>
            </div>

            {/* Grid Visualization */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[680px]">
                {/* Month labels */}
                <div className="grid grid-cols-12 text-[10px] font-mono text-slate-500 mb-1 text-center">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                {/* Heatmap Dots */}
                <div className="grid grid-flow-col grid-rows-7 gap-1">
                  {Array.from({ length: 364 }).map((_, i) => {
                    const intensity = (i * 7 + (i % 5) * 13) % 10;
                    let bg = "bg-white/[0.04]";
                    if (intensity > 3 && intensity <= 6) bg = "bg-cyan-950/60";
                    else if (intensity > 6 && intensity <= 8) bg = "bg-cyan-600/60";
                    else if (intensity > 8) bg = "bg-cyan-400 shadow-sm shadow-cyan-400/50";

                    return (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-sm ${bg} transition-colors hover:scale-125 hover:bg-white`}
                        title={`Day ${i + 1}: ${intensity > 3 ? intensity : 0} commits`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Languages breakdown bar */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Primary Languages & Technologies</span>
              <span>100% Measured Output</span>
            </div>
            {/* Multi-segment progress bar */}
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-white/5">
              {languages.map((l) => (
                <div
                  key={l.name}
                  style={{ width: `${l.percent}%` }}
                  className={`h-full ${l.color}`}
                  title={`${l.name}: ${l.percent}%`}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-300">
              {languages.map((l) => (
                <div key={l.name} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                  <span>{l.name}</span>
                  <span className="text-slate-500 font-normal">({l.percent}%)</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Featured Repositories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Public Repositories</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Direct from github.com/amanraj2408
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GITHUB_FEATURED_REPOS.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400/20" />
                    <span>{repo.stars}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
