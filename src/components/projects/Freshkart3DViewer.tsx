"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShoppingBag, Zap, RefreshCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Freshkart3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(4);
  const [totalPrice, setTotalPrice] = useState(14.86);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 3.2);

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

    // 2. High-Visibility Lights
    const ambientLight = new THREE.AmbientLight(0x064e3b, 3.0);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xffffff, 7, 12, Math.PI / 4, 0.5, 1);
    keySpot.position.set(0, 4, 3);
    scene.add(keySpot);

    const emeraldLight = new THREE.DirectionalLight(0x10b981, 5.5);
    emeraldLight.position.set(-3, 3, 2);
    scene.add(emeraldLight);

    const tealLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    tealLight.position.set(3, 1, 2);
    scene.add(tealLight);

    // 3. Materials
    const basketTrayMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x047857,
      emissiveIntensity: 0.4,
    });

    const neonEmerald = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 2.2,
      roughness: 0.1,
    });

    const cartonMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Organic Milk Blue
      roughness: 0.3,
      metalness: 0.3,
    });

    const avocadoSkinMat = new THREE.MeshStandardMaterial({
      color: 0x3f6212, // Vibrant avocado green
      roughness: 0.45,
      metalness: 0.1,
    });

    const berryJarMat = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7, // Blueberry Purple
      transmission: 0.65,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1,
      ior: 1.45,
    });

    // 4. Centered 3D Shopping Pod
    const cartGroup = new THREE.Group();
    cartGroup.position.set(0, -0.05, 0);
    scene.add(cartGroup);

    // Basket Base Tray
    const trayGeo = new THREE.BoxGeometry(1.65, 0.12, 1.25);
    const trayMesh = new THREE.Mesh(trayGeo, basketTrayMat);
    trayMesh.position.set(0, -0.35, 0);
    cartGroup.add(trayMesh);

    // Glowing Basket Wireframe
    const basketGeo = new THREE.BoxGeometry(1.7, 0.75, 1.3);
    const basketEdges = new THREE.EdgesGeometry(basketGeo);
    const basketWire = new THREE.LineSegments(
      basketEdges,
      new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 2 })
    );
    basketWire.position.set(0, 0, 0);
    cartGroup.add(basketWire);

    // Luminous Basket Top Rim
    const rimGeo = new THREE.BoxGeometry(1.78, 0.06, 1.38);
    const rimEdges = new THREE.EdgesGeometry(rimGeo);
    const rimLine = new THREE.LineSegments(
      rimEdges,
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, linewidth: 3 })
    );
    rimLine.position.set(0, 0.38, 0);
    cartGroup.add(rimLine);

    // Basket Handle Arch
    const handleGeo = new THREE.TorusGeometry(0.72, 0.045, 16, 32, Math.PI);
    const handleMesh = new THREE.Mesh(handleGeo, basketTrayMat);
    handleMesh.rotation.z = Math.PI;
    handleMesh.position.set(0, 0.38, 0);
    cartGroup.add(handleMesh);

    // 5. Stylized Floating Grocery Items
    // Item 1: 3D Avocado
    const avocadoGroup = new THREE.Group();
    const avocadoBody = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), avocadoSkinMat);
    avocadoBody.scale.set(0.9, 1.3, 0.9);
    avocadoGroup.add(avocadoBody);

    const avocadoSeed = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
    );
    avocadoSeed.position.set(0, 0, 0.16);
    avocadoGroup.add(avocadoSeed);
    avocadoGroup.position.set(-0.45, 0.12, 0.15);
    cartGroup.add(avocadoGroup);

    // Item 2: 3D Milk / Beverage Carton
    const milkBoxGeo = new THREE.BoxGeometry(0.34, 0.58, 0.34);
    const milkBox = new THREE.Mesh(milkBoxGeo, cartonMat);
    milkBox.position.set(0.42, 0.22, -0.15);
    milkBox.rotation.y = 0.35;
    cartGroup.add(milkBox);

    const milkCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.07, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    milkCap.position.set(0.42, 0.54, -0.15);
    cartGroup.add(milkCap);

    // Item 3: 3D Blueberry Jam / Glass Jar
    const jarGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.42, 24);
    const jarMesh = new THREE.Mesh(jarGeo, berryJarMat);
    jarMesh.position.set(0, 0.15, -0.22);
    cartGroup.add(jarMesh);

    const jarLid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.07, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 })
    );
    jarLid.position.set(0, 0.38, -0.22);
    cartGroup.add(jarLid);

    // 6. Holographic Platform & Express Orbit Rings
    const platformGeo = new THREE.CylinderGeometry(1.65, 1.85, 0.08, 32);
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4, metalness: 0.8 });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, -0.65, 0);
    scene.add(platform);

    const platformRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.025, 16, 64),
      neonEmerald
    );
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.set(0, -0.62, 0);
    scene.add(platformRing);

    // Floating Express Orbit Rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.015, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 })
    );
    orbitRing1.rotation.x = Math.PI / 2.3;
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.012, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
    );
    orbitRing2.rotation.x = Math.PI / 1.7;
    scene.add(orbitRing2);

    // Mouse Tracking Logic
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.55;
      targetRotX = -y * 0.35;
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

      // Smooth Cart Tilt & Hover
      cartGroup.rotation.y += (targetRotY - cartGroup.rotation.y) * 0.08 + 0.005;
      cartGroup.rotation.x += (targetRotX - cartGroup.rotation.x) * 0.08;
      cartGroup.position.y = -0.05 + Math.sin(elapsed * 2) * 0.06;

      // Grocery items bobbing gently
      avocadoGroup.position.y = 0.12 + Math.sin(elapsed * 2.5) * 0.03;
      milkBox.position.y = 0.22 + Math.sin(elapsed * 2.2 + 1) * 0.03;
      milkCap.position.y = 0.54 + Math.sin(elapsed * 2.2 + 1) * 0.03;
      jarMesh.position.y = 0.15 + Math.sin(elapsed * 2.8 + 2) * 0.03;
      jarLid.position.y = 0.38 + Math.sin(elapsed * 2.8 + 2) * 0.03;

      // Rotate express rings
      orbitRing1.rotation.z += 0.005;
      orbitRing2.rotation.z -= 0.006;

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

  const handleCheckout = () => {
    setCheckedOut(true);
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10b981", "#34d399", "#38bdf8"],
    });
  };

  const resetCart = () => {
    setCheckedOut(false);
    setItemsCount(4);
    setTotalPrice(14.86);
  };

  return (
    <div className="relative w-full h-[340px] sm:h-[390px] rounded-2xl overflow-hidden border border-emerald-500/25 bg-gradient-to-b from-[#061812] via-[#04120d] to-[#020a07] select-none shadow-2xl">
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

      {/* HUD Layer (Overlaid on top of 3D canvas) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 pointer-events-none">
        {/* Top Header Status */}
        <div className="flex items-center justify-between text-[11px] bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white font-mono font-bold tracking-wider">3D QUICK-COMMERCE POD</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" />
            <span>10-MIN EXPRESS</span>
          </div>
        </div>

        {/* Center 3D Cursor Hint */}
        <div className="self-end hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 text-[10px] font-mono text-emerald-300 pointer-events-auto backdrop-blur-sm">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Interactive 3D Basket (Move Cursor)</span>
        </div>

        {/* Bottom Checkout & Cart Action Bar */}
        <div className="grid grid-cols-3 gap-2 text-[10px] sm:text-xs font-mono pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              <ShoppingBag className="w-3 h-3 text-emerald-400" /> ITEMS
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">{itemsCount} Products</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-slate-400 flex items-center gap-1 text-[9px]">
              TOTAL
            </span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
            {checkedOut ? (
              <button
                onClick={resetCart}
                className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-emerald-600/30 text-emerald-300 font-bold text-[10px] cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>ORDERED!</span>
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full h-full flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[10px] cursor-pointer shadow-md shadow-emerald-900/40"
              >
                <Zap className="w-3 h-3 fill-white" />
                <span>CHECKOUT ⚡</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
