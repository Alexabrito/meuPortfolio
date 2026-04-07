'use client';

import { useLocale } from '@/app/providers';
import { type ProjectId, projectsMedia } from '@/lib/i18n';
import {
  IconCss,
  IconFigma,
  IconHtml,
  IconNext,
  IconReact,
} from '@/components/tech-icons';
import { useInView } from '@/lib/use-in-view';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from 'react';

const ORDER: ProjectId[] = ['idwall', 'idsummit', 'cacau'];

const techByProject: Record<
  ProjectId,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }[]
> = {
  idwall: [
    { Icon: IconFigma, label: 'Figma' },
    { Icon: IconNext, label: 'Next.js' },
    { Icon: IconReact, label: 'React' },
  ],
  idsummit: [
    { Icon: IconFigma, label: 'Figma' },
    { Icon: IconCss, label: 'CSS' },
    { Icon: IconHtml, label: 'HTML' },
  ],
  cacau: [{ Icon: IconFigma, label: 'Figma' }],
};

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

function ProjectModal({
  id,
  open,
  onClose,
}: {
  id: ProjectId | null;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!open || !id) return;
    setSlide(projectsMedia[id].coverIndex);
  }, [open, id]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !id) return null;

  const data = t.projectsData[id];
  const media = projectsMedia[id];
  const tech = techByProject[id];
  const { images } = media;
  const mainSrc = images[slide] ?? images[media.coverIndex] ?? '';
  const thumbCols =
    images.length <= 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={t.projects.modalClose}
        className="absolute inset-0 bg-fg/50 backdrop-blur-[10px] transition-opacity motion-reduce:backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[91] max-h-[min(92vh,900px)] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-line bg-card shadow-2xl animate-modal-in motion-reduce:animate-none"
      >
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="relative border-b border-line lg:border-b-0 lg:border-r lg:border-line/80">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden bg-line/30 lg:aspect-auto lg:min-h-[320px] lg:max-h-[48vh]"
              aria-live="polite"
              aria-atomic="true"
            >
              <Image
                src={mainSrc}
                alt=""
                fill
                className="object-cover transition-opacity duration-300 motion-reduce:transition-none"
                sizes="(min-width: 1024px) 50vw, 100vw"
                unoptimized
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fg/50 via-transparent to-transparent opacity-80 lg:opacity-60" />
            </div>
            {images.length > 1 ? (
              <div
                className={`grid gap-1.5 p-3 sm:gap-2 sm:p-4 ${thumbCols}`}
                role="tablist"
                aria-label={t.projects.galleryLabel}
              >
                {images.map((src, i) => (
                  <button
                    key={`${id}-carousel-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={slide === i}
                    aria-label={`${i + 1} / ${images.length}`}
                    onClick={() => setSlide(i)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-line/20 text-left ring-offset-2 ring-offset-card transition-[transform,box-shadow] duration-300 motion-reduce:transition-none ${
                      slide === i
                        ? 'z-[1] ring-2 ring-accent shadow-md'
                        : 'ring-0 opacity-90 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className={`object-cover transition-transform duration-500 motion-reduce:transition-none ${
                        slide === i ? '' : 'hover:scale-[1.03] motion-reduce:hover:scale-100'
                      }`}
                      sizes="(min-width: 1024px) 16vw, 33vw"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:py-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                  {t.projects.galleryLabel}
                </p>
                <h2
                  id={titleId}
                  className="mt-3 max-w-[20ch] text-balance font-sans text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-4xl"
                >
                  {data.title}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                {t.projects.modalCloseUi}
              </button>
            </div>

            <p className="max-w-prose text-base leading-relaxed text-muted sm:text-[17px]">
              {data.description}
            </p>

            <a
              href={data.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-fg bg-fg px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none"
            >
              {data.linkLabel}
              <span aria-hidden>↗</span>
            </a>

            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
              <span className="sr-only">Stack</span>
              {tech.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line text-muted transition-[color,border-color] duration-300 hover:border-accent/40 hover:text-accent"
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useLocale();
  const { ref: headRef, visible: headVis } = useInView<HTMLElement>(0.15);
  const [active, setActive] = useState<ProjectId | null>(null);
  const [cursorById, setCursorById] = useState<
    Record<ProjectId, { x: number; y: number; on: boolean }>
  >(() =>
    ORDER.reduce(
      (acc, id) => {
        acc[id] = { x: 50, y: 50, on: false };
        return acc;
      },
      {} as Record<ProjectId, { x: number; y: number; on: boolean }>,
    ),
  );

  const updateCursor = useCallback(
    (id: ProjectId, e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      setCursorById((prev) => ({
        ...prev,
        [id]: {
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          on: true,
        },
      }));
    },
    [],
  );

  const hideCursor = useCallback((id: ProjectId) => {
    setCursorById((prev) => ({
      ...prev,
      [id]: { ...prev[id], on: false },
    }));
  }, []);

  return (
    <section
      id="projetos"
      className="relative scroll-mt-28 border-b border-line/70 px-6 py-24 md:px-10 md:py-32 lg:py-40"
    >
      <div
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay dark:opacity-[0.06]"
        aria-hidden
      />

      <ProjectModal
        id={active}
        open={active !== null}
        onClose={() => setActive(null)}
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
              <span className="mt-1 block text-muted/90">
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

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          {ORDER.map((id, index) => {
            const data = t.projectsData[id];
            const media = projectsMedia[id];
            const c = cursorById[id];
            const isFeatured = index === 0;

            const gridClass = isFeatured
              ? 'lg:col-span-7 lg:row-span-2 min-h-[min(68vh,520px)]'
              : index === 1
                ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1 min-h-[240px] sm:min-h-[280px]'
                : 'lg:col-span-5 lg:col-start-8 lg:row-start-2 min-h-[240px] sm:min-h-[280px]';

            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                onMouseMove={(e) => updateCursor(id, e)}
                onMouseLeave={() => hideCursor(id)}
                className={`group relative w-full overflow-hidden rounded-[1.35rem] border border-line bg-card text-left shadow-sm ring-0 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_28px_64px_-28px_rgba(37,99,235,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none dark:hover:shadow-[0_28px_64px_-28px_rgba(96,165,250,0.22)] ${gridClass}`}
              >
                <span className="sr-only">
                  {data.title}. {t.projects.seeMore}
                </span>
                <div className="absolute inset-0">
                  <Image
                    src={media.images[media.coverIndex]}
                    alt=""
                    fill
                    className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-fg/85 via-fg/35 to-fg/10 transition-opacity duration-500 group-hover:from-fg/90"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.88) 100%)',
                    }}
                  />
                </div>

                <ProjectCursorLabel
                  label={t.projects.seeMore}
                  x={c.x}
                  y={c.y}
                  visible={c.on}
                />

                <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-8">
                  <ul className="mb-4 flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h3 className="max-w-[16ch] font-sans text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:max-w-[20ch]">
                    {data.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/75 line-clamp-3 sm:line-clamp-none sm:max-w-md">
                    {data.short}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
