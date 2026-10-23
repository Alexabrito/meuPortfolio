'use client';

import { useLocale } from '@/app/providers';
import {
  bestOn,
  caseStudies,
  contrastRatio,
  type CaseStudy,
  type Swatch,
  type TypeStyle,
  tx,
} from '@/lib/case-studies';
import { useInView } from '@/lib/use-in-view';
import { useScrollProgress } from '@/lib/use-scroll-progress';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CaseCover } from './case-cover';
import { Artboard, dsVars } from './ds-kit';
import { SignatureComponents } from './signatures';

/* ------------------------------------------------------------------ */
/* Movimento                                                           */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Texto que “acende” palavra por palavra conforme a página rola. */
function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const { ref, progress } = useScrollProgress<HTMLParagraphElement>(0.85, 0.35);
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="transition-opacity duration-300"
          style={{ opacity: progress * words.length > i ? 1 : 0.16 }}
        >
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

/** Conta até o número quando entra na tela (mantém prefixo/sufixo: “100%”, “3 min”). */
function CountUp({ value }: { value: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  const match = /^(\d+)(.*)$/.exec(value);
  const animatable = match && !/[/:]/.test(value);
  const target = animatable ? Number(match[1]) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible || !animatable) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      setN(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, animatable, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {animatable ? `${n}${match[2]}` : value}
    </span>
  );
}

/** Imagem que “abre” de dentro para fora ao entrar na tela. */
function ClipReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`clip-reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

function Lightbox({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  const { t } = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!src) return;
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-modal-in motion-reduce:animate-none sm:p-10"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
      >
        {t.caseStudy.closeImage} ✕
      </button>
      <div className="relative h-full w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <Image src={src} alt={alt} fill unoptimized className="object-contain" sizes="100vw" />
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Design system — conteúdo das abas                                   */
/* ------------------------------------------------------------------ */

function PanelHeading({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
      <h3 className="font-sans text-xl font-semibold tracking-tight text-fg md:text-2xl">{children}</h3>
      {aside}
    </div>
  );
}

/*
 * Contraste conforme WCAG 2.2 (mesma fórmula do WebAIM Contrast Checker).
 * Texto normal: AA ≥ 4,5:1, AAA ≥ 7:1. Texto grande (≥ 24px, ou ≥ 18,66px em negrito): AA ≥ 3:1, AAA ≥ 4,5:1.
 * A razão é truncada (não arredondada) em 2 casas, para nunca aparentar um nível que a cor não atinge.
 */
function contrastLevels(ratio: number) {
  return {
    normal: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : null,
    large: ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : null,
  };
}

function formatRatio(ratio: number, locale: string) {
  const v = Math.floor(ratio * 100) / 100;
  return `${v.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}:1`;
}

function LevelChip({ label, level }: { label: string; level: string | null }) {
  const { t } = useLocale();
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] ${
        level ? 'bg-fg/[0.06] text-fg' : 'text-muted line-through decoration-muted/60'
      }`}
    >
      {label} {level ? `${level} ✓` : `${t.caseStudy.contrastFail} ✗`}
    </span>
  );
}

function ContrastRow({ hex, on, label }: { hex: string; on: '#FFFFFF' | '#000000'; label: string }) {
  const { t, locale } = useLocale();
  const ratio = contrastRatio(hex, on);
  const lv = contrastLevels(ratio);
  return (
    <span className="block">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-6 w-7 shrink-0 items-center justify-center rounded-md text-[12px] font-semibold ring-1 ring-line"
          style={{ background: hex, color: on }}
        >
          Aa
        </span>
        <span className="text-xs text-muted">{label}</span>
        <span className="ml-auto font-mono text-xs font-semibold tabular-nums text-fg">{formatRatio(ratio, locale)}</span>
      </span>
      <span className="mt-1.5 flex flex-wrap gap-1">
        <LevelChip label={t.caseStudy.contrastNormalShort} level={lv.normal} />
        <LevelChip label={t.caseStudy.contrastLargeShort} level={lv.large} />
      </span>
    </span>
  );
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  const { t, locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const best = bestOn(swatch.hex);

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <button
        type="button"
        title={t.caseStudy.copyHint}
        onClick={() => {
          navigator.clipboard?.writeText(swatch.hex).then(
            () => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            },
            () => {},
          );
        }}
        className="flex h-24 items-end p-3 text-left font-mono text-[12px] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        style={{ background: swatch.hex, color: best.fg, boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)' }}
      >
        {copied ? t.caseStudy.copied : swatch.hex.toUpperCase()}
      </button>
      {/* Alturas fixas: cards do mesmo conjunto sempre alinhados, independente do texto */}
      <div className="flex h-[5.75rem] flex-col p-3.5 pb-2">
        <span className="block truncate text-sm font-semibold text-fg">{tx(swatch.name, locale)}</span>
        <span className="mt-1 block truncate font-mono text-[10px] leading-snug text-accent" title={swatch.token}>
          {swatch.token}
        </span>
        {swatch.usage ? <span className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted">{tx(swatch.usage, locale)}</span> : null}
      </div>
      <div className="space-y-3 border-t border-line p-3.5" aria-label={`${t.caseStudy.contrast} ${swatch.hex}`}>
        <ContrastRow hex={swatch.hex} on="#FFFFFF" label={t.caseStudy.contrastOnWhite} />
        <ContrastRow hex={swatch.hex} on="#000000" label={t.caseStudy.contrastOnBlack} />
      </div>
    </li>
  );
}

function typeFont(study: CaseStudy, s: TypeStyle) {
  const th = study.ds.theme;
  if (s.font === 'mono') return th.mono ?? th.font;
  if (s.font === 'heading') return th.heading;
  return th.font;
}

function TypeRow({ study, s }: { study: CaseStudy; s: TypeStyle }) {
  const { locale } = useLocale();
  const sample =
    s.size >= 24
      ? locale === 'pt'
        ? 'Design que gera confiança'
        : 'Design that builds trust'
      : locale === 'pt'
        ? 'Interfaces claras ajudam pessoas a decidir com segurança.'
        : 'Clear interfaces help people decide with confidence.';
  return (
    <li className="grid gap-3 border-b border-line py-5 md:grid-cols-[220px_1fr] md:items-center md:gap-8">
      <div>
        <p className="font-mono text-[10px] text-accent">{s.token}</p>
        <p className="mt-1 text-sm font-semibold text-fg">{s.label}</p>
        <p className="mt-1 font-mono text-[11px] text-muted">
          {s.size}px / {Math.round(s.size * s.lineHeight)}px · {s.weight}
          {s.tracking ? ` · ${s.tracking}px` : ''}
        </p>
      </div>
      {/* Tamanho real em qualquer tela: a amostra não encolhe; o excesso é cortado com esmaecimento */}
      <p
        className="min-w-0 overflow-hidden whitespace-nowrap text-fg [mask-image:linear-gradient(to_right,black_80%,transparent)] md:[mask-image:none] md:whitespace-normal"
        style={{
          fontFamily: typeFont(study, s),
          fontSize: `${s.size}px`,
          lineHeight: s.lineHeight,
          fontWeight: s.weight,
          letterSpacing: s.tracking ? `${s.tracking}px` : undefined,
          textTransform: s.upper ? 'uppercase' : undefined,
        }}
      >
        {sample}
      </p>
    </li>
  );
}

function PrinciplesPanel({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  return (
    <ol className="divide-y divide-line border-y border-line">
      {study.ds.principles.map((p, i) => (
        <li key={i} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-12 md:py-10">
          <p className="text-2xl font-semibold leading-tight tracking-tight text-fg md:text-3xl">{tx(p.title, locale)}</p>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">{tx(p.body, locale)}</p>
        </li>
      ))}
    </ol>
  );
}

function ColorsPanel({ study }: { study: CaseStudy }) {
  const { t, locale } = useLocale();
  return (
    <div className="space-y-14">
      {study.ds.colors.map((g) => (
        <div key={g.title.en}>
          <PanelHeading aside={<span className="text-xs text-muted">{t.caseStudy.copyHint}</span>}>{tx(g.title, locale)}</PanelHeading>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.swatches.map((s) => (
              <SwatchCard key={s.token + s.hex} swatch={s} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TypographyPanel({ study }: { study: CaseStudy }) {
  const { t, locale } = useLocale();
  const ds = study.ds;
  return (
    <div>
      <div className={`grid gap-5 ${ds.fonts.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {ds.fonts.map((f) => (
          <div key={f.family} className="relative overflow-hidden rounded-[1.5rem] border border-line bg-card p-7 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-sm text-muted">{tx(f.role, locale)}</p>
                <p className="mt-3 text-4xl tracking-tight text-fg md:text-5xl" style={{ fontFamily: f.stack, fontWeight: f.weights[1] ?? f.weights[0] }}>
                  {f.family}
                </p>
              </div>
              <p aria-hidden className="text-[clamp(5rem,12vw,9rem)] leading-[0.8] text-fg/90" style={{ fontFamily: f.stack, fontWeight: f.weights[f.weights.length - 1] }}>
                Aa
              </p>
            </div>
            <p className="mt-8 break-words text-lg tracking-wide text-muted" style={{ fontFamily: f.stack }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line pt-5">
              <span className="text-sm text-muted">{t.caseStudy.weights}</span>
              {f.weights.map((w) => (
                <span key={w} className="text-fg" style={{ fontFamily: f.stack, fontWeight: w }}>
                  {w}
                </span>
              ))}
            </div>
            {f.note ? <p className="mt-4 text-xs leading-relaxed text-muted">{tx(f.note, locale)}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-14">
        <PanelHeading>{t.caseStudy.typeScale}</PanelHeading>
        <ul>
          {ds.typeScale.map((s) => (
            <TypeRow key={s.token} study={study} s={s} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FoundationsPanel({ study }: { study: CaseStudy }) {
  const { t, locale } = useLocale();
  const ds = study.ds;

  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-12 [&>*]:min-w-0">
      <div>
        <PanelHeading>{t.caseStudy.spacing}</PanelHeading>
        <Artboard width={360}>
        <ul className="space-y-2.5">
          {ds.spacing.map((s, i) => (
            <li key={s.token} className="grid grid-cols-[88px_48px_1fr] items-center gap-3">
              <span className="truncate font-mono text-[11px] text-accent">{s.token}</span>
              <span className="font-mono text-[11px] text-muted">{s.px}px</span>
              <span
                className="bar-grow block h-3 max-w-full origin-left rounded-sm"
                style={{
                  width: `${s.px}px`,
                  background: ds.theme.primary,
                  animationDelay: `${i * 45}ms`,
                }}
              />
            </li>
          ))}
        </ul>
        </Artboard>
      </div>

      <div className="space-y-14">
        <div>
          <PanelHeading>{t.caseStudy.radii}</PanelHeading>
          <ul className="flex flex-wrap gap-5">
            {ds.radii.map((r) => (
              <li key={r.token} className="text-center">
                <span
                  className="block h-20 w-20 border-2"
                  style={{
                    borderRadius: Math.min(r.px, 40),
                    borderColor: ds.theme.primary,
                    background: `color-mix(in srgb, ${ds.theme.primary} 10%, transparent)`,
                  }}
                />
                <span className="mt-2 block font-mono text-[10px] text-accent">{r.token}</span>
                <span className="block font-mono text-[10px] text-muted">{r.px === 999 ? 'pill' : `${r.px}px`}</span>
              </li>
            ))}
          </ul>
        </div>
        {ds.elevation.length ? (
        <div>
          <PanelHeading>{t.caseStudy.elevation}</PanelHeading>
          <ul className="grid grid-cols-2 gap-5">
            {ds.elevation.map((e) => (
              <li key={e.token} className="rounded-2xl p-5" style={{ background: ds.theme.canvas }}>
                <span className="block h-16 rounded-xl" style={{ background: ds.theme.surface, boxShadow: e.value }} />
                <span className="mt-3 block font-mono text-[10px]" style={{ color: ds.theme.primary }}>
                  {e.token}
                </span>
              </li>
            ))}
          </ul>
        </div>
        ) : null}
      </div>

      <div className="lg:col-span-2">
        <PanelHeading>{t.caseStudy.grid}</PanelHeading>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {ds.grid.map((g) => (
            <figure key={g.label.en} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex h-28 gap-1.5 rounded-lg bg-bg p-2" aria-hidden>
                {Array.from({ length: g.columns }).map((_, i) => (
                  <span
                    key={i}
                    className="col-rise flex-1 origin-bottom rounded-sm"
                    style={{ background: `color-mix(in srgb, ${ds.theme.primary} 18%, transparent)`, animationDelay: `${i * 35}ms` }}
                  />
                ))}
              </div>
              <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                <span className="font-semibold text-fg">{tx(g.label, locale)}</span>
                <span>
                  {g.columns} {t.caseStudy.columns}
                </span>
                <span>
                  {t.caseStudy.gutter} {g.gutter}px
                </span>
                <span>
                  {t.caseStudy.margin} {g.margin}px
                </span>
                <span>
                  {t.caseStudy.container} {g.container}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentsPanel({ study }: { study: CaseStudy }) {
  const { t } = useLocale();
  return (
    <div>
      <p className="mb-8 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
        {study.kind === 'client' ? t.caseStudy.componentsBodyClient : t.caseStudy.componentsBodyAcademic}
      </p>
      <SignatureComponents slug={study.slug} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Abas do design system                                               */
/* ------------------------------------------------------------------ */

type TabId = 'principles' | 'colors' | 'typography' | 'foundations' | 'components';

function DsTabs({ study }: { study: CaseStudy }) {
  const { t } = useLocale();
  const c = t.caseStudy;
  const anchorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabs = useMemo(
    () =>
      [
        { id: 'principles', label: c.dsNav.principles },
        { id: 'colors', label: c.dsNav.colors },
        { id: 'typography', label: c.dsNav.typography },
        { id: 'foundations', label: c.dsNav.foundations },
        { id: 'components', label: c.dsNav.components },
      ] as { id: TabId; label: string }[],
    [c.dsNav],
  );
  const [active, setActive] = useState<TabId>('principles');

  const select = (id: TabId, focus = false) => {
    setActive(id);
    tabRefs.current[tabs.findIndex((x) => x.id === id)]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    if (focus) tabRefs.current[tabs.findIndex((x) => x.id === id)]?.focus();
    // Se a barra já está grudada no topo, volta para o início do conteúdo da aba.
    const top = anchorRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) {
      window.scrollTo({ top: window.scrollY + top - 80, behavior: 'smooth' });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((x) => x.id === active);
    const go = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (go === undefined) return;
    e.preventDefault();
    select(tabs[(go + tabs.length) % tabs.length].id, true);
  };

  return (
    <div ref={anchorRef}>
      <div className="sticky top-[4.5rem] z-30 -mx-6 mb-12 border-b border-line bg-card/95 px-6 backdrop-blur-xl md:top-[5rem] md:-mx-10 md:px-10">
        <div
          role="tablist"
          aria-label={c.dsTabsLabel}
          onKeyDown={onKeyDown}
          className="mx-auto flex max-w-6xl snap-x gap-6 overflow-x-auto pr-10 [mask-image:linear-gradient(to_right,black_80%,transparent)] [scrollbar-width:none] md:gap-9 md:pr-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                className={`relative shrink-0 snap-start whitespace-nowrap py-4 text-[15px] transition-colors focus-visible:outline-none focus-visible:after:bg-accent ${
                  selected ? 'font-medium text-fg' : 'text-muted hover:text-fg'
                } after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:rounded-full after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  selected ? 'after:scale-x-100 after:bg-fg' : 'after:scale-x-0 after:bg-fg'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="panel-in mx-auto min-h-[60vh] max-w-6xl focus-visible:outline-none"
        style={dsVars(study.ds.theme)}
      >
        {active === 'principles' && <PrinciplesPanel study={study} />}
        {active === 'colors' && <ColorsPanel study={study} />}
        {active === 'typography' && <TypographyPanel study={study} />}
        {active === 'foundations' && <FoundationsPanel study={study} />}
        {active === 'components' && <ComponentsPanel study={study} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

function CoverParallax({ study }: { study: CaseStudy }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(1, 0.15);
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[16/10] max-w-7xl overflow-hidden rounded-[1.75rem] border border-line bg-card will-change-transform md:aspect-[16/8]"
      style={{
        transform: `scale(${0.9 + progress * 0.1})`,
        borderRadius: `${40 - progress * 12}px`,
      }}
    >
      <div className="absolute inset-0" style={{ transform: `scale(${1.12 - progress * 0.12})` }}>
        <CaseCover study={study} priority sizes="(min-width: 1280px) 1280px, 100vw" />
      </div>
    </div>
  );
}

function ProcessLine({ study }: { study: CaseStudy }) {
  const { locale } = useLocale();
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.9, 0.45);
  const steps = study.process;
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" aria-hidden />
      <div
        className="absolute left-0 top-[7px] hidden h-px origin-left bg-fg md:block"
        style={{ width: '100%', transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
        {steps.map((p, i) => {
          const reached = progress * steps.length > i;
          return (
            <li key={i} className="relative pl-7 md:pl-0">
              <span
                className={`absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500 md:relative md:block ${
                  reached ? 'border-fg bg-fg' : 'border-line bg-bg'
                }`}
                aria-hidden
              />
              <p className="font-semibold text-fg md:mt-6">{tx(p.title, locale)}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{tx(p.body, locale)}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * Capítulo da página: divisor de largura total, respiro vertical constante
 * e título numa coluna fixa à esquerda (ou acima, nas seções largas).
 */
function Chapter({
  id,
  title,
  children,
  layout = 'side',
  raised = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  layout?: 'side' | 'stacked';
  raised?: boolean;
}) {
  return (
    <section aria-labelledby={id} className={`border-t border-line px-6 py-24 md:px-10 md:py-36 ${raised ? 'bg-card' : ''}`}>
      <div className={`mx-auto max-w-6xl ${layout === 'side' ? 'grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-20' : ''}`}>
        <h2
          id={id}
          className={
            layout === 'side'
              ? 'text-lg font-semibold tracking-tight text-fg lg:sticky lg:top-32 lg:self-start'
              : 'mb-12 text-lg font-semibold tracking-tight text-fg md:mb-16'
          }
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const c = t.caseStudy;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  if (!study) return null;

  const ds = study.ds;
  const L = (v: Parameters<typeof tx>[0]) => tx(v, locale);

  const meta = [
    { k: c.meta.role, v: L(study.role) },
    { k: c.meta.context, v: L(study.context) },
    { k: c.meta.tools, v: study.tools.join(', ') },
  ];

  return (
    <article className="relative">
      <Lightbox src={zoom?.src ?? null} alt={zoom?.alt ?? ''} onClose={() => setZoom(null)} />

      {/* Abertura */}
      <header className="relative px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center justify-between gap-4 text-sm" aria-label={c.back}>
            <Link href="/#projetos" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              {c.back}
            </Link>
            <Link href={`/projetos/${next.slug}`} className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <span className="hidden sm:inline">{c.nextShort}:</span> {L(next.title)}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </nav>

          <div className="mt-16 md:mt-24">
            <p className="hero-kicker flex flex-wrap items-center gap-3 text-sm text-muted">
              {L(study.category)}
              {study.kind === 'academic' ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent">{c.academicBadge}</span>
              ) : null}
            </p>
            <h1 className="hero-line mt-5 max-w-[16ch] text-balance font-sans text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-fg">
              {L(study.title)}
            </h1>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <p className="hero-line hero-line-delay max-w-2xl text-pretty text-xl leading-relaxed text-muted md:text-2xl">{L(study.short)}</p>
              {study.link ? (
                <a
                  href={study.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-line hero-line-delay group inline-flex w-fit items-center gap-3 justify-self-start rounded-full border border-fg bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transform-none lg:justify-self-end"
                >
                  {L(study.link.label)}
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Capa: cresce e “assenta” conforme o scroll */}
      <div className="px-4 md:px-10">
        <CoverParallax study={study} />
        {study.kind === 'academic' ? <p className="mx-auto mt-4 max-w-6xl text-sm text-muted">{c.academicNote}</p> : null}
      </div>

      {/* Ficha técnica: faixa própria, itens separados por fios */}
      <div className="px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-16">
        <dl className="mx-auto grid max-w-6xl divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {meta.map((m, i) => (
            <Reveal key={m.k} delay={i * 80} className="py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <dt className="text-sm text-muted">{m.k}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-fg">{m.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Visão geral */}
      <Chapter id="overview-title" title={c.overviewTitle}>
        <p className="text-sm font-medium text-muted">{c.problem}</p>
        <ScrollText
          text={L(study.overview.problem)}
          className="mt-5 text-pretty text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-[1.25] tracking-tight text-fg"
        />

        <div className="mt-20 grid gap-12 border-t border-line pt-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="text-xl font-semibold tracking-tight text-fg">{c.approach}</h3>
            <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted">{L(study.overview.approach)}</p>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="text-xl font-semibold tracking-tight text-fg">{c.outcome}</h3>
            <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted">{L(study.overview.outcome)}</p>
          </Reveal>
        </div>

        {study.metrics ? (
          <div className="mt-20 grid gap-10 border-t border-line pt-14 sm:grid-cols-3">
            {study.metrics.map((m, i) => (
              <Reveal key={m.value} delay={i * 100}>
                <p className="font-sans text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-none tracking-tight text-fg">
                  <CountUp value={m.value} />
                </p>
                <p className="mt-3 max-w-[22ch] text-[15px] text-muted">{L(m.label)}</p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Chapter>

      {/* Processo */}
      <Chapter id="process-title" title={c.processTitle}>
        <ProcessLine study={study} />
      </Chapter>

      {/* Telas */}
      {study.gallery.length ? (
        <Chapter id="gallery-title" title={c.galleryTitle} layout="stacked">
          <div className="grid gap-6 md:grid-cols-2">
            {study.gallery.map((g, i) => (
              <div key={g.src} className={i === 0 ? 'md:col-span-2' : ''}>
                <ClipReveal>
                  <button
                    type="button"
                    onClick={() => setZoom({ src: g.src, alt: L(g.caption) })}
                    aria-label={`${c.openImage}: ${L(g.caption)}`}
                    className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-card ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
                  >
                    <Image
                      src={g.src}
                      alt={L(g.caption)}
                      fill
                      unoptimized
                      sizes={i === 0 ? '(min-width: 1152px) 1152px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </button>
                </ClipReveal>
              </div>
            ))}
          </div>
        </Chapter>
      ) : null}

      {/* Design system: faixa com fundo próprio para marcar início e fim */}
      <section className="border-y border-line bg-card px-6 pt-24 md:px-10 md:pt-36" aria-labelledby="ds-title">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <header className="mb-16 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <p className="text-sm text-muted">{c.dsEyebrow}</p>
                <h2 id="ds-title" className="mt-3 font-sans text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-fg">
                  {ds.name}
                </h2>
              </div>
              <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{L(ds.intro)}</p>
            </header>
          </Reveal>
        </div>
        <div className="pb-24 md:pb-36">
          <DsTabs study={study} />
        </div>
      </section>

      {/* Aprendizados */}
      <Chapter id="learn-title" title={c.learningsTitle}>
        <ul className="divide-y divide-line">
          {study.learnings.map((x, i) => (
            <li key={i} className="py-8 first:pt-0 last:pb-0">
              <Reveal delay={i * 100}>
                <p className="text-pretty text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-tight text-fg">{L(x)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Chapter>

      {/* Navegação entre cases, discreta */}
      <nav className="border-t border-line px-6 py-10 md:px-10" aria-label={c.nextProject}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm">
          <Link href="/#projetos" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            {c.back}
          </Link>
          <Link href={`/projetos/${next.slug}`} className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
            <span className="hidden sm:inline">{c.nextShort}:</span>
            <span className="text-fg">{L(next.title)}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
