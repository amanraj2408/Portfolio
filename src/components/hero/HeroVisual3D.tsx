"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Radio, Crosshair, Cpu, Eye, Zap, ShieldCheck } from "lucide-react";

export default function HeroVisual3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({
    altitude: 124.5,
    speed: 14.2,
    battery: 88,
  });

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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Overhead spotlight + Purple neon rim as in reference video!)
    const ambientLight = new THREE.AmbientLight(0x2d2b45, 2.0);
    scene.add(ambientLight);

    // Overhead Key Spotlight (volumetric light directly hitting the cap and face)
    const keySpot = new THREE.SpotLight(0xfff6ea, 9.0, 15, Math.PI / 4, 0.45, 1.2);
    keySpot.position.set(0, 6.5, 2.0);
    keySpot.target.position.set(0, 0, 0);
    keySpot.castShadow = true;
    scene.add(keySpot);
    scene.add(keySpot.target);

    // Signature Purple Rim Light from Back-Left (Iconic glow from the video!)
    const purpleRim = new THREE.DirectionalLight(0xc084fc, 7.5);
    purpleRim.position.set(-3.5, 2.5, -3.0);
    scene.add(purpleRim);

    // Subtle Cyan Rim Light from Back-Right
    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 4.5);
    cyanRim.position.set(3.5, 1.5, -2.5);
    scene.add(cyanRim);

    // Front Warm Fill Light for realistic human face illumination
    const warmFill = new THREE.PointLight(0xffeedd, 2.2, 8);
    warmFill.position.set(0.5, 0.8, 3.2);
    scene.add(warmFill);

    // 3. Realistic Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xdf9f74, // Realistic warm human skin tone
      roughness: 0.6,
      metalness: 0.05,
    });

    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0x222433, // Premium charcoal-slate cap
      roughness: 0.4,
      metalness: 0.1,
    });

    const capVisorMaterial = new THREE.MeshStandardMaterial({
      color: 0x9333ea, // Purple visor trim
      roughness: 0.35,
      metalness: 0.4,
      emissive: 0x581c87,
      emissiveIntensity: 0.25,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x141624, // Realistic dark hoodie fabric
      roughness: 0.75,
      metalness: 0.05,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    });

    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x181822,
      roughness: 0.2,
    });

    const teethMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
    });

    const mouthInsideMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a1818,
      roughness: 0.5,
    });

    const droneWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.5,
    });

    const droneDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8,
    });

    const neonCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    const neonPurple = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });

    // 4. Character Model (Human Developer "Sticker Boy" matching the YouTube Short!)
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, -0.65, 0);
    scene.add(characterGroup);

    // Torso: Shoulders & Dark Hoodie
    const hoodieGeo = new THREE.CylinderGeometry(0.72, 0.98, 1.25, 32);
    const hoodieMesh = new THREE.Mesh(hoodieGeo, hoodieMaterial);
    hoodieMesh.position.set(0, 0, 0);
    characterGroup.add(hoodieMesh);

    // Hoodie Collar / Hood Fold behind neck
    const hoodCollarGeo = new THREE.TorusGeometry(0.54, 0.12, 16, 32);
    const hoodCollarMesh = new THREE.Mesh(hoodCollarGeo, hoodieMaterial);
    hoodCollarMesh.rotation.x = Math.PI / 2.2;
    hoodCollarMesh.position.set(0, 0.65, -0.05);
    characterGroup.add(hoodCollarMesh);

    // Head Pivot Group (Rotates and tracks cursor in 3D!)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.2, 0);
    characterGroup.add(headGroup);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.45, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, -0.22, 0);
    headGroup.add(neckMesh);

    // Cranium / Face (Proper human facial proportions)
    const faceGeo = new THREE.SphereGeometry(0.54, 32, 32);
    faceGeo.scale(1, 1.15, 0.98);
    const faceMesh = new THREE.Mesh(faceGeo, skinMaterial);
    headGroup.add(faceMesh);

    // Chin / Jaw definition
    const chinGeo = new THREE.SphereGeometry(0.22, 24, 24);
    chinGeo.scale(1.2, 0.8, 1);
    const chinMesh = new THREE.Mesh(chinGeo, skinMaterial);
    chinMesh.position.set(0, -0.38, 0.35);
    headGroup.add(chinMesh);

    // Human Ears
    const earGeo = new THREE.SphereGeometry(0.14, 16, 16);
    earGeo.scale(0.5, 1, 0.8);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(-0.55, 0, 0);
    leftEar.rotation.y = 0.2;
    headGroup.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.set(0.55, 0, 0);
    rightEar.rotation.y = -0.2;
    headGroup.add(rightEar);

    // Realistic Nose
    const noseGeo = new THREE.ConeGeometry(0.09, 0.24, 16);
    noseGeo.scale(0.9, 1, 0.9);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.rotation.x = -Math.PI / 2.3;
    noseMesh.position.set(0, -0.02, 0.58);
    headGroup.add(noseMesh);

    // Expressive Eyes (Sclera + Iris + Highlight as in reference avatar!)
    const eyeWhiteGeo = new THREE.SphereGeometry(0.11, 24, 24);
    eyeWhiteGeo.scale(1.1, 0.9, 0.7);

    // Left Eye
    const leftSclera = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMaterial);
    leftSclera.position.set(-0.19, 0.08, 0.48);
    headGroup.add(leftSclera);

    const pupilGeo = new THREE.SphereGeometry(0.055, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.19, 0.08, 0.545);
    headGroup.add(leftPupil);

    const shineGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const leftShine = new THREE.Mesh(shineGeo, eyeWhiteMaterial);
    leftShine.position.set(-0.17, 0.1, 0.58);
    headGroup.add(leftShine);

    // Right Eye
    const rightSclera = leftSclera.clone();
    rightSclera.position.set(0.19, 0.08, 0.48);
    headGroup.add(rightSclera);

    const rightPupil = leftPupil.clone();
    rightPupil.position.set(0.19, 0.08, 0.545);
    headGroup.add(rightPupil);

    const rightShine = leftShine.clone();
    rightShine.position.set(0.21, 0.1, 0.58);
    headGroup.add(rightShine);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.18, 0.035, 0.04);
    const browMat = new THREE.MeshStandardMaterial({ color: 0x271910, roughness: 0.8 });
    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.2, 0.22, 0.51);
    leftBrow.rotation.z = 0.1;
    headGroup.add(leftBrow);

    const rightBrow = leftBrow.clone();
    rightBrow.position.set(0.2, 0.22, 0.51);
    rightBrow.rotation.z = -0.1;
    headGroup.add(rightBrow);

    // Confident Smiling Mouth (with visible white teeth, as in YouTube reference!)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.22, 0.51);
    headGroup.add(mouthGroup);

    // Mouth cavity
    const mouthBackGeo = new THREE.BoxGeometry(0.26, 0.12, 0.05);
    const mouthBack = new THREE.Mesh(mouthBackGeo, mouthInsideMaterial);
    mouthGroup.add(mouthBack);

    // Upper Teeth
    const teethGeo = new THREE.BoxGeometry(0.22, 0.05, 0.06);
    const teethMesh = new THREE.Mesh(teethGeo, teethMaterial);
    teethMesh.position.set(0, 0.03, 0.01);
    mouthGroup.add(teethMesh);

    // Lower Lip
    const lipGeo = new THREE.TorusGeometry(0.14, 0.025, 12, 24, Math.PI);
    const lipMesh = new THREE.Mesh(lipGeo, skinMaterial);
    lipMesh.rotation.z = Math.PI;
    lipMesh.position.set(0, -0.06, 0.03);
    mouthGroup.add(lipMesh);

    // Backward Baseball Cap (Signature look from reference video!)
    const capDome = new THREE.SphereGeometry(0.57, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.54);
    const capDomeMesh = new THREE.Mesh(capDome, capMaterial);
    capDomeMesh.position.set(0, 0.16, -0.02);
    headGroup.add(capDomeMesh);

    // Cap Backward Visor
    const visorGeo = new THREE.CylinderGeometry(0.58, 0.64, 0.06, 32, 1, false, 0, Math.PI);
    const visorMesh = new THREE.Mesh(visorGeo, capVisorMaterial);
    visorMesh.rotation.x = 0.22;
    visorMesh.rotation.y = Math.PI;
    visorMesh.position.set(0, 0.22, -0.4);
    headGroup.add(visorMesh);

    // Cap Adjustment Strap / Button on top
    const capButton = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), capVisorMaterial);
    capButton.position.set(0, 0.72, -0.02);
    headGroup.add(capButton);

    // 5. Realistic 3D Autonomous Drone (Sentinx OS / Companion Quadcopter)
    const drone = new THREE.Group();
    scene.add(drone);

    // Drone Aerodynamic Body
    const droneBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.09, 0.38), droneWhiteMaterial);
    drone.add(droneBody);

    // Drone Top Canopy
    const droneCanopy = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.06, 16), droneDarkMaterial);
    droneCanopy.position.set(0, 0.06, 0);
    drone.add(droneCanopy);

    // 4 Drone Arms & Motor Hubs
    const armCoords = [
      { x: 0.32, z: 0.32, angle: Math.PI / 4 },
      { x: -0.32, z: 0.32, angle: -Math.PI / 4 },
      { x: 0.32, z: -0.32, angle: -Math.PI / 4 },
      { x: -0.32, z: -0.32, angle: Math.PI / 4 },
    ];

    const propellers: THREE.Mesh[] = [];

    armCoords.forEach((coord, i) => {
      // Carbon arm
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), droneDarkMaterial);
      arm.rotation.z = Math.PI / 2;
      arm.rotation.y = coord.angle;
      arm.position.set(coord.x * 0.5, 0, coord.z * 0.5);
      drone.add(arm);

      // Motor hub
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.09, 16), droneDarkMaterial);
      motor.position.set(coord.x, 0.02, coord.z);
      drone.add(motor);

      // LED Light on motor
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), i < 2 ? neonCyan : neonPurple);
      led.position.set(coord.x, -0.035, coord.z);
      drone.add(led);

      // Two-Blade Propeller
      const prop = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.008, 0.04), droneDarkMaterial);
      prop.position.set(coord.x, 0.075, coord.z);
      drone.add(prop);
      propellers.push(prop);
    });

    // Camera Gimbal with glowing cyan lens
    const gimbal = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), neonCyan);
    gimbal.position.set(0, -0.07, 0.1);
    drone.add(gimbal);

    // 6. Orbital Cybernetic Rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.012, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.25 })
    );
    orbitRing1.rotation.x = Math.PI / 2.3;
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.008, 16, 60),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 })
    );
    orbitRing2.rotation.x = Math.PI / 1.7;
    scene.add(orbitRing2);

    // Mouse Tracking
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetHeadRotY = x * 0.45;
      targetHeadRotX = -y * 0.25;
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

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Head Tracking
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Gentle natural breathing
      characterGroup.position.y = -0.65 + Math.sin(elapsed * 1.6) * 0.025;

      // Drone Orbit around the Avatar
      const droneRadius = 1.75;
      const droneSpeed = 0.95;
      const droneAngle = elapsed * droneSpeed;

      const dx = Math.cos(droneAngle) * droneRadius;
      const dz = Math.sin(droneAngle) * (droneRadius * 0.75) + 0.3;
      const dy = 0.3 + Math.sin(elapsed * 2.2) * 0.18;

      drone.position.set(dx, dy, dz);

      // Drone Banking & Tilt
      drone.rotation.y = -droneAngle + Math.PI / 2;
      drone.rotation.z = Math.sin(elapsed * 2) * 0.12;
      drone.rotation.x = Math.cos(elapsed * 2) * 0.08;

      // Spin propellers rapidly
      propellers.forEach((p) => {
        p.rotation.y += 0.55;
      });

      // Slowly rotate cyber rings
      orbitRing1.rotation.z += 0.002;
      orbitRing2.rotation.z -= 0.003;

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
