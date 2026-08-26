import { useEffect, useRef } from "react";

interface AuroraBlob {
  /** Base position, in percent of the container. */
  baseX: number;
  baseY: number;
  /** Diameter in px (desktop baseline; scaled down on mobile). */
  size: number;
  color: string;
  /** Parallax depth: 0 = far/slow, 1 = near/fast. */
  depth: number;
  /** Idle drift amplitude in px and period in seconds. */
  driftX: number;
  driftY: number;
  period: number;
  phase: number;
}

// Purple, blue, cyan, emerald, subtle pink -- large, soft, layered at different depths
// so they drift at different speeds (parallax) and react to the cursor by different amounts.
const BLOBS: AuroraBlob[] = [
  { baseX: 18, baseY: 22, size: 620, color: "147, 51, 234", depth: 0.25, driftX: 40, driftY: 30, period: 22, phase: 0 },
  { baseX: 80, baseY: 18, size: 560, color: "37, 99, 235", depth: 0.45, driftX: 34, driftY: 26, period: 18, phase: 2.1 },
  { baseX: 50, baseY: 78, size: 680, color: "34, 211, 238", depth: 0.65, driftX: 30, driftY: 36, period: 26, phase: 4.4 },
  { baseX: 86, baseY: 72, size: 520, color: "16, 185, 129", depth: 0.4, driftX: 26, driftY: 22, period: 20, phase: 1.3 },
  { baseX: 32, baseY: 58, size: 420, color: "236, 72, 153", depth: 0.55, driftX: 22, driftY: 18, period: 16, phase: 3.2 },
];

/**
 * Premium interactive aurora-gradient background. Self-contained (React + CSS + a
 * small Canvas grain layer only -- no animation library) so it can be dropped behind
 * any section. Blobs drift continuously via a single shared requestAnimationFrame
 * loop (direct style mutation, not React state, so it never triggers re-renders) and
 * brighten/expand near a spring-eased cursor position. Fully inert -- pointer-events
 * are disabled on every visual layer -- and respects prefers-reduced-motion / touch.
 */
export default function InteractiveAuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const isNarrow = window.innerWidth < 640;

    // Fewer/smaller layers on mobile: lighter blur + fewer simultaneously-active blobs.
    const activeBlobs = isTouch ? BLOBS.slice(0, 3) : BLOBS;

    // Static, fully-painted fallback: no rAF loop, no listeners, nothing to clean up.
    if (reducedMotion) {
      blobRefs.current.forEach((el, i) => {
        const blob = activeBlobs[i];
        if (!el || !blob) return;
        el.style.left = `${blob.baseX}%`;
        el.style.top = `${blob.baseY}%`;
        el.style.opacity = "0.55";
      });
      return;
    }

    let rafId = 0;
    let cancelled = false;
    let time = 0;
    let lastTs = performance.now();

    // Spring-eased cursor position (lerp toward target each frame -- cheap, dependency-free).
    const pointer = { targetX: 50, targetY: 50, x: 50, y: 50, active: false };
    const rect = { w: container.clientWidth || 1, h: container.clientHeight || 1 };

    const handlePointerMove = (e: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.targetX = ((e.clientX - bounds.left) / bounds.width) * 100;
      pointer.targetY = ((e.clientY - bounds.top) / bounds.height) * 100;
      pointer.active = true;
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };
    const handleResize = () => {
      rect.w = container.clientWidth || 1;
      rect.h = container.clientHeight || 1;
      sizeCanvas();
    };

    if (!isTouch) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }
    window.addEventListener("resize", handleResize);

    // --- Grain/noise canvas: small internal resolution, CSS-scaled up (cheap + soft),
    // redrawn only every few frames for a subtle "film flicker" rather than every frame.
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true }) ?? null;
    const GRAIN_RES = isNarrow ? 96 : 160;

    function sizeCanvas() {
      if (!canvas) return;
      canvas.width = GRAIN_RES;
      canvas.height = GRAIN_RES;
    }
    sizeCanvas();

    function drawGrain() {
      if (!ctx || !canvas) return;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.random() * 18; // very low alpha -- subtle
      }
      ctx.putImageData(imageData, 0, 0);
    }
    drawGrain();

    let frame = 0;
    const GRAIN_INTERVAL = 6; // redraw grain every N frames, not every frame

    const tick = (ts: number) => {
      if (cancelled) return;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      time += dt;

      // Spring easing toward the pointer target.
      pointer.x += (pointer.targetX - pointer.x) * 0.07;
      pointer.y += (pointer.targetY - pointer.y) * 0.07;

      activeBlobs.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;

        // Continuous slow drift, unique per blob (different period/phase/depth).
        const driftX = Math.sin(time * (Math.PI * 2) / blob.period + blob.phase) * blob.driftX * blob.depth;
        const driftY = Math.cos(time * (Math.PI * 2) / (blob.period * 1.3) + blob.phase) * blob.driftY * blob.depth;

        // Distance from this blob's current position to the eased cursor -- nearby
        // blobs brighten and expand slightly, with smooth falloff.
        let boost = 0;
        if (pointer.active) {
          const bx = (blob.baseX / 100) * rect.w + driftX;
          const by = (blob.baseY / 100) * rect.h + driftY;
          const px = (pointer.x / 100) * rect.w;
          const py = (pointer.y / 100) * rect.h;
          const dist = Math.hypot(bx - px, by - py);
          const radius = Math.max(rect.w, rect.h) * 0.35;
          boost = Math.max(0, 1 - dist / radius);
        }

        const scale = 1 + boost * 0.18 * (0.5 + blob.depth);
        const opacity = 0.4 + boost * 0.35;

        el.style.transform = `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      // Cursor bloom/glow.
      const glow = glowRef.current;
      if (glow) {
        if (pointer.active) {
          glow.style.opacity = "1";
          glow.style.transform = `translate3d(${(pointer.x / 100) * rect.w}px, ${(pointer.y / 100) * rect.h}px, 0) translate(-50%, -50%)`;
        } else {
          glow.style.opacity = "0";
        }
      }

      frame++;
      if (frame % GRAIN_INTERVAL === 0) drawGrain();

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="aurora-bg absolute inset-0 overflow-hidden pointer-events-none"
      style={{ willChange: "transform" }}
    >
      {/* Dark elegant base */}
      <div className="absolute inset-0 bg-[#05050b]" />

      {/* Blurred gradient blobs -- transform/opacity only, GPU-composited */}
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el;
          }}
          className="aurora-blob absolute rounded-full"
          style={{
            left: `${blob.baseX}%`,
            top: `${blob.baseY}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            marginLeft: `-${blob.size / 2}px`,
            marginTop: `-${blob.size / 2}px`,
            background: `radial-gradient(circle, rgba(${blob.color}, 0.55) 0%, rgba(${blob.color}, 0.18) 45%, transparent 72%)`,
            opacity: 0.4,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Soft radial glow + bloom that follows the cursor */}
      <div
        ref={glowRef}
        className="aurora-cursor-glow absolute left-0 top-0 w-[420px] h-[420px] rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(147,197,253,0.10) 40%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />

      {/* Readability scrim: darker toward center where the Hero content sits */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(3,3,8,0.55)_0%,rgba(3,3,8,0.15)_60%,transparent_85%)]" />

      {/* Subtle animated grain */}
      <canvas ref={canvasRef} className="aurora-grain absolute inset-0 w-full h-full" />
    </div>
  );
}
