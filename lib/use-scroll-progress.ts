"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progresso 0→1 de um elemento atravessando a viewport.
 * 0 quando o topo está em `start` (fração da altura da tela), 1 quando chega em `end`.
 * Com prefers-reduced-motion, devolve 1 direto.
 */
export function useScrollProgress<T extends HTMLElement>(start = 1, end = 0.3) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = (vh * start - top) / (vh * (start - end));
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [start, end]);

  return { ref, progress };
}
