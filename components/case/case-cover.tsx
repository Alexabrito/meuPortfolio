import type { CaseStudy } from '@/lib/case-studies';
import Image from 'next/image';
import { dsVars } from './ds-kit';
import { CoverPreview } from './signatures';

/** Arte de capa dos estudos sem imagem: composição feita só com os tokens do DS. */
const art: Partial<Record<CaseStudy['slug'], { bg: string; fg: string; word: string }>> = {
  acalanto: {
    bg: 'radial-gradient(120% 90% at 85% 10%, #1A9C9A 0%, #0E7C7B 40%, #0B5D5E 100%)',
    fg: '#FFFFFF',
    word: 'Acalanto',
  },
  feiro: {
    bg: 'radial-gradient(90% 80% at 90% 100%, #E7DFD2 0%, #F7F2EA 60%)',
    fg: '#1F3D2B',
    word: 'Feirô',
  },
  mirante: {
    bg: 'radial-gradient(80% 70% at 80% 0%, #1A2238 0%, #0B0F1A 70%)',
    fg: '#E6EAF2',
    word: 'Mirante',
  },
};

export function CaseCover({
  study,
  priority = false,
  sizes = '100vw',
  className = '',
  compact = false,
}: {
  study: CaseStudy;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Cards estreitos: composição no topo, deixando a base livre para o texto. */
  compact?: boolean;
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

  const a = art[study.slug];
  const t = study.ds.theme;
  // No tema escuro, o primeiro grupo (superfícies) some sobre o card — mostra as cores de ação/dados.
  const swatches = study.ds.colors
    .slice(t.dark ? 1 : 0)
    .flatMap((g) => g.swatches)
    .slice(t.dark ? 2 : 0)
    .slice(0, 6);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ ...dsVars(t), background: a?.bg ?? t.canvas }}
    >
      {study.slug === 'mirante' ? (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(#273149 1px, transparent 1px), linear-gradient(90deg, #273149 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(70% 60% at 70% 30%, black, transparent)',
          }}
        />
      ) : null}

      <span
        className="absolute -right-[6%] top-[4%] select-none leading-none tracking-tight"
        style={{
          fontFamily: t.heading,
          color: a?.fg,
          opacity: study.slug === 'mirante' ? 0.12 : 0.16,
          fontSize: 'clamp(7rem, 22vw, 16rem)',
          fontWeight: study.slug === 'feiro' ? 400 : 700,
        }}
      >
        {a?.word}
      </span>

      {/* Componente real do sistema — decorativo: inerte e fora do tab order */}
      {compact ? (
        <div
          ref={(el) => el?.setAttribute('inert', '')}
          className="ds-scope pointer-events-none absolute right-[6%] top-[36%] w-[min(64%,340px)]"
        >
          <CoverPreview slug={study.slug} />
        </div>
      ) : (
        <div
          ref={(el) => el?.setAttribute('inert', '')}
          className="ds-scope pointer-events-none absolute right-[6%] top-1/2 hidden w-[min(44%,420px)] -translate-y-1/2 sm:block"
        >
          <CoverPreview slug={study.slug} />
        </div>
      )}

      {/* Mini-composição de tokens */}
      <div
        className={
          compact
            ? 'absolute left-6 top-6 w-[min(calc(100%-3rem),260px)] space-y-3 sm:left-8 sm:top-8'
            : 'absolute left-[6%] top-1/2 w-[min(70%,300px)] -translate-y-1/2 space-y-3 sm:w-[min(36%,300px)]'
        }
      >
        <div
          className="ds-scope p-4"
          style={{
            background: t.surface,
            borderRadius: t.radius,
            boxShadow: t.dark ? 'inset 0 0 0 1px #273149' : '0 24px 48px -20px rgba(0,0,0,0.35)',
          }}
        >
          <div className="flex items-center gap-2">
            {swatches.map((s) => (
              <span key={s.token} className="h-5 w-5 rounded-full ring-1 ring-black/5" style={{ background: s.hex }} />
            ))}
          </div>
          <p className="mt-4 text-[28px] leading-none" style={{ fontFamily: t.heading, fontWeight: 600 }}>
            Aa
          </p>
          <div className="mt-4 flex gap-2">
            <span className="ds-btn ds-btn--primary h-8 px-3 text-[12px]">Primary</span>
            <span className="ds-btn ds-btn--outline h-8 px-3 text-[12px]">Outline</span>
          </div>
        </div>
        <div className={compact ? 'hidden' : 'flex gap-2'}>
          <span className="ds-chip flex items-center" data-active="true">
            Tokens
          </span>
        </div>
      </div>
    </div>
  );
}
