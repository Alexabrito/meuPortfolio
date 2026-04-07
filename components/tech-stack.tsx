"use client";

import { useLocale } from "@/app/providers";
import type { Messages } from "@/lib/i18n";
import { useInView } from "@/lib/use-in-view";
import {
  IconFigma,
  IconGitHub,
  IconNext,
  IconReact,
  IconTailwind,
  IconTS,
} from "@/components/tech-icons";

type TechKey = keyof Messages["tech"]["blurbs"];

const stack: {
  key: TechKey;
  name: string;
  Icon: typeof IconReact;
  featured?: boolean;
  layout: string;
}[] = [
  {
    key: "figma",
    name: "Figma",
    Icon: IconFigma,
    featured: true,
    layout:
      "sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:row-start-1 lg:col-start-1",
  },
  {
    key: "react",
    name: "React",
    Icon: IconReact,
    layout: "lg:col-span-6 lg:row-start-1 lg:col-start-7",
  },
  {
    key: "next",
    name: "Next.js",
    Icon: IconNext,
    layout: "lg:col-span-6 lg:row-start-2 lg:col-start-7",
  },
  {
    key: "ts",
    name: "TypeScript",
    Icon: IconTS,
    layout: "lg:col-span-8 lg:row-start-3 lg:col-start-1",
  },
  {
    key: "tailwind",
    name: "Tailwind CSS",
    Icon: IconTailwind,
    layout: "lg:col-span-4 lg:row-start-3 lg:col-start-9",
  },
  {
    key: "git",
    name: "Git / GitHub",
    Icon: IconGitHub,
    layout: "lg:col-span-12 lg:row-start-4 lg:col-start-1",
  },
];

export function TechStack() {
  const { t } = useLocale();
  const { ref: headRef, visible: headVis } = useInView<HTMLElement>(0.2);

  return (
    <section
      id="stack"
      className="scroll-mt-28 border-b border-line/70 px-6 py-24 md:px-10 md:py-32 lg:py-40"
    >
      <div className="relative mx-auto max-w-6xl">
        <header
          ref={headRef}
          className={`relative z-10 mb-14 max-w-2xl transition-all duration-700 ease-out motion-reduce:transition-none md:mb-20 ${
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
          {stack.map(({ key, name, Icon, featured, layout }, i) => {
            const blurb = t.tech.blurbs[key];
            return (
              <li key={key} className={layout}>
                <article
                  className={`group relative flex h-full min-h-[168px] flex-col justify-between overflow-hidden rounded-2xl border bg-bg/80 p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-500 ease-out before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/0 before:to-accent/[0.08] before:opacity-0 before:transition-opacity before:duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_28px_56px_-28px_rgba(37,99,235,0.28)] group-hover:before:opacity-100 motion-reduce:group-hover:translate-y-0 dark:bg-card/60 dark:group-hover:shadow-[0_28px_56px_-28px_rgba(96,165,250,0.15)] md:min-h-[180px] md:p-7 lg:min-h-0 ${
                    featured
                      ? "animate-featured-glow min-h-[220px] border-accent/35 ring-1 ring-accent/20 group-hover:border-accent/45 md:min-h-[260px] lg:min-h-[320px] motion-reduce:animate-none"
                      : "border-line group-hover:border-accent/25"
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
                      <Icon
                        className={featured ? "h-8 w-8" : "h-6 w-6"}
                        aria-hidden
                      />
                    </span>
                  </div>
                  <div className="relative mt-6">
                    <h3
                      className={`font-sans font-semibold tracking-tight text-fg ${
                        featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {name}
                    </h3>
                    <p
                      className={`mt-3 max-w-prose leading-relaxed text-muted ${
                        featured ? "text-base md:text-[17px]" : "text-sm md:text-[15px]"
                      }`}
                    >
                      {blurb}
                    </p>
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
