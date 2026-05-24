"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = function (...args) {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */
const GRID_COLS = 32;
const GRID_ROWS = 24;
const WAVER_SPEED = 0.0006;
const MOUSE_INFLUENCE = 0.45;

const COLOR_PRIMARY = new THREE.Color("#f37335");
const COLOR_WARM = new THREE.Color("#a68b80");
const COLOR_AMBER = new THREE.Color("#f59e0b");

/* ─────────────────────────────────────────────
   Particles Component (inside R3F Canvas)
   ───────────────────────────────────────────── */
function Waves({ scrollProgress }: { scrollProgress: { value: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const count = GRID_COLS * GRID_ROWS;

  /* Generate grid nodes positions + custom colors */
  const { positions, colors, initialY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const initY = new Float32Array(count);

    const tempColor = new THREE.Color();
    const cellWidth = 14 / GRID_COLS;
    const cellHeight = 10 / GRID_ROWS;

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const i = r * GRID_COLS + c;

        // Position x & z symmetrically in space
        const x = (c - GRID_COLS / 2) * cellWidth;
        const z = (r - GRID_ROWS / 2) * cellHeight;
        
        pos[i * 3] = x;
        pos[i * 3 + 1] = 0; // Will be animated
        pos[i * 3 + 2] = z;

        initY[i] = 0;

        /* Blend brand colors depending on x, z coords */
        const t = Math.random();
        if (t < 0.35) {
          tempColor.copy(COLOR_PRIMARY);
        } else if (t < 0.7) {
          tempColor.copy(COLOR_WARM);
        } else {
          tempColor.copy(COLOR_AMBER);
        }
        col[i * 3] = tempColor.r;
        col[i * 3 + 1] = tempColor.g;
        col[i * 3 + 2] = tempColor.b;
      }
    }

    return { positions: pos, colors: col, initialY: initY };
  }, [count]);

  /* Track Mouse position */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize coordinates from -1 to 1
    targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  /* Frame-by-frame waving animation loop */
  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    const posArray = points.geometry.attributes.position.array as Float32Array;

    // Linear interpolate mouse coordinates for buttery smooth movement
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    const scrollOffset = scrollProgress.value * 2.0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = posArray[idx];
      const z = posArray[idx + 2];

      // Math equation for beautiful dynamic wave motion (sine waves based on coordinate & time)
      const baseWave = Math.sin(x * 0.5 + time * 1.2) * 0.35 + Math.cos(z * 0.6 + time * 0.9) * 0.25;

      // Mouse displacement factor
      const distToMouse = Math.sqrt(
        Math.pow(x - mouseRef.current.x * 4, 2) + Math.pow(z - mouseRef.current.y * 3, 2)
      );

      const mouseRepulsion = distToMouse < 2.5
        ? (1.0 - distToMouse / 2.5) * MOUSE_INFLUENCE
        : 0;

      // Apply coordinates changes
      posArray[idx + 1] = baseWave + mouseRepulsion - scrollOffset;
    }

    points.geometry.attributes.position.needsUpdate = true;

    // Gentle global drift rotation
    points.rotation.y = time * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────
   Main Exporter Canvas Wrapper
   ───────────────────────────────────────────── */
interface ServicesParticleFieldProps {
  scrollTriggerElement?: HTMLElement | null;
}

export function ServicesParticleField({ scrollTriggerElement }: ServicesParticleFieldProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMemo(() => ({ value: 0 }), []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const trigger = scrollTriggerElement || document.body;

    const ctx = gsap.context(() => {
      // Connect GSAP ScrollTrigger to coordinate R3F displacement
      gsap.fromTo(
        scrollProgress,
        { value: 0 },
        {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [mounted, scrollTriggerElement, scrollProgress]);

  if (!mounted) return null;

  return (
    <div
      ref={canvasContainerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.75 }}
    >
      <Canvas
        camera={{ position: [0, 4, 7], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <Waves scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
