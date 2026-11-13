"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SocialDock from "@/components/layout/SocialDock";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import TechStackSection from "@/components/skills/TechStackSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import EducationAchievementsSection from "@/components/education/EducationAchievementsSection";
import GitHubActivitySection from "@/components/github/GitHubActivitySection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import ResumeModal from "@/components/modals/ResumeModal";
import CommandPalette from "@/components/ui/CommandPalette";

export default function HomePage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Floating Header */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Floating Social Dock on Left (matches visual reference) */}
      <SocialDock />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 2. About Me Section */}
        <AboutSection />

        {/* 3. Technology Stack Section */}
        <TechStackSection />

        {/* 4. Featured Projects Section */}
        <ProjectsSection />

        {/* 5. Experience Timeline Section */}
        <ExperienceSection />

        {/* 6. Education & Achievements Section */}
        <EducationAchievementsSection />

        {/* 7. GitHub Activity & Repositories Section */}
        <GitHubActivitySection />

        {/* 8. Contact Section */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Command Palette */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

    </div>
  );
}
