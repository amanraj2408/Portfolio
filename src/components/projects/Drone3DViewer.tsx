"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, BatteryCharging, Wind, Play, Pause, Sparkles } from "lucide-react";

export default function Drone3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [telemetry, setTelemetry] = useState({
    altitude: 124.8,
    speed: 14.5,
    battery: 88,
    heading: 42,
  });

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        altitude: Number((120 + Math.sin(Date.now() / 1500) * 8).toFixed(1)),
        speed: Number((14 + Math.cos(Date.now() / 1200) * 2.5).toFixed(1)),
        battery: 88,
        heading: (prev.heading + 1) % 360,
      }));
    }, 700);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 360;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.4);

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

    // Luminous Lighting for high visibility
    const ambientLight = new THREE.AmbientLight(0x2a304a, 3.0);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    mainKeyLight.position.set(2, 4, 3);
    scene.add(mainKeyLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 5.0);
    cyanRim.position.set(-3, 2, 2);
    scene.add(cyanRim);

    const purpleBack = new THREE.DirectionalLight(0xc084fc, 4.0);
    purpleBack.position.set(3, -1, -3);
    scene.add(purpleBack);

    // High-Contrast Materials
    const fuselageMat = new THREE.MeshStandardMaterial({
      color: 0x222738,
      roughness: 0.25,
      metalness: 0.8,
    });

    const whiteShellMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
    });

    const neonCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const neonPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85,
    });

    // 3D Drone Model Group (Centered at y = 0.1)
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 0.1, 0);
    scene.add(droneGroup);

    // Fuselage Core
    const bodyGeo = new THREE.BoxGeometry(0.7, 0.18, 0.7);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteShellMat);
    droneGroup.add(bodyMesh);

    // Top Aero Canopy
    const canopyGeo = new THREE.CylinderGeometry(0.26, 0.34, 0.12, 16);
    const canopyMesh = new THREE.Mesh(canopyGeo, fuselageMat);
    canopyMesh.position.set(0, 0.12, 0);
    droneGroup.add(canopyMesh);

    // Glowing Sensor Eye
    const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const eyeMesh = new THREE.Mesh(eyeGeo, neonCyan);
    eyeMesh.position.set(0, 0.05, 0.38);
    droneGroup.add(eyeMesh);

    // Center Neon Status Ring
    const ringGeo = new THREE.TorusGeometry(0.3, 0.025, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, neonCyan);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.16, 0);
    droneGroup.add(ringMesh);

    // 4 Diagonal Motor Arms
    const armDistance = 0.65;
    const armConfigs = [
      { x: armDistance, z: armDistance, angle: Math.PI / 4, led: neonCyan },
      { x: -armDistance, z: armDistance, angle: -Math.PI / 4, led: neonCyan },
      { x: armDistance, z: -armDistance, angle: -Math.PI / 4, led: neonPurple },
      { x: -armDistance, z: -armDistance, angle: Math.PI / 4, led: neonPurple },
    ];

    const propellers: THREE.Mesh[] = [];

    armConfigs.forEach((cfg) => {
      // Carbon Boom Arm
      const armGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.82, 8);
      const armMesh = new THREE.Mesh(armGeo, fuselageMat);
      armMesh.rotation.z = Math.PI / 2;
      armMesh.rotation.y = cfg.angle;
      armMesh.position.set(cfg.x * 0.5, 0, cfg.z * 0.5);
      droneGroup.add(armMesh);

      // Motor Pod
      const motorGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.16, 16);
      const motorMesh = new THREE.Mesh(motorGeo, fuselageMat);
      motorMesh.position.set(cfg.x, 0.04, cfg.z);
      droneGroup.add(motorMesh);

      // Motor Cap
      const motorCap = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), whiteShellMat);
      motorCap.position.set(cfg.x, 0.13, cfg.z);
      droneGroup.add(motorCap);

      // LED Nav Beacon below motor
      const ledGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const ledMesh = new THREE.Mesh(ledGeo, cfg.led);
      ledMesh.position.set(cfg.x, -0.06, cfg.z);
      droneGroup.add(ledMesh);

      // Dual-Blade Rotor Blade
      const propGeo = new THREE.BoxGeometry(0.68, 0.015, 0.07);
      const propMesh = new THREE.Mesh(propGeo, propMat);
      propMesh.position.set(cfg.x, 0.14, cfg.z);
      droneGroup.add(propMesh);
      propellers.push(propMesh);
    });

    // 3D Radar Landing Grid below drone
    const gridHelper = new THREE.GridHelper(5.5, 18, 0x818cf8, 0x1e1b4b);
    gridHelper.position.set(0, -0.9, 0);
    scene.add(gridHelper);

    // Pulsing Concentric Radar Rings
    const radarRingGeo = new THREE.RingGeometry(0.9, 0.94, 32);
    const radarRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const radarRing = new THREE.Mesh(radarRingGeo, radarRingMat);
    radarRing.rotation.x = Math.PI / 2;
    radarRing.position.set(0, -0.89, 0);
    scene.add(radarRing);

    // Mouse Tracking: Dynamic Banking and Yaw
    let targetTiltX = 0;
    let targetTiltZ = 0;
    let targetDroneX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltX = -y * 0.35;
      targetTiltZ = -x * 0.35;
      targetDroneX = x * 0.45;
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

      // Gentle Hover
      const hoverY = 0.1 + Math.sin(elapsed * 2.2) * 0.08;
      droneGroup.position.y = hoverY;
      droneGroup.position.x += (targetDroneX - droneGroup.position.x) * 0.08;

      // Banking Tilt
      droneGroup.rotation.x += (targetTiltX - droneGroup.rotation.x) * 0.08;
      droneGroup.rotation.z += (targetTiltZ - droneGroup.rotation.z) * 0.08;
      droneGroup.rotation.y = Math.sin(elapsed * 0.7) * 0.15;

      // Rotor Spin
      if (active) {
        propellers.forEach((p, idx) => {
          p.rotation.y += idx % 2 === 0 ? 0.75 : -0.75;
        });
      }

      // Rotate ground radar ring
      radarRing.rotation.z += 0.015;

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
  }, [active]);

  return (
    <div className="relative w-full h-[340px] sm:h-[390px] rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-[#0a0f24] via-[#060816] to-[#04050d] select-none shadow-2xl">
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Cybernetic Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* HUD Layer (Overlaid on top of 3D canvas) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 pointer-events-none">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between text-[11px] bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${active ? "bg-emerald-400" : "bg-yellow-400"} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-emerald-500" : "bg-yellow-500"}`} />
            </span>
            <span className="text-white font-mono font-bold tracking-wider">3D TELEMETRY // DJI PILOT 2</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-300">
            <span className="text-cyan-400">MQTT // EMQX</span>
            <span className="text-emerald-400">WS: 28ms</span>
          </div>
        </div>

        {/* Center 3D Cursor Hint */}
        <div className="self-end hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 text-[10px] font-mono text-cyan-300 pointer-events-auto backdrop-blur-sm">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Interactive 3D Flight (Move Cursor)</span>
        </div>

        {/* Bottom Telemetry HUD */}
        <div className="grid grid-cols-4 gap-2 text-[10px] sm:text-xs font-mono pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              <Radio className="w-3 h-3 text-indigo-400" /> ALTITUDE
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">{telemetry.altitude} m</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              <Wind className="w-3 h-3 text-cyan-400" /> SPEED
            </span>
            <span className="font-bold text-cyan-300 text-xs sm:text-sm">{telemetry.speed} m/s</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> BATTERY
            </span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm">{telemetry.battery}%</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
            <button
              onClick={() => setActive(!active)}
              className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/30 text-indigo-200 transition-colors cursor-pointer py-1 font-bold"
            >
              {active ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{active ? "PAUSE" : "RESUME"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
