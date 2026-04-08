"use client";

import { useLocale } from "@/app/providers";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="inicio"
      className="relative scroll-mt-28 overflow-hidden border-b border-line/70 px-6 pb-28 pt-36 md:px-10 md:pb-36 md:pt-44 lg:pb-44 lg:pt-52"
    >
      <div
        className="blob-drift pointer-events-none absolute -left-[20%] top-[8%] h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full bg-accent/20 blur-[100px] dark:bg-accent/15"
        aria-hidden
      />
      <div
        className="blob-drift-alt pointer-events-none absolute -right-[15%] bottom-[-10%] h-[min(70vw,440px)] w-[min(70vw,440px)] rounded-full bg-fg/[0.06] blur-[90px] dark:bg-white/[0.08]"
        aria-hidden
      />
      <div
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay dark:opacity-[0.18]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="hero-kicker mb-8 max-w-xl font-mono text-[10px] uppercase tracking-[0.32em] text-muted md:mb-10">
          {t.hero.kicker}
        </p>
        <h1 className="max-w-[min(100%,44rem)] text-balance font-sans text-[clamp(2.35rem,5.8vw,5rem)] font-semibold leading-[1.02] tracking-tight text-fg md:max-w-5xl lg:leading-[0.98]">
          <span className="hero-line block">{t.hero.line1}</span>
          <span className="hero-line hero-line-delay mt-1 block md:mt-0 md:inline">
            <span className="text-accent">
              {t.hero.highlight}
              {t.hero.line2}
            </span>
          </span>
        </h1>
        <p className="mt-12 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:mt-14 md:text-xl md:leading-relaxed lg:max-w-xl lg:text-[1.35rem] lg:leading-snug">
          {t.hero.body}
        </p>
        <div className="mt-14 flex flex-wrap gap-4 md:mt-16">
          <a
            href="#projetos"
            className="inline-flex items-center justify-center rounded-full bg-fg px-8 py-3.5 text-sm font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.hero.ctaProjects}
          </a>
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full border border-line px-8 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {t.hero.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}
