'use client';

import { useLocale } from '@/app/providers';
import type { DsTheme } from '@/lib/case-studies';
import type { CSSProperties, ReactNode } from 'react';

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

/** Moldura “canvas” de cada especime: fundo do DS, rótulo discreto no topo. */
export function Specimen({
  label,
  children,
  className = '',
  surface = 'canvas',
}: {
  label: string;
  children: ReactNode;
  className?: string;
  surface?: 'canvas' | 'surface';
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
      <div className="flex flex-1 flex-col justify-center p-5 sm:p-7">{children}</div>
    </figure>
  );
}
