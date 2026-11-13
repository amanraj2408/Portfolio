"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Terminal, Code2, Cpu, GitBranch, Sparkles, CheckCircle2 } from "lucide-react";

export default function HeroVisual3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    latency: "12ms",
    ops: "16.4k",
    status: "BUILD PASS",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats({
        latency: Math.floor(10 + Math.random() * 4) + "ms",
        ops: (16.0 + Math.random() * 0.8).toFixed(1) + "k",
        status: "BUILD PASS",
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // 2. High-Tech Studio Lighting (Cyan, Emerald, Crisp White)
    const ambientLight = new THREE.AmbientLight(0x0c1d2e, 3.2);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 8.0, 14, Math.PI / 4, 0.4, 1.2);
    keySpot.position.set(0, 5, 3);
    scene.add(keySpot);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 5.5);
    cyanLight.position.set(-3.5, 2.5, 2);
    scene.add(cyanLight);

    const emeraldLight = new THREE.DirectionalLight(0x10b981, 4.5);
    emeraldLight.position.set(3.5, -1, 1.5);
    scene.add(emeraldLight);

    // 3. Materials
    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x111927,
      roughness: 0.25,
      metalness: 0.85,
    });

    const silverMetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.2,
      metalness: 0.9,
    });

    const neonCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const neonEmerald = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    // 4. Main Software Engineer Dev Workstation Group
    const workstationGroup = new THREE.Group();
    workstationGroup.position.set(0, -0.15, 0);
    scene.add(workstationGroup);

    // --- A. 3D Developer Laptop ---
    const laptopGroup = new THREE.Group();
    workstationGroup.add(laptopGroup);

    // Laptop Base / Keyboard Deck
    const baseGeo = new THREE.BoxGeometry(1.9, 0.08, 1.3);
    const baseMesh = new THREE.Mesh(baseGeo, silverMetalMat);
    baseMesh.position.set(0, 0, 0);
    laptopGroup.add(baseMesh);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.55, 0.01, 0.38);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.position.set(0, 0.045, 0.36);
    laptopGroup.add(trackpadMesh);

    // Glowing Keyboard Matrix
    const keyboardGeo = new THREE.BoxGeometry(1.65, 0.015, 0.65);
    const keyboardMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
    });
    const keyboardMesh = new THREE.Mesh(keyboardGeo, keyboardMat);
    keyboardMesh.position.set(0, 0.045, -0.18);
    laptopGroup.add(keyboardMesh);

    // Individual Key Rows (Procedural Grid)
    const keyRows = 4;
    const keyCols = 10;
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
    });

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        const keyGeo = new THREE.BoxGeometry(0.12, 0.02, 0.1);
        const kMesh = new THREE.Mesh(keyGeo, keyMat);
        kMesh.position.set(
          -0.68 + c * 0.15,
          0.055,
          -0.42 + r * 0.14
        );
        laptopGroup.add(kMesh);
      }
    }

    // Laptop Display Screen Hinge Group (Angled open)
    const screenHinge = new THREE.Group();
    screenHinge.position.set(0, 0.04, -0.65);
    screenHinge.rotation.x = -Math.PI / 10; // ~108 degrees open
    laptopGroup.add(screenHinge);

    // Screen Lid Backing
    const lidGeo = new THREE.BoxGeometry(1.9, 1.25, 0.05);
    const lidMesh = new THREE.Mesh(lidGeo, darkChassisMat);
    lidMesh.position.set(0, 0.62, 0);
    screenHinge.add(lidMesh);

    // Screen Bezel Inner Border
    const bezelGeo = new THREE.BoxGeometry(1.82, 1.18, 0.02);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x020617 });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, 0.62, 0.03);
    screenHinge.add(bezelMesh);

    // Glowing IDE Screen Canvas
    // Procedural IDE Texture generated dynamically on an HTML5 canvas!
    const ideCanvas = document.createElement("canvas");
    ideCanvas.width = 512;
    ideCanvas.height = 340;
    const ctx = ideCanvas.getContext("2d")!;

    const drawIDE = () => {
      // Dark IDE Background
      ctx.fillStyle = "#070b14";
      ctx.fillRect(0, 0, 512, 340);

      // Top Window Header Bar
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 512, 36);

      // Window Control Dots (macOS style)
      ctx.fillStyle = "#ef4444";
      ctx.beginPath(); ctx.arc(22, 18, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(38, 18, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#10b981";
      ctx.beginPath(); ctx.arc(54, 18, 5, 0, Math.PI * 2); ctx.fill();

      // File Tab
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(80, 8, 160, 28);
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 13px monospace";
      ctx.fillText("SentinxEngine.ts", 95, 26);

      // Syntax Highlighted Code Lines
      const codeLines = [
        { text: "import { DroneTelemetry } from '@sentinx/core';", color: "#94a3b8" },
        { text: "import { YOLOv8Inference } from '@flyt/vision';", color: "#94a3b8" },
        { text: "", color: "#ffffff" },
        { text: "export async function handleStream(req: NextRequest) {", color: "#38bdf8" },
        { text: "  const client = await emqxCluster.connect();", color: "#34d399" },
        { text: "  const stream = client.subscribe('telemetry/live');", color: "#f8fafc" },
        { text: "  const model = await loadPyTorchWeights('yolov8n.pt');", color: "#fbbf24" },
        { text: "  return NextResponse.json({ status: 'STREAMING_OK' });", color: "#38bdf8" },
        { text: "}", color: "#38bdf8" },
      ];

      ctx.font = "14px Consolas, monospace";
      codeLines.forEach((line, i) => {
        // Line number
        ctx.fillStyle = "#334155";
        ctx.fillText(String(i + 1).padStart(2, "0"), 20, 70 + i * 26);

        // Code text
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 60, 70 + i * 26);
      });

      // Bottom Status Line
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(0, 318, 512, 22);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px monospace";
      ctx.fillText(" UTF-8   TypeScript 5.0   main*   ⚡ Sub-50ms Ready", 16, 333);
    };

    drawIDE();

    const ideTexture = new THREE.CanvasTexture(ideCanvas);
    const screenGeo = new THREE.PlaneGeometry(1.72, 1.08);
    const screenMat = new THREE.MeshBasicMaterial({
      map: ideTexture,
      transparent: true,
      opacity: 0.98,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.62, 0.045);
    screenHinge.add(screenMesh);

    // --- B. Floating Holographic Tech Tags in 3D space around Workstation ---
    const tagsGroup = new THREE.Group();
    workstationGroup.add(tagsGroup);

    interface FloatingBadge {
      mesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      speed: number;
      offset: number;
    }

    const floatingBadges: FloatingBadge[] = [];

    const createFloatingTag = (text: string, color: string, pos: [number, number, number], speed: number) => {
      const tagCanvas = document.createElement("canvas");
      tagCanvas.width = 256;
      tagCanvas.height = 70;
      const tCtx = tagCanvas.getContext("2d")!;

      tCtx.fillStyle = "rgba(10, 16, 32, 0.88)";
      tCtx.strokeStyle = color;
      tCtx.lineWidth = 4;
      tCtx.roundRect(4, 4, 248, 62, 16);
      tCtx.fill();
      tCtx.stroke();

      tCtx.fillStyle = color;
      tCtx.font = "bold 24px monospace";
      tCtx.textAlign = "center";
      tCtx.textBaseline = "middle";
      tCtx.fillText(text, 128, 35);

      const tagTex = new THREE.CanvasTexture(tagCanvas);
      const tagGeo = new THREE.PlaneGeometry(0.85, 0.24);
      const tagMat = new THREE.MeshBasicMaterial({ map: tagTex, transparent: true, side: THREE.DoubleSide });
      const tagMesh = new THREE.Mesh(tagGeo, tagMat);
      tagMesh.position.set(...pos);
      tagsGroup.add(tagMesh);

      floatingBadges.push({
        mesh: tagMesh,
        initialPos: new THREE.Vector3(...pos),
        speed,
        offset: Math.random() * 10,
      });
    };

    createFloatingTag("<Next.js 16 />", "#38bdf8", [-1.35, 0.85, 0.4], 2.0);
    createFloatingTag("{ TypeScript }", "#34d399", [1.35, 0.95, 0.2], 2.2);
    createFloatingTag("[ MQTT: 28ms ]", "#06b6d4", [-1.2, -0.15, 0.7], 1.8);
    createFloatingTag("( YOLOv8 / AI )", "#10b981", [1.25, -0.1, 0.6], 2.4);

    // --- C. 3D Server Platform & Holographic Telemetry Rings ---
    const platformGeo = new THREE.CylinderGeometry(1.8, 2.0, 0.08, 48);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      roughness: 0.3,
      metalness: 0.85,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.set(0, -0.65, 0);
    workstationGroup.add(platformMesh);

    // Glowing Platform Edge Ring
    const platformRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.025, 16, 64),
      neonCyan
    );
    platformRim.rotation.x = Math.PI / 2;
    platformRim.position.set(0, -0.61, 0);
    workstationGroup.add(platformRim);

    // Orbiting Cyber Data Ring
    const cyberOrbitRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.015, 16, 96),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
    );
    cyberOrbitRing.rotation.x = Math.PI / 2.3;
    workstationGroup.add(cyberOrbitRing);

    const cyberOrbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.65, 0.012, 16, 96),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 })
    );
    cyberOrbitRing2.rotation.x = Math.PI / 1.7;
    workstationGroup.add(cyberOrbitRing2);

    // Orbiting Data Bit Packets
    const bitCount = 6;
    const bits: { mesh: THREE.Mesh; angle: number; radius: number; speed: number }[] = [];
    for (let i = 0; i < bitCount; i++) {
      const bitGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
      const bitMesh = new THREE.Mesh(bitGeo, i % 2 === 0 ? neonCyan : neonEmerald);
      workstationGroup.add(bitMesh);
      bits.push({
        mesh: bitMesh,
        angle: (i / bitCount) * Math.PI * 2,
        radius: 2.35,
        speed: 0.8 + i * 0.1,
      });
    }

    // Mouse Tracking: Tilt and Rotate Workstation smoothly in 3D
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.55;
      targetRotX = -y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Workstation Inertia
      workstationGroup.rotation.y += (targetRotY - workstationGroup.rotation.y) * 0.08 + 0.003;
      workstationGroup.rotation.x += (targetRotX - workstationGroup.rotation.x) * 0.08;
      workstationGroup.position.y = -0.15 + Math.sin(elapsed * 1.8) * 0.06;

      // Bob floating badges
      floatingBadges.forEach((badge) => {
        badge.mesh.position.y = badge.initialPos.y + Math.sin(elapsed * badge.speed + badge.offset) * 0.08;
        // Make tags always face camera
        badge.mesh.quaternion.copy(camera.quaternion);
      });

      // Rotate Cyber Rings
      cyberOrbitRing.rotation.z += 0.006;
      cyberOrbitRing2.rotation.z -= 0.007;

      // Orbit bits
      bits.forEach((b) => {
        const a = b.angle + elapsed * b.speed;
        b.mesh.position.x = Math.cos(a) * b.radius;
        b.mesh.position.z = Math.sin(a) * b.radius;
        b.mesh.position.y = Math.sin(a * 2) * 0.2;
        b.mesh.rotation.x += 0.04;
        b.mesh.rotation.y += 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative flex items-center justify-center w-full max-w-[520px] aspect-square mx-auto select-none"
    >
      {/* Background Cyan/Emerald Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-emerald-500/20 blur-3xl -z-10 animate-pulse-glow" />

      {/* Floating HUD Chip - Top Left */}
      <div className="absolute top-2 -left-2 sm:-left-4 glass-panel px-3.5 py-2 rounded-2xl border border-cyan-500/30 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl z-20">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-cyan-300 font-bold">DEV-STATION // ACTIVE</span>
        <span className="text-emerald-400 font-semibold">{stats.latency}</span>
      </div>

      {/* Floating HUD Chip - Bottom Right */}
      <div className="absolute bottom-4 -right-2 sm:-right-4 glass-panel px-3.5 py-2 rounded-2xl border border-emerald-500/30 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl z-20">
        <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="text-slate-400">THROUGHPUT:</span>
        <span className="text-emerald-300 font-semibold">{stats.ops} req/s</span>
      </div>

      {/* Floating 3D Interaction Hint - Bottom Left */}
      <div className="hidden sm:flex absolute -bottom-3 left-4 glass-panel px-3 py-1.5 rounded-full border border-cyan-500/25 text-[10px] font-mono text-cyan-300 items-center gap-1.5 shadow-lg shadow-cyan-950/50 z-20">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>3D Developer Workstation • Interactive Tilt</span>
      </div>
    </div>
  );
}
