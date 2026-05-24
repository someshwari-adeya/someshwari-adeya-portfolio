"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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
const NODE_COUNT_DESKTOP = 80;
const NODE_COUNT_MOBILE = 35;
const CONNECTION_DISTANCE = 2.2;
const FIELD_SPREAD = 5;
const DRIFT_SPEED = 0.08;

/* Brand colors */
const COLOR_PRIMARY = new THREE.Color("#f37335");
const COLOR_WARM = new THREE.Color("#a68b80");
const COLOR_AMBER = new THREE.Color("#f59e0b");

/* ─────────────────────────────────────────────
   Constellation Mesh — connected nodes + lines
   ───────────────────────────────────────────── */
function ConstellationField() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const isMobile = size.width < 768;
  const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

  /* Node data: positions, velocities, sizes, colors */
  const nodeData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_SPREAD * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SPREAD * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_SPREAD;

      velocities[i * 3] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED * 0.3;

      sizes[i] = 2 + Math.random() * 4;

      const t = Math.random();
      if (t < 0.35) tempColor.copy(COLOR_PRIMARY);
      else if (t < 0.65) tempColor.copy(COLOR_WARM);
      else tempColor.copy(COLOR_AMBER);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    return { positions, velocities, sizes, colors };
  }, [count]);

  /* Line buffer (max possible connections) */
  const maxLines = count * (count - 1);
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 3),
    [maxLines]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 3),
    [maxLines]
  );

  /* Mouse tracking */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* Point shader material */
  const pointMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
          attribute float size;
          attribute vec3 particleColor;
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            vColor = particleColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (250.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            float dist = length(position.xy);
            vAlpha = smoothstep(6.0, 1.5, dist);
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * 0.7 * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  /* Animation loop */
  useFrame(() => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    /* Smooth mouse */
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

    /* Drift nodes */
    const pos = nodeData.positions;
    const vel = nodeData.velocities;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3];
      pos[i * 3 + 1] += vel[i * 3 + 1];
      pos[i * 3 + 2] += vel[i * 3 + 2];

      /* Bounce at boundaries */
      for (let axis = 0; axis < 3; axis++) {
        const limit =
          axis === 0
            ? FIELD_SPREAD
            : axis === 1
            ? FIELD_SPREAD * 0.75
            : FIELD_SPREAD * 0.5;
        if (Math.abs(pos[i * 3 + axis]) > limit) {
          vel[i * 3 + axis] *= -1;
          pos[i * 3 + axis] = Math.sign(pos[i * 3 + axis]) * limit;
        }
      }
    }

    /* Update point positions */
    const pointGeo = pointsRef.current.geometry;
    const posAttr = pointGeo.getAttribute("position") as THREE.BufferAttribute;
    posAttr.array.set(pos);
    posAttr.needsUpdate = true;

    /* Pulse sizes */
    const sizeAttr = pointGeo.getAttribute("size") as THREE.BufferAttribute;
    const time = Date.now() * 0.001;
    for (let i = 0; i < count; i++) {
      sizeAttr.array[i] =
        nodeData.sizes[i] * (0.8 + 0.2 * Math.sin(time * 0.8 + i * 0.7));
    }
    sizeAttr.needsUpdate = true;

    /* Build connection lines */
    let lineIdx = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          /* Start point */
          linePositions[lineIdx * 3] = pos[i * 3];
          linePositions[lineIdx * 3 + 1] = pos[i * 3 + 1];
          linePositions[lineIdx * 3 + 2] = pos[i * 3 + 2];
          lineColors[lineIdx * 3] = 0.95 * alpha;
          lineColors[lineIdx * 3 + 1] = 0.45 * alpha;
          lineColors[lineIdx * 3 + 2] = 0.21 * alpha;
          lineIdx++;
          /* End point */
          linePositions[lineIdx * 3] = pos[j * 3];
          linePositions[lineIdx * 3 + 1] = pos[j * 3 + 1];
          linePositions[lineIdx * 3 + 2] = pos[j * 3 + 2];
          lineColors[lineIdx * 3] = 0.95 * alpha;
          lineColors[lineIdx * 3 + 1] = 0.45 * alpha;
          lineColors[lineIdx * 3 + 2] = 0.21 * alpha;
          lineIdx++;
        }
      }
    }

    /* Update line geometry */
    const lineGeo = linesRef.current.geometry;
    const linePosAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
    const lineColAttr = lineGeo.getAttribute("color") as THREE.BufferAttribute;
    linePosAttr.array.set(linePositions);
    lineColAttr.array.set(lineColors);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
    lineGeo.setDrawRange(0, lineIdx);

    /* Mouse parallax on the group */
    groupRef.current.rotation.y = mouseRef.current.x * 0.08;
    groupRef.current.rotation.x = mouseRef.current.y * 0.05;
    groupRef.current.position.x = mouseRef.current.x * 0.3;
    groupRef.current.position.y = mouseRef.current.y * 0.15;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} material={pointMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodeData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[nodeData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-particleColor"
            args={[nodeData.colors, 3]}
          />
        </bufferGeometry>
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Exported Canvas wrapper
   ───────────────────────────────────────────── */
export function HeroConstellationField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ConstellationField />
      </Canvas>
    </div>
  );
}
