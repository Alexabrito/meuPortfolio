"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Deslocamento vertical suave baseado na posição do elemento na viewport.
 * Respeita prefers-reduced-motion.
 */
export function useParallaxOffset(strength = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) return;

    const update = () => {
      raf.current = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const norm = (center - vh / 2) / vh;
      setOffset(norm * strength * 160);
    };

    const onScroll = () => {
      if (raf.current !== 0) return;
      raf.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return { ref, offset };
}
