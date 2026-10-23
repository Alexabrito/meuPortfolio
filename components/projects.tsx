'use client';

import { useLocale } from '@/app/providers';
import { CaseCover } from '@/components/case/case-cover';
import { caseStudies, type CaseSlug, type CaseStudy, tx } from '@/lib/case-studies';
import { useInView } from '@/lib/use-in-view';
import Link from 'next/link';
import { useCallback, useState } from 'react';

/*
 * Pares alternados 7/5 → 5/7 → 7/5 no grid de 12 colunas.
 * As imagens de cada linha têm a mesma altura, então tudo alinha.
 */
const SLOTS = [
  { wide: true, className: 'lg:col-span-7' },
  { wide: false, className: 'lg:col-span-5' },
  { wide: false, className: 'lg:col-span-5' },
  { wide: true, className: 'lg:col-span-7' },
];

type Cursor = { x: number; y: number; on: boolean };

function ProjectCursorLabel({
  label,
  x,
  y,
  visible,
}: {
  label: string;
  x: number;
  y: number;
  visible: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-20 transition-[opacity,transform] duration-150 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span className="inline-flex items-center rounded-full border-2 border-[#0a0a0a] bg-white px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0a0a0a] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.9)] ring-2 ring-white/90 dark:border-white dark:bg-[#f8fafc] dark:text-[#0a0a0a] dark:shadow-[0_8px_40px_rgba(0,0,0,0.65),0_0_0_2px_rgba(255,255,255,0.25)]">
        {label}
      </span>
    </span>
  );
}

function ProjectCard({
  study,
  className,
  cursor,
  onMove,
  onLeave,
  sizes,
}: {
  study: CaseStudy;
  className: string;
  cursor: Cursor;
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
  sizes: string;
}) {
  const { t, locale } = useLocale();
  const title = tx(study.title, locale);

  return (
    <Link
      href={`/projetos/${study.slug}`}
      className={`group flex flex-col rounded-[1.75rem] border border-line bg-card p-2.5 text-left transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_32px_64px_-36px_rgba(37,99,235,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:hover:translate-y-0 dark:hover:shadow-[0_32px_64px_-36px_rgba(96,165,250,0.25)] ${className}`}
    >
      <span className="sr-only">
        {title}. {t.projects.seeMore}
      </span>
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-bg lg:aspect-auto lg:h-[420px]"
      >
        <CaseCover
          study={study}
          sizes={sizes}
          className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <ProjectCursorLabel label={t.projects.seeMore} x={cursor.x} y={cursor.y} visible={cursor.on} />
      </div>

      {/* Texto e ação dentro do mesmo card, com respiro e um rodapé separado */}
      <div className="flex flex-1 flex-col px-4 pb-3 pt-7 sm:px-5">
        <p className="text-sm text-muted">{tx(study.category, locale)}</p>
        <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-fg md:text-2xl">{title}</h3>
        <p className="mb-8 mt-3 line-clamp-2 max-w-md text-[15px] leading-relaxed text-muted">{tx(study.short, locale)}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm font-medium text-fg">{t.projects.seeMore}</span>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 group-hover:-rotate-45 group-hover:border-fg group-hover:bg-fg group-hover:text-bg"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Projects() {
  const { t } = useLocale();
  const { ref: headRef, visible: headVis } = useInView<HTMLElement>(0.15);
  const [cursorById, setCursorById] = useState<Record<string, Cursor>>({});

  const updateCursor = useCallback((id: CaseSlug, e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCursorById((prev) => ({
      ...prev,
      [id]: {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
        on: true,
      },
    }));
  }, []);

  const hideCursor = useCallback((id: CaseSlug) => {
    setCursorById((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { x: 50, y: 50 }), on: false },
    }));
  }, []);

  const cardProps = (study: CaseStudy) => ({
    study,
    cursor: cursorById[study.slug] ?? { x: 50, y: 50, on: false },
    onMove: (e: React.MouseEvent<HTMLDivElement>) => updateCursor(study.slug, e),
    onLeave: () => hideCursor(study.slug),
  });

  return (
    <section
      id="projetos"
      className="relative scroll-mt-28 border-b border-line/70 px-6 py-24 md:px-10 md:py-32 lg:py-40"
    >
      <div
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay dark:opacity-[0.06]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header
          ref={headRef}
          className={`mb-16 transition-all duration-700 ease-out motion-reduce:transition-none md:mb-24 lg:mb-28 lg:flex lg:items-end lg:justify-between lg:gap-12 ${
            headVis
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
          }`}
        >
          <div className="max-w-xl lg:max-w-none lg:flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">
              {t.projects.sectionEyebrow}
            </p>
            <h2 className="mt-4 font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-fg">
              <span className="block">{t.projects.titleLine1}</span>
              <span className="mt-1 block text-accent">
                {t.projects.titleLine2}
              </span>
              {t.projects.titleAccent ? (
                <span className="mt-2 block text-muted/90">
                  — {t.projects.titleAccent}
                </span>
              ) : null}
            </h2>
          </div>
          <p className="mt-10 max-w-md text-pretty text-base leading-relaxed text-muted lg:mt-0 lg:max-w-sm lg:text-right lg:text-lg">
            {t.projects.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {caseStudies.map((study, index) => {
            const slot = SLOTS[index % SLOTS.length];
            return (
              <ProjectCard
                key={study.slug}
                {...cardProps(study)}
                className={slot.className}
                sizes={slot.wide ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
