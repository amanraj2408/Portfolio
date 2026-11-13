"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { 
  Sparkles, 
  Search, 
  Layout, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  Radio, 
  Code2, 
  CheckCircle,
  Filter
} from "lucide-react";

export default function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];

  const getCategoryIcon = (catName: string) => {
    switch (catName) {
      case "Frontend":
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case "Backend":
        return <Server className="w-4 h-4 text-emerald-400" />;
      case "Database":
        return <Database className="w-4 h-4 text-yellow-400" />;
      case "Cloud & DevOps":
        return <Cloud className="w-4 h-4 text-blue-400" />;
      case "AI & Vision":
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case "Real-Time & Protocols":
        return <Radio className="w-4 h-4 text-pink-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-400" />;
    }
  };

  // Filter skills
  const filteredCategories = SKILL_CATEGORIES.map((catGroup) => {
    if (selectedCategory !== "All" && catGroup.category !== selectedCategory) {
      return null;
    }

    const matchedSkills = catGroup.skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        catGroup.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchedSkills.length === 0) return null;

    return {
      ...catGroup,
      skills: matchedSkills,
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#050508]/60">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>02 // ARCHITECTURE & TOOLING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Technology <span className="text-gradient-purple">Stack</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Curated toolkit powering high-throughput web frontends, distributed microservices, edge artificial intelligence, and sub-50ms real-time telemetry.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#0e0f1e]/80 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 font-mono transition-all"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-10">
          {filteredCategories.map((group) => {
            if (!group) return null;
            return (
              <div key={group.category} className="space-y-4">
                
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {getCategoryIcon(group.category)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{group.category}</span>
                      <span className="text-xs font-mono font-normal text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {group.skills.length} tools
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{group.description}</p>
                  </div>
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1 relative flex flex-col justify-between"
                    >
                      <div>
                        {/* Header: Skill Name & Level */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                              skill.level === "Core"
                                ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                                : skill.level === "Advanced"
                                ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                                : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {skill.description}
                        </p>
                      </div>

                      {/* Bottom Micro Indicator */}
                      <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="text-[10px]">Verified Production</span>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle className="w-3 h-3" />
                          <span className="text-[10px]">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 text-slate-500 font-mono text-sm">
              No matching technologies found for "{searchQuery}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

