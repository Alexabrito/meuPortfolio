"use client";

import { useLocale } from "@/app/providers";
import { useCallback, useState } from "react";

const EMAIL = "alexab.cruzz@gmail.com";

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
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 font-mono text-sm text-fg transition-all duration-300 hover:border-accent hover:text-accent"
    >
      {copied ? (
        <>
          <CheckIcon className="h-4 w-4 text-accent" />
          <span>{t.copyEmail.copied}</span>
        </>
      ) : (
        <>
          <MailIcon className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
          <span>{t.copyEmail.copy}</span>
        </>
      )}
    </button>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
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
