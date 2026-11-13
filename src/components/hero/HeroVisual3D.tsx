"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, Crosshair, Cpu, Eye, Zap, ShieldCheck } from "lucide-react";

export default function HeroVisual3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    altitude: 124.5,
    speed: 14.2,
    mode: "AUTONOMOUS // TRACKING",
    battery: 88,
  });

  // Telemetry fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        altitude: Number((120 + Math.sin(Date.now() / 1800) * 6).toFixed(1)),
        speed: Number((14 + Math.cos(Date.now() / 1400) * 1.8).toFixed(1)),
        battery: 88 + Math.round(Math.sin(Date.now() / 20000)),
      }));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 5.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights - Cinematic Spotlight & Neon Rim (matching the reference video!)
    const ambientLight = new THREE.AmbientLight(0x241d3d, 1.8);
    scene.add(ambientLight);

    // Top Overhead Spotlight (matches the visual reference spotlight beam!)
    const overheadSpot = new THREE.SpotLight(0xffffff, 8, 12, Math.PI / 4, 0.5, 1);
    overheadSpot.position.set(0, 6, 1.5);
    overheadSpot.target.position.set(0, 0, 0);
    scene.add(overheadSpot);
    scene.add(overheadSpot.target);

    // Purple Rim Light from Back
    const purpleRim = new THREE.DirectionalLight(0xc084fc, 5);
    purpleRim.position.set(-3, 2, -3);
    scene.add(purpleRim);

    // Cyan Rim Light from Opposite Side
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanRim.position.set(3, 1, -2);
    scene.add(cyanRim);

    // Front soft fill
    const frontFill = new THREE.PointLight(0xa78bfa, 2, 8);
    frontFill.position.set(0, 1, 3);
    scene.add(frontFill);

    // 3. Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0a97a,
      roughness: 0.55,
      metalness: 0.05,
    });

    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x181824,
      roughness: 0.35,
      metalness: 0.2,
    });

    const capAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.3,
      metalness: 0.5,
      emissive: 0x581c87,
      emissiveIntensity: 0.3,
    });

    const jacketMaterial = new THREE.MeshStandardMaterial({
      color: 0x11121d,
      roughness: 0.45,
      metalness: 0.15,
    });

    const neonPurpleGlow = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });

    const neonCyanGlow = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });

    const droneChassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f111a,
      roughness: 0.3,
      metalness: 0.7,
    });

    const propellerMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.3,
    });

    // 4. Character Group (Developer "Sticker Boy" avatar as in reference video!)
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, -0.6, 0);
    scene.add(characterGroup);

    // Torso / Stylish Turtleneck Jacket
    const torsoGeo = new THREE.CylinderGeometry(0.7, 0.95, 1.3, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, jacketMaterial);
    torsoMesh.position.set(0, 0, 0);
    characterGroup.add(torsoMesh);

    // Collar trim neon
    const collarGeo = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, neonPurpleGlow);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.set(0, 0.68, 0);
    characterGroup.add(collarMesh);

    // Head Group (rotates with mouse)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    characterGroup.add(headGroup);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.4, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, -0.22, 0);
    headGroup.add(neckMesh);

    // Head Mesh (stylized rounded developer head)
    const headGeo = new THREE.SphereGeometry(0.56, 32, 32);
    headGeo.scale(1, 1.08, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(headMesh);

    // Cap / Backward Beanie Cap (matching video avatar!)
    const capDomeGeo = new THREE.SphereGeometry(0.58, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const capDomeMesh = new THREE.Mesh(capDomeGeo, capMaterial);
    capDomeMesh.position.set(0, 0.1, -0.02);
    headGroup.add(capDomeMesh);

    // Cap Brim / Visor (backward tilt as in reference)
    const brimGeo = new THREE.CylinderGeometry(0.6, 0.65, 0.06, 32, 1, false, 0, Math.PI);
    const brimMesh = new THREE.Mesh(brimGeo, capAccentMaterial);
    brimMesh.rotation.x = 0.2;
    brimMesh.rotation.y = Math.PI;
    brimMesh.position.set(0, 0.18, -0.42);
    headGroup.add(brimMesh);

    // Cyber Headphones (Band & Ear Cups with glowing rings)
    const bandGeo = new THREE.TorusGeometry(0.64, 0.05, 16, 32, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, capMaterial);
    bandMesh.position.set(0, 0.22, 0);
    headGroup.add(bandMesh);

    // Left Ear Cup
    const cupGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 24);
    const leftCup = new THREE.Mesh(cupGeo, capMaterial);
    leftCup.rotation.z = Math.PI / 2;
    leftCup.position.set(-0.58, 0.2, 0);
    headGroup.add(leftCup);

    const leftGlowRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 16, 32), neonPurpleGlow);
    leftGlowRing.rotation.y = Math.PI / 2;
    leftGlowRing.position.set(-0.66, 0.2, 0);
    headGroup.add(leftGlowRing);

    // Right Ear Cup
    const rightCup = leftCup.clone();
    rightCup.position.set(0.58, 0.2, 0);
    headGroup.add(rightCup);

    const rightGlowRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 16, 32), neonPurpleGlow);
    rightGlowRing.rotation.y = Math.PI / 2;
    rightGlowRing.position.set(0.66, 0.2, 0);
    headGroup.add(rightGlowRing);

    // Eyes (Friendly Stylized 3D Developer Eyes)
    const eyeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.19, 0.08, 0.5);
    headGroup.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.19, 0.08, 0.5);
    headGroup.add(rightEye);

    // Subtle Eye Highlights
    const pupilHighlightGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const hlLeft = new THREE.Mesh(pupilHighlightGeo, pupilMat);
    hlLeft.position.set(-0.16, 0.11, 0.58);
    headGroup.add(hlLeft);

    const hlRight = hlLeft.clone();
    hlRight.position.set(0.22, 0.11, 0.58);
    headGroup.add(hlRight);

    // Confident Smile (stylized curved arc)
    const smileGeo = new THREE.TorusGeometry(0.14, 0.03, 12, 16, Math.PI * 0.7);
    const smileMesh = new THREE.Mesh(smileGeo, new THREE.MeshBasicMaterial({ color: 0x4a2810 }));
    smileMesh.rotation.z = Math.PI * 1.15;
    smileMesh.position.set(0, -0.16, 0.51);
    headGroup.add(smileMesh);

    // 5. High-Tech 3D Autonomous Drone (Sentinx OS / Aerial Companion)
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Central Carbon Body
    const droneBodyGeo = new THREE.BoxGeometry(0.35, 0.09, 0.35);
    const droneBodyMesh = new THREE.Mesh(droneBodyGeo, droneChassisMaterial);
    droneGroup.add(droneBodyMesh);

    // Top Dome Sensor Cap
    const domeGeo = new THREE.SphereGeometry(0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMesh = new THREE.Mesh(domeGeo, neonPurpleGlow);
    domeMesh.position.set(0, 0.04, 0);
    droneGroup.add(domeMesh);

    // 4 Diagonal Motor Arms & Propellers
    const armPositions = [
      { x: 0.32, z: 0.32, angle: Math.PI / 4 },
      { x: -0.32, z: 0.32, angle: -Math.PI / 4 },
      { x: 0.32, z: -0.32, angle: -Math.PI / 4 },
      { x: -0.32, z: -0.32, angle: Math.PI / 4 },
    ];

    const propellers: THREE.Mesh[] = [];

    armPositions.forEach((pos, i) => {
      // Carbon Arm Strut
      const armGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8);
      const armMesh = new THREE.Mesh(armGeo, droneChassisMaterial);
      armMesh.rotation.z = Math.PI / 2;
      armMesh.rotation.y = pos.angle;
      armMesh.position.set(pos.x * 0.5, 0, pos.z * 0.5);
      droneGroup.add(armMesh);

      // Motor Hub
      const hubGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 16);
      const hubMesh = new THREE.Mesh(hubGeo, droneChassisMaterial);
      hubMesh.position.set(pos.x, 0.02, pos.z);
      droneGroup.add(hubMesh);

      // LED Light on motor
      const ledGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const ledMat = i < 2 ? neonCyanGlow : neonPurpleGlow;
      const ledMesh = new THREE.Mesh(ledGeo, ledMat);
      ledMesh.position.set(pos.x, -0.03, pos.z);
      droneGroup.add(ledMesh);

      // Propeller (Spinning disc / blades)
      const propGeo = new THREE.BoxGeometry(0.3, 0.008, 0.035);
      const propMesh = new THREE.Mesh(propGeo, propellerMaterial);
      propMesh.position.set(pos.x, 0.07, pos.z);
      droneGroup.add(propMesh);
      propellers.push(propMesh);
    });

    // Camera Gimbal below drone
    const gimbalGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const gimbalMesh = new THREE.Mesh(gimbalGeo, neonCyanGlow);
    gimbalMesh.position.set(0, -0.07, 0.08);
    droneGroup.add(gimbalMesh);

    // 6. Orbital Holographic Grid Rings around the Scene
    const orbitRingGeo = new THREE.TorusGeometry(2.2, 0.012, 16, 100);
    const orbitRingMesh = new THREE.Mesh(
      orbitRingGeo,
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.25 })
    );
    orbitRingMesh.rotation.x = Math.PI / 2.3;
    scene.add(orbitRingMesh);

    const orbitRingInnerGeo = new THREE.TorusGeometry(1.6, 0.008, 16, 80);
    const orbitRingInnerMesh = new THREE.Mesh(
      orbitRingInnerGeo,
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 })
    );
    orbitRingInnerMesh.rotation.x = Math.PI / 1.8;
    scene.add(orbitRingInnerMesh);

    // Mouse Tracking Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
      targetHeadRotY = x * 0.45;
      targetHeadRotX = -y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Head Mouse Tracking
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Subtle breathing motion for character
      characterGroup.position.y = -0.6 + Math.sin(elapsed * 1.5) * 0.03;

      // Drone Orbit Animation around the Developer Avatar!
      const droneRadius = 1.65;
      const droneSpeed = 0.9;
      const droneAngle = elapsed * droneSpeed;

      const droneX = Math.cos(droneAngle) * droneRadius;
      const droneZ = Math.sin(droneAngle) * (droneRadius * 0.8) + 0.3;
      const droneY = 0.4 + Math.sin(elapsed * 2.5) * 0.18;

      droneGroup.position.set(droneX, droneY, droneZ);

      // Drone Banking / Pitch Tilting as it maneuvers
      droneGroup.rotation.y = -droneAngle + Math.PI / 2;
      droneGroup.rotation.z = Math.sin(elapsed * 2) * 0.12;
      droneGroup.rotation.x = Math.cos(elapsed * 2) * 0.1;

      // Rapidly spin propellers
      propellers.forEach((prop) => {
        prop.rotation.y += 0.45;
      });

      // Slowly rotate orbital cyber rings
      orbitRingMesh.rotation.z += 0.003;
      orbitRingInnerMesh.rotation.z -= 0.004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
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
      {/* Background Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-500/20 blur-3xl -z-10 animate-pulse-glow" />

      {/* Floating HUD Telemetry Badge - Top Left */}
      <div className="absolute top-4 -left-2 sm:-left-6 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-purple-300 font-bold">DRONE 01:</span>
        <span className="text-emerald-400 font-semibold">{telemetry.altitude}m ALT</span>
      </div>

      {/* Floating HUD Telemetry Badge - Bottom Right */}
      <div className="absolute bottom-6 -right-2 sm:-right-6 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="text-slate-400">SENTINX OS:</span>
        <span className="text-cyan-300 font-semibold">{telemetry.speed} m/s</span>
      </div>

      {/* Floating 3D Interaction Hint - Bottom Left */}
      <div className="hidden sm:flex absolute -bottom-4 left-6 glass-panel px-3 py-1.5 rounded-full border border-purple-500/30 text-[10px] font-mono text-purple-300 items-center gap-1.5 shadow-lg shadow-purple-950/50">
        <Eye className="w-3 h-3 text-purple-400" />
        <span>3D Scene • Cursor-Interactive</span>
      </div>
    </div>
  );
}
