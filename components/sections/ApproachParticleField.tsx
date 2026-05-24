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
const PARTICLE_COUNT_DESKTOP = 220;
const PARTICLE_COUNT_MOBILE = 90;
const FIELD_RADIUS = 6;
const BASE_ROTATION_SPEED = 0.00015;
const MOUSE_INFLUENCE = 0.3;

/* brand warm tones for particles */
const COLOR_PRIMARY = new THREE.Color("#d85318");
const COLOR_WARM = new THREE.Color("#a68b80");
const COLOR_AMBER = new THREE.Color("#f59e0b");

/* ─────────────────────────────────────────────
   Particles Component (inside R3F Canvas)
   ───────────────────────────────────────────── */
function Particles({ scrollProgress }: { scrollProgress: { value: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const isMobile = size.width < 768;
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  /* Generate particle positions + sizes + colors */
  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      /* Distribute in a spherical volume */
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = FIELD_RADIUS * Math.cbrt(Math.random());

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      /* Random size */
      sz[i] = 1.5 + Math.random() * 3.5;

      /* Blend between brand colors */
      const t = Math.random();
      if (t < 0.4) {
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

    return { positions: pos, sizes: sz, colors: col };
  }, [count]);

  /* Mouse tracking */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* Animation loop */
  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    /* Smooth mouse lerp */
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

    /* Base auto-rotation */
    pointsRef.current.rotation.y += BASE_ROTATION_SPEED;
    pointsRef.current.rotation.x += BASE_ROTATION_SPEED * 0.3;

    /* Scroll-driven rotation boost */
    const scrollInfluence = scrollProgress.value * Math.PI * 0.15;
    pointsRef.current.rotation.z = scrollInfluence * 0.3;
    pointsRef.current.rotation.x =
      BASE_ROTATION_SPEED * 0.3 + scrollInfluence * 0.1;

    /* Mouse parallax */
    pointsRef.current.position.x =
      mouseRef.current.x * MOUSE_INFLUENCE;
    pointsRef.current.position.y =
      mouseRef.current.y * MOUSE_INFLUENCE * 0.5;

    /* Gentle scale pulse based on scroll */
    const scale = 1 + scrollProgress.value * 0.08;
    pointsRef.current.scale.setScalar(scale);

    /* Animate individual particle sizes subtly */
    const geometry = pointsRef.current.geometry;
    const sizeAttr = geometry.getAttribute("size") as THREE.BufferAttribute;
    const time = Date.now() * 0.001;
    for (let i = 0; i < count; i++) {
      sizeAttr.array[i] =
        sizes[i] * (0.85 + 0.15 * Math.sin(time + i * 0.3));
    }
    sizeAttr.needsUpdate = true;
  });

  /* Custom shader material for soft round particles */
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uOpacity: { value: 0.55 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 particleColor;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = particleColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            /* fade particles that are far away */
            float dist = length(position);
            vAlpha = smoothstep(6.0, 2.0, dist);
          }
        `,
        fragmentShader: `
          uniform float uOpacity;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            /* Soft circle shape */
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.15, d) * uOpacity * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-particleColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
    </points>
  );
}

/* ─────────────────────────────────────────────
   Exported Canvas wrapper
   ───────────────────────────────────────────── */
export function ApproachParticleField({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const scrollProgress = useRef({ value: 0 });
  const [visible, setVisible] = useState(true);

  /* hide on very small / low-power devices */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(false);
      return;
    }

    /* ScrollTrigger to drive scroll progress */
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        scrollProgress.current.value = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Particles scrollProgress={scrollProgress.current} />
      </Canvas>
    </div>
  );
}
