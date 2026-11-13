import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMAN RAJ | Full-Stack Software Engineer & AI Integration",
  description:
    "Portfolio of Aman Raj — Full-Stack Software Engineer specializing in modern web technologies, backend systems, real-time telemetry (MQTT/WebSockets), and AI video analytics.",
  keywords: [
    "Aman Raj",
    "Full-Stack Software Engineer",
    "Next.js Developer",
    "React",
    "Node.js",
    "Python",
    "FastAPI",
    "YOLOv8",
    "Computer Vision",
    "Sentinx OS",
    "FlytSense",
    "Freshkart",
    "Drone Telemetry",
    "Real-Time Systems",
  ],
  authors: [{ name: "Aman Raj", url: "https://github.com/amanraj2408" }],
  openGraph: {
    title: "AMAN RAJ | Full-Stack Software Engineer & AI Integration",
    description:
      "Building Scalable Digital Products & Intelligent Systems. Specialized in modern web, distributed real-time systems, and AI integration.",
    url: "https://github.com/amanraj2408",
    siteName: "Aman Raj Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07070a] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
