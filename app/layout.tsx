import type { Metadata } from "next";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexa Cruz — UX & Front-end",
  description:
    "Portfólio de UX Design e desenvolvimento front-end. Experiências digitais claras e performáticas.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark';document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg font-sans text-fg">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInit}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
