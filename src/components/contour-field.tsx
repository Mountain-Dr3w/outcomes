"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./contour-field.module.css";

const LINES = 38;
const STEPS = 256;
const COLUMNS = 16;
const DEPTH_STEPS = 8;

// Fade in world depth, so recycled rows are invisible when they enter the horizon.
function depthOpacity(line: number, time = 0) {
  const z = 1.3 + line * .48 - (time * .35) % .48;
  const t = Math.max(0, Math.min(1, (z - 10) / 8));
  const near = Math.max(0, Math.min(1, (z - 1.3) / 1.5));
  return (1 - t * t * (3 - 2 * t)) * near * near * (3 - 2 * near);
}

function terrainHeight(x: number, worldZ: number) {
  const ridges = (Math.sin(x * .57 + worldZ * .31) * .5 + .5)
    * (Math.cos(worldZ * .42 - x * .19) * .5 + .5);
  return ridges * 1.65 + .035 * Math.sin(x * 1.2 + worldZ * .7);
}

function point(u: number, line: number, pointer: number, time = 0, camera = 0) {
  const travel = time * .35;
  const z = 1.3 + line * .48 - travel % .48;
  const worldZ = z + travel;
  const x = (u - .5) * 28;
  const relief = terrainHeight(x, worldZ);
  // Rotate about the same terrain focus, keeping its screen position fixed.
  const pivotZ = 8;
  const angle = camera * .28 + pointer * .015;
  const offsetZ = z - pivotZ;
  const viewX = x * Math.cos(angle) - offsetZ * Math.sin(angle);
  const viewZ = Math.max(.35, pivotZ + x * Math.sin(angle) + offsetZ * Math.cos(angle));
  return [600 + viewX * 570 / viewZ,
    80 + (2.7 - relief) * 570 / viewZ] as const;

}

function path(line: number) {
  return Array.from({ length: STEPS + 1 }, (_, i) => {
    const [x, y] = point(i / STEPS, line, 0);
    return `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}
const stillPaths = Array.from({ length: LINES }, (_, i) => path(i));

export function ContourField({ controlsTargetId, pageCamera = false }: { controlsTargetId?: string; pageCamera?: boolean }) {
  const [controlsTarget, setControlsTarget] = useState<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionRef = useRef({ elapsed: 0, pointer: 0, camera: 0 });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    let elapsed = motionRef.current.elapsed;
    let visible = true;
    let pointer = motionRef.current.pointer;
    let target = 0;
    let camera = motionRef.current.camera;
    let targetCamera = 0;
    const scroll = () => { targetCamera = pageCamera ? Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) : 0; };
    scroll();
    let width = 1;
    let height = 1;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = .85;
      context.lineJoin = "round";
      context.lineCap = "round";
      for (let line = 0; line < LINES; line++) {
        context.beginPath();
        for (let step = 0; step <= STEPS; step++) {
          const [x, y] = point(step / STEPS, line, pointer, elapsed, camera);
          if (step === 0) context.moveTo(x / 1200 * width, y / 650 * height);
          else context.lineTo(x / 1200 * width, y / 650 * height);
        }
        context.globalAlpha = depthOpacity(line, elapsed);
        context.strokeStyle = (line + Math.floor(elapsed * .35 / .48)) % 5 === 0 ? "rgba(169,191,180,.56)" : "rgba(135,159,149,.25)";
        context.stroke();
      }
      // Fade every segment, including longitudinal grid lines and the route.
      const segment = (a: readonly [number, number], b: readonly [number, number], line: number, visibility = 1) => {
        context.globalAlpha = depthOpacity(line, elapsed) * visibility;
        context.beginPath();
        context.moveTo(a[0] / 1200 * width, a[1] / 650 * height);
        context.lineTo(b[0] / 1200 * width, b[1] / 650 * height);
        context.stroke();
      };
      context.strokeStyle = "rgba(135,159,149,.17)";
      for (let column = 0; column <= COLUMNS; column++) {
        for (let step = 1; step <= (LINES - 1) * DEPTH_STEPS; step++) {
          const line = step / DEPTH_STEPS;
          segment(point(column / COLUMNS, line - 1 / DEPTH_STEPS, pointer, elapsed, camera), point(column / COLUMNS, line, pointer, elapsed, camera), line - .5 / DEPTH_STEPS);
        }
      }
      const angle = camera * .28 + pointer * .015;
      const eyeX = -8 * Math.sin(angle);
      const eyeZ = 8 - 8 * Math.cos(angle);
      const travel = elapsed * .35;
      const coursePoint = (line: number) => {
        const z = 1.3 + line * .48 - travel % .48;
        const worldZ = z + travel;
        const u = .57 + Math.sin(worldZ * .3) * .035;
        const x = (u - .5) * 28;
        const elevation = terrainHeight(x, worldZ) + .012;
        // Trace toward the camera through the same height field that draws the hills.
        // A narrow visibility ramp softens ridge crossings without exposing buried paths.
        let clearance = Infinity;
        for (let sample = 1; sample < 128; sample++) {
          const t = sample / 128;
          const rayX = eyeX + (x - eyeX) * t;
          const rayZ = eyeZ + (z - eyeZ) * t;
          const rayHeight = 2.7 + (elevation - 2.7) * t;
          clearance = Math.min(clearance, rayHeight - terrainHeight(rayX, rayZ + travel));
        }
        return { position: point(u, line, pointer, elapsed, camera), visibility: Math.max(0, Math.min(1, clearance / .008)) };
      };
      context.strokeStyle = "rgba(206,163,95,.85)";
      context.lineWidth = 1.2;
      let previous = coursePoint(0);
      for (let step = 1; step <= (LINES - 1) * DEPTH_STEPS; step++) {
        const line = step / DEPTH_STEPS;
        const current = coursePoint(line);
        segment(previous.position, current.position, line - .5 / DEPTH_STEPS, Math.min(previous.visibility, current.visibility));
        previous = current;
      }
      context.globalAlpha = 1;
      canvas.dataset.ready = "true";
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || media.matches || paused) return;
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      elapsed += dt;
      // Time-based damping stays consistent across display refresh rates.
      pointer += (target - pointer) * (1 - Math.exp(-dt / .45));
      camera += (targetCamera - camera) * (1 - Math.exp(-dt / .5));
      canvas.dataset.camera = camera.toFixed(3);
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      setReduced(media.matches);
      canvas.dataset.motion = paused || media.matches ? "paused" : visible && !document.hidden ? "playing" : "idle";
      if (media.matches) { elapsed = 0; pointer = 0; camera = 0; }
      draw();
      if (!paused && !media.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(([entry]) => {
      if (controlsTargetId) setControlsTarget(document.getElementById(controlsTargetId));
      scroll();
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const move = (event: PointerEvent) => { if (event.pointerType === "mouse") target = event.clientX / window.innerWidth * 2 - 1; };
    const leave = () => { target = 0; };
    resize.observe(canvas);
    observer.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    sync();
    return () => {
      motionRef.current = { elapsed, pointer, camera };
      cancelAnimationFrame(frame);
      resize.disconnect(); observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [paused, controlsTargetId, pageCamera]);

  const motionButton = <button className={`${styles.control} ${controlsTargetId ? styles.inlineControl : ""}`} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play background animation" : "Pause background animation"}>
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">{paused ? <path d="M3 1.5 10 6 3 10.5Z" fill="currentColor" /> : <path d="M3 2v8M9 2v8" stroke="currentColor" strokeWidth="1.5" />}</svg>
      <span>{paused ? "Play motion" : "Pause motion"}</span>
    </button>;

  return <>
    <div className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <svg className={styles.still} viewBox="0 0 1200 650" preserveAspectRatio="none" fill="none">
        {stillPaths.map((d, i) => <path key={i} d={d} stroke="currentColor" strokeWidth=".85" opacity={depthOpacity(i)} />)}
      </svg>
    </div>
    {!reduced && (controlsTargetId ? controlsTarget && createPortal(motionButton, controlsTarget) : motionButton)}
  </>;
}
