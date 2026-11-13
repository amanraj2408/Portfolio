"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Cpu, Zap, Activity, Radio, Shield, Sparkles } from "lucide-react";

export default function HeroVisual3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    throughput: "14.2k ops/s",
    latency: "12ms",
    nodes: 128,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats({
        throughput: (14.0 + Math.random() * 0.8).toFixed(1) + "k ops/s",
        latency: Math.floor(11 + Math.random() * 3) + "ms",
        nodes: 128 + (Math.random() > 0.7 ? 1 : 0),
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Studio Lights matching the overhead spotlight
    const ambientLight = new THREE.AmbientLight(0x231d3d, 2.2);
    scene.add(ambientLight);

    const topSpot = new THREE.SpotLight(0xffffff, 8, 12, Math.PI / 4, 0.4, 1.2);
    topSpot.position.set(0, 5, 2);
    scene.add(topSpot);

    const purpleLight = new THREE.DirectionalLight(0xc084fc, 5.0);
    purpleLight.position.set(-3, 2, -2);
    scene.add(purpleLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    cyanLight.position.set(3, -1, 2);
    scene.add(cyanLight);

    // Main 3D Quantum Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Crystalline Icosahedron (Pulsating Quantum Core)
    const innerGeo = new THREE.IcosahedronGeometry(0.78, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.5,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Inner Glowing Wireframe
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerWire = new THREE.Mesh(innerGeo, innerWireMat);
    innerWire.scale.setScalar(1.002);
    coreGroup.add(innerWire);

    // 2. Outer Crystalline Exoskeleton Cage
    const outerGeo = new THREE.IcosahedronGeometry(1.25, 0);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerLineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });
    const outerCage = new THREE.LineSegments(outerEdges, outerLineMat);
    coreGroup.add(outerCage);

    // Vertex Beacon Spheres on Outer Cage
    const vertexPositions = outerGeo.attributes.position;
    const vertexSpheres: THREE.Mesh[] = [];
    const sphereMatCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });
    const sphereMatPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    for (let i = 0; i < vertexPositions.count; i++) {
      const x = vertexPositions.getX(i);
      const y = vertexPositions.getY(i);
      const z = vertexPositions.getZ(i);

      const vertexSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 12, 12),
        i % 2 === 0 ? sphereMatCyan : sphereMatPurple
      );
      vertexSphere.position.set(x, y, z);
      coreGroup.add(vertexSphere);
      vertexSpheres.push(vertexSphere);
    }

    // 3. Gyroscopic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(1.68, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.95, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    scene.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.2, 0.008, 16, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2.5;
    scene.add(ring3);

    // 4. Orbiting Data Satellite Cubes
    const numSatellites = 6;
    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number }[] = [];

    for (let i = 0; i < numSatellites; i++) {
      const satGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xc084fc,
        emissive: i % 2 === 0 ? 0x0284c7 : 0x7e22ce,
        emissiveIntensity: 1.2,
        roughness: 0.2,
        metalness: 0.8,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      scene.add(satMesh);

      satellites.push({
        mesh: satMesh,
        angle: (i / numSatellites) * Math.PI * 2,
        speed: 0.4 + (i % 3) * 0.15,
        radius: 1.7 + (i % 2) * 0.35,
        yOffset: ((i % 3) - 1) * 0.35,
      });
    }

    // 5. Star Dust Particles around the Core
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 1.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc4b5fd,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Mouse Tracking Logic
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.6;
      targetRotX = -y * 0.6;
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

    // 6. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse tilt & continuous subtle rotation
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.05 + 0.005;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.05 + Math.sin(elapsed * 0.5) * 0.001;

      // Inner Core Pulse
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.05;
      innerCore.scale.setScalar(pulse);
      innerWire.scale.setScalar(pulse * 1.002);

      // Gyroscopic Ring Rotations
      ring1.rotation.x = elapsed * 0.35;
      ring1.rotation.y = elapsed * 0.25;

      ring2.rotation.x = -elapsed * 0.3;
      ring2.rotation.z = elapsed * 0.4;

      ring3.rotation.z = elapsed * 0.15;

      // Orbiting Data Satellites
      satellites.forEach((sat) => {
        const curAngle = sat.angle + elapsed * sat.speed;
        sat.mesh.position.x = Math.cos(curAngle) * sat.radius;
        sat.mesh.position.z = Math.sin(curAngle) * sat.radius;
        sat.mesh.position.y = Math.sin(curAngle * 2) * 0.25 + sat.yOffset;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Slowly rotate particle field
      particleField.rotation.y = elapsed * 0.04;

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
      className="relative flex items-center justify-center w-full max-w-[500px] aspect-square mx-auto select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/35 via-indigo-500/25 to-cyan-500/25 blur-3xl -z-10 animate-pulse-glow" />

      {/* Floating HUD Telemetry Badge - Top Left */}
      <div className="absolute top-4 -left-2 sm:-left-6 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-purple-300 font-bold">CORE // ACTIVE</span>
        <span className="text-emerald-400 font-semibold">{stats.latency}</span>
      </div>

      {/* Floating HUD Telemetry Badge - Bottom Right */}
      <div className="absolute bottom-6 -right-2 sm:-right-6 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
        <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="text-slate-400">THROUGHPUT:</span>
        <span className="text-cyan-300 font-semibold">{stats.throughput}</span>
      </div>

      {/* Floating 3D Interaction Hint - Bottom Left */}
      <div className="hidden sm:flex absolute -bottom-4 left-6 glass-panel px-3 py-1.5 rounded-full border border-purple-500/30 text-[10px] font-mono text-purple-300 items-center gap-1.5 shadow-lg shadow-purple-950/50">
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>Quantum Neural Core • Interactive 3D</span>
      </div>
    </div>
  );
}
