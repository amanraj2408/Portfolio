"use client";

import React, { useRef } from "react";
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, ACHIEVEMENTS, FEATURED_PROJECTS } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  CheckCircle2
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Outer Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0d1b] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#101124] border-b border-white/10 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              AMAN_RAJ_RESUME.PDF
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#0e0f20] text-slate-200 font-sans text-xs sm:text-sm selection:bg-purple-500/30">
          
          <div ref={printRef} className="max-w-3xl mx-auto space-y-6">
            
            {/* Header */}
            <div className="text-center border-b border-white/10 pb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-sm font-semibold text-purple-400 font-mono mt-1">
                {PERSONAL_INFO.title}
              </div>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {PERSONAL_INFO.location}
                </span>
                <span>•</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-purple-300 hover:underline">
                  {PERSONAL_INFO.email}
                </a>
                <span>•</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-purple-300 hover:underline">
                  {PERSONAL_INFO.phoneDisplay}
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedIn} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">
                  linkedin.com/in/amanraj24
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">
                  github.com/amanraj2408
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                // PROFESSIONAL SUMMARY
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm font-normal">
                {PERSONAL_INFO.aboutSummary}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                // TECHNICAL EXPERTISE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">Frontend:</strong> React.js, Next.js 16, TypeScript, JavaScript, Redux Toolkit, React Query, Tailwind CSS
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">Backend:</strong> Node.js, Express.js, Python, FastAPI, Java, Spring Boot, REST APIs
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">Real-Time & IoT:</strong> MQTT, EMQX, WebSockets, RTSP, MediaMTX, Drone Telemetry
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">AI & Vision:</strong> YOLOv8, PyTorch, OpenCV, RT-DETR, Computer Vision
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">Databases:</strong> PostgreSQL, MongoDB, MySQL, SQLite, Prisma ORM
                </div>
                <div className="p-2 rounded bg-white/[0.03] border border-white/5">
                  <strong className="text-white">Cloud & DevOps:</strong> AWS (S3, EC2), Docker, Jenkins, Git, GitHub Actions, CI/CD
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-3">
                // WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-bold text-white text-sm">{exp.company}</div>
                      <div className="text-xs font-mono text-purple-300">{exp.period} | {exp.location}</div>
                    </div>
                    <div className="text-xs font-semibold text-purple-400 mb-2">{exp.role}</div>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {exp.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-3">
                // KEY ENGINEERING PROJECTS
              </h2>
              <div className="space-y-3">
                {FEATURED_PROJECTS.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white">{proj.title} – <span className="text-purple-300 font-normal">{proj.tagline}</span></div>
                    </div>
                    <div className="text-slate-400 my-1 font-mono text-[11px]">
                      Tech: {proj.technologies.join(", ")}
                    </div>
                    <p className="text-slate-300">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                  // EDUCATION
                </h2>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <div className="font-bold text-white">{EDUCATION.degree}</div>
                  <div className="text-purple-300 font-mono">{EDUCATION.institution} (2019–2023)</div>
                  <div className="text-slate-300 mt-1 font-semibold">CGPA: {EDUCATION.cgpa}</div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                  // HONORS & ACHIEVEMENTS
                </h2>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1.5">
                  <div>🏆 <strong>Best Project Award:</strong> TechFest 2023 (Rank 1 of 75+ teams)</div>
                  <div>🎤 <strong>Presenter:</strong> Global Entrepreneurship Summit 2023</div>
                  <div>🤖 <strong>Head of Robotics Club:</strong> Mentored 100+ engineering students</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
