"use client";

import React from "react";
import { EDUCATION, ACHIEVEMENTS } from "@/data/portfolioData";
import { 
  GraduationCap, 
  Award, 
  Sparkles, 
  Users, 
  Presentation, 
  BookOpen, 
  Trophy,
  CheckCircle2
} from "lucide-react";

export default function EducationAchievementsSection() {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case "Presentation":
        return <Presentation className="w-5 h-5 text-indigo-400" />;
      case "Users":
        return <Users className="w-5 h-5 text-cyan-400" />;
      default:
        return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-cyan-500/20 text-xs font-mono text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>05 // CREDENTIALS & HONOURS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Education & <span className="text-gradient-cyan">Achievements</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Strong foundational engineering principles, robotic systems leadership, and recognized technological excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Education Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-between hover:border-cyan-500/30 transition-all shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    CGPA: {EDUCATION.cgpa}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Bachelor of Technology
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {EDUCATION.degree}
                </h3>
                <div className="text-sm font-semibold text-slate-300 mt-1 mb-4">
                  {EDUCATION.institution} • <span className="font-mono text-cyan-300">{EDUCATION.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {EDUCATION.description}
                </p>
              </div>

              {/* Highlights pills */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>First-Class Honours with Distinction</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Specialization in Robotics & Computer Automation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Achievements Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group flex items-start gap-4 shadow-xl"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform flex-shrink-0">
                  {getAchievementIcon(ach.icon)}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ach.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-cyan-300 self-start sm:self-auto">
                      {ach.metric}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-teal-400 mb-1.5 font-mono">
                    {ach.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

