"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShieldAlert, Cpu, RefreshCw, CheckCircle2, AlertTriangle, Eye, Video } from "lucide-react";

export default function SecurityCamera3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [breachActive, setBreachActive] = useState(true);
  const [confidence, setConfidence] = useState(96.4);
  const [suppressedCount, setSuppressedCount] = useState(4);
  const [fps, setFps] = useState(28.6);

  useEffect(() => {
    const timer = setInterval(() => {
      setConfidence(Number((94 + Math.random() * 5).toFixed(1)));
      setFps(Number((28.1 + Math.random() * 1.2).toFixed(1)));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 340;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 3.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x1e152a, 2.5);
    scene.add(ambientLight);

    const redSpot = new THREE.SpotLight(0xef4444, 7, 10, Math.PI / 4, 0.5, 1);
    redSpot.position.set(0, 3, 3);
    scene.add(redSpot);

    const purpleRim = new THREE.DirectionalLight(0xa855f7, 4);
    purpleRim.position.set(-3, 2, -2);
    scene.add(purpleRim);

    // 3. Materials
    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x181a26,
      roughness: 0.35,
      metalness: 0.8,
    });

    const industrialWhite = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.3,
      metalness: 0.4,
    });

    const lensGlass = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.9,
    });

    const neonRed = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    const neonCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    // 4. CCTV Camera Mounting & Swivel Turret (Tracks cursor in real time!)
    const baseMountGroup = new THREE.Group();
    baseMountGroup.position.set(0, 1.1, 0);
    scene.add(baseMountGroup);

    // Ceiling Bracket Plate
    const bracketGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24);
    const bracketMesh = new THREE.Mesh(bracketGeo, darkMetal);
    baseMountGroup.add(bracketMesh);

    // Drop Stem
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
    const stemMesh = new THREE.Mesh(stemGeo, darkMetal);
    stemMesh.position.set(0, -0.2, 0);
    baseMountGroup.add(stemMesh);

    // Yaw Pivot Joint (Horizontally rotates)
    const yawGroup = new THREE.Group();
    yawGroup.position.set(0, -0.4, 0);
    baseMountGroup.add(yawGroup);

    // Pitch Turret Body (Vertically tilts to track cursor!)
    const pitchGroup = new THREE.Group();
    yawGroup.add(pitchGroup);

    // Spherical PTZ Camera Dome
    const cameraBodyGeo = new THREE.SphereGeometry(0.48, 32, 24);
    const cameraBody = new THREE.Mesh(cameraBodyGeo, industrialWhite);
    pitchGroup.add(cameraBody);

    // Dark Front Visor Section
    const visorGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.3, 24);
    const visorMesh = new THREE.Mesh(visorGeo, darkMetal);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 0, 0.28);
    pitchGroup.add(visorMesh);

    // Optical Lens Element
    const lensGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const lensMesh = new THREE.Mesh(lensGeo, lensGlass);
    lensMesh.position.set(0, 0, 0.44);
    pitchGroup.add(lensMesh);

    // Center Lens Glow Iris
    const irisGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const irisMesh = new THREE.Mesh(irisGeo, neonRed);
    irisMesh.position.set(0, 0, 0.53);
    pitchGroup.add(irisMesh);

    // Infrared LED Ring around the lens
    const irRingGeo = new THREE.TorusGeometry(0.24, 0.02, 16, 32);
    const irRingMesh = new THREE.Mesh(irRingGeo, neonRed);
    irRingMesh.position.set(0, 0, 0.42);
    pitchGroup.add(irRingMesh);

    // Blinking Recording Indicator LED
    const recLedGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const recLedMesh = new THREE.Mesh(recLedGeo, neonRed);
    recLedMesh.position.set(0.24, 0.2, 0.34);
    pitchGroup.add(recLedMesh);

    // Volumetric Detection Laser Cone (projecting from the lens!)
    const laserConeGeo = new THREE.ConeGeometry(1.6, 3.2, 24, 1, true);
    const laserConeMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const laserCone = new THREE.Mesh(laserConeGeo, laserConeMat);
    laserCone.rotation.x = -Math.PI / 2;
    laserCone.position.set(0, 0, 1.8);
    pitchGroup.add(laserCone);

    // 3D Target Lock Box (projected onto the scene)
    const targetBoxGeo = new THREE.BoxGeometry(0.8, 1.2, 0.4);
    const targetEdges = new THREE.EdgesGeometry(targetBoxGeo);
    const targetBoxMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });
    const targetBox = new THREE.LineSegments(targetEdges, targetBoxMat);
    targetBox.position.set(0, -0.6, 1.8);
    scene.add(targetBox);

    // Ground Laser Perimeter Grid
    const groundGrid = new THREE.GridHelper(5, 14, 0xef4444, 0x3b0764);
    groundGrid.position.set(0, -1.2, 0);
    scene.add(groundGrid);

    // Cursor Tracking: Aim camera at user's cursor in 3D!
    let targetYaw = 0;
    let targetPitch = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetYaw = -x * 0.7;
      targetPitch = y * 0.4 - 0.2;

      // Update target bounding box in 3D
      targetBox.position.x = x * 1.2;
      targetBox.position.y = -0.6 + y * 0.5;
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

      // Smooth mechanical turret servo motion
      yawGroup.rotation.y += (targetYaw - yawGroup.rotation.y) * 0.08;
      pitchGroup.rotation.x += (targetPitch - pitchGroup.rotation.x) * 0.08;

      // Blinking recording light
      recLedMesh.visible = Math.sin(elapsed * 6) > 0;

      // Pulse laser cone opacity
      laserConeMat.opacity = breachActive ? 0.12 + Math.sin(elapsed * 4) * 0.05 : 0.04;

      // Target box rotation pulse
      targetBox.scale.setScalar(1 + Math.sin(elapsed * 5) * 0.03);

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

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[320px] sm:h-[370px] bg-[#0c0813] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-4 font-mono select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-red-600/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Camera HUD Info */}
      <div className="relative z-10 flex items-center justify-between text-[11px] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-white font-bold tracking-wider">3D AI VISION // CAM-02</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-purple-400">RTSP // MediaMTX</span>
          <span className="text-emerald-400">{fps} FPS</span>
        </div>
      </div>

      {/* Center 3D Cursor Tracking Hint */}
      <div className="absolute top-14 right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-slate-400">
        <Eye className="w-3 h-3 text-red-400" />
        <span>3D Camera Turret Cursor-Tracking</span>
      </div>

      {/* Bottom AI Analytics Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" /> YOLOv8
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">Person: {confidence}%</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-yellow-400" /> SUPPRESSED
          </span>
          <span className="font-bold text-yellow-400 text-xs sm:text-sm">{suppressedCount} Redundant</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
          <button
            onClick={() => setBreachActive(!breachActive)}
            className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-200 transition-colors cursor-pointer py-1 font-bold text-[10px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{breachActive ? "CLEAR" : "TRIGGER"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

