"use client";

import { useTheme, useLocale } from "@/app/providers";
import { useMemo } from "react";

export function Header() {
  const { theme, toggle } = useTheme();
  const { t, locale, toggleLocale } = useLocale();

  const nav = useMemo(
    () => [
      { href: "#inicio", label: t.nav.home },
      { href: "#projetos", label: t.nav.projects },
      { href: "#stack", label: t.nav.stack },
      { href: "#manifesto", label: t.nav.statement },
      { href: "#contato", label: t.nav.contact },
    ],
    [t.nav],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Sem overflow:hidden — quebra backdrop-filter no WebKit */}
      <div className="header-glass pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 md:gap-6 md:px-10 md:py-5">
        <a
          href="#inicio"
          className="shrink-0 font-sans text-lg font-semibold tracking-tight text-fg transition-opacity hover:opacity-80"
        >
          Alexa Cruz
        </a>

        <nav
          aria-label={locale === "pt" ? "Seções" : "Sections"}
          className="-mx-1 flex max-w-[48vw] flex-1 justify-end gap-2.5 overflow-x-auto px-1 text-sm font-normal text-fg sm:max-w-none sm:justify-center sm:gap-3 md:gap-6"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex h-10 min-w-[2.75rem] items-center justify-center rounded-full border border-black/10 bg-white/40 font-mono text-xs font-semibold uppercase tracking-wider text-fg shadow-sm backdrop-blur-md transition-all duration-theme ease-smooth hover:border-accent/50 hover:text-accent dark:border-white/20 dark:bg-white/10"
            aria-label={t.header.langAria}
          >
            {t.header.langShort}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/40 text-fg shadow-sm backdrop-blur-md transition-all duration-theme ease-smooth hover:border-accent/50 hover:text-accent dark:border-white/20 dark:bg-white/10"
            aria-label={
              theme === "dark" ? t.header.themeLight : t.header.themeDark
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
