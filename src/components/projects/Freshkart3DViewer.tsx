"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShoppingBag, Zap, Check, Sparkles, Plus, Minus, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function Freshkart3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [itemsCount, setItemsCount] = useState(4);
  const [totalPrice, setTotalPrice] = useState(14.86);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 4.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x064e3b, 2.5);
    scene.add(ambientLight);

    const topSpot = new THREE.SpotLight(0xffffff, 8, 12, Math.PI / 4, 0.5, 1);
    topSpot.position.set(0, 5, 2.5);
    scene.add(topSpot);

    const emeraldLight = new THREE.DirectionalLight(0x10b981, 5);
    emeraldLight.position.set(-3, 2, -2);
    scene.add(emeraldLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    cyanLight.position.set(3, 1, 2);
    scene.add(cyanLight);

    // 3. Materials
    const basketFrameMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0x065f46,
      emissiveIntensity: 0.4,
    });

    const basketGridMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const neonEmerald = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    const itemBoxMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Organic product carton
      roughness: 0.3,
      metalness: 0.3,
    });

    const avocadoMat = new THREE.MeshStandardMaterial({
      color: 0x4d7c0f, // Avocado green
      roughness: 0.5,
      metalness: 0.1,
    });

    const berryJarMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6, // Blueberry purple
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      ior: 1.4,
    });

    // 4. 3D Shopping Pod / Smart Basket Group
    const cartGroup = new THREE.Group();
    scene.add(cartGroup);

    // Basket Base Tray
    const trayGeo = new THREE.BoxGeometry(1.6, 0.1, 1.2);
    const trayMesh = new THREE.Mesh(trayGeo, basketFrameMat);
    trayMesh.position.set(0, -0.4, 0);
    cartGroup.add(trayMesh);

    // Basket Wireframe Body
    const basketGeo = new THREE.BoxGeometry(1.7, 0.75, 1.3);
    const basketEdges = new THREE.EdgesGeometry(basketGeo);
    const basketWire = new THREE.LineSegments(
      basketEdges,
      new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 })
    );
    basketWire.position.set(0, -0.05, 0);
    cartGroup.add(basketWire);

    // Glowing Basket Rim Top
    const rimGeo = new THREE.BoxGeometry(1.76, 0.06, 1.36);
    const rimEdges = new THREE.EdgesGeometry(rimGeo);
    const rimLine = new THREE.LineSegments(
      rimEdges,
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, linewidth: 2 })
    );
    rimLine.position.set(0, 0.32, 0);
    cartGroup.add(rimLine);

    // Basket Handle (Curved Torus Arc)
    const handleGeo = new THREE.TorusGeometry(0.7, 0.04, 16, 32, Math.PI);
    const handleMesh = new THREE.Mesh(handleGeo, basketFrameMat);
    handleMesh.rotation.z = Math.PI;
    handleMesh.position.set(0, 0.32, 0);
    cartGroup.add(handleMesh);

    // 5. Floating 3D Grocery Items in Basket
    // Item 1: Stylized 3D Avocado
    const avocadoGroup = new THREE.Group();
    const avocadoBody = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), avocadoMat);
    avocadoBody.scale.set(0.9, 1.3, 0.9);
    avocadoGroup.add(avocadoBody);

    const avocadoSeed = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
    );
    avocadoSeed.position.set(0, 0, 0.16);
    avocadoGroup.add(avocadoSeed);
    avocadoGroup.position.set(-0.45, 0.05, 0.15);
    cartGroup.add(avocadoGroup);

    // Item 2: 3D Milk / Beverage Carton
    const milkBoxGeo = new THREE.BoxGeometry(0.32, 0.55, 0.32);
    const milkBox = new THREE.Mesh(milkBoxGeo, itemBoxMat);
    milkBox.position.set(0.38, 0.15, -0.15);
    milkBox.rotation.y = 0.3;
    cartGroup.add(milkBox);

    const milkCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    milkCap.position.set(0.38, 0.45, -0.15);
    cartGroup.add(milkCap);

    // Item 3: 3D Blueberry Jam / Glass Jar
    const jarGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.38, 24);
    const jarMesh = new THREE.Mesh(jarGeo, berryJarMat);
    jarMesh.position.set(0, 0.08, -0.22);
    cartGroup.add(jarMesh);

    const jarLid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.06, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 })
    );
    jarLid.position.set(0, 0.28, -0.22);
    cartGroup.add(jarLid);

    // 6. Holographic Delivery Express Rings & Ground Platform
    const platformGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.08, 32);
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4, metalness: 0.8 });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(0, -0.75, 0);
    scene.add(platform);

    const platformRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.02, 16, 64),
      neonEmerald
    );
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.set(0, -0.72, 0);
    scene.add(platformRing);

    // Floating Express Orbit Rings
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.012, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 })
    );
    orbitRing1.rotation.x = Math.PI / 2.4;
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.008, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 })
    );
    orbitRing2.rotation.x = Math.PI / 1.8;
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

      // Smooth Cart Tilt & Gentle Hover
      cartGroup.rotation.y += (targetRotY - cartGroup.rotation.y) * 0.08 + 0.005;
      cartGroup.rotation.x += (targetRotX - cartGroup.rotation.x) * 0.08;
      cartGroup.position.y = Math.sin(elapsed * 2) * 0.06;

      // Grocery items bobbing gently
      avocadoGroup.position.y = 0.05 + Math.sin(elapsed * 2.5) * 0.03;
      milkBox.position.y = 0.15 + Math.sin(elapsed * 2.2 + 1) * 0.03;
      milkCap.position.y = 0.45 + Math.sin(elapsed * 2.2 + 1) * 0.03;
      jarMesh.position.y = 0.08 + Math.sin(elapsed * 2.8 + 2) * 0.03;
      jarLid.position.y = 0.28 + Math.sin(elapsed * 2.8 + 2) * 0.03;

      // Rotate express rings
      orbitRing1.rotation.z += 0.004;
      orbitRing2.rotation.z -= 0.005;

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
    <div
      ref={mountRef}
      className="relative w-full h-[320px] sm:h-[370px] bg-[#05110d] rounded-2xl overflow-hidden border border-emerald-500/20 flex flex-col justify-between p-4 font-mono select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-emerald-600/15 via-transparent to-transparent pointer-events-none" />

      {/* Top Header Status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-white font-bold tracking-wider">3D QUICK-COMMERCE POD</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>10-MIN EXPRESS</span>
        </div>
      </div>

      {/* Center 3D Cursor Hint */}
      <div className="absolute top-14 right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-slate-400">
        <Sparkles className="w-3 h-3 text-emerald-400" />
        <span>3D Interactive Basket</span>
      </div>

      {/* Bottom Checkout & Cart Action Bar */}
      <div className="relative z-10 grid grid-cols-3 gap-2 text-[10px] sm:text-xs">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            <ShoppingBag className="w-3 h-3 text-emerald-400" /> ITEMS
          </span>
          <span className="font-bold text-white text-xs sm:text-sm">{itemsCount} Products</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center">
          <span className="text-slate-400 flex items-center gap-1">
            TOTAL
          </span>
          <span className="font-bold text-emerald-400 text-xs sm:text-sm">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="glass-panel p-2 rounded-xl border border-white/10 flex flex-col items-center justify-center">
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
  );
}

