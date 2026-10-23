'use client';

import type { CaseStudy } from '@/lib/case-studies';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { dsVars } from './ds-kit';
import { CoverScene } from './signatures';

/** Fundo de cada capa gerada (o conteúdo vem de CoverScene). */
const backgrounds: Partial<Record<CaseStudy['slug'], string>> = {
  acalanto: 'radial-gradient(120% 90% at 85% 10%, #1A9C9A 0%, #0E7C7B 40%, #0B5D5E 100%)',
  feiro: 'radial-gradient(90% 80% at 90% 100%, #E7DFD2 0%, #F7F2EA 60%)',
  mirante: '#0B0F1A',
};

const STAGE_W = 1200;
const STAGE_H = 800;

/**
 * Palco de tamanho fixo escalado para cobrir o espaço disponível (como object-fit: cover),
 * para que a mesma cena funcione em card estreito, card largo e capa do case.
 */
function Stage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(width / STAGE_W, height / STAGE_H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Decorativo: inerte e fora do tab order */}
      <div
        ref={(el) => el?.setAttribute('inert', '')}
        className="pointer-events-none absolute left-1/2 top-1/2 origin-center transition-opacity duration-300"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity: scale ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function CaseCover({
  study,
  priority = false,
  sizes = '100vw',
  className = '',
}: {
  study: CaseStudy;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (study.cover) {
    return (
      <Image
        src={study.cover}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        unoptimized
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ ...dsVars(study.ds.theme), background: backgrounds[study.slug] ?? study.ds.theme.canvas }}
    >
      <Stage>
        <CoverScene slug={study.slug} />
      </Stage>
    </div>
  );
}
