"use client";

import { useTheme, useLocale } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function Header() {
  const { theme, toggle } = useTheme();
  const { t, locale, toggleLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Fora da home (páginas de case), as âncoras apontam de volta para "/".
  const base = usePathname() === "/" ? "" : "/";
  const nav = useMemo(
    () => [
      { href: `${base}#inicio`, label: t.nav.home },
      { href: `${base}#projetos`, label: t.nav.projects },
      { href: `${base}#stack`, label: t.nav.stack },
      { href: `${base}#manifesto`, label: t.nav.statement },
      { href: "#contato", label: t.nav.contact },
    ],
    [t.nav, base],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const id = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [menuOpen]);

  const navAria = locale === "pt" ? "Seções" : "Sections";

  const linkClassDesktop =
    "shrink-0 whitespace-nowrap transition-colors duration-300 hover:text-accent";
  const linkClassMobile =
    "block rounded-xl px-4 py-3.5 text-base font-medium text-fg transition-colors hover:bg-accent/10 hover:text-accent";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="header-glass pointer-events-none absolute inset-0" aria-hidden />

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-[45] bg-fg/35 backdrop-blur-sm md:hidden"
          aria-label={t.header.menuBackdrop}
          onClick={closeMenu}
        />
      )}

      <div className="relative z-[60] mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4 md:gap-6 md:px-10 md:py-5">
        <a
          href={`${base}#inicio`}
          className="shrink-0 font-sans text-lg font-semibold tracking-tight text-fg transition-opacity hover:opacity-80"
          onClick={closeMenu}
        >
          Alexa Cruz
        </a>

        <nav
          aria-label={navAria}
          className="hidden flex-1 justify-center gap-3 text-sm font-normal text-fg md:flex md:gap-6"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={linkClassDesktop}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/40 text-fg shadow-sm backdrop-blur-md transition-all duration-theme ease-smooth hover:border-accent/50 hover:text-accent dark:border-white/20 dark:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-nav"
            aria-label={menuOpen ? t.header.menuClose : t.header.menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
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

      <nav
        id="site-mobile-nav"
        aria-label={navAria}
        className={`relative z-[60] border-line bg-bg/95 shadow-lg backdrop-blur-xl dark:bg-bg/98 md:hidden ${
          menuOpen
            ? "max-h-[min(70vh,calc(100dvh-4.5rem))] overflow-y-auto border-b"
            : "hidden max-h-0 overflow-hidden border-0"
        }`}
      >
        <ul className="mx-auto max-w-6xl list-none px-6 pb-6 pt-1 md:px-10">
          {nav.map((item, i) => (
            <li key={item.href}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                className={linkClassMobile}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
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
      aria-hidden
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
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
