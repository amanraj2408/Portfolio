"use client";

import React from "react";
import { Project } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/Icons";
import { 
  X, 
  ExternalLink, 
  Radio, 
  Cpu, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Layers
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0d1c] border border-white/15 rounded-3xl overflow-y-auto shadow-2xl shadow-purple-950/60 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <span>PROJECT {project.number}</span>
            <span>•</span>
            <span className="text-slate-400">{project.category}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Detailed Narrative */}
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-b border-white/10 py-5">
          <p>{project.longDescription}</p>
        </div>

        {/* Architectural Flowchart Box */}
        <div className="my-6 p-5 rounded-2xl bg-[#070710] border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Distributed System Architecture</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] text-indigo-400 font-bold">01 // INGESTION</span>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                {project.architectureDetails.dataIngestion}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] text-purple-400 font-bold">02 // PROCESSING</span>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                {project.architectureDetails.processing}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <span className="text-[10px] text-emerald-400 font-bold">03 // STREAMING & UI</span>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                {project.architectureDetails.delivery}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights Checklist */}
        <div className="my-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Key Technical Innovations & Implementation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Badges */}
        <div className="my-6 pt-4 border-t border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Core Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs shadow-md cursor-pointer hover:opacity-95"
          >
            Back to Showcase
          </button>
        </div>

      </div>
    </div>
  );
}
