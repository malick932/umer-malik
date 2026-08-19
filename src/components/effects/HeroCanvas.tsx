"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight Three.js particle field for the hero background.
 * Kept intentionally minimal (single Points mesh, no postprocessing) so it
 * never becomes a performance liability. Pauses when off-screen and respects
 * prefers-reduced-motion.
 */
export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Particle field: sparse, multi-color points standing in for a distant
    // "starfield" / digital-world motif, subtly reactive to the cursor.
    const PARTICLE_COUNT = 420;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#a78bfa"),
      new THREE.Color("#60a5fa"),
      new THREE.Color("#22d3ee"),
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 11;

      const color = palette[i % palette.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // A handful of faint wireframe game-engine-style shapes drifting in the
    // distance — a nod to 3D primitives without being literal or heavy.
    const shapes: THREE.Mesh[] = [];
    const shapeColors = ["#a78bfa", "#60a5fa", "#22d3ee", "#a78bfa", "#22d3ee"];
    const shapeGeometries = [
      () => new THREE.IcosahedronGeometry(0.9, 0),
      () => new THREE.OctahedronGeometry(0.85, 0),
      () => new THREE.IcosahedronGeometry(1.1, 0),
      () => new THREE.TorusGeometry(0.7, 0.22, 8, 24),
      () => new THREE.OctahedronGeometry(1.0, 0),
    ];
    for (let i = 0; i < shapeGeometries.length; i++) {
      const geo = shapeGeometries[i]();
      const mat = new THREE.MeshBasicMaterial({
        color: shapeColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / shapeGeometries.length) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 5.5, Math.sin(angle) * 2.4, -3 - (i % 3));
      scene.add(mesh);
      shapes.push(mesh);
    }

    let animationId: number;
    let isVisible = true;
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      points.rotation.y = elapsed * 0.02 + mouse.x * 0.15;
      points.rotation.x = mouse.y * 0.08;

      shapes.forEach((shape, i) => {
        shape.rotation.x = elapsed * 0.08 * (i + 1);
        shape.rotation.y = elapsed * 0.06 * (i + 1);
      });

      camera.position.x += (mouse.x * 0.85 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.55 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 opacity-80"
    />
  );
}
