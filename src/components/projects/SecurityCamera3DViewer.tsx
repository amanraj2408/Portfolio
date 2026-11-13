"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Eye, ShieldAlert, Video, Sparkles, CheckCircle2, RotateCcw } from "lucide-react";

export default function SecurityCamera3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [breachActive, setBreachActive] = useState(true);
  const [fps, setFps] = useState(29);
  const [suppressedCount, setSuppressedCount] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(28 + Math.floor(Math.random() * 3));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    container.appendChild(renderer.domElement);

    // 2. High-Visibility Lighting
    const ambientLight = new THREE.AmbientLight(0x2d1a38, 3.0);
    scene.add(ambientLight);

    const redSpot = new THREE.SpotLight(0xef4444, 8, 12, Math.PI / 4, 0.5, 1);
    redSpot.position.set(0, 4, 3);
    scene.add(redSpot);

    const purpleRim = new THREE.DirectionalLight(0xa855f7, 5.0);
    purpleRim.position.set(-3, 2, 2);
    scene.add(purpleRim);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanRim.position.set(3, -1, -2);
    scene.add(cyanRim);

    // 3. Materials
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x1e2030,
      roughness: 0.25,
      metalness: 0.85,
    });

    const domeGlass = new THREE.MeshPhysicalMaterial({
      color: 0x090a14,
      transmission: 0.7,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
    });

    const neonRed = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 2.5,
      roughness: 0.1,
    });

    const neonPurple = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    // 4. Centered Industrial PTZ Camera Turret
    const turretGroup = new THREE.Group();
    turretGroup.position.set(0, 0, 0);
    scene.add(turretGroup);

    // Ceiling Mount Bracket
    const mountGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.12, 32);
    const mountMesh = new THREE.Mesh(mountGeo, darkMetal);
    mountMesh.position.set(0, 0.95, 0);
    turretGroup.add(mountMesh);

    // Status Halo Ring
    const haloGeo = new THREE.TorusGeometry(0.72, 0.025, 16, 48);
    const haloMesh = new THREE.Mesh(haloGeo, neonRed);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.set(0, 0.92, 0);
    turretGroup.add(haloMesh);

    // Rotating Yaw Base
    const yawGroup = new THREE.Group();
    yawGroup.position.set(0, 0.75, 0);
    turretGroup.add(yawGroup);

    const yawStem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24), darkMetal);
    yawStem.position.set(0, 0, 0);
    yawGroup.add(yawStem);

    // Pitch Turret Sphere
    const pitchGroup = new THREE.Group();
    pitchGroup.position.set(0, -0.25, 0);
    yawGroup.add(pitchGroup);

    const sphereHousing = new THREE.Mesh(new THREE.SphereGeometry(0.58, 32, 32), darkMetal);
    pitchGroup.add(sphereHousing);

    // Optical Lens Core
    const lensRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.28, 0.25, 24),
      darkMetal
    );
    lensRing.rotation.x = Math.PI / 2;
    lensRing.position.set(0, 0, 0.48);
    pitchGroup.add(lensRing);

    const glassLens = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), domeGlass);
    glassLens.position.set(0, 0, 0.58);
    pitchGroup.add(glassLens);

    // Red Infrared Sensor LED Ring
    const irRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 16, 32), neonRed);
    irRing.position.set(0, 0, 0.6);
    pitchGroup.add(irRing);

    // 5. Volumetric Laser Vision Cone (YOLOv8 Scan Frustum)
    const coneGeo = new THREE.ConeGeometry(1.6, 2.8, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const visionCone = new THREE.Mesh(coneGeo, coneMat);
    visionCone.rotation.x = -Math.PI / 2;
    visionCone.position.set(0, 0, 1.8);
    pitchGroup.add(visionCone);

    // 3D Laser Crosshair at focal plane
    const crosshairGeo = new THREE.RingGeometry(0.45, 0.48, 32);
    const crosshairMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const crosshair = new THREE.Mesh(crosshairGeo, crosshairMat);
    crosshair.position.set(0, 0, 2.9);
    pitchGroup.add(crosshair);

    // 6. Holographic Floor Detection Grid
    const floorGrid = new THREE.GridHelper(5.5, 18, 0xef4444, 0x2e1020);
    floorGrid.position.set(0, -0.9, 0);
    scene.add(floorGrid);

    // Mouse Tracking: Swivel the PTZ Camera to follow the user's cursor
    let targetYaw = 0;
    let targetPitch = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetYaw = -x * 0.95;
      targetPitch = y * 0.45;
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

      // Smooth PTZ tracking
      yawGroup.rotation.y += (targetYaw - yawGroup.rotation.y) * 0.08;
      pitchGroup.rotation.x += (targetPitch - pitchGroup.rotation.x) * 0.08;

      // Pulse laser vision cone
      coneMat.opacity = breachActive ? 0.16 + Math.sin(elapsed * 4) * 0.06 : 0.05;
      crosshair.rotation.z += 0.02;

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
  }, [breachActive]);

  const toggleBreach = () => {
    if (breachActive) {
      setBreachActive(false);
      setSuppressedCount((prev) => prev + 1);
    } else {
      setBreachActive(true);
    }
  };

  return (
    <div className="relative w-full h-[340px] sm:h-[390px] rounded-2xl overflow-hidden border border-rose-500/25 bg-gradient-to-b from-[#180914] via-[#0f040b] to-[#080206] select-none shadow-2xl">
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-rose-500/15 via-transparent to-transparent pointer-events-none" />

      {/* HUD Layer (Overlaid on top of 3D canvas) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 pointer-events-none">
        {/* Top Camera Stream Bar */}
        <div className="flex items-center justify-between text-[11px] bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${breachActive ? "bg-rose-500" : "bg-emerald-400"} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${breachActive ? "bg-rose-500" : "bg-emerald-500"}`} />
            </span>
            <span className="text-white font-mono font-bold tracking-wider">CAM-02 // PERIMETER NORTH</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-300">
            <span className="text-rose-400">RTSP: MediaMTX</span>
            <span className="text-emerald-400">{fps} FPS</span>
          </div>
        </div>

        {/* Center YOLOv8 In-Sight Detection Badge */}
        <div className="self-center flex flex-col items-center gap-1 pointer-events-none">
          {breachActive ? (
            <div className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/60 backdrop-blur-md text-rose-300 font-mono text-[11px] flex items-center gap-2 animate-pulse shadow-lg shadow-rose-900/50">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>YOLOv8 // PERSON: 96.4% CONFIRMED</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-emerald-300 font-mono text-[10px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>PERIMETER SECURE // SCANNING</span>
            </div>
          )}
        </div>

        {/* Bottom AI Analytics HUD */}
        <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs font-mono pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              <Video className="w-3 h-3 text-purple-400" /> INFERENCE
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">PyTorch CUDA</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              SUPPRESSED
            </span>
            <span className="font-bold text-rose-400 text-xs sm:text-sm">{suppressedCount} Redundant</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
            <button
              onClick={toggleBreach}
              className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/60 border border-rose-500/30 text-rose-200 transition-colors cursor-pointer py-1 font-bold text-[10px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{breachActive ? "SUPPRESS" : "TRIGGER"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
