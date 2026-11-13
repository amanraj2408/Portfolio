"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { 
  Terminal, 
  Cpu, 
  Radio, 
  Layers, 
  ShieldCheck, 
  Flame, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"whoami" | "architecture" | "values">("whoami");
  const [copied, setCopied] = useState(false);

  const pillars = [
    {
      title: "Real-Time Telemetry & Systems",
      icon: <Radio className="w-5 h-5 text-indigo-400" />,
      desc: "Sub-50ms bidirectional telemetry streaming for drone operations and IoT fleets via MQTT, EMQX, and persistent WebSockets.",
      tags: ["MQTT", "EMQX", "WebSockets", "DJI Pilot 2"],
    },
    {
      title: "AI & Computer Vision Integration",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      desc: "Edge-ready video stream inference with YOLOv8, OpenCV, and FastAPI, featuring spatial intrusion logic and alert suppression.",
      tags: ["YOLOv8", "PyTorch", "RTSP", "OpenCV"],
    },
    {
      title: "Modern Scalable Full-Stack",
      icon: <Layers className="w-5 h-5 text-pink-400" />,
      desc: "Next.js 16 App Router, React 19, TypeScript, Node.js, and PostgreSQL architectures engineered for ultra-fast rendering.",
      tags: ["Next.js", "React", "TypeScript", "Node.js"],
    },
    {
      title: "Cloud & DevOps Reliability",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      desc: "Docker containerization, AWS S3 telemetry archiving, EC2 server administration, and automated CI/CD pipelines.",
      tags: ["AWS S3", "Docker", "EC2", "PostgreSQL"],
    },
  ];

  const handleCopyCmd = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineering Systems That <span className="text-gradient-purple">Scale in Real Time</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging cutting-edge web frontends, resilient backend microservices, and live artificial intelligence pipelines.
          </p>
        </div>

        {/* Content Grid: Bio & Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Detailed Storytelling */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Hi, I'm Aman Raj.
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">Full-Stack Software Engineer</strong> with 2+ years of experience building responsive web applications, backend services, and real-time data platforms.
                </p>
                <p>
                  I enjoy solving complex engineering problems and building reliable, scalable software products. My day-to-day focus centers on architecting telemetry pipelines for autonomous drone systems, building edge AI video surveillance platforms, and engineering high-throughput web applications.
                </p>
                <p className="text-slate-400">
                  My experience encompasses frontend engineering with Next.js and TypeScript, high-speed API development using Node.js and FastAPI, relational database architecture with PostgreSQL, and low-latency communication with MQTT, EMQX, and WebSockets.
                </p>
              </div>

              {/* Quick Details Badges */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Bengaluru, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-pink-400" />
                  <span>2+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>First-Class Honours (MAKAUT)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>Full-Stack & Edge AI</span>
                </div>
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {pillar.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Interactive Terminal Sandbox */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/80">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0d0e1c] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    aman@bengaluru:~
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1">
                  {(["whoami", "architecture", "values"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        activeTab === tab
                          ? "bg-purple-600/30 text-purple-300 border border-purple-500/30"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-xs sm:text-sm text-slate-300 bg-[#090912] space-y-4 min-h-[380px]">
                
                {activeTab === "whoami" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="text-slate-500"># System profile inspection</div>
                    <div>
                      <span className="text-emerald-400">aman@bengaluru:~$</span> cat identity.json
                    </div>
                    <pre className="text-slate-300 bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto text-xs leading-relaxed">
{`{
  "name": "Aman Raj",
  "title": "Full-Stack Software Engineer",
  "specialization": [
    "Modern Web (React, Next.js 16, TypeScript)",
    "Backend & APIs (Node.js, FastAPI, Python, Java)",
    "Real-Time Telemetry (MQTT, EMQX, WebSockets)",
    "Computer Vision & AI (YOLOv8, PyTorch, OpenCV)"
  ],
  "experience_years": "2+",
  "location": "Bengaluru, India",
  "status": "Available for High-Impact Roles",
  "passions": ["Distributed Systems", "Drone Robotics", "Clean UX"]
}`}
                    </pre>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                      <span>exit_code: 0</span>
                      <button
                        onClick={() => handleCopyCmd("amanraj5687@gmail.com")}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied Email" : "Copy Email"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "architecture" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="text-slate-500"># Telemetry & pipeline specifications</div>
                    <div>
                      <span className="text-emerald-400">aman@bengaluru:~$</span> ./inspect_pipeline.sh --realtime
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-purple-400">1. DJI Pilot 2 Telemetry:</span>
                        <span className="text-emerald-400 font-bold">MQTT 3.1.1 / QoS 1</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-purple-400">2. Message Broker Cluster:</span>
                        <span className="text-emerald-400 font-bold">EMQX Distributed</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-purple-400">3. Frontend Broadcast:</span>
                        <span className="text-emerald-400 font-bold">WebSockets (&lt; 50ms)</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                        <span className="text-purple-400">4. AI Vision Ingestion:</span>
                        <span className="text-emerald-400 font-bold">RTSP / MediaMTX</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">5. Edge Model:</span>
                        <span className="text-emerald-400 font-bold">YOLOv8 @ 28 FPS</span>
                      </div>
                    </div>
                    <div className="text-emerald-400 text-xs">✓ All communication links verified healthy.</div>
                  </div>
                )}

                {activeTab === "values" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="text-slate-500"># Engineering core values</div>
                    <div>
                      <span className="text-emerald-400">aman@bengaluru:~$</span> cat ~/manifesto.txt
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3 text-xs leading-relaxed text-slate-300">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">01.</span>
                        <span><strong>Zero Bloat:</strong> Every line of code, dependency, and network roundtrip must justify its existence.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">02.</span>
                        <span><strong>Real-World Resiliency:</strong> Network packets drop and cameras disconnect. Graceful recovery is essential.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">03.</span>
                        <span><strong>User-Obsessed Polish:</strong> Exceptional software combines rock-solid backend throughput with buttery frontend micro-interactions.</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="mt-4 p-4 rounded-2xl glass-panel flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Direct Contact:</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

