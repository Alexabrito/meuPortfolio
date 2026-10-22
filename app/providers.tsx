"use client";

import { Header } from "@/components/header";
import {
  getMessages,
  type Locale,
  STORAGE_LOCALE_KEY,
} from "@/lib/i18n";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: ReturnType<typeof getMessages>;
} | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme dentro de Providers");
  return ctx;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale dentro de Providers");
  return ctx;
}

function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem("theme");
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_LOCALE_KEY);
    if (v === "pt" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = readStoredLocale();
    const resolved: Locale = stored ?? "pt";
    setLocaleState(resolved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_LOCALE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "pt" ? "en" : "pt";
      try {
        localStorage.setItem(STORAGE_LOCALE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const t = useMemo(() => getMessages(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Começa igual ao HTML estático (light); o efeito abaixo aplica o tema salvo — evita mismatch de hidratação.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = readStoredTheme();
    const resolved: Theme = stored ?? "light";
    setTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Atualiza --pointer-x/y no máximo 1x por frame (passive). */
export function PointerField() {
  const raf = useRef<number>(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const flush = () => {
      raf.current = 0;
      const p = pending.current;
      if (!p) return;
      const xp = (p.x / window.innerWidth) * 100;
      const yp = (p.y / window.innerHeight) * 100;
      root.style.setProperty("--pointer-x", `${xp}%`);
      root.style.setProperty("--pointer-y", `${yp}%`);
      pending.current = null;
    };

    const onMove = (e: MouseEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (raf.current === 0) {
        raf.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div className="pointer-field" aria-hidden />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <PointerField />
        {/* Header fora do wrapper z-[1] para backdrop-filter compor o blur sobre o conteúdo */}
        <Header />
        <div className="relative z-[1] min-h-0">{children}</div>
      </LocaleProvider>
    </ThemeProvider>
  );
}
