"use client";

import { useLocale } from "@/app/providers";
import { useCallback, useState } from "react";

const EMAIL = "alexab.cruzz@gmail.com";

/** E-mail sempre visível (link mailto) + botão de copiar com aviso para leitores de tela. */
export function CopyEmailButton() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-start gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="whitespace-nowrap text-lg font-medium text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent md:text-xl"
      >
        {EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-sm text-fg transition-all duration-300 hover:border-accent hover:text-accent"
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>{t.copyEmail.copied}</span>
          </>
        ) : (
          <>
            <CopyIcon className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
            <span>{t.copyEmail.copy}</span>
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? t.copyEmail.copiedLive : ""}
      </span>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
