"use client";

import React, { useState } from "react";
import { EXPERIENCES } from "@/data/portfolioData";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  CheckCircle,
  Building,
  Zap
} from "lucide-react";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#06060c]/70">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>04 // CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional <span className="text-gradient-purple">Experience</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Track record of designing, building, and deploying real-time systems, modern web frontends, and cloud microservices.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-purple-500/20 ml-4 sm:ml-8 md:ml-32 space-y-12 pb-4">
          
          {EXPERIENCES.map((exp, idx) => {
            const isCurrent = exp.period.includes("Present");

            return (
              <div key={exp.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Timeline Milestone Beacon */}
                <div 
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/50"
                      : "bg-[#0b0c19] border-white/20 text-slate-400 group-hover:border-purple-400 group-hover:text-purple-300"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  {isCurrent && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40" />
                  )}
                </div>

                {/* Experience Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-xl">
                  
                  {/* Top Bar: Company, Role & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-lg sm:text-xl text-white tracking-wide">
                          {exp.company}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            CURRENT ROLE
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-purple-400 mt-0.5">
                        {exp.role}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact Highlight Pill */}
                  <div className="my-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-2 text-xs text-purple-200">
                    <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span><strong>Key Impact:</strong> {exp.highlight}</span>
                  </div>

                  {/* Responsibilities Bullets */}
                  <div className="space-y-2.5 my-4">
                    {exp.description.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-purple-400/80 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Badges */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-500 mr-2">Tech:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

