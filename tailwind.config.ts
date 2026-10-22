import type { Config } from "tailwindcss";

const withAlpha = (v: string) =>
  `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // color-mix permite modificadores de opacidade (bg-accent/10) com cores em variável CSS.
      colors: {
        bg: withAlpha("--bg"),
        fg: withAlpha("--fg"),
        muted: withAlpha("--muted"),
        accent: withAlpha("--accent"),
        card: withAlpha("--card"),
        line: withAlpha("--line"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        theme: "420ms",
      },
    },
  },
  plugins: [],
};
export default config;
