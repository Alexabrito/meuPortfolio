'use client';

import { useLocale } from '@/app/providers';
import type { DsTheme } from '@/lib/case-studies';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Expõe os tokens do DS como variáveis CSS consumidas pelas classes `.ds-*`. */
export function dsVars(t: DsTheme): CSSProperties {
  return {
    '--ds-font': t.font,
    '--ds-heading': t.heading,
    '--ds-mono': t.mono ?? 'var(--font-geist-mono), ui-monospace, monospace',
    '--ds-primary': t.primary,
    '--ds-primary-hover': t.primaryHover,
    '--ds-on-primary': t.onPrimary,
    '--ds-secondary': t.secondary,
    '--ds-on-secondary': t.onSecondary,
    '--ds-canvas': t.canvas,
    '--ds-surface': t.surface,
    '--ds-text': t.text,
    '--ds-muted': t.muted,
    '--ds-border': t.border,
    '--ds-success': t.success,
    '--ds-warning': t.warning,
    '--ds-danger': t.danger,
    '--ds-focus': t.focus,
    '--ds-radius': `${t.radius}px`,
    '--ds-control-radius': `${t.controlRadius}px`,
  } as CSSProperties;
}

export function usePick() {
  const { locale } = useLocale();
  return (pt: string, en: string) => (locale === 'pt' ? pt : en);
}

/**
 * “Prancheta”: o conteúdo é desenhado numa largura mínima fixa (`width`) e, quando o espaço
 * é menor (ex.: celular), é reduzido por inteiro como uma imagem, em vez de se reorganizar e quebrar.
 * Em telas maiores, ocupa a largura disponível normalmente. Continua interativo.
 */
export function Artboard({ width, children }: { width: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const measure = () => setBox({ w: o.clientWidth, h: i.offsetHeight });
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    measure();
    return () => ro.disconnect();
  }, []);

  const scale = box.w && box.w < width ? box.w / width : 1;
  const fits = box.w >= width;

  return (
    <div
      ref={outer}
      className={`relative w-full min-w-0 [contain:inline-size] ${fits ? '' : 'overflow-hidden'}`}
      style={{ height: box.h && scale < 1 ? box.h * scale : undefined }}
    >
      <div
        ref={inner}
        style={{
          width: fits ? '100%' : width,
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Moldura “canvas” de cada especime: fundo do DS, rótulo discreto no topo. */
export function Specimen({
  label,
  children,
  className = '',
  surface = 'canvas',
  width,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  surface?: 'canvas' | 'surface';
  /** Largura de desenho do componente; abaixo dela, ele é reduzido como imagem. */
  width?: number;
}) {
  return (
    <figure
      className={`ds-scope flex flex-col overflow-hidden rounded-2xl border border-line ${className}`}
      style={{ background: surface === 'canvas' ? 'var(--ds-canvas)' : 'var(--ds-surface)' }}
    >
      <figcaption
        className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{
          borderColor: 'color-mix(in srgb, var(--ds-border) 70%, transparent)',
          color: 'var(--ds-muted)',
        }}
      >
        {label}
      </figcaption>
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">{width ? <Artboard width={width}>{children}</Artboard> : children}</div>
    </figure>
  );
}
