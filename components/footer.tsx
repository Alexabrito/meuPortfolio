'use client';

import { useLocale } from '@/app/providers';
import { CopyEmailButton } from '@/components/copy-email-button';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </svg>
  );
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alexa-brito',
    Icon: LinkedInIcon,
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/alexabcruz32c4/projects',
    Icon: BehanceIcon,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5511950460426',
    Icon: WhatsAppIcon,
  },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer id="contato" className="scroll-mt-28">
      <div className="border-t border-line/80 bg-gradient-to-b from-bg via-bg to-fg/[0.02] px-6 py-20 dark:to-white/[0.03] md:px-10 md:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="surface-solid-card px-8 py-14 md:px-12 md:py-16 lg:px-14 lg:py-20">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl dark:bg-accent/15"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[min(100%,28rem)] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10"
              aria-hidden
            />
            <div
              className="noise-overlay pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-[0.22] mix-blend-overlay dark:opacity-[0.14]"
              aria-hidden
            />

            <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
              <div className="max-w-xl lg:max-w-lg">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  {t.footer.eyebrow}
                </p>
                <h2 className="mt-5 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-fg">
                  {t.footer.title}
                </h2>
                <div className="mt-5 space-y-4 text-pretty">
                  {t.footer.body.split(/\n\n+/).map((block, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-muted md:text-lg"
                    >
                      {block.trim()}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
                <nav aria-label="Social">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {t.footer.socialLabel}
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {socials.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-bg text-muted transition-all duration-300 hover:border-accent hover:bg-accent/5 hover:text-accent dark:bg-bg/50"
                          aria-label={label}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="sm:border-l sm:border-line/80 sm:pl-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {t.footer.emailLabel}
                  </p>
                  <CopyEmailButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line/60 bg-bg px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Alexa Cruz. {t.footer.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
