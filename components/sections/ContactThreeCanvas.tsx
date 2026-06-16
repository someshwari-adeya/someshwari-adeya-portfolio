"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ContactThreeCanvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

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
    const particleCount = 80;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const radius = 10;
    for (let i = 0; i < particleCount; i++) {
      // Sphere random distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.4 + 0.6 * Math.random());

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Small velocities for gentle organic drifting
      velocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.012
      });
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xd85318,
      size: 0.28,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particleSystem);

    // Glowing connection lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 2 * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineMesh);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Point Light for a warm volumetric center glow
    const centerLight = new THREE.PointLight(0xd85318, 2.5, 25);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    // Mouse interactive tracking
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x, y);
    };

    const handleMouseLeave = () => {
      targetMouse.set(-9999, -9999);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Render loop state
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse
      if (targetMouse.x !== -9999) {
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;
      } else {
        mouse.set(-9999, -9999);
      }

      // Organic drift of nodes + Mouse attraction/repulsion
      const posAttr = particlesGeometry.getAttribute("position") as THREE.BufferAttribute;
      const count = posAttr.count;

      // Find mouse 3D intersection on plane
      let mouse3D = new THREE.Vector3();
      let hasMouse = false;

      if (mouse.x !== -9999) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, mouse3D);
        hasMouse = true;
      }

      for (let i = 0; i < count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        // Standard drift
        x += velocities[i].x;
        y += velocities[i].y;
        z += velocities[i].z;

        // Keep inside boundary sphere
        const dist = Math.sqrt(x * x + y * y + z * z);
        if (dist > radius * 1.15) {
          velocities[i].x *= -1;
          velocities[i].y *= -1;
          velocities[i].z *= -1;
        }

        // Mouse attraction/repulsion
        if (hasMouse) {
          const dx = x - mouse3D.x;
          const dy = y - mouse3D.y;
          const dz = z - mouse3D.z;
          const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distToMouse < 6) {
            // Push away gently from mouse
            const force = (6 - distToMouse) * 0.015;
            x += dx * force;
            y += dy * force;
            z += dz * force;
          }
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

          // Draw lines if they are close enough
          if (dist < 4.5) {
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
      group.rotation.y += 0.0012;
      group.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    // GSAP ScrollTrigger to tie sphere rotation & scale to section scroll progress
    gsap.registerPlugin(ScrollTrigger);
    const scrollAnimation = gsap.to(group.rotation, {
      y: Math.PI * 1.2,
      x: Math.PI * 0.5,
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    const scaleAnimation = gsap.fromTo(group.scale, 
      { x: 0.85, y: 0.85, z: 0.85 },
      {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "center center",
          scrub: 1.2
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
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

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
    <div ref={containerRef} className="absolute inset-0 h-full w-full pointer-events-none select-none z-0 overflow-hidden rounded-2xl">
      <canvas ref={canvasRef} className="h-full w-full block opacity-40 mix-blend-screen" />
    </div>
  );
}
