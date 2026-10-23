'use client';

import type { CaseSlug } from '@/lib/case-studies';
import { useEffect, useState, type ReactNode } from 'react';
import { useInView } from '@/lib/use-in-view';
import { Specimen, usePick } from './ds-kit';

/* Componentes-assinatura: o que é único de cada sistema, renderizado ao vivo. */

function Plus({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M5 12h14" />
      {open ? null : <path d="M12 5v14" />}
    </svg>
  );
}

function Check({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* idwall                                                              */
/* ------------------------------------------------------------------ */

function IdwallForm() {
  const pick = usePick();
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const nameOk = name.trim().length > 1;
  const mailOk = /^\S+@\S+\.\S+$/.test(mail);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ background: 'var(--ds-success)' }}>
          <Check size={24} />
        </span>
        <p className="mt-5 text-[24px] leading-[1.3]">{pick('Interesse enviado com sucesso!', 'Request sent successfully!')}</p>
        <p className="mt-2 text-[14px]" style={{ color: 'var(--ds-muted)' }}>
          {pick('Em breve entraremos em contato.', 'We’ll be in touch shortly.')}
        </p>
        <button
          type="button"
          className="ds-btn ds-btn--ghost mt-4"
          onClick={() => {
            setSent(false);
            setTried(false);
            setName('');
            setMail('');
          }}
        >
          {pick('Recomeçar', 'Start over')}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTried(true);
        if (nameOk && mailOk) setSent(true);
      }}
    >
      <p className="text-[24px] leading-[1.3]">
        {pick('Fale com um ', 'Talk to an ')}
        <strong className="font-semibold">{pick('especialista', 'expert')}</strong>
      </p>
      <p className="mt-1 text-[14px] leading-[1.3]" style={{ color: 'var(--ds-muted)' }}>
        {pick('Preencha os campos e nosso time entrará em contato.', 'Fill in the fields and our team will reach out.')}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="ds-label">{pick('Nome*', 'Name*')}</span>
          <input
            className={`ds-input ${tried && !nameOk ? 'is-error' : ''}`}
            placeholder={pick('Digite seu nome', 'Your name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={tried && !nameOk}
          />
        </label>
        <label className="block">
          <span className="ds-label">{pick('Email corporativo*', 'Work email*')}</span>
          <input
            className={`ds-input ${tried && !mailOk ? 'is-error' : ''}`}
            placeholder="email@empresa.com"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            aria-invalid={tried && !mailOk}
          />
        </label>
      </div>
      <button type="submit" className="ds-btn ds-btn--primary mt-6 w-full">
        {pick('Enviar interesse', 'Send request')}
      </button>
      {tried && !(nameOk && mailOk) ? (
        <p className="mt-3 text-center text-[13px] font-semibold" style={{ color: 'var(--ds-danger)' }} role="alert">
          {pick('Revise os campos destacados.', 'Please review the highlighted fields.')}
        </p>
      ) : null}
    </form>
  );
}

/** Matriz de botões fiel à prancha “Base Components” do style guide (Normal, Hover, Focus). */
function IdwallButtons() {
  const pick = usePick();
  const states = ['Normal', 'Hover', 'Focus'] as const;
  const focus = 'outline outline-2 outline-offset-2 outline-[#D10303]';
  const arrow = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
  const rows: { label: string; dark?: 'gradient' | 'brand'; render: (s: (typeof states)[number]) => ReactNode }[] = [
    {
      label: 'CTA Primary',
      render: (s) => (
        <span
          className={`inline-flex h-9 items-center gap-2 rounded-[6px] px-4 text-[13px] font-semibold text-white ${s === 'Focus' ? focus : ''}`}
          style={{ background: s === 'Hover' ? '#260066' : '#4500BA' }}
        >
          {pick('Conheça a idwall', 'Meet idwall')} {arrow}
        </span>
      ),
    },
    {
      label: 'Ghost',
      dark: 'gradient',
      render: (s) => (
        <span
          className={`inline-flex h-8 items-center rounded-[6px] px-4 text-[13px] font-semibold ${s === 'Focus' ? focus : ''}`}
          style={s === 'Hover' ? { background: '#FFFFFF', color: '#4500BA' } : { background: 'rgba(255,255,255,0.18)', color: '#FFFFFF' }}
        >
          {pick('Entrar', 'Log in')}
        </span>
      ),
    },
    {
      label: 'CTA Secondary',
      dark: 'brand',
      render: (s) => (
        <span
          className={`inline-flex h-8 items-center rounded-[6px] px-5 text-[13px] font-semibold text-[#4500BA] ${s === 'Focus' ? focus : ''}`}
          style={{ background: s === 'Hover' ? '#E3E3E3' : '#FFFFFF' }}
        >
          {pick('Cadastrar', 'Sign up')}
        </span>
      ),
    },
    {
      label: 'Tertiary',
      render: (s) => (
        <span className={`inline-flex items-center gap-2 text-[13px] font-semibold ${s === 'Focus' ? focus : ''}`} style={{ color: s === 'Hover' ? '#4500BA' : '#000000' }}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4500BA] text-white">{arrow}</span>
          {pick('Veja o case', 'See the case')}
        </span>
      ),
    },
    {
      label: 'Navigator',
      render: (s) => (
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${s === 'Focus' ? focus : ''}`}
          style={s === 'Hover' ? { background: '#260066', color: '#FFFFFF' } : { background: '#E3E3E3', color: '#4D4D4D' }}
        >
          {arrow}
        </span>
      ),
    },
  ];

  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-left">
        <thead>
          <tr>
            <th className="w-32" />
            {states.map((s) => (
              <th key={s} scope="col" className="pb-2 text-[13px] font-semibold">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="pr-4 text-[12px] font-normal" style={{ color: 'var(--ds-muted)' }}>
                {r.label}
              </th>
              {states.map((s) => (
                <td key={s} className="pr-3">
                  <span
                    className="flex h-14 items-center justify-center rounded-xl"
                    style={{
                      background:
                        r.dark === 'gradient'
                          ? 'linear-gradient(135deg, #0a0a0a, #3a3a3a)'
                          : r.dark === 'brand'
                            ? '#260066'
                            : '#FFFFFF',
                    }}
                  >
                    {r.render(s)}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IdwallAccordion() {
  const pick = usePick();
  const [open, setOpen] = useState(0);
  const items = [
    {
      t: pick('Otimize processos', 'Optimise processes'),
      b: pick('Automatize verificações e reduza o tempo de onboarding.', 'Automate checks and cut onboarding time.'),
    },
    {
      t: pick('Reduza fraudes', 'Reduce fraud'),
      b: pick('Biometria e análise de documentos em uma única jornada.', 'Biometrics and document analysis in one journey.'),
    },
    {
      t: pick('Escale com segurança', 'Scale securely'),
      b: pick('Regras configuráveis para cada etapa do fluxo.', 'Configurable rules for every step of the flow.'),
    },
  ];
  return (
    <ul className="divide-y" style={{ borderColor: 'var(--ds-border)' }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.t} style={{ borderColor: 'var(--ds-border)' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group flex w-full items-center gap-3 py-3.5 text-left text-[16px] transition-colors duration-500 hover:text-[var(--ds-primary)]"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
                style={{
                  background: isOpen ? 'var(--ds-border)' : 'var(--ds-primary)',
                  color: isOpen ? 'var(--ds-text)' : '#fff',
                }}
              >
                <Plus open={isOpen} />
              </span>
              {it.t}
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden pl-9 text-[14px]" style={{ color: 'var(--ds-muted)' }}>
                <span className="block pb-4">{it.b}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function IdwallNav() {
  const pick = usePick();
  const items = [pick('Início', 'Home'), pick('Ecossistema', 'Ecosystem'), pick('Soluções', 'Solutions'), pick('Contato', 'Contact')];
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl bg-white px-5 py-4" style={{ boxShadow: '0 12px 32px -12px rgba(38,0,102,0.18)' }}>
      {items.map((it, i) => (
        <button
          key={it}
          type="button"
          onClick={() => setActive(i)}
          className="relative pb-1 text-[14px] transition-colors duration-500 hover:text-[var(--ds-primary)]"
          style={{ color: active === i ? 'var(--ds-primary)' : 'var(--ds-text)' }}
        >
          {it}
          <span
            className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-500"
            style={{ background: 'var(--ds-primary)', transform: active === i ? 'scaleX(1)' : 'scaleX(0)' }}
          />
        </button>
      ))}
      <button type="button" className="ds-btn ds-btn--primary ml-auto h-9 px-4 text-[14px]">
        {pick('Entrar', 'Log in')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* idsummit                                                            */
/* ------------------------------------------------------------------ */

function SummitHero() {
  const pick = usePick();
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-6 py-10 text-white sm:px-10 sm:py-12"
      style={{ background: 'linear-gradient(120deg, #3F00B1 0%, #4500BB 35%, #6B00FF 100%)' }}
    >
      <span aria-hidden className="absolute -right-10 -top-16 h-40 w-72 rounded-full" style={{ background: '#8E43FF' }} />
      <span aria-hidden className="absolute -bottom-16 right-10 h-32 w-32 rounded-full" style={{ background: '#7B1FFE' }} />
      <span aria-hidden className="absolute -bottom-20 right-48 hidden h-36 w-64 rounded-full sm:block" style={{ background: '#6E08FF' }} />
      <div className="relative flex gap-6">
        <div className="flex flex-col items-center gap-1.5 pt-1 text-[11px] font-semibold leading-none" aria-label="29.05.2025">
          <span>29</span>
          <span className="h-1 w-1 rounded-full bg-white" />
          <span className="h-10 w-1 rounded-full bg-white" />
          <span>05</span>
          <span className="h-1 w-1 rounded-full bg-white" />
          <span>20</span>
          <span>25</span>
        </div>
        <div>
          <p className="text-[14px] tracking-tight">
            <strong className="font-semibold">id</strong>summit
          </p>
          <p className="mt-2 text-[clamp(28px,4vw,44px)] font-light leading-[1.05] tracking-tight">
            Trust for a <strong className="font-semibold">future</strong>
          </p>
          <p className="mt-3 max-w-[34ch] text-[13px] leading-snug text-white/85">
            {pick('Participe do evento e veja como o futuro está sendo moldado com confiança.', 'Join the event and see how the future is being shaped with trust.')}
          </p>
          <button type="button" className="ds-btn ds-btn--secondary mt-6 h-9 px-5 text-[13px]">
            {pick('Garantir minha vaga', 'Save my seat')}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummitAgenda() {
  const pick = usePick();
  const [open, setOpen] = useState<number | null>(1);
  const rows = [
    { time: '09:00 – 09:30', title: pick('Credenciamento e café', 'Registration and coffee'), people: 0 },
    { time: '09:30 – 10:15', title: pick('Como a confiança virou infraestrutura', 'How trust became infrastructure'), people: 2 },
    { time: '10:15 – 11:00', title: pick('Identidade digital e o futuro do sistema financeiro', 'Digital identity and the future of finance'), people: 3 },
  ];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 rounded-full px-5 py-3 text-[12px] font-semibold text-white" style={{ background: 'var(--ds-primary)' }}>
        <span>09:00 – 11:00</span>
        <span className="font-normal opacity-80">{pick('Abertura', 'Opening')}</span>
      </div>
      {rows.map((r, i) => {
        const isOpen = open === i;
        return (
          <div key={r.time} className="rounded-[22px] bg-white" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-3 text-left"
            >
              <span className="w-[92px] shrink-0 text-[12px] font-semibold">{r.time}</span>
              <span className="flex-1 text-[13px]">{r.title}</span>
              {r.people > 0 ? (
                <span className="hidden -space-x-2 sm:flex" aria-hidden>
                  {Array.from({ length: r.people }).map((_, k) => (
                    <span
                      key={k}
                      className="h-6 w-6 rounded-full border-2 border-white"
                      style={{ background: `linear-gradient(135deg, #bbb, #555 ${60 + k * 10}%)` }}
                    />
                  ))}
                </span>
              ) : null}
              <Chevron open={isOpen} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden px-5 text-[13px]" style={{ color: 'var(--ds-muted)' }}>
                <span className="block pb-4 pl-[108px]">
                  {pick('Painel com especialistas do mercado. Sala principal.', 'Panel with industry experts. Main stage.')}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SummitSpeaker({ name, role, tint }: { name: string; role: string; tint: number }) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-xl" style={{ background: `linear-gradient(160deg, #e9e9e9, #9a9a9a ${55 + tint}%)` }}>
      <svg viewBox="0 0 100 130" className="absolute inset-x-0 bottom-0 h-[85%] w-full text-[#2a2a2a] opacity-80 transition-transform duration-700 group-hover:scale-105" aria-hidden>
        <circle cx="50" cy="45" r="20" fill="currentColor" />
        <path d="M12 130c0-26 17-44 38-44s38 18 38 44z" fill="currentColor" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <p className="text-[14px] font-semibold leading-tight">{name}</p>
        <p className="mt-0.5 text-[11px] leading-tight text-white/75">{role}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cacau                                                               */
/* ------------------------------------------------------------------ */

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2.4rem] p-2.5" style={{ background: '#12121C' }}>
      <div className="relative overflow-hidden rounded-[1.9rem]" style={{ background: 'var(--ds-surface)' }}>
        <span aria-hidden className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl" style={{ background: '#12121C' }} />
        <div className="min-h-[480px] px-5 pb-6 pt-10">{children}</div>
      </div>
    </div>
  );
}

function CacauGauge() {
  const pick = usePick();
  const total = 30000;
  const target = 15000;
  // Como no protótipo: o medidor só exibe o valor. Ao entrar na tela, o arco preenche e os números contam.
  const { ref, visible } = useInView<HTMLDivElement>(0.4);
  const [used, setUsed] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUsed(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setUsed(Math.round((target * (1 - (1 - p) ** 3)) / 50) * 50);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);
  const pct = used / total;
  const r = 80;
  const arc = Math.PI * r;
  const fmt = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;

  return (
    <Phone>
      <p className="text-center text-[20px] font-semibold leading-tight" style={{ color: 'var(--ds-primary)' }}>
        {pick('Acompanhe suas movimentações', 'Track your activity')}
      </p>
      <div ref={ref} className="relative mx-auto mt-5 w-[200px]">
        <svg viewBox="0 0 200 110" className="w-full" aria-hidden>
          <defs>
            <linearGradient id="cacau-g" x1="0" x2="1">
              <stop offset="0" stopColor="#FFAC12" />
              <stop offset="1" stopColor="#FF6403" />
            </linearGradient>
          </defs>
          <path d="M20 100a80 80 0 0 1 160 0" fill="none" stroke="#FFF2EA" strokeWidth="16" strokeLinecap="round" />
          <path
            d="M20 100a80 80 0 0 1 160 0"
            fill="none"
            stroke="url(#cacau-g)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={arc}
            strokeDashoffset={arc * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p className="text-[22px] font-semibold leading-none" style={{ color: 'var(--ds-primary)' }}>
            {Math.round(pct * 100)}%
          </p>
          <p className="mt-1 text-[11px]" style={{ color: 'var(--ds-muted)' }}>
            {pick('do saldo utilizado', 'of balance used')}
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        {[
          { k: pick('Limite disponibilizado', 'Credit limit'), v: total },
          { k: pick('Valor utilizado', 'Amount used'), v: used },
          { k: pick('Valor disponível', 'Available'), v: total - used },
        ].map((row) => (
          <div key={row.k} className="rounded-lg bg-white px-4 py-2.5" style={{ boxShadow: '0 6px 20px -8px rgba(18,18,28,0.18)' }}>
            <p className="text-[11px]" style={{ color: 'var(--ds-muted)' }}>
              {row.k}
            </p>
            <p className="text-[17px] font-semibold tabular-nums" style={{ color: 'var(--ds-muted)' }}>
              {fmt(row.v)}
            </p>
          </div>
        ))}
      </div>
    </Phone>
  );
}

function CacauCalendar() {
  const pick = usePick();
  const [day, setDay] = useState(2);
  const week = pick('D S T Q Q S S', 'S M T W T F S').split(' ');
  // Janeiro de 2019 começa numa terça.
  const offset = 2;
  return (
    <Phone>
      <p className="text-center text-[16px] font-medium" style={{ color: 'var(--ds-primary)' }}>
        {pick('Inclusão de título', 'Add invoice')}
      </p>
      <p className="mt-5 text-center text-[13px] font-semibold" style={{ color: 'var(--ds-primary)' }}>
        {pick('Janeiro 2019', 'January 2019')}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-y-1.5 text-center text-[12px]" role="grid" aria-label={pick('Calendário', 'Calendar')}>
        {week.map((d, i) => (
          <span key={i} className="pb-1 text-[10px] font-medium" style={{ color: 'var(--ds-muted)' }}>
            {d}
          </span>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: 31 }).map((_, i) => {
          const d = i + 1;
          const sel = d === day;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={sel}
              onClick={() => setDay(d)}
              className="mx-auto flex h-7 w-7 items-center justify-center rounded-full transition-colors"
              style={{
                background: sel ? '#FFE3D1' : 'transparent',
                color: sel ? 'var(--ds-primary)' : 'var(--ds-muted)',
                fontWeight: sel ? 600 : 400,
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" className="ds-btn h-10 text-[13px] text-white" style={{ background: 'var(--ds-success)' }}>
          {pick('Confirmar', 'Confirm')}
        </button>
        <button type="button" className="ds-btn h-10 text-[13px] text-white" style={{ background: 'var(--ds-danger)' }}>
          {pick('Cancelar', 'Cancel')}
        </button>
      </div>
      <p className="mt-4 text-center text-[12px]" style={{ color: 'var(--ds-muted)' }}>
        {pick('Vencimento', 'Due date')}: {String(day).padStart(2, '0')}/01/2019
      </p>
    </Phone>
  );
}

function CacauEmpty() {
  const pick = usePick();
  return (
    <Phone>
      <p className="text-center text-[16px] font-medium" style={{ color: 'var(--ds-primary)' }}>
        {pick('Nova operação', 'New operation')}
      </p>
      <p className="mt-8 text-center text-[22px] font-semibold" style={{ color: 'var(--ds-muted)' }}>
        {pick('Lista vazia', 'Empty list')}
      </p>
      <svg viewBox="0 0 120 70" className="mx-auto mt-4 w-28" aria-hidden>
        <path d="M10 40h60M22 48h56M30 32h40" stroke="#D0CFD8" strokeWidth="3" strokeLinecap="round" />
        <path d="M86 18c10-8 22-4 24 4-10 6-20 6-24-4z" fill="#D95F14" />
        <path d="M14 10c8-6 18-3 20 4-8 5-16 5-20-4z" fill="#FF6403" />
        <path d="M84 52c8-6 18-3 20 4-8 5-16 5-20-4z" fill="#FB8F47" />
      </svg>
      <p className="mt-4 text-center text-[13px] leading-snug" style={{ color: 'var(--ds-muted)' }}>
        {pick('Sua lista de títulos está vazia. Selecione abaixo para efetuar uma ', 'Your invoice list is empty. Choose below to start a ')}
        <strong style={{ color: 'var(--ds-primary)' }}>{pick('nova operação', 'new operation')}</strong>
      </p>
      <div className="mt-5 space-y-2">
        {[pick('Incluir XML com NFe', 'Upload NFe XML'), pick('Incluir ZIP com XML', 'Upload XML ZIP'), pick('Digitação manual', 'Manual entry')].map((t) => (
          <button key={t} type="button" className="ds-btn ds-btn--outline h-9 w-full bg-white text-[13px] font-medium">
            {t}
          </button>
        ))}
        <button type="button" className="ds-btn ds-btn--primary h-11 w-full" style={{ boxShadow: '0 10px 24px -10px rgba(255,100,3,0.6)' }}>
          {pick('Incluir título', 'Add invoice')}
        </button>
      </div>
    </Phone>
  );
}

/* ------------------------------------------------------------------ */
/* Acalanto                                                        */
/* ------------------------------------------------------------------ */

function AcalantoAppointment() {
  const pick = usePick();
  const slots = ['08:30', '09:15', '10:00', '14:30', '16:00'];
  const [slot, setSlot] = useState('10:00');
  const [booked, setBooked] = useState(false);
  return (
    <div className="rounded-[20px] bg-white p-6" style={{ boxShadow: '0 12px 32px -12px rgba(20,35,43,0.18)' }}>
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full text-[18px] font-bold" style={{ background: 'var(--ds-secondary)', color: 'var(--ds-on-secondary)' }}>
          HV
        </span>
        <div>
          <p className="text-[18px] font-bold leading-tight">Dra. Helena Viana</p>
          <p className="text-[16px]" style={{ color: 'var(--ds-muted)' }}>
            {pick('Cardiologia · Teleconsulta', 'Cardiology · Video visit')}
          </p>
        </div>
      </div>
      <p className="mt-6 text-[16px] font-medium">{pick('Escolha um horário · qui, 14 nov', 'Pick a time · Thu, Nov 14')}</p>
      <div role="radiogroup" aria-label={pick('Horários', 'Times')} className="mt-3 flex flex-wrap gap-2">
        {slots.map((s) => {
          const sel = s === slot;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={sel}
              onClick={() => {
                setSlot(s);
                setBooked(false);
              }}
              className="flex h-12 min-w-[76px] items-center justify-center gap-1.5 rounded-xl border-2 px-3 text-[16px] font-medium transition-colors"
              style={{
                borderColor: sel ? 'var(--ds-primary)' : 'var(--ds-border)',
                background: sel ? 'var(--ds-secondary)' : '#fff',
                color: sel ? 'var(--ds-on-secondary)' : 'var(--ds-text)',
              }}
            >
              {sel ? <Check size={14} /> : null}
              {s}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => setBooked(true)} className="ds-btn ds-btn--primary mt-6 h-12 w-full text-[16px]">
        {booked ? pick('Consulta agendada', 'Visit booked') : pick(`Agendar às ${slot}`, `Book at ${slot}`)}
        {booked ? <Check /> : null}
      </button>
      <p className={booked ? 'mt-3 text-center text-[14px]' : 'sr-only'} style={{ color: 'var(--ds-muted)' }} aria-live="polite">
        {booked ? pick('Você receberá o link por SMS e e-mail.', 'You’ll get the link by SMS and email.') : null}
      </p>
    </div>
  );
}

function AcalantoVitals() {
  const pick = usePick();
  const vitals = [
    { k: pick('Pressão', 'Blood pressure'), v: '120/80', u: 'mmHg', tone: 'success', s: pick('Normal', 'Normal') },
    { k: pick('Glicemia', 'Glucose'), v: '132', u: 'mg/dL', tone: 'warning', s: pick('Atenção', 'Watch') },
    { k: pick('Freq. cardíaca', 'Heart rate'), v: '72', u: 'bpm', tone: 'success', s: pick('Normal', 'Normal') },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {vitals.map((v) => (
        <div key={v.k} className="rounded-[20px] bg-white p-4" style={{ boxShadow: '0 1px 3px rgba(20,35,43,0.08)' }}>
          <p className="text-[14px] font-medium" style={{ color: 'var(--ds-muted)' }}>
            {v.k}
          </p>
          <p className="mt-1 text-[32px] font-bold leading-none tabular-nums">
            {v.v} <span className="text-[14px] font-medium" style={{ color: 'var(--ds-muted)' }}>{v.u}</span>
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[14px] font-semibold"
            style={{ background: `color-mix(in srgb, var(--ds-${v.tone}) 14%, #fff)`, color: `var(--ds-${v.tone})` }}
          >
            {v.tone === 'success' ? <Check size={12} /> : <span aria-hidden>!</span>}
            {v.s}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feirô                                                               */
/* ------------------------------------------------------------------ */

function FeiroProduct({ name, farm, km, price, hue }: { name: string; farm: string; km: number; price: number; hue: string }) {
  const pick = usePick();
  const [qty, setQty] = useState(0);
  return (
    <article className="overflow-hidden rounded-[18px] bg-[var(--ds-surface)]" style={{ boxShadow: '0 10px 30px -14px rgba(42,37,32,0.25)' }}>
      <div className="relative aspect-[4/3]" style={{ background: 'radial-gradient(90% 80% at 50% 30%, #F4ECDD, #E7DFD2)' }}>
        <svg viewBox="0 0 120 90" className="absolute inset-0 h-full w-full" aria-hidden>
          <ellipse cx="60" cy="80" rx="30" ry="4" fill="#2A2520" opacity="0.12" />
          <circle cx="60" cy="50" r="28" fill={hue} />
          <ellipse cx="50" cy="40" rx="8" ry="5" fill="#FFFCF7" opacity="0.25" transform="rotate(-30 50 40)" />
          <path d="M60 24c-6-8-16-8-20-4 6 1 12 4 20 4zm0 0c6-8 16-8 20-4-6 1-12 4-20 4zm0 0v-8" stroke="#2F6B45" strokeWidth="3" fill="#2F6B45" strokeLinecap="round" />
        </svg>
        <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[1.5px]" style={{ background: 'var(--ds-secondary)', color: 'var(--ds-on-secondary)' }}>
          {pick('Orgânico', 'Organic')}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: 'var(--ds-success)' }}>
          {farm} · {km} km
        </p>
        <h4 className="mt-1 text-[22px] font-semibold leading-tight" style={{ fontFamily: 'var(--ds-heading)' }}>
          {name}
        </h4>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="whitespace-nowrap text-[18px] font-bold tabular-nums">
            R$ {price.toFixed(2).replace('.', ',')}
            <span className="text-[14px] font-normal" style={{ color: 'var(--ds-muted)' }}>
              {' '}/ kg
            </span>
          </p>
          {qty === 0 ? (
            <button type="button" onClick={() => setQty(1)} className="ds-btn ds-btn--primary h-10 px-4 text-[14px]">
              {pick('Adicionar', 'Add')}
            </button>
          ) : (
            <div className="flex h-10 items-center rounded-[10px] border-[1.5px]" style={{ borderColor: 'var(--ds-border)' }}>
              <button type="button" aria-label={pick('Remover um', 'Remove one')} onClick={() => setQty((q) => q - 1)} className="h-full w-9 text-[18px]">
                −
              </button>
              <span className="w-6 text-center text-[16px] font-bold tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button type="button" aria-label={pick('Adicionar um', 'Add one')} onClick={() => setQty((q) => q + 1)} className="h-full w-9 text-[18px]">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function FeiroStory() {
  const pick = usePick();
  return (
    <div className="rounded-[18px] p-6 sm:p-8" style={{ background: 'var(--ds-secondary)', color: 'var(--ds-on-secondary)' }}>
      <p className="text-[11px] font-bold uppercase tracking-[1.5px] opacity-80">{pick('Quem produz', 'Who grows it')}</p>
      <p className="mt-3 text-[34px] font-semibold leading-[1.15]" style={{ fontFamily: 'var(--ds-heading)' }}>
        {pick('“A gente colhe na terça para chegar na sua mesa na quarta.”', '“We harvest on Tuesday so it reaches your table on Wednesday.”')}
      </p>
      <p className="mt-4 text-[14px] opacity-80">Seu Joaquim · Sítio das Maritacas</p>
      <button type="button" className="ds-btn mt-6 h-10 text-[14px]" style={{ background: 'var(--ds-warning)', color: '#2A2520' }}>
        {pick('Conhecer o sítio', 'Visit the farm')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mirante                                                               */
/* ------------------------------------------------------------------ */

const MIRANTE_SERIES = ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#CC79A7', '#D55E00'];

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${30 - ((p - min) / (max - min || 1)) * 26 - 2}`)
    .join(' L');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-full" aria-hidden>
      <path d={`M${d}`} fill="none" stroke={color} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function MiranteKpis() {
  const pick = usePick();
  const kpis = [
    { k: pick('Receita recorrente', 'Recurring revenue'), v: '$482.1k', d: '+12.4%', up: true, pts: [4, 6, 5, 8, 7, 9, 11, 10, 13] },
    { k: pick('Usuários ativos', 'Active users'), v: '18,204', d: '+3.1%', up: true, pts: [8, 7, 9, 9, 10, 9, 11, 12, 12] },
    { k: 'Churn', v: '2.8%', d: '−0.6pp', up: false, pts: [9, 8, 8, 7, 7, 6, 5, 6, 4] },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {kpis.map((k, i) => (
        <div key={k.k} className="rounded-[14px] p-4" style={{ background: 'var(--ds-surface)', boxShadow: 'inset 0 0 0 1px var(--ds-border)' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.8px]" style={{ color: 'var(--ds-muted)' }}>
            {k.k}
          </p>
          <p className="mt-2 text-[36px] font-medium leading-none tabular-nums" style={{ fontFamily: 'var(--ds-mono)' }}>
            {k.v}
          </p>
          <p className="mt-2 text-[12px] font-medium" style={{ color: k.up || k.k === 'Churn' ? 'var(--ds-success)' : 'var(--ds-danger)' }}>
            {k.d} <span style={{ color: 'var(--ds-muted)' }}>{pick('vs. mês anterior', 'vs. last month')}</span>
          </p>
          <div className="mt-3">
            <Sparkline points={k.pts} color={MIRANTE_SERIES[i]} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiranteChart() {
  const pick = usePick();
  const series = [
    { name: 'Web', color: MIRANTE_SERIES[0], data: [42, 48, 51, 46, 58, 62] },
    { name: 'iOS', color: MIRANTE_SERIES[1], data: [24, 27, 30, 34, 33, 38] },
    { name: 'Android', color: MIRANTE_SERIES[2], data: [18, 20, 19, 23, 26, 29] },
  ];
  const [hidden, setHidden] = useState<string[]>([]);
  const months = pick('Jan Fev Mar Abr Mai Jun', 'Jan Feb Mar Apr May Jun').split(' ');
  const visible = series.filter((s) => !hidden.includes(s.name));
  const max = 70;

  return (
    <div className="rounded-[14px] p-5" style={{ background: 'var(--ds-surface)', boxShadow: 'inset 0 0 0 1px var(--ds-border)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[20px] font-semibold">{pick('Sessões por plataforma (mil)', 'Sessions by platform (k)')}</p>
        <div className="flex flex-wrap gap-2">
          {series.map((s) => {
            const on = !hidden.includes(s.name);
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={on}
                onClick={() => setHidden((h) => (on ? [...h, s.name] : h.filter((x) => x !== s.name)))}
                className="flex h-7 items-center gap-2 rounded-md px-2.5 text-[12px] font-medium transition-opacity"
                style={{ background: 'var(--ds-secondary)', opacity: on ? 1 : 0.45 }}
              >
                <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                {s.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex h-44 items-end gap-3 sm:gap-5" role="img" aria-label={pick('Gráfico de barras agrupadas', 'Grouped bar chart')}>
        {months.map((m, mi) => (
          <div key={m} className="flex h-full flex-1 flex-col justify-end">
            <div className="flex flex-1 items-end justify-center gap-[3px]">
              {visible.map((s) => (
                <span
                  key={s.name}
                  className="w-full max-w-[14px] rounded-t-[3px] transition-[height] duration-500"
                  style={{ height: `${(s.data[mi] / max) * 100}%`, background: s.color }}
                  title={`${s.name} · ${m}: ${s.data[mi]}k`}
                />
              ))}
            </div>
            <span className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.8px]" style={{ color: 'var(--ds-muted)' }}>
              {m}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiranteTable() {
  const pick = usePick();
  const rows = [
    { id: 'ACC-1042', name: 'Lumiar Tech', mrr: '12,400', status: 'success', s: pick('Ativo', 'Active') },
    { id: 'ACC-0981', name: 'Café Serrano', mrr: '8,950', status: 'warning', s: pick('Em risco', 'At risk') },
    { id: 'ACC-0877', name: 'Atelier Norte', mrr: '4,120', status: 'danger', s: pick('Cancelado', 'Churned') },
  ];
  return (
    <div className="overflow-x-auto rounded-[14px]" style={{ background: 'var(--ds-surface)', boxShadow: 'inset 0 0 0 1px var(--ds-border)' }}>
      <table className="w-full min-w-[420px] text-left text-[13px]">
        <thead>
          <tr style={{ color: 'var(--ds-muted)' }}>
            {['ID', pick('Conta', 'Account'), 'MRR ($)', 'Status'].map((h) => (
              <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.8px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t transition-colors hover:bg-white/[0.03]" style={{ borderColor: 'var(--ds-border)' }}>
              <td className="px-4 py-3" style={{ fontFamily: 'var(--ds-mono)', color: 'var(--ds-muted)' }}>
                {r.id}
              </td>
              <td className="px-4 py-3 text-[14px] font-medium">{r.name}</td>
              <td className="px-4 py-3 tabular-nums" style={{ fontFamily: 'var(--ds-mono)' }}>
                {r.mrr}
              </td>
              <td className="px-4 py-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-medium"
                  style={{ background: `color-mix(in srgb, var(--ds-${r.status}) 16%, transparent)`, color: `var(--ds-${r.status})` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--ds-${r.status})` }} />
                  {r.s}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Capas dos estudos acadêmicos: uma cena diferente para cada produto   */
/* (celular, página web, dashboard), desenhada num palco de 1200×800.   */
/* ------------------------------------------------------------------ */

function FloatingVital({ label, value, unit, tone, status }: { label: string; value: string; unit: string; tone: 'success' | 'warning'; status: string }) {
  return (
    <div className="w-[230px] rounded-[20px] bg-white p-5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]">
      <p className="text-[14px] font-medium" style={{ color: 'var(--ds-muted)' }}>
        {label}
      </p>
      <p className="mt-1 text-[32px] font-bold leading-none tabular-nums">
        {value} <span className="text-[14px] font-medium" style={{ color: 'var(--ds-muted)' }}>{unit}</span>
      </p>
      <span
        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[14px] font-semibold"
        style={{ background: `color-mix(in srgb, var(--ds-${tone}) 14%, #fff)`, color: `var(--ds-${tone})` }}
      >
        {tone === 'success' ? <Check size={12} /> : <span aria-hidden>!</span>}
        {status}
      </span>
    </div>
  );
}

function AcalantoScene() {
  const pick = usePick();
  return (
    <div className="ds-scope relative h-full w-full">
      <span className="absolute -left-40 -top-48 h-[620px] w-[620px] rounded-full bg-white/[0.08]" />
      <span className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/[0.06]" />
      <div className="absolute left-[400px] top-[60px] w-[400px] rounded-[56px] bg-[#0B2F30] p-3.5 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.55)]">
        <div className="relative h-[700px] overflow-hidden rounded-[44px] px-5 pt-14" style={{ background: 'var(--ds-canvas)' }}>
          <span className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-[#0B2F30]" />
          <p className="text-[16px]" style={{ color: 'var(--ds-muted)' }}>
            {pick('Olá, Ana', 'Hi, Ana')}
          </p>
          <p className="mt-1 text-[24px] font-bold leading-tight">{pick('Agende sua consulta', 'Book your visit')}</p>
          <div className="mt-5">
            <AcalantoAppointment />
          </div>
        </div>
      </div>
      <div className="absolute left-[790px] top-[170px] rotate-[3deg]">
        <FloatingVital label={pick('Pressão', 'Blood pressure')} value="120/80" unit="mmHg" tone="success" status={pick('Normal', 'Normal')} />
      </div>
      <div className="absolute left-[190px] top-[420px] -rotate-[3deg]">
        <FloatingVital label={pick('Glicemia', 'Glucose')} value="132" unit="mg/dL" tone="warning" status={pick('Atenção', 'Watch')} />
      </div>
    </div>
  );
}

const FEIRO_ICONS = {
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  bag: 'M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0',
  chevron: 'M9 6l6 6-6 6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  pin: 'M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z',
};

function FeiroIcon({ name, size = 20, stroke = 1.75 }: { name: keyof typeof FEIRO_ICONS; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={FEIRO_ICONS[name]} />
    </svg>
  );
}

/** Primeira dobra da home do Feirô, desenhada a 1440px (como no protótipo) e reduzida para caber na janela. */
function FeiroScene() {
  const pick = usePick();
  const scale = 1040 / 1440;
  const trust = [
    { icon: 'clock' as const, t: pick('Colhido ontem', 'Picked yesterday'), s: pick('Entregue no dia seguinte', 'Delivered the next day') },
    { icon: 'pin' as const, t: pick('Até 100 km', 'Within 100 km'), s: pick('De sítios da região', 'From local farms') },
    { icon: 'heart' as const, t: pick('Preço justo', 'Fair price'), s: pick('80% vai ao produtor', '80% goes to the grower') },
  ];
  return (
    <div className="ds-scope relative h-full w-full">
      <div className="absolute left-[80px] top-[100px] h-[600px] w-[1040px] overflow-hidden rounded-[22px] shadow-[0_50px_90px_-36px_rgba(42,37,32,0.45)]" style={{ background: 'var(--ds-canvas)' }}>
        <div className="flex h-11 items-center gap-2 border-b px-5" style={{ borderColor: 'var(--ds-border)', background: '#EFE8DC' }}>
          <span className="h-3 w-3 rounded-full bg-[#D9CDBB]" />
          <span className="h-3 w-3 rounded-full bg-[#D9CDBB]" />
          <span className="h-3 w-3 rounded-full bg-[#D9CDBB]" />
        </div>
        <div className="flex h-[770px] w-[1440px] origin-top-left flex-col" style={{ transform: `scale(${scale})` }}>
          <div className="flex h-10 shrink-0 items-center justify-center text-[11px] font-bold uppercase tracking-[1.5px]" style={{ background: 'var(--ds-secondary)', color: 'var(--ds-on-secondary)' }}>
            {pick('Pedidos até 22h chegam amanhã  ·  Frete grátis acima de R$ 80', 'Order by 10pm, get it tomorrow  ·  Free delivery over R$ 80')}
          </div>
          <div className="flex h-20 shrink-0 items-center border-b px-[100px]" style={{ background: 'var(--ds-surface)', borderColor: 'var(--ds-border)' }}>
            <span className="text-[34px] font-semibold leading-none" style={{ fontFamily: 'var(--ds-heading)', color: 'var(--ds-secondary)' }}>
              Feirô
            </span>
            <span className="ml-16 flex gap-10 text-[14px] font-medium" style={{ color: 'var(--ds-muted)' }}>
              <span>{pick('Hortifruti', 'Produce')}</span>
              <span>{pick('Laticínios', 'Dairy')}</span>
              <span>{pick('Padaria', 'Bakery')}</span>
              <span>{pick('Produtores', 'Growers')}</span>
              <span>{pick('Como funciona', 'How it works')}</span>
            </span>
            <span className="ml-auto flex h-11 w-[220px] items-center gap-2.5 rounded-[10px] border-[1.5px] px-3.5 text-[14px]" style={{ borderColor: 'var(--ds-border)', background: 'var(--ds-canvas)', color: 'var(--ds-muted)' }}>
              <FeiroIcon name="search" />
              {pick('Buscar alimentos', 'Search food')}
            </span>
            <span className="ml-6 text-[14px] font-medium">{pick('Entrar', 'Sign in')}</span>
            <span className="ml-6 flex h-11 items-center gap-2 rounded-full pl-4 pr-3 text-[14px] font-bold" style={{ background: 'var(--ds-text)', color: 'var(--ds-surface)' }}>
              <FeiroIcon name="bag" />
              {pick('Sacola', 'Bag')}
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-[11px]" style={{ background: 'var(--ds-primary)', color: 'var(--ds-on-primary)' }}>
                3
              </span>
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: 'var(--ds-success)' }}>
              {pick('Colheita de terça · 21 de outubro', 'Tuesday harvest · October 21')}
            </p>
            <p className="mt-5 text-[52px] leading-[1.1]" style={{ fontFamily: 'var(--ds-heading)' }}>
              {pick('Da feira para a sua mesa.', 'From market to table.')}
            </p>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed" style={{ color: 'var(--ds-muted)' }}>
              {pick('Alimentos de sítios a menos de 100 km, com o nome de quem plantou e colheita no dia anterior.', 'Food from farms under 100 km away, with the grower’s name and picked the day before.')}
            </p>
            <div className="mt-10 flex items-center gap-6">
              <span className="ds-btn ds-btn--primary h-12 px-8 text-[16px]">{pick('Ver colheita da semana', 'See this week’s harvest')}</span>
              <span className="flex items-center gap-1 text-[16px] font-bold">
                {pick('Como funciona', 'How it works')}
                <FeiroIcon name="chevron" stroke={2} />
              </span>
            </div>
            <div className="mt-12 flex gap-16 border-t px-20 pt-8 text-left" style={{ borderColor: 'var(--ds-border)' }}>
              {trust.map((it) => (
                <div key={it.t} className="flex items-start gap-3">
                  <span style={{ color: 'var(--ds-success)' }}>
                    <FeiroIcon name={it.icon} size={24} stroke={1.5} />
                  </span>
                  <span className="text-[14px] leading-[1.45]">
                    <span className="block font-bold">{it.t}</span>
                    <span className="block" style={{ color: 'var(--ds-muted)' }}>
                      {it.s}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiranteScene() {
  const pick = usePick();
  const nav = [pick('Visão geral', 'Overview'), pick('Receita', 'Revenue'), pick('Usuários', 'Users'), pick('Contas', 'Accounts'), pick('Relatórios', 'Reports')];
  return (
    <div className="ds-scope relative h-full w-full">
      <span
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(#273149 1px, transparent 1px), linear-gradient(90deg, #273149 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(70% 70% at 50% 50%, black, transparent)',
        }}
      />
      <div className="absolute left-[190px] top-[110px] flex h-[580px] w-[820px] overflow-hidden rounded-[18px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]" style={{ background: 'var(--ds-canvas)', boxShadow: 'inset 0 0 0 1px var(--ds-border), 0 40px 90px -30px rgba(0,0,0,0.8)' }}>
      <aside className="flex w-[170px] shrink-0 flex-col gap-1 border-r p-6" style={{ borderColor: 'var(--ds-border)', background: 'var(--ds-surface)' }}>
        <span className="mb-8 flex items-center gap-2.5 text-[20px] font-semibold">
          <span className="h-6 w-6 rounded-md" style={{ background: 'var(--ds-primary)' }} />
          Mirante
        </span>
        {nav.map((n, i) => (
          <span
            key={n}
            className="rounded-lg px-3 py-2.5 text-[14px]"
            style={i === 0 ? { background: 'var(--ds-secondary)', color: 'var(--ds-text)' } : { color: 'var(--ds-muted)' }}
          >
            {n}
          </span>
        ))}
      </aside>
      <main className="min-w-0 flex-1 space-y-5 p-7">
        <div className="flex items-center justify-between">
          <p className="text-[28px] font-semibold">{pick('Visão geral', 'Overview')}</p>
          <span className="rounded-md px-3 py-1.5 text-[12px] font-medium" style={{ background: 'var(--ds-secondary)', color: 'var(--ds-muted)' }}>
            {pick('Últimos 6 meses', 'Last 6 months')}
          </span>
        </div>
        <MiranteKpis />
        <MiranteChart />
      </main>
      </div>
    </div>
  );
}

/** Conteúdo da capa gerada, por estudo. */
export function CoverScene({ slug }: { slug: CaseSlug }) {
  switch (slug) {
    case 'acalanto':
      return <AcalantoScene />;
    case 'feiro':
      return <FeiroScene />;
    case 'mirante':
      return <MiranteScene />;
    default:
      return null;
  }
}

export function SignatureComponents({ slug }: { slug: CaseSlug }) {
  const pick = usePick();

  switch (slug) {
    case 'idwall':
      return (
        <div className="grid gap-5 lg:grid-cols-2">
          <Specimen label={pick('Botões · estados do style guide', 'Buttons · style guide states')} width={560} className="lg:col-span-2">
            <IdwallButtons />
          </Specimen>
          <Specimen label={pick('Navegação · menu com estado ativo', 'Navigation · menu with active state')} width={520} className="lg:col-span-2">
            <IdwallNav />
          </Specimen>
          <Specimen label={pick('Formulário · vazio, erro e sucesso', 'Form · empty, error, and success')} width={440} surface="surface">
            <IdwallForm />
          </Specimen>
          <Specimen label={pick('Accordion · abrir e fechar', 'Accordion · expand and collapse')} width={400} surface="surface">
            <IdwallAccordion />
          </Specimen>
        </div>
      );
    case 'idsummit':
      return (
        <div className="grid gap-5 lg:grid-cols-5">
          <Specimen label={pick('Hero · selo de data vertical', 'Hero · vertical date stamp')} width={600} className="lg:col-span-5">
            <SummitHero />
          </Specimen>
          <Specimen label={pick('Programação · período e sessões', 'Schedule · period and sessions')} width={520} className="lg:col-span-3">
            <SummitAgenda />
          </Specimen>
          <Specimen label={pick('Card de speaker', 'Speaker card')} width={320} className="lg:col-span-2" surface="surface">
            <div className="grid grid-cols-2 gap-3">
              <SummitSpeaker name={pick('Nome Sobrenome', 'Full Name')} role="Head of Cybersecurity" tint={0} />
              <SummitSpeaker name={pick('Nome Sobrenome', 'Full Name')} role="Product Owner" tint={20} />
            </div>
          </Specimen>
        </div>
      );
    case 'cacau':
      return (
        <div className="grid gap-5 md:grid-cols-3">
          <Specimen label={pick('Medidor de limite', 'Limit gauge')} width={280}>
            <CacauGauge />
          </Specimen>
          <Specimen label={pick('Seletor de data', 'Date picker')} width={280}>
            <CacauCalendar />
          </Specimen>
          <Specimen label={pick('Estado vazio', 'Empty state')} width={280}>
            <CacauEmpty />
          </Specimen>
        </div>
      );
    case 'acalanto':
      return (
        <div className="grid gap-5 lg:grid-cols-5">
          <Specimen label={pick('Agendamento · seleção de horário', 'Booking · time selection')} width={380} className="lg:col-span-2">
            <AcalantoAppointment />
          </Specimen>
          <Specimen label={pick('Sinais vitais · cor + ícone + texto', 'Vitals · colour + icon + text')} width={540} className="lg:col-span-3">
            <AcalantoVitals />
          </Specimen>
        </div>
      );
    case 'feiro':
      return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Specimen label={pick('Card de produto · seletor de quantidade', 'Product card · quantity selector')} width={300}>
            <FeiroProduct name={pick('Tomate italiano', 'Roma tomato')} farm="Sítio das Maritacas" km={42} price={12.9} hue="#C8452D" />
          </Specimen>
          <Specimen label={pick('Card de produto · outro conteúdo', 'Product card · different content')} width={300}>
            <FeiroProduct name={pick('Abóbora cabotiá', 'Kabocha squash')} farm="Chácara Pé de Serra" km={68} price={7.5} hue="#E3A93B" />
          </Specimen>
          <Specimen label={pick('Bloco editorial', 'Editorial block')} width={340} className="md:col-span-2 lg:col-span-1">
            <FeiroStory />
          </Specimen>
        </div>
      );
    case 'mirante':
      return (
        <div className="grid gap-5">
          <Specimen label={pick('KPI tiles · números tabulares', 'KPI tiles · tabular figures')} width={620}>
            <MiranteKpis />
          </Specimen>
          <div className="grid gap-5 lg:grid-cols-5">
            <Specimen label={pick('Gráfico · legenda interativa', 'Chart · interactive legend')} width={480} className="lg:col-span-3">
              <MiranteChart />
            </Specimen>
            <Specimen label={pick('Tabela · status', 'Table · status')} width={440} className="lg:col-span-2">
              <MiranteTable />
            </Specimen>
          </div>
        </div>
      );
  }
}
