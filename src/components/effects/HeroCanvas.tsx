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

    // Particle field: sparse points standing in for a distant "starfield" /
    // digital-world motif, subtly reactive to the cursor.
    const PARTICLE_COUNT = 260;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color("#a78bfa"),
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // A handful of faint wireframe icosahedra drifting in the distance —
    // a nod to game-engine geometry without being literal or heavy.
    const shapes: THREE.Mesh[] = [];
    const shapeColors = ["#a78bfa", "#60a5fa", "#22d3ee"];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.IcosahedronGeometry(0.9 + i * 0.25, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: shapeColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((i - 1) * 4.2, (i % 2 === 0 ? 1 : -1) * 1.6, -3 - i);
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

      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.03;
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
