"use client";

import { useLocale } from "@/app/providers";
import { useInView } from "@/lib/use-in-view";
import type { SVGProps } from "react";

/* Ícones de traço para cada etapa (pesquisa, design, código). */
function IconResearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5M8 11h6M11 8v6" />
    </svg>
  );
}

function IconDesign(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function IconCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />
    </svg>
  );
}

/* `group` aponta para t.tech.groups (pesquisa, design, desenvolvimento); Design vem primeiro e em destaque. */
const layout = [
  { group: 1, Icon: IconDesign, featured: true, className: "sm:col-span-2 lg:col-span-7 lg:row-span-2" },
  { group: 0, Icon: IconResearch, featured: false, className: "lg:col-span-5" },
  { group: 2, Icon: IconCode, featured: false, className: "lg:col-span-5" },
];

export function TechStack() {
  const { t } = useLocale();
  const { ref: headRef, visible: headVis } = useInView<HTMLElement>(0.2);

  return (
    <section
      id="stack"
      className="scroll-mt-28 border-b border-line/70 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <header
          ref={headRef}
          className={`relative z-10 mb-12 max-w-2xl transition-all duration-700 ease-out motion-reduce:transition-none md:mb-16 ${
            headVis
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
          }`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            {t.tech.eyebrow}
          </p>
          <h2 className="mt-5 font-sans text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-fg">
            {t.tech.title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted md:text-lg">
            {t.tech.subtitle}
          </p>
        </header>

        <ul className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {layout.map(({ group, Icon, featured, className }, i) => {
            const g = t.tech.groups[group];
            return (
              <li key={g.title} className={className}>
                <article
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-bg/80 p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-500 ease-out before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/0 before:to-accent/[0.08] before:opacity-0 before:transition-opacity before:duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(37,99,235,0.28)] hover:before:opacity-100 motion-reduce:hover:translate-y-0 dark:bg-card/60 dark:hover:shadow-[0_28px_56px_-28px_rgba(96,165,250,0.15)] md:p-7 ${
                    featured
                      ? "animate-featured-glow min-h-[260px] border-accent/35 ring-1 ring-accent/20 hover:border-accent/45 lg:min-h-0 motion-reduce:animate-none"
                      : "min-h-[180px] border-line hover:border-accent/25"
                  }`}
                >
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] text-muted/70">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-2xl border border-line bg-card text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 ${
                        featured ? "h-14 w-14" : "h-12 w-12"
                      }`}
                    >
                      <Icon className={featured ? "h-7 w-7" : "h-6 w-6"} />
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <h3
                      className={`font-sans font-semibold tracking-tight text-fg ${
                        featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {g.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-prose leading-relaxed text-muted ${
                        featured ? "text-base md:text-[17px]" : "text-sm md:text-[15px]"
                      }`}
                    >
                      {g.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={g.title}>
                      {g.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-line bg-card px-3 py-1 text-[13px] text-fg transition-colors duration-300 group-hover:border-accent/25"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
