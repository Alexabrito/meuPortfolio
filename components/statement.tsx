"use client";

import { useLocale } from "@/app/providers";
import { useInView } from "@/lib/use-in-view";

export function Statement() {
  const { t } = useLocale();
  const { ref: revealRef, visible } = useInView<HTMLDivElement>(0.15);

  return (
    <section
      id="manifesto"
      className="scroll-mt-28 border-b border-line/70 px-6 py-24 md:px-10 md:py-32 lg:py-40"
    >
      <div
        ref={revealRef}
        className={`surface-solid-card mx-auto max-w-6xl px-6 py-16 transition-all duration-1000 ease-out md:px-12 md:py-20 lg:px-16 lg:py-24 motion-reduce:transition-none ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
        }`}
      >
        <div
          className="statement-bg-shift pointer-events-none absolute -right-24 -top-24 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-accent/12 blur-3xl"
          aria-hidden
        />
        <div
          className="noise-overlay pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-[0.3] mix-blend-overlay dark:opacity-[0.18]"
          aria-hidden
        />

        <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            {t.statement.eyebrow}
          </p>

          <div className="mt-12 lg:mt-16 lg:flex lg:items-end lg:justify-between lg:gap-16">
            <h2 className="max-w-[22ch] font-sans text-[clamp(2.75rem,9vw,5.75rem)] font-semibold leading-[0.92] tracking-tight text-fg">
              <span className="statement-line block">{t.statement.line1}</span>
              <span className="statement-line statement-line-d1 mt-1 block text-accent">
                {t.statement.line2}
              </span>
              {t.statement.line3 ? (
                <span className="statement-line statement-line-d2 mt-1 block">
                  {t.statement.line3}
                </span>
              ) : null}
              {t.statement.line4 ? (
                <span className="statement-line statement-line-d3 mt-2 block text-accent">
                  {t.statement.line4}
                </span>
              ) : null}
            </h2>
            <p className="mt-10 max-w-lg text-pretty text-base leading-relaxed text-muted lg:mt-0 lg:max-w-md lg:pb-2 lg:text-right lg:text-[15px]">
              {t.statement.aside}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
