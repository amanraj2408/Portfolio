"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, Navigation, BatteryCharging, Wind, Play, Pause, Eye } from "lucide-react";

export default function Drone3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [telemetry, setTelemetry] = useState({
    altitude: 128.4,
    speed: 14.2,
    battery: 86,
    heading: 42,
  });

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        altitude: Number((120 + Math.sin(Date.now() / 1500) * 8).toFixed(1)),
        speed: Number((14 + Math.cos(Date.now() / 1200) * 2.5).toFixed(1)),
        battery: 86,
        heading: (prev.heading + 1) % 360,
      }));
    }, 700);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 340;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 2.5);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 8, 10, Math.PI / 4, 0.5, 1);
    keySpot.position.set(0, 4, 2);
    scene.add(keySpot);

    const purpleLight = new THREE.DirectionalLight(0xc084fc, 4);
    purpleLight.position.set(-3, 2, -2);
    scene.add(purpleLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanLight.position.set(3, 1, 2);
    scene.add(cyanLight);

    // Materials
    const darkBodyMat = new THREE.MeshStandardMaterial({
      color: 0x111420,
      roughness: 0.3,
      metalness: 0.8,
    });

    const whiteShellMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.25,
      metalness: 0.4,
    });

    const neonCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const neonPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });

    const propMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.7,
    });

    // 3D Drone Model
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Fuselage Core
    const bodyGeo = new THREE.BoxGeometry(0.55, 0.14, 0.55);
    const bodyMesh = new THREE.Mesh(bodyGeo, whiteShellMat);
    droneGroup.add(bodyMesh);

    // Top Aero Canopy
    const canopyGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.08, 16);
    const canopyMesh = new THREE.Mesh(canopyGeo, darkBodyMat);
    canopyMesh.position.set(0, 0.1, 0);
    droneGroup.add(canopyMesh);

    // Center Neon Status Ring
    const ringGeo = new THREE.TorusGeometry(0.24, 0.02, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, neonCyan);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 0.13, 0);
    droneGroup.add(ringMesh);

    // 4 Diagonal Arms & Motor Pods
    const armConfigs = [
      { x: 0.52, z: 0.52, angle: Math.PI / 4, led: neonCyan },
      { x: -0.52, z: 0.52, angle: -Math.PI / 4, led: neonCyan },
      { x: 0.52, z: -0.52, angle: -Math.PI / 4, led: neonPurple },
      { x: -0.52, z: -0.52, angle: Math.PI / 4, led: neonPurple },
    ];

    const propellers: THREE.Mesh[] = [];

    armConfigs.forEach((cfg) => {
      // Carbon Arm
      const armGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.65, 8);
      const armMesh = new THREE.Mesh(armGeo, darkBodyMat);
      armMesh.rotation.z = Math.PI / 2;
      armMesh.rotation.y = cfg.angle;
      armMesh.position.set(cfg.x * 0.5, 0, cfg.z * 0.5);
      droneGroup.add(armMesh);

      // Motor Hub
      const motorGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16);
      const motorMesh = new THREE.Mesh(motorGeo, darkBodyMat);
      motorMesh.position.set(cfg.x, 0.03, cfg.z);
      droneGroup.add(motorMesh);

      // Motor Cap
      const motorCap = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), whiteShellMat);
      motorCap.position.set(cfg.x, 0.1, cfg.z);
      droneGroup.add(motorCap);

      // LED Nav Light below motor
      const ledGeo = new THREE.SphereGeometry(0.035, 8, 8);
      const ledMesh = new THREE.Mesh(ledGeo, cfg.led);
      ledMesh.position.set(cfg.x, -0.05, cfg.z);
      droneGroup.add(ledMesh);

      // Dual-Blade Propeller
      const propGeo = new THREE.BoxGeometry(0.52, 0.01, 0.05);
      const propMesh = new THREE.Mesh(propGeo, propMat);
      propMesh.position.set(cfg.x, 0.11, cfg.z);
      droneGroup.add(propMesh);
      propellers.push(propMesh);
    });

    // Camera Gimbal Underneath
    const gimbalArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.1, 8), darkBodyMat);
    gimbalArm.position.set(0, -0.09, 0.12);
    droneGroup.add(gimbalArm);

    const gimbalLens = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), neonCyan);
    gimbalLens.position.set(0, -0.14, 0.14);
    droneGroup.add(gimbalLens);

    // Laser Altitude Beam projecting downward
    const laserGeo = new THREE.CylinderGeometry(0.008, 0.02, 1.2, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, -0.7, 0);
    droneGroup.add(laserMesh);

    // 3D Holographic Terrain / Radar Grid below
    const gridHelper = new THREE.GridHelper(4.5, 18, 0x9333ea, 0x1e1b4b);
    gridHelper.position.set(0, -1.1, 0);
    scene.add(gridHelper);

    // Radar Concentric Waypoint Circles
    const radarCircleGeo = new THREE.RingGeometry(0.8, 0.82, 32);
    const radarCircleMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const radarCircle = new THREE.Mesh(radarCircleGeo, radarCircleMat);
    radarCircle.rotation.x = Math.PI / 2;
    radarCircle.position.set(0, -1.09, 0);
    scene.add(radarCircle);

    // Mouse Tracking: Tilt & Bank the drone in 3D!
    let targetTiltX = 0;
    let targetTiltZ = 0;
    let targetDroneX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetTiltX = -y * 0.35;
      targetTiltZ = -x * 0.35;
      targetDroneX = x * 0.4;
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

      // Realistic flight hover motion
      const hoverY = Math.sin(elapsed * 2.2) * 0.08;
      droneGroup.position.y = hoverY;
      droneGroup.position.x += (targetDroneX - droneGroup.position.x) * 0.08;

      // Banking Tilt
      droneGroup.rotation.x += (targetTiltX - droneGroup.rotation.x) * 0.08;
      droneGroup.rotation.z += (targetTiltZ - droneGroup.rotation.z) * 0.08;
      droneGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.15;

      // High-speed propeller spin
      if (active) {
        propellers.forEach((p, idx) => {
          p.rotation.y += idx % 2 === 0 ? 0.65 : -0.65;
        });
      }

      // Rotate ground radar ring
      radarCircle.rotation.z += 0.01;

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
    <div
      ref={mountRef}
      className="relative w-full h-[320px] sm:h-[370px] bg-[#070815] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-4 font-mono select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-indigo-600/10 via-transparent to-transparent pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${active ? "bg-emerald-400" : "bg-yellow-400"} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-emerald-500" : "bg-yellow-500"}`} />
          </span>
          <span className="text-white font-bold tracking-wider">3D TELEMETRY // DJI PILOT 2</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span className="text-purple-400">MQTT // EMQX</span>
          <span className="text-emerald-400">WS: 32ms</span>
        </div>
      </div>

      {/* Center 3D Cursor Hint */}
      <div className="absolute top-14 right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-slate-400">
        <Eye className="w-3 h-3 text-cyan-400" />
        <span>Interactive 3D Flight</span>
      </div>

      {/* Bottom HUD Telemetry Strip */}
      <div className="relative z-10 grid grid-cols-4 gap-2 text-[10px] sm:text-xs">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Radio className="w-3 h-3 text-indigo-400" /> ALTITUDE
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">{telemetry.altitude} m</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <Wind className="w-3 h-3 text-cyan-400" /> AIRSPEED
          </span>
          <span className="font-bold text-cyan-300 text-xs sm:text-sm">{telemetry.speed} m/s</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <BatteryCharging className="w-3 h-3 text-emerald-400" /> BATTERY
          </span>
          <span className="font-bold text-emerald-400 text-xs sm:text-sm">{telemetry.battery}%</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
          <button
            onClick={() => setActive(!active)}
            className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 transition-colors cursor-pointer py-1 font-bold"
          >
            {active ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{active ? "PAUSE" : "RESUME"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

