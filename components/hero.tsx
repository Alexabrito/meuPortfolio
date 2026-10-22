"use client";

import { useLocale } from "@/app/providers";
import { Fragment, useEffect, useRef, type ReactNode } from "react";

/** Palavras que sobem por trás de uma máscara, com atraso escalonado. */
function Words({ text, start }: { text: string; start: number }) {
  return (
    <>
      {text
        .split(" ")
        .filter(Boolean)
        .map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="hero-word-mask">
              <span className="hero-word" style={{ animationDelay: `${start + i * 80}ms` }}>
                {w}
              </span>
            </span>{" "}
          </Fragment>
        ))}
    </>
  );
}

/** Letras que entram em foco saindo de um desfoque, uma a uma. */
function Chars({ text, start }: { text: string; start: number }) {
  let n = 0;
  return (
    <>
      {text.split(" ").map((word, wi, arr) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => (
              <span key={ci} className="hero-char" style={{ animationDelay: `${start + n++ * 32}ms` }}>
                {ch}
              </span>
            ))}
          </span>
          {wi < arr.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Botão “magnético”: acompanha levemente o cursor e volta ao sair. */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);
  return (
    <span ref={ref} className="inline-flex transition-transform duration-300 ease-out">
      {children}
    </span>
  );
}

export function Hero() {
  const { t, locale } = useLocale();
  const accent = `${t.hero.highlight}${t.hero.line2}`;
  const firstCount = t.hero.line1.trim().split(" ").length;
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax leve: o conteúdo sobe e esmaece um pouco conforme a página rola.
  useEffect(() => {
    const el = contentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 700);
      el.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      el.style.opacity = String(1 - y / 900);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative scroll-mt-28 overflow-hidden border-b border-line/70 px-6 pb-28 pt-36 md:px-10 md:pb-36 md:pt-44 lg:pb-44 lg:pt-52"
    >
      <div className="hero-grain pointer-events-none absolute inset-[-100%] opacity-[0.22] mix-blend-overlay dark:opacity-[0.14]" aria-hidden />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-6xl will-change-transform">
        <p className="hero-fade-early mb-8 flex max-w-xl items-center gap-2.5 text-sm text-muted md:mb-10">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          {t.hero.kicker}
        </p>
        {/* key: refaz a animação ao trocar o idioma */}
        <h1
          key={locale}
          className="max-w-[min(100%,44rem)] text-balance font-sans text-[clamp(2.35rem,5.8vw,5rem)] font-semibold leading-[1.04] tracking-tight text-fg md:max-w-5xl lg:leading-[1]"
        >
          <span className="sr-only">
            {t.hero.line1}
            {accent}
          </span>
          <span aria-hidden>
            <span className="block">
              <Words text={t.hero.line1} start={100} />
            </span>
            <span className="block text-accent">
              <Chars text={accent} start={100 + firstCount * 80 + 120} />
            </span>
          </span>
        </h1>
        <p className="hero-fade mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:mt-14 md:text-xl md:leading-relaxed lg:max-w-xl lg:text-[1.35rem] lg:leading-snug">
          {t.hero.body}
        </p>
        <div className="hero-fade hero-fade-late mt-14 flex flex-wrap gap-4 md:mt-16">
          <Magnetic>
            <a
              href="#projetos"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-fg px-8 py-3.5 text-sm font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]"
            >
              {t.hero.ctaProjects}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full border border-line px-8 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t.hero.ctaContact}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
