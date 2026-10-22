import {
  DM_Sans,
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Poppins,
} from "next/font/google";

/*
 * Famílias dos design systems dos estudos de caso.
 * `preload: false` — só baixam quando um especime as usa.
 */
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins", preload: false });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-outfit", preload: false });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jakarta", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-fraunces", preload: false });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dmsans", preload: false });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex", preload: false });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", preload: false });

export const caseFontVariables = [poppins, outfit, jakarta, fraunces, dmSans, plex, plexMono]
  .map((f) => f.variable)
  .join(" ");
