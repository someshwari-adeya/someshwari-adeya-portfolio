"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function TechThreeCanvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Dimensions
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 24;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Group
    const group = new THREE.Group();
    scene.add(group);

    // Create particles (constellation nodes)
    const particleCount = 70;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const radius = 10;
    for (let i = 0; i < particleCount; i++) {
      // Sphere random distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.6 + 0.4 * Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Small velocities for gentle organic drifting
      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015
      });
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf37335,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particleSystem);

    // Glowing connection lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 2 * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineMesh);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Point Light for a warm volumetric center glow
    const centerLight = new THREE.PointLight(0xf37335, 2.5, 30);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    // Render loop state
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Organic drift of nodes
      const posAttr = particlesGeometry.getAttribute("position") as THREE.BufferAttribute;
      const count = posAttr.count;

      for (let i = 0; i < count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        x += velocities[i].x;
        y += velocities[i].y;
        z += velocities[i].z;

        // Keep inside sphere boundary
        const dist = Math.sqrt(x * x + y * y + z * z);
        if (dist > radius * 1.1) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;

      // Update Plexus connection lines
      let lineIndex = 0;
      const linesPosAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const x1 = posAttr.getX(i);
        const y1 = posAttr.getY(i);
        const z1 = posAttr.getZ(i);

        for (let j = i + 1; j < count; j++) {
          const x2 = posAttr.getX(j);
          const y2 = posAttr.getY(j);
          const z2 = posAttr.getZ(j);

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Only draw lines if they are close enough
          if (dist < 4.8) {
            linesPosAttr.setXYZ(lineIndex++, x1, y1, z1);
            linesPosAttr.setXYZ(lineIndex++, x2, y2, z2);
          }
        }
      }
      // Zero out remaining positions so they don't render
      const totalPairs = count * count * 2;
      for (let k = lineIndex; k < totalPairs; k++) {
        linesPosAttr.setXYZ(k, 0, 0, 0);
      }
      linesPosAttr.needsUpdate = true;

      // Constant slow background spin
      group.rotation.y += 0.0015;
      group.rotation.x += 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    // GSAP ScrollTrigger to tie sphere rotation & scale to section scroll progress
    gsap.registerPlugin(ScrollTrigger);
    const scrollAnimation = gsap.to(group.rotation, {
      y: Math.PI * 1.6,
      x: Math.PI * 0.65,
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });

    const scaleAnimation = gsap.fromTo(group.scale, 
      { x: 0.8, y: 0.8, z: 0.8 },
      {
        x: 1.15,
        y: 1.15,
        z: 1.15,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "center center",
          scrub: 1.0
        }
      }
    );

    // Responsive sizing
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      // Kill ScrollTriggers and animations deferred to prevent unmount conflicts
      setTimeout(() => {
        scrollAnimation.scrollTrigger?.kill();
        scrollAnimation.kill();
        scaleAnimation.scrollTrigger?.kill();
        scaleAnimation.kill();
      }, 0);

      // Dispose resources to prevent GPU leaks
      scene.remove(group);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full pointer-events-none select-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full block opacity-75" />
    </div>
  );
}
