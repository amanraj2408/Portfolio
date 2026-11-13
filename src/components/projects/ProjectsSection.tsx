"use client";

import React, { useState } from "react";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/Icons";
import Drone3DViewer from "./Drone3DViewer";
import SecurityCamera3DViewer from "./SecurityCamera3DViewer";
import FreshkartSimulator from "./FreshkartSimulator";
import ProjectModal from "../modals/ProjectModal";
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Cpu, 
  ShoppingBag,
  ExternalLink
} from "lucide-react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderVisual = (projectId: string) => {
    switch (projectId) {
      case "sentinx-os":
        return <Drone3DViewer />;
      case "flytsense":
        return <SecurityCamera3DViewer />;
      case "freshkart":
        return <FreshkartSimulator />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>02 // FEATURED SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Mission-Critical <span className="text-gradient-purple">Architectures</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Deep dive into production-grade systems spanning autonomous drone telemetry, computer vision intrusion detection, and high-concurrency quick-commerce.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="glass-panel rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 relative group"
              >
                {/* Background subtle radial glow according to project accent */}
                <div 
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none -z-10 transition-opacity group-hover:opacity-20"
                  style={{ backgroundColor: project.accentColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left (or Right depending on isEven): Project Info */}
                  <div className={`lg:col-span-6 flex flex-col justify-between order-2 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      {/* Project Counter & Category */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                          PROJECT {project.number}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-purple-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-purple-300/90 mt-1 mb-4">
                        {project.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>

                      {/* Key Highlights Checklist */}
                      <div className="space-y-2 mb-6">
                        {project.highlights.slice(0, 4).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Architecture & Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* 3D Visual Preview Container */}
                  <div className={`lg:col-span-6 order-1 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 to-white/5 shadow-2xl">
                      {renderVisual(project.id)}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
