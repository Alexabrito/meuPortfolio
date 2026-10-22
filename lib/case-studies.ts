import type { Locale } from "./i18n";

/** Texto bilíngue, todo conteúdo dos estudos de caso passa por aqui. */
export type L = { pt: string; en: string };

const l = (pt: string, en: string): L => ({ pt, en });

export function tx(value: L, locale: Locale) {
  return value[locale];
}

export type CaseSlug =
  | "idwall"
  | "idsummit"
  | "cacau"
  | "acalanto"
  | "feiro"
  | "mirante";

/** Tokens usados para renderizar os componentes vivos de cada design system. */
export type DsTheme = {
  font: string;
  heading: string;
  mono?: string;
  primary: string;
  primaryHover: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  focus: string;
  /** Raio de cards/superfícies. */
  radius: number;
  /** Raio de botões e campos (999 = pílula). */
  controlRadius: number;
  dark?: boolean;
};

export type Swatch = { name: L; token: string; hex: string; usage?: L };

export type TypeStyle = {
  token: string;
  label: string;
  size: number;
  lineHeight: number;
  weight: number;
  tracking?: number;
  upper?: boolean;
  font?: "heading" | "body" | "mono";
};

export type SignatureKey = CaseSlug;

export type DesignSystem = {
  name: string;
  intro: L;
  principles: { title: L; body: L }[];
  colors: { title: L; swatches: Swatch[] }[];
  fonts: {
    family: string;
    stack: string;
    role: L;
    weights: number[];
    note?: L;
  }[];
  typeScale: TypeStyle[];
  spacing: { token: string; px: number }[];
  radii: { token: string; px: number }[];
  elevation: { token: string; value: string }[];
  grid: {
    label: L;
    columns: number;
    gutter: number;
    margin: number;
    container: string;
  }[];
  theme: DsTheme;
};

export type CaseStudy = {
  slug: CaseSlug;
  kind: "client" | "academic";
  title: L;
  short: L;
  category: L;
  year: string;
  context: L;
  role: L;
  duration: L;
  tools: string[];
  deliverables: L[];
  tags: L[];
  link?: { url: string; label: L };
  /** Imagem de capa; `null` = capa gerada a partir dos tokens. */
  cover: string | null;
  gallery: { src: string; caption: L }[];
  overview: { problem: L; approach: L; outcome: L };
  metrics?: { value: string; label: L }[];
  process: { title: L; body: L }[];
  ds: DesignSystem;
  learnings: L[];
};

const FONT = {
  fellix: "var(--font-outfit), 'Fellix', system-ui, sans-serif",
  poppins: "var(--font-poppins), system-ui, sans-serif",
  jakarta: "var(--font-jakarta), system-ui, sans-serif",
  fraunces: "var(--font-fraunces), Georgia, serif",
  dmsans: "var(--font-dmsans), system-ui, sans-serif",
  plex: "var(--font-plex), system-ui, sans-serif",
  plexMono: "var(--font-plex-mono), ui-monospace, monospace",
};

/* ------------------------------------------------------------------ */
/* idwall                                                              */
/* ------------------------------------------------------------------ */

const idwall: CaseStudy = {
  slug: "idwall",
  kind: "client",
  title: l("Site idwall", "idwall website"),
  short: l(
      "Presença digital da referência em identidade na América Latina, construída sobre clareza, confiança e ritmo visual.",
      "Digital presence for Latin America’s identity leader, built on clarity, trust, and visual rhythm.",
    ),
  category: l("Site institucional · B2B", "Corporate website · B2B"),
  year: "2025",
  context: l("idwall · identidade digital e prevenção a fraudes", "idwall · digital identity & fraud prevention"),
  role: l("UX/UI Design · Front-end", "UX/UI Design · Front-end"),
  duration: l("Projeto contínuo", "Ongoing project"),
  tools: ["Figma", "Next.js", "React"],
  deliverables: [
    l("Arquitetura de informação", "Information architecture"),
    l("UI de páginas e templates", "Page & template UI"),
    l("Biblioteca de componentes", "Component library"),
    l("Implementação front-end", "Front-end implementation"),
  ],
  tags: [l("UX", "UX"), l("Web", "Web"), l("Marca", "Brand")],
  link: { url: "https://idwall.co", label: l("Ver site da idwall", "Visit idwall.co") },
  cover: "/projects/idwall/mock02.png",
  gallery: [
    {
      src: "/projects/idwall/mock02.png",
      caption: l(
      "Página de IA: tipografia expressiva, com a promessa destacada em semibold.",
      "AI page: expressive typography, with the promise set in semibold.",
    ),
    },
    {
      src: "/projects/idwall/mock01.png",
      caption: l(
      "Home: proposta de valor direta e card de verificação biométrica como prova visual.",
      "Home: a direct value proposition and a biometric check card as visual proof.",
    ),
    },
    {
      src: "/projects/idwall/mock03.png",
      caption: l(
      "Página de produto: overline, lista de benefícios com ícones e CTA de demonstração.",
      "Product page: overline, icon-led benefits list, and a demo CTA.",
    ),
    },
  ],
  overview: {
    problem: l(
      "Identidade digital é um tema técnico e denso. O site precisava conversar com decisores de risco, compliance e produto sem perder clareza, e sustentar um portfólio crescente de soluções sem que cada página parecesse um site diferente.",
      "Digital identity is a technical, dense subject. The site had to speak to risk, compliance, and product decision-makers without losing clarity, and support a growing solution portfolio without every page feeling like a different site.",
    ),
    approach: l("Com a identidade e o style guide como base, o trabalho seguiu na manutenção e evolução da linguagem visual do site. Novas páginas e blocos foram desenhados como componentes reutilizáveis, seguindo a narrativa em camadas (promessa → prova → solução → conversão) e os tokens de cor, espaçamento e tipografia do guia.", "With the identity and style guide as the foundation, the work focused on maintaining and evolving the site’s visual language. New pages and blocks were designed as reusable components, following the layered narrative (promise → proof → solution → conversion) and the guide’s colour, spacing, and type tokens."),
    outcome: l(
      "Um site consistente de ponta a ponta, com hierarquia legível para um público B2B, CTAs claros em cada jornada e uma base de componentes pensada para que novas páginas sejam montadas sem redesenhar do zero.",
      "A consistent site end to end, with readable hierarchy for a B2B audience, clear CTAs in every journey, and a component base designed so new pages are assembled rather than redesigned from scratch.",
    ),
  },
  process: [
    {
      title: l("Descoberta", "Discovery"),
      body: l(
      "Entendimento do ecossistema de produtos, dos públicos e do objetivo de cada página.",
      "Understanding the product ecosystem, the audiences, and each page’s goal.",
    ),
    },
    {
      title: l("Arquitetura", "Architecture"),
      body: l("Apoio na organização do menu em Ecossistema, Soluções, Institucional e Conteúdo, seguindo a narrativa B2B.", "Support in organising the menu into Ecosystem, Solutions, Company, and Content, following the B2B story."),
    },
    {
      title: l("Sistema", "System"),
      body: l("Complemento da biblioteca com novos componentes e estados, sempre a partir dos tokens do style guide.", "Expanding the library with new components and states, always built on the style guide’s tokens."),
    },
    {
      title: l("Entrega", "Delivery"),
      body: l("Evolução das páginas em Next.js e React, com componentes espelhando os do Figma.", "Evolving the pages in Next.js and React, with components mirroring the Figma ones."),
    },
  ],
  ds: {
    name: "idwall DS",
    intro: l(
      "Sistema documentado a partir do style guide oficial do projeto: tokens nomeados, escala de espaçamento de quarck a giant e componentes em todos os estados.",
      "A system documented from the project’s official style guide: named tokens, a spacing scale from quarck to giant, and components in every state.",
    ),
    principles: [
      {
        title: l("Confiança antes de tudo", "Trust first"),
        body: l(
          "Roxo profundo e muito respiro: a interface transmite segurança antes de vender.",
          "Deep purple and generous whitespace: the interface conveys safety before it sells.",
        ),
      },
      {
        title: l("Ênfase com peso, não com cor", "Emphasis through weight, not colour"),
        body: l(
          "Títulos misturam Regular e Semi-Bold na mesma linha para destacar a ideia central.",
          "Headlines mix Regular and Semi-Bold in the same line to spotlight the key idea.",
        ),
      },
      {
        title: l("Estados explícitos", "Explicit states"),
        body: l(
      "Todo componente interativo tem hover, active e focus visíveis, com transição de 0.5s ease-out.",
      "Every interactive component has visible hover, active, and focus states, with a 0.5s ease-out transition.",
    ),
      },
    ],
    colors: [
      {
        title: l("Marca", "Brand"),
        swatches: [
          { name: l("Brand Primary Dark", "Brand Primary Dark"), token: "$color-brand-primary-dark", hex: "#260066", usage: l("Hover de CTA, fundos densos", "CTA hover, dense backgrounds") },
          { name: l("Brand Primary", "Brand Primary"), token: "$color-brand-primary", hex: "#4500BA", usage: l("CTAs, links, destaques", "CTAs, links, highlights") },
          { name: l("Brand Primary Light", "Brand Primary Light"), token: "$color-brand-primary-light", hex: "#F6F2FC", usage: l("Fundos de seção e chips", "Section backgrounds and chips") },
        ],
      },
      {
        title: l("Neutras", "Neutrals"),
        swatches: [
          { name: l("Black", "Black"), token: "$color-neutral-low-dark", hex: "#000000" },
          { name: l("Dark Grey", "Dark Grey"), token: "$color-neutral-low-medium", hex: "#4D4D4D" },
          { name: l("Medium Grey", "Medium Grey"), token: "$color-neutral-low-light", hex: "#C7C7C7" },
          { name: l("Grey", "Grey"), token: "$color-neutral-high-dark", hex: "#E3E3E3" },
          { name: l("Light Grey", "Light Grey"), token: "$color-neutral-high-medium", hex: "#F6F6F6" },
          { name: l("White", "White"), token: "$color-neutral-high-light", hex: "#FFFFFF" },
        ],
      },
      {
        title: l("Feedback", "Feedback"),
        swatches: [
          { name: l("Success", "Success"), token: "$color-feedback-success", hex: "#009606" },
          { name: l("Warning", "Warning"), token: "$color-feedback-warning", hex: "#FFB938" },
          { name: l("Critical", "Critical"), token: "$color-feedback-critical", hex: "#D10303" },
        ],
      },
    ],
    fonts: [
      {
        family: "Fellix",
        stack: FONT.fellix,
        role: l("Família única para títulos, texto e interface", "One family for headlines, body, and UI"),
        weights: [300, 400, 600],
        note: l(
      "Fellix é uma fonte paga; os exemplos ao vivo usam Outfit, uma geométrica gratuita de desenho parecido.",
      "Fellix is a paid typeface; live specimens use Outfit, a free geometric face with a similar design.",
    ),
      },
    ],
    typeScale: [
      { token: "$headline-extra-large", label: "Headline Extra Large", size: 46, lineHeight: 1.2, weight: 400 },
      { token: "$headline-large", label: "Headline Large", size: 38, lineHeight: 1.3, weight: 400 },
      { token: "$headline-medium", label: "Headline Medium", size: 32, lineHeight: 1.3, weight: 400 },
      { token: "$headline-extra-small", label: "Headline Extra Small", size: 24, lineHeight: 1.3, weight: 600 },
      { token: "$body-large", label: "Body Extra Large", size: 22, lineHeight: 1.5, weight: 400 },
      { token: "$body-medium", label: "Body Medium", size: 18, lineHeight: 1.5, weight: 400 },
      { token: "$body-small", label: "Body Small", size: 16, lineHeight: 1.4, weight: 400 },
      { token: "$body-extra-small", label: "Body Extra Small", size: 14, lineHeight: 1.3, weight: 400 },
      { token: "$button-large", label: "Button Large", size: 16, lineHeight: 1, weight: 600, tracking: 0.5 },
      { token: "$overline-large", label: "Overline Large", size: 14, lineHeight: 1.3, weight: 600, tracking: 2, upper: true },
      { token: "$overline-small", label: "Overline Small", size: 12, lineHeight: 1.3, weight: 600, tracking: 2, upper: true },
    ],
    spacing: [
      { token: "quarck", px: 4 },
      { token: "nano", px: 8 },
      { token: "xxxs", px: 12 },
      { token: "xxs", px: 16 },
      { token: "xs", px: 24 },
      { token: "sm", px: 32 },
      { token: "md", px: 40 },
      { token: "lg", px: 48 },
      { token: "xl", px: 80 },
      { token: "xxl", px: 120 },
      { token: "xxxl", px: 160 },
      { token: "giant", px: 200 },
    ],
    radii: [
      { token: "input", px: 4 },
      { token: "button", px: 6 },
      { token: "card", px: 16 },
    ],
    elevation: [],
    grid: [
      { label: l("Desktop · 1400px", "Desktop · 1400px"), columns: 12, gutter: 32, margin: 92, container: "1216px" },
      { label: l("Mobile · 375px", "Mobile · 375px"), columns: 4, gutter: 32, margin: 16, container: "343px" },
    ],
    theme: {
      font: FONT.fellix,
      heading: FONT.fellix,
      primary: "#4500BA",
      primaryHover: "#260066",
      onPrimary: "#FFFFFF",
      secondary: "#F6F2FC",
      onSecondary: "#4500BA",
      canvas: "#F6F6F6",
      surface: "#FFFFFF",
      text: "#000000",
      muted: "#4D4D4D",
      border: "#C7C7C7",
      success: "#009606",
      warning: "#FFB938",
      danger: "#D10303",
      focus: "#D10303",
      radius: 16,
      controlRadius: 6,
    },
  },
  learnings: [
    l(
      "Documentar todos os estados no Figma, inclusive o focus, evita idas e voltas na implementação.",
      "Documenting every state in Figma, focus included, avoids back-and-forth during build.",
    ),
    l(
      "Nomear tokens pelo papel (brand-primary, neutral-low) e não pelo valor deixa o sistema pronto para evoluir a marca.",
      "Naming tokens by role (brand-primary, neutral-low) rather than value keeps the system ready for brand evolution.",
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* idsummit                                                            */
/* ------------------------------------------------------------------ */

const idsummit: CaseStudy = {
  slug: "idsummit",
  kind: "client",
  title: l("idsummit", "idsummit"),
  short: l(
      "Landing page do evento: confiança, programação e um caminho claro até a inscrição.",
      "Event landing page: trust, schedule, and a clear path to registration.",
    ),
  category: l("Landing page · Evento", "Landing page · Event"),
  year: "2025",
  context: l("idsummit · evento anual de identidade digital da idwall", "idsummit · idwall’s annual digital identity event"),
  role: l("UX/UI Design · Front-end", "UX/UI Design · Front-end"),
  duration: l("Ciclo do evento", "Event cycle"),
  tools: ["Figma", "HTML", "CSS"],
  deliverables: [
    l("Landing page responsiva", "Responsive landing page"),
    l("Sistema visual do evento", "Event visual system"),
    l("Componentes de agenda e speakers", "Agenda and speaker components"),
  ],
  tags: [l("UX", "UX"), l("Evento", "Event"), l("Landing", "Landing")],
  link: { url: "https://idsummit.com.br/", label: l("Ver idsummit.com.br", "Visit idsummit.com.br") },
  cover: "/projects/idsummit/mock04.png",
  gallery: [
    {
      src: "/projects/idsummit/mock04.png",
      caption: l(
      "Hero: data na vertical como elemento gráfico, promessa curta e formas orgânicas em gradiente.",
      "Hero: a vertical date as a graphic device, a short promise, and organic gradient shapes.",
    ),
    },
    {
      src: "/projects/idsummit/mock05.png",
      caption: l(
      "Speakers: retratos em P&B criam unidade entre fotos de origens diferentes.",
      "Speakers: black-and-white portraits unify photos from different sources.",
    ),
    },
    {
      src: "/projects/idsummit/mock06.png",
      caption: l(
      "Programação: blocos de período em violeta e sessões expansíveis com avatares dos palestrantes.",
      "Schedule: violet period blocks and expandable sessions with speaker avatars.",
    ),
    },
  ],
  overview: {
    problem: l(
      "A página precisa convencer em segundos: o que é o evento, quando, onde, quem fala e por que vale a inscrição. Tudo isso com conteúdo que muda até a véspera: line-up, horários e status de inscrição.",
      "The page has seconds to convince: what the event is, when, where, who’s speaking, and why it’s worth registering. All with content that changes until the last minute: line-up, times, and registration status.",
    ),
    approach: l("O evento ganhou uma sub-marca visual derivada da idwall: o mesmo roxo institucional, levado para um violeta elétrico, com formas orgânicas e a data na vertical como assinatura. Agenda e speakers foram estruturados como componentes orientados a dados, fáceis de atualizar.", "The event got a visual sub-brand derived from idwall: the same institutional purple pushed towards an electric violet, with organic shapes and a vertical date as its signature. Agenda and speakers were structured as data-driven components that are easy to update."),
    outcome: l(
      "Uma landing escaneável, com o essencial acima da dobra e blocos de programação pensados para receber mudanças de última hora sem mexer no layout.",
      "A scannable landing with the essentials above the fold and schedule blocks designed to take last-minute changes without touching the layout.",
    ),
  },
  process: [
    {
      title: l("Hierarquia", "Hierarchy"),
      body: l(
      "Priorização do conteúdo: promessa, data e local, CTA e, só depois, prova social.",
      "Content priority: promise, date and venue, CTA, and only then social proof.",
    ),
    },
    {
      title: l("Sub-marca", "Sub-brand"),
      body: l("Extensão da paleta idwall para um tom mais vibrante e celebrativo.", "Extending the idwall palette into a more vibrant, celebratory tone."),
    },
    {
      title: l("Componentes", "Components"),
      body: l("Agenda, cards de speaker e selo de data desenhados como peças modulares.", "Agenda, speaker cards, and date stamp designed as modular pieces."),
    },
    {
      title: l("Código", "Code"),
      body: l("HTML e CSS leves, priorizando carregamento rápido para tráfego de campanha.", "Lightweight HTML and CSS, prioritising fast loads for campaign traffic."),
    },
  ],
  ds: {
    name: "idsummit Visual System",
    intro: l(
      "Sistema derivado das telas publicadas: violeta elétrico sobre base neutra clara, formas orgânicas e componentes pensados para conteúdo de evento.",
      "A system derived from the published screens: electric violet on a light neutral base, organic shapes, and components built for event content.",
    ),
    principles: [
      {
        title: l("Energia com controle", "Energy with control"),
        body: l("Violeta saturado só em áreas de destaque; o resto respira em cinza claro.", "Saturated violet only where it matters; everything else breathes in light grey."),
      },
      {
        title: l("Pessoas em primeiro plano", "People up front"),
        body: l(
      "Retratos em P&B e nomes em destaque: o line-up é o argumento.",
      "Black-and-white portraits and prominent names: the line-up is the argument.",
    ),
      },
      {
        title: l("Escaneável", "Scannable"),
        body: l("Horários alinhados, blocos por período e detalhes sob demanda.", "Aligned times, blocks by period, and details on demand."),
      },
    ],
    colors: [
      {
        title: l("Marca", "Brand"),
        swatches: [
          { name: l("Deep Violet", "Deep Violet"), token: "--summit-violet-900", hex: "#3F00B1", usage: l("Base do gradiente do hero", "Hero gradient base") },
          { name: l("Summit Violet", "Summit Violet"), token: "--summit-violet-700", hex: "#4500BB", usage: l("Marca, marcadores e links", "Brand, markers, and links") },
          { name: l("Electric Violet", "Electric Violet"), token: "--summit-violet-500", hex: "#6B00FF", usage: l("Blocos de agenda e CTAs", "Agenda blocks and CTAs") },
          { name: l("Glow", "Glow"), token: "--summit-violet-300", hex: "#8E43FF", usage: l("Formas orgânicas e brilho", "Organic shapes and glow") },
        ],
      },
      {
        title: l("Neutras", "Neutrals"),
        swatches: [
          { name: l("Ink", "Ink"), token: "--summit-ink", hex: "#1A1A1A" },
          { name: l("Graphite", "Graphite"), token: "--summit-graphite", hex: "#373737" },
          { name: l("Mist", "Mist"), token: "--summit-mist", hex: "#F2F2F2" },
          { name: l("White", "White"), token: "--summit-white", hex: "#FFFFFF" },
        ],
      },
    ],
    fonts: [
      {
        family: "Fellix",
        stack: FONT.fellix,
        role: l("Família da marca-mãe, usada em pesos leves para títulos", "Parent-brand family, used in light weights for headlines"),
        weights: [300, 400, 600],
        note: l(
      "Exemplos ao vivo renderizados com Outfit, fonte substituta.",
      "Live specimens rendered with Outfit as a stand-in.",
    ),
      },
    ],
    typeScale: [
      { token: "display", label: "Display", size: 56, lineHeight: 1.05, weight: 400 },
      { token: "h1", label: "Heading 1", size: 40, lineHeight: 1.15, weight: 300 },
      { token: "h2", label: "Heading 2", size: 28, lineHeight: 1.2, weight: 400 },
      { token: "name", label: "Speaker name", size: 18, lineHeight: 1.2, weight: 600 },
      { token: "body", label: "Body", size: 16, lineHeight: 1.5, weight: 400 },
      { token: "caption", label: "Caption", size: 13, lineHeight: 1.4, weight: 400 },
      { token: "time", label: "Time label", size: 12, lineHeight: 1, weight: 600, tracking: 0.5 },
    ],
    spacing: [
      { token: "space-1", px: 4 },
      { token: "space-2", px: 8 },
      { token: "space-3", px: 12 },
      { token: "space-4", px: 16 },
      { token: "space-6", px: 24 },
      { token: "space-8", px: 32 },
      { token: "space-12", px: 48 },
      { token: "space-16", px: 64 },
      { token: "space-24", px: 96 },
      { token: "space-32", px: 128 },
    ],
    radii: [
      { token: "radius-card", px: 12 },
      { token: "radius-block", px: 24 },
      { token: "radius-pill", px: 999 },
    ],
    elevation: [
      { token: "shadow-row", value: "0 2px 10px rgba(0,0,0,0.06)" },
      { token: "glow-violet", value: "0 20px 60px -20px rgba(107,0,255,0.55)" },
    ],
    grid: [
      { label: l("Desktop", "Desktop"), columns: 12, gutter: 24, margin: 80, container: "1200px" },
      { label: l("Mobile", "Mobile"), columns: 4, gutter: 16, margin: 20, container: "100%" },
    ],
    theme: {
      font: FONT.fellix,
      heading: FONT.fellix,
      primary: "#6B00FF",
      primaryHover: "#4500BB",
      onPrimary: "#FFFFFF",
      secondary: "#FFFFFF",
      onSecondary: "#1A1A1A",
      canvas: "#F2F2F2",
      surface: "#FFFFFF",
      text: "#1A1A1A",
      muted: "#5C5C5C",
      border: "#E0E0E0",
      success: "#0F9D58",
      warning: "#F5A524",
      danger: "#D93025",
      focus: "#8E43FF",
      radius: 12,
      controlRadius: 999,
    },
  },
  learnings: [
    l(
      "Tratar agenda e speakers como dados, e não como layout, é o que permite atualizar a página até a véspera sem retrabalho.",
      "Treating agenda and speakers as data, not layout, is what lets the page be updated up to the day before without rework.",
    ),
    l(
      "Uma sub-marca funciona melhor quando herda a estrutura da marca-mãe e muda só a temperatura.",
      "A sub-brand works best when it inherits the parent’s structure and only changes the temperature.",
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* Cacau                                                               */
/* ------------------------------------------------------------------ */

const cacau: CaseStudy = {
  slug: "cacau",
  kind: "client",
  title: l("Proposta de layout — Cacau", "Layout proposal — Cacau"),
  short: l(
    "App de antecipação de recebíveis: um fluxo financeiro denso traduzido em telas leves e calorosas.",
    "A receivables-financing app: a dense financial flow translated into light, warm screens.",
  ),
  category: l("App mobile · Fintech", "Mobile app · Fintech"),
  year: "2019",
  context: l("Cacau · antecipação de títulos para empresas", "Cacau · invoice financing for businesses"),
  role: l("UI Design · Proposta visual", "UI Design · Visual proposal"),
  duration: l("Proposta de layout", "Layout proposal"),
  tools: ["Figma"],
  deliverables: [
    l("Telas-chave do app", "Key app screens"),
    l("Linguagem visual", "Visual language"),
    l("Kit de componentes", "Component kit"),
  ],
  tags: [l("UI", "UI"), l("Mobile", "Mobile"), l("Fintech", "Fintech")],
  link: {
    url: "https://www.behance.net/gallery/139749369/Proposta-de-Layuot-Cacau",
    label: l("Ver no Behance", "View on Behance"),
  },
  cover: "/projects/cacau/mock07.png",
  gallery: [
    {
      src: "/projects/cacau/mock07.png",
      caption: l(
      "Login: foto com overlay laranja, campos em pílula e CTA âmbar em destaque.",
      "Login: a photo with an orange overlay, pill fields, and a standout amber CTA.",
    ),
    },
    {
      src: "/projects/cacau/mock08.png",
      caption: l(
        "Biometria, dashboard de limite, inclusão de título com calendário e estado vazio ilustrado.",
        "Biometrics, limit dashboard, invoice entry with a date picker, and an illustrated empty state.",
      ),
    },
  ],
  overview: {
    problem: l(
      "Antecipação de recebíveis envolve CNPJ, XML de nota fiscal, datas e limites de crédito. É um fluxo intimidador para pequenos empresários, e a proposta precisava torná-lo acolhedor sem perder a seriedade financeira.",
      "Receivables financing involves tax IDs, invoice XML files, dates, and credit limits. It’s an intimidating flow for small business owners, and the proposal had to make it welcoming without losing financial seriousness.",
    ),
    approach: l("A proposta partiu de uma paleta quente inspirada no próprio cacau, tipografia geométrica arredondada (Poppins) e componentes em pílula. Cada tela foi pensada com uma única ação principal, e o limite de crédito passou a ser exibido como um medidor em vez de uma tabela.", "The proposal started from a warm palette inspired by cacao itself, rounded geometric type (Poppins), and pill-shaped components. Each screen was designed around a single primary action, and the credit limit is shown as a gauge instead of a table."),
    outcome: l(
      "Um conjunto coeso de telas (onboarding, biometria, dashboard, inclusão de título e estados vazios) apresentado como proposta visual para o produto.",
      "A cohesive set of screens (onboarding, biometrics, dashboard, invoice entry, and empty states) presented as a visual proposal for the product.",
    ),
  },
  process: [
    {
      title: l("Referências", "References"),
      body: l("Benchmark de apps financeiros e moodboard de tons terrosos e cítricos.", "Benchmarking finance apps and a moodboard of earthy and citrus tones."),
    },
    {
      title: l("Fluxos", "Flows"),
      body: l("Mapeamento de login, biometria, consulta de limite e nova operação.", "Mapping login, biometrics, limit check, and new operation."),
    },
    {
      title: l("Layout", "Layout"),
      body: l("Telas em alta fidelidade com foco em uma ação por tela.", "High-fidelity screens focused on one action per screen."),
    },
    {
      title: l("Apresentação", "Presentation"),
      body: l("Mockups e publicação do case no Behance.", "Mockups and case publication on Behance."),
    },
  ],
  ds: {
    name: "Cacau UI",
    intro: l(
      "Sistema reconstruído a partir das telas da proposta: cores amostradas diretamente dos layouts, escala tipográfica em Poppins e componentes em pílula.",
      "A system reconstructed from the proposal screens: colours sampled straight from the layouts, a Poppins type scale, and pill-shaped components.",
    ),
    principles: [
      {
        title: l("Caloroso, não infantil", "Warm, not childish"),
        body: l("Laranja como energia; cinzas e branco como seriedade financeira.", "Orange for energy; greys and white for financial seriousness."),
      },
      {
        title: l("Uma ação por tela", "One action per screen"),
        body: l("Um CTA cheio por tela; ações secundárias viram link ou botão de contorno. A exceção são diálogos de confirmação, com o par confirmar/cancelar.", "One filled CTA per screen; secondary actions become links or outline buttons. Confirmation dialogs are the exception, with a confirm/cancel pair."),
      },
      {
        title: l("Números que se leem", "Numbers you can read"),
        body: l("Valores em destaque, rótulos discretos e visualização antes de tabela.", "Prominent values, quiet labels, and visualisation before tables."),
      },
    ],
    colors: [
      {
        title: l("Marca", "Brand"),
        swatches: [
          { name: l("Cacau Orange", "Cacau Orange"), token: "--cacau-orange-600", hex: "#FF6403", usage: l("CTA principal, títulos de tela", "Primary CTA, screen titles") },
          { name: l("Roasted", "Roasted"), token: "--cacau-orange-800", hex: "#D95F14", usage: l("Hover e overlays", "Hover and overlays") },
          { name: l("Tangerine", "Tangerine"), token: "--cacau-orange-400", hex: "#FB8F47", usage: l("Fundos de marca", "Brand backgrounds") },
          { name: l("Peach", "Peach"), token: "--cacau-orange-200", hex: "#FDAE63", usage: l("Fundos de apresentação", "Presentation backgrounds") },
          { name: l("Amber", "Amber"), token: "--cacau-amber-500", hex: "#FFAC12", usage: l("CTA sobre fundo laranja", "CTA on orange backgrounds") },
          { name: l("Cream", "Cream"), token: "--cacau-orange-50", hex: "#FFF2EA", usage: l("Campos e destaques suaves", "Fields and soft highlights") },
        ],
      },
      {
        title: l("Neutras", "Neutrals"),
        swatches: [
          { name: l("Night", "Night"), token: "--cacau-night", hex: "#12121C" },
          { name: l("Slate", "Slate"), token: "--cacau-slate", hex: "#6B6B78" },
          { name: l("Fog", "Fog"), token: "--cacau-fog", hex: "#F5F4F9" },
          { name: l("White", "White"), token: "--cacau-white", hex: "#FFFFFF" },
        ],
      },
      {
        title: l("Feedback", "Feedback"),
        swatches: [
          { name: l("Confirm", "Confirm"), token: "--cacau-success", hex: "#30AF7A" },
          { name: l("Cancel", "Cancel"), token: "--cacau-danger", hex: "#FF5A3C" },
        ],
      },
    ],
    fonts: [
      {
        family: "Poppins",
        stack: FONT.poppins,
        role: l("Família única: geométrica e arredondada", "One family: geometric and rounded"),
        weights: [400, 500, 600],
      },
    ],
    typeScale: [
      { token: "title-xl", label: "Title XL", size: 28, lineHeight: 1.2, weight: 600 },
      { token: "title-lg", label: "Title L", size: 22, lineHeight: 1.25, weight: 600 },
      { token: "value", label: "Value", size: 20, lineHeight: 1.2, weight: 600 },
      { token: "body", label: "Body", size: 16, lineHeight: 1.5, weight: 400 },
      { token: "button", label: "Button", size: 16, lineHeight: 1, weight: 500 },
      { token: "label", label: "Label", size: 13, lineHeight: 1.3, weight: 500 },
      { token: "tab", label: "Tab label", size: 11, lineHeight: 1.2, weight: 500 },
    ],
    spacing: [
      { token: "s-4", px: 4 },
      { token: "s-8", px: 8 },
      { token: "s-12", px: 12 },
      { token: "s-16", px: 16 },
      { token: "s-24", px: 24 },
      { token: "s-32", px: 32 },
      { token: "s-48", px: 48 },
    ],
    radii: [
      { token: "radius-card", px: 8 },
      { token: "radius-sheet", px: 24 },
      { token: "radius-pill", px: 999 },
    ],
    elevation: [
      { token: "shadow-card", value: "0 6px 20px -8px rgba(18,18,28,0.18)" },
      { token: "shadow-cta", value: "0 10px 24px -10px rgba(255,100,3,0.6)" },
    ],
    grid: [{ label: l("Mobile · 375px", "Mobile · 375px"), columns: 4, gutter: 16, margin: 24, container: "327px" }],
    theme: {
      font: FONT.poppins,
      heading: FONT.poppins,
      primary: "#FF6403",
      primaryHover: "#D95F14",
      onPrimary: "#FFFFFF",
      secondary: "#FFF2EA",
      onSecondary: "#D95F14",
      canvas: "#F5F4F9",
      surface: "#FFFFFF",
      text: "#12121C",
      muted: "#6B6B78",
      border: "#E4E2EA",
      success: "#30AF7A",
      warning: "#FFAC12",
      danger: "#FF5A3C",
      focus: "#FFAC12",
      radius: 8,
      controlRadius: 999,
    },
  },
  learnings: [
    l(
      "Mostrar o limite de crédito como medidor deixa a tela mais importante do app muito mais fácil de ler.",
      "Showing the credit limit as a gauge makes the app’s most important screen much easier to read.",
    ),
    l(
      "O laranja da marca com texto branco fica em 2,97:1 e não atinge o contraste AA (4,5:1). Numa evolução da proposta, escurecer o tom do botão resolveria sem perder a identidade.",
      "The brand orange with white text sits at 2.97:1 and misses AA contrast (4.5:1). In a next iteration, darkening the button tone would fix it without losing the identity.",
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* Estudos acadêmicos                                                  */
/* ------------------------------------------------------------------ */

const acalanto: CaseStudy = {
  slug: "acalanto",
  kind: "academic",
  title: l("Acalanto Saúde", "Acalanto Health"),
  short: l(
    "Design system para telemedicina com acessibilidade WCAG AA como requisito de base, não como ajuste final.",
    "A telehealth design system with WCAG AA accessibility as a baseline requirement, not a final fix.",
  ),
  category: l("Design system · Saúde", "Design system · Health"),
  year: "2025",
  context: l("Projeto acadêmico", "Academic project"),
  role: l("UX/UI Design · Documentação", "UX/UI Design · Documentation"),
  duration: l("8 semanas", "8 weeks"),
  tools: ["Figma"],
  deliverables: [
    l("Tokens em 3 camadas", "3-tier tokens"),
    l("32 componentes documentados", "32 documented components"),
    l("Guia de acessibilidade", "Accessibility guide"),
  ],
  tags: [l("Design System", "Design System"), l("Acessibilidade", "Accessibility"), l("Saúde", "Health")],
  cover: null,
  gallery: [],
  overview: {
    problem: l(
      "Pacientes de telemedicina incluem idosos, pessoas com baixa visão e usuários em momentos de estresse. O desafio: projetar um sistema em que a escolha acessível seja a escolha padrão para qualquer designer que o utilize.",
      "Telehealth patients include older adults, people with low vision, and users under stress. The challenge: design a system where the accessible choice is the default choice for any designer using it.",
    ),
    approach: l("O sistema foi estruturado em tokens de três camadas (primitivos → semânticos → componente), com todas as combinações de cor de texto validadas para contraste AA. Foram definidos alvos de toque de no mínimo 48px, tipografia base de 18px e estados que nunca dependem só de cor.", "The system was structured as three-tier tokens (primitive → semantic → component), with every text colour pairing validated for AA contrast. It defines 48px minimum touch targets, an 18px base type size, and states that never rely on colour alone."),
    outcome: l(
      "Em testes de usabilidade moderados com 6 participantes acima de 60 anos, todos concluíram o agendamento de consulta sem ajuda.",
      "In moderated usability tests with 6 participants over 60, everyone completed appointment booking unaided.",
    ),
  },
  metrics: [
    { value: "100%", label: l("pares de texto com contraste AA", "text pairings at AA contrast") },
    { value: "18px", label: l("tamanho base do texto", "base text size") },
    { value: "48px", label: l("alvo de toque mínimo", "minimum touch target") },
  ],
  process: [
    {
      title: l("Pesquisa", "Research"),
      body: l("Entrevistas com 5 pacientes e auditoria de 4 apps de saúde do mercado.", "Interviews with 5 patients and an audit of 4 health apps on the market."),
    },
    {
      title: l("Fundamentos", "Foundations"),
      body: l("Paleta validada em contraste AA, inclusive sobre os fundos de feedback, e escala tipográfica a partir de 18px.", "A palette validated for AA contrast, feedback tints included, and a type scale starting at 18px."),
    },
    {
      title: l("Componentes", "Components"),
      body: l("Cada componente documentado com anatomia, estados, uso correto e incorreto.", "Each component documented with anatomy, states, do’s and don’ts."),
    },
    {
      title: l("Validação", "Validation"),
      body: l("Teste de usabilidade moderado e revisão com leitor de tela.", "Moderated usability testing and a screen-reader review."),
    },
  ],
  ds: {
    name: "Acalanto DS",
    intro: l(
      "Um sistema calmo e legível: verde-azulado como cor de confiança, coral apenas para alertas e superfícies com muito respiro.",
      "A calm, legible system: teal as the colour of trust, coral reserved for alerts, and surfaces with plenty of breathing room.",
    ),
    principles: [
      {
        title: l("Acessível por padrão", "Accessible by default"),
        body: l(
      "Toda combinação de texto documentada já passa em contraste AA, inclusive sobre os fundos de feedback. Não existe par proibido para decorar.",
      "Every documented text pairing already passes AA, feedback tints included. There’s no forbidden pairing to memorise.",
    ),
      },
      {
        title: l("Calma clínica", "Clinical calm"),
        body: l("Movimento mínimo, cores frias e uma única ação em destaque por vez.", "Minimal motion, cool colours, and one highlighted action at a time."),
      },
      {
        title: l("Nunca só cor", "Never colour alone"),
        body: l("Todo estado combina cor, ícone e texto.", "Every state combines colour, icon, and text."),
      },
    ],
    colors: [
      {
        title: l("Marca", "Brand"),
        swatches: [
          { name: l("Teal 700", "Teal 700"), token: "color.brand.strong", hex: "#0B5D5E", usage: l("Hover e texto de marca", "Hover and brand text") },
          { name: l("Teal 600", "Teal 600"), token: "color.brand.default", hex: "#0E7C7B", usage: l("Ações primárias", "Primary actions") },
          { name: l("Teal 100", "Teal 100"), token: "color.brand.subtle", hex: "#D6F0EE", usage: l("Fundos de destaque", "Highlight backgrounds") },
          { name: l("Coral 500", "Coral 500"), token: "color.accent.default", hex: "#B8432D", usage: l("Alertas e urgência", "Alerts and urgency") },
        ],
      },
      {
        title: l("Neutras", "Neutrals"),
        swatches: [
          { name: l("Ink", "Ink"), token: "color.text.primary", hex: "#14232B" },
          { name: l("Slate", "Slate"), token: "color.text.secondary", hex: "#4A5A63" },
          { name: l("Line", "Line"), token: "color.border.default", hex: "#D5DEE2" },
          { name: l("Mist", "Mist"), token: "color.bg.canvas", hex: "#F3F7F8" },
          { name: l("White", "White"), token: "color.bg.surface", hex: "#FFFFFF" },
        ],
      },
      {
        title: l("Feedback", "Feedback"),
        swatches: [
          { name: l("Success", "Success"), token: "color.feedback.success", hex: "#17663F" },
          { name: l("Warning", "Warning"), token: "color.feedback.warning", hex: "#8A5300" },
          { name: l("Danger", "Danger"), token: "color.feedback.danger", hex: "#A92E24" },
        ],
      },
    ],
    fonts: [
      {
        family: "Plus Jakarta Sans",
        stack: FONT.jakarta,
        role: l("Família única, escolhida pela x-height generosa", "One family, chosen for its generous x-height"),
        weights: [400, 500, 700],
      },
    ],
    typeScale: [
      { token: "display", label: "Display", size: 40, lineHeight: 1.15, weight: 700 },
      { token: "heading-1", label: "Heading 1", size: 32, lineHeight: 1.2, weight: 700 },
      { token: "heading-2", label: "Heading 2", size: 24, lineHeight: 1.3, weight: 700 },
      { token: "body-lg", label: "Body Large", size: 20, lineHeight: 1.55, weight: 400 },
      { token: "body", label: "Body (base)", size: 18, lineHeight: 1.6, weight: 400 },
      { token: "label", label: "Label", size: 16, lineHeight: 1.3, weight: 500 },
      { token: "caption", label: "Caption", size: 14, lineHeight: 1.4, weight: 500 },
    ],
    spacing: [
      { token: "space.050", px: 4 },
      { token: "space.100", px: 8 },
      { token: "space.150", px: 12 },
      { token: "space.200", px: 16 },
      { token: "space.300", px: 24 },
      { token: "space.400", px: 32 },
      { token: "space.600", px: 48 },
      { token: "space.800", px: 64 },
      { token: "space.1000", px: 80 },
    ],
    radii: [
      { token: "radius.sm", px: 8 },
      { token: "radius.md", px: 12 },
      { token: "radius.lg", px: 20 },
    ],
    elevation: [
      { token: "elevation.1", value: "0 1px 3px rgba(20,35,43,0.08), 0 1px 2px rgba(20,35,43,0.06)" },
      { token: "elevation.2", value: "0 12px 32px -12px rgba(20,35,43,0.18)" },
    ],
    grid: [
      { label: l("Desktop", "Desktop"), columns: 12, gutter: 24, margin: 64, container: "1152px" },
      { label: l("Mobile", "Mobile"), columns: 4, gutter: 16, margin: 20, container: "100%" },
    ],
    theme: {
      font: FONT.jakarta,
      heading: FONT.jakarta,
      primary: "#0E7C7B",
      primaryHover: "#0B5D5E",
      onPrimary: "#FFFFFF",
      secondary: "#D6F0EE",
      onSecondary: "#0B5D5E",
      canvas: "#F3F7F8",
      surface: "#FFFFFF",
      text: "#14232B",
      muted: "#4A5A63",
      border: "#D5DEE2",
      success: "#17663F",
      warning: "#8A5300",
      danger: "#A92E24",
      focus: "#B8432D",
      radius: 20,
      controlRadius: 12,
    },
  },
  learnings: [
    l("Os testes com pessoas acima de 60 anos mudaram a escala tipográfica: 16px não é base suficiente para saúde.", "Testing with people over 60 changed the type scale: 16px isn’t a sufficient base for health."),
  ],
};

const feiro: CaseStudy = {
  slug: "feiro",
  kind: "academic",
  title: l("Feirô", "Feirô"),
  short: l(
    "Design system editorial para e-commerce de alimentos frescos: tipografia serifada, cores da terra e componentes de compra.",
    "An editorial design system for fresh-food e-commerce: serif typography, earthy colours, and shopping components.",
  ),
  category: l("Design system · E-commerce", "Design system · E-commerce"),
  year: "2024",
  context: l("Projeto acadêmico", "Academic project"),
  role: l("UI Design · Branding de interface", "UI Design · Interface branding"),
  duration: l("6 semanas", "6 weeks"),
  tools: ["Figma"],
  deliverables: [
    l("Fundamentos visuais", "Visual foundations"),
    l("Componentes de e-commerce", "E-commerce components"),
    l("Biblioteca de estilos no Figma (cor, espaço, raio)", "Figma style library (colour, space, radius)"),
  ],
  tags: [l("Design System", "Design System"), l("E-commerce", "E-commerce"), l("Editorial", "Editorial")],
  cover: null,
  gallery: [],
  overview: {
    problem: l(
      "Marketplaces de alimentos costumam parecer supermercados genéricos. A Feirô (marca fictícia) precisava transmitir procedência e cuidado artesanal sem sacrificar a eficiência de compra recorrente.",
      "Food marketplaces often look like generic supermarkets. Feirô (a fictional brand) needed to convey provenance and craft without sacrificing the efficiency of repeat purchases.",
    ),
    approach: l("A solução combinou uma serifa editorial (Fraunces) para contar histórias com uma sans neutra (DM Sans) para tudo que é transacional. Os componentes de compra (card de produto, seletor de quantidade, selo de origem) foram desenhados primeiro, e os fundamentos saíram deles.", "The solution paired an editorial serif (Fraunces) for storytelling with a neutral sans (DM Sans) for everything transactional. The shopping components (product card, quantity stepper, origin badge) were designed first, and the foundations came out of them."),
    outcome: l("Uma biblioteca de componentes com variantes, documentada no próprio Figma, e um protótipo de compra completo.", "A component library with variants, documented in Figma itself, and a complete shopping prototype."),
  },
  metrics: [
    { value: "2", label: l("famílias tipográficas com papéis definidos", "type families with defined roles") },
    { value: "8", label: l("níveis na escala de espaçamento", "steps in the spacing scale") },
    { value: "4.8:1", label: l("contraste do botão principal (AA)", "primary button contrast (AA)") },
  ],
  process: [
    {
      title: l("Conceito", "Concept"),
      body: l("Moodboard de feiras, rótulos artesanais e editoriais de gastronomia.", "Moodboard of street markets, artisan labels, and food editorials."),
    },
    {
      title: l("Componentes primeiro", "Components first"),
      body: l("Card de produto e carrinho como ponto de partida do sistema.", "Product card and cart as the system’s starting point."),
    },
    {
      title: l("Biblioteca", "Library"),
      body: l("Cores, espaços e raios organizados como estilos reutilizáveis no Figma.", "Colours, spacing, and radii organised as reusable Figma styles."),
    },
    {
      title: l("Documentação", "Documentation"),
      body: l("Guia de uso de cada componente, com exemplos de uso correto e incorreto.", "A usage guide for each component, with do and don’t examples."),
    },
  ],
  ds: {
    name: "Feirô DS",
    intro: l(
      "Um sistema com cheiro de feira: verde-floresta como base, terracota para ação e um creme quente no lugar do branco puro.",
      "A system that smells like a farmers’ market: forest green as the base, terracotta for action, and warm cream instead of pure white.",
    ),
    principles: [
      {
        title: l("Origem visível", "Visible origin"),
        body: l("Todo produto mostra quem produziu e de onde vem.", "Every product shows who made it and where it comes from."),
      },
      {
        title: l("Editorial no conteúdo, utilitário na compra", "Editorial in content, utilitarian at checkout"),
        body: l("Serifa conta histórias; sans fecha pedidos.", "The serif tells stories; the sans closes orders."),
      },
      {
        title: l("Quente e natural", "Warm and natural"),
        body: l(
      "Nada de branco puro ou preto puro: só tons da terra.",
      "No pure white or pure black: only earth tones.",
    ),
      },
    ],
    colors: [
      {
        title: l("Marca", "Brand"),
        swatches: [
          { name: l("Forest", "Forest"), token: "--feiro-forest-800", hex: "#1F3D2B", usage: l("Texto de marca e fundos densos", "Brand text and dense backgrounds") },
          { name: l("Leaf", "Leaf"), token: "--feiro-leaf-600", hex: "#2F6B45", usage: l("Selos e links", "Badges and links") },
          { name: l("Terracotta", "Terracotta"), token: "--feiro-terracotta-600", hex: "#B5532F", usage: l("Ações de compra", "Purchase actions") },
          { name: l("Clay", "Clay"), token: "--feiro-terracotta-800", hex: "#8F3E21", usage: l("Hover de ação", "Action hover") },
          { name: l("Saffron", "Saffron"), token: "--feiro-saffron-400", hex: "#E3A93B", usage: l("Promoções e destaques", "Promotions and highlights") },
        ],
      },
      {
        title: l("Neutras", "Neutrals"),
        swatches: [
          { name: l("Soil", "Soil"), token: "--feiro-soil", hex: "#2A2520" },
          { name: l("Bark", "Bark"), token: "--feiro-bark", hex: "#6B6157" },
          { name: l("Linen", "Linen"), token: "--feiro-linen", hex: "#E7DFD2" },
          { name: l("Cream", "Cream"), token: "--feiro-cream", hex: "#F7F2EA" },
          { name: l("Paper", "Paper"), token: "--feiro-paper", hex: "#FFFCF7" },
        ],
      },
    ],
    fonts: [
      {
        family: "Fraunces",
        stack: FONT.fraunces,
        role: l("Títulos e storytelling", "Headlines and storytelling"),
        weights: [400, 600],
      },
      {
        family: "DM Sans",
        stack: FONT.dmsans,
        role: l("Interface, preços e formulários", "UI, prices, and forms"),
        weights: [400, 500, 700],
      },
    ],
    typeScale: [
      { token: "display", label: "Display · Fraunces", size: 52, lineHeight: 1.05, weight: 400, font: "heading" },
      { token: "headline", label: "Headline · Fraunces", size: 34, lineHeight: 1.15, weight: 600, font: "heading" },
      { token: "title", label: "Title · Fraunces", size: 22, lineHeight: 1.25, weight: 600, font: "heading" },
      { token: "body", label: "Body · DM Sans", size: 16, lineHeight: 1.6, weight: 400 },
      { token: "price", label: "Price · DM Sans", size: 18, lineHeight: 1.2, weight: 700 },
      { token: "label", label: "Label · DM Sans", size: 14, lineHeight: 1.3, weight: 500 },
      { token: "overline", label: "Overline · DM Sans", size: 11, lineHeight: 1.2, weight: 700, tracking: 1.5, upper: true },
    ],
    spacing: [
      { token: "space-xs", px: 4 },
      { token: "space-sm", px: 8 },
      { token: "space-md", px: 16 },
      { token: "space-lg", px: 24 },
      { token: "space-xl", px: 40 },
      { token: "space-2xl", px: 64 },
      { token: "space-3xl", px: 96 },
      { token: "space-4xl", px: 128 },
    ],
    radii: [
      { token: "radius-sm", px: 4 },
      { token: "radius-md", px: 10 },
      { token: "radius-lg", px: 18 },
    ],
    elevation: [
      { token: "shadow-soft", value: "0 10px 30px -14px rgba(42,37,32,0.25)" },
      { token: "shadow-lift", value: "0 24px 48px -24px rgba(31,61,43,0.35)" },
    ],
    grid: [
      { label: l("Desktop", "Desktop"), columns: 12, gutter: 24, margin: 72, container: "1240px" },
      { label: l("Mobile", "Mobile"), columns: 4, gutter: 12, margin: 16, container: "100%" },
    ],
    theme: {
      font: FONT.dmsans,
      heading: FONT.fraunces,
      primary: "#B5532F",
      primaryHover: "#8F3E21",
      onPrimary: "#FFFCF7",
      secondary: "#1F3D2B",
      onSecondary: "#F7F2EA",
      canvas: "#F7F2EA",
      surface: "#FFFCF7",
      text: "#2A2520",
      muted: "#6B6157",
      border: "#E7DFD2",
      success: "#2F6B45",
      warning: "#E3A93B",
      danger: "#A8321E",
      focus: "#2F6B45",
      radius: 18,
      controlRadius: 10,
    },
  },
  learnings: [
    l(
      "Começar pelos componentes de maior valor de negócio (card de produto) deu propósito a cada decisão de fundamento.",
      "Starting with the highest-value components (product card) gave every foundational decision a purpose.",
    ),
    l(
      "Duas famílias tipográficas só funcionam com papéis bem definidos; documentar o “quando usar” foi essencial.",
      "Two type families only work with well-defined roles; documenting “when to use” was essential.",
    ),
  ],
};

const mirante: CaseStudy = {
  slug: "mirante",
  kind: "academic",
  title: l("Mirante", "Mirante"),
  short: l(
    "Sistema dark-first para produtos de dados: densidade controlada, paleta para visualização e tokens semânticos.",
    "A dark-first system for data products: controlled density, a data-viz palette, and semantic tokens.",
  ),
  category: l("Design system · Dados", "Design system · Data"),
  year: "2025",
  context: l("Projeto acadêmico", "Academic project"),
  role: l("UX/UI Design · Front-end", "UX/UI Design · Front-end"),
  duration: l("10 semanas", "10 weeks"),
  tools: ["Figma", "React", "Tailwind CSS"],
  deliverables: [
    l("Tokens semânticos para tema escuro", "Semantic tokens for dark theme"),
    l("Paleta de data viz validada", "Validated data-viz palette"),
    l("Componentes em React", "React components"),
  ],
  tags: [l("Design System", "Design System"), l("Dados", "Data"), l("SaaS", "SaaS")],
  cover: null,
  gallery: [],
  overview: {
    problem: l(
      "Dashboards de SaaS acumulam gráficos, tabelas e filtros até virarem ruído. O desafio: criar um sistema que suporte alta densidade de informação sem perder hierarquia, e que funcione bem no escuro, onde analistas passam horas.",
      "SaaS dashboards pile up charts, tables, and filters until they become noise. The challenge: create a system that supports high information density without losing hierarchy, and works well in dark mode, where analysts spend hours.",
    ),
    approach: l("O sistema foi pensado dark-first, com superfícies em degraus de luminância (em vez de sombras), uma paleta categórica de 6 cores baseada na Okabe-Ito, referência para leitura por pessoas daltônicas, e tipografia IBM Plex com números tabulares. Os componentes principais foram implementados em React + Tailwind a partir dos mesmos tokens do Figma.", "The system was designed dark-first, with luminance-stepped surfaces (instead of shadows), a 6-colour categorical palette based on Okabe-Ito, a reference for colour-blind readability, and IBM Plex type with tabular figures. The core components were built in React + Tailwind from the same tokens as Figma."),
    outcome: l(
      "Um kit de dashboard coerente no tema escuro, com tokens semânticos prontos para receber um tema claro e handoff design→código sem tradução manual de valores.",
      "A coherent dark-theme dashboard kit, with semantic tokens ready for a light theme and design→code handoff without manual value translation.",
    ),
  },
  metrics: [
    { value: "6", label: l("cores categóricas da paleta Okabe-Ito", "categorical colours from the Okabe-Ito palette") },
    { value: "4px", label: l("grid base para alinhar dados densos", "base grid to align dense data") },
    { value: "3", label: l("níveis de superfície por luminância", "luminance-based surface levels") },
  ],
  process: [
    {
      title: l("Auditoria", "Audit"),
      body: l("Análise de 5 dashboards de mercado: padrões de densidade e problemas de leitura.", "Analysis of 5 market dashboards: density patterns and readability issues."),
    },
    {
      title: l("Fundamentos", "Foundations"),
      body: l("Escala de superfícies, paleta de dados e números tabulares.", "Surface scale, data palette, and tabular figures."),
    },
    {
      title: l("Componentes", "Components"),
      body: l("KPI tile, tabela, filtros, tooltip e estados vazios.", "KPI tile, table, filters, tooltip, and empty states."),
    },
    {
      title: l("Código", "Code"),
      body: l("Os mesmos valores do Figma (cores, espaços, raios) configurados no Tailwind, e componentes em React.", "The same Figma values (colours, spacing, radii) configured in Tailwind, plus components in React."),
    },
  ],
  ds: {
    name: "Mirante DS",
    intro: l(
      "Um sistema feito para longas sessões de análise: fundo quase preto com tom azulado, um índigo para ação e cores de dados que nunca competem com a interface.",
      "A system built for long analysis sessions: a near-black, blue-tinted background, indigo for action, and data colours that never compete with the UI.",
    ),
    principles: [
      {
        title: l("Dados são o herói", "Data is the hero"),
        body: l("A interface recua: além da ação principal, só os dados ganham cor saturada.", "The UI recedes: apart from the primary action, only data gets saturated colour."),
      },
      {
        title: l("Profundidade por luz", "Depth through light"),
        body: l("No escuro, elevação é luminância, não sombra.", "In the dark, elevation is luminance, not shadow."),
      },
      {
        title: l("Densidade com ritmo", "Density with rhythm"),
        body: l("Grid de 4px e números tabulares mantêm colunas alinhadas.", "A 4px grid and tabular figures keep columns aligned."),
      },
    ],
    colors: [
      {
        title: l("Superfícies", "Surfaces"),
        swatches: [
          { name: l("Void", "Void"), token: "bg.canvas", hex: "#0B0F1A" },
          { name: l("Surface 1", "Surface 1"), token: "bg.surface", hex: "#121829" },
          { name: l("Surface 2", "Surface 2"), token: "bg.raised", hex: "#1A2238" },
          { name: l("Border", "Border"), token: "border.default", hex: "#273149" },
          { name: l("Text muted", "Text muted"), token: "text.muted", hex: "#8B95AD" },
          { name: l("Text", "Text"), token: "text.primary", hex: "#E6EAF2" },
        ],
      },
      {
        title: l("Ação", "Action"),
        swatches: [
          { name: l("Indigo 500", "Indigo 500"), token: "action.primary", hex: "#6C7CFF", usage: l("Ação primária e foco", "Primary action and focus") },
          { name: l("Indigo 400", "Indigo 400"), token: "action.primary.hover", hex: "#8F9BFF" },
        ],
      },
      {
        title: l("Visualização de dados", "Data visualisation"),
        swatches: [
          { name: l("Series 1", "Series 1"), token: "data.1", hex: "#56B4E9" },
          { name: l("Series 2", "Series 2"), token: "data.2", hex: "#E69F00" },
          { name: l("Series 3", "Series 3"), token: "data.3", hex: "#009E73" },
          { name: l("Series 4", "Series 4"), token: "data.4", hex: "#F0E442" },
          { name: l("Series 5", "Series 5"), token: "data.5", hex: "#CC79A7" },
          { name: l("Series 6", "Series 6"), token: "data.6", hex: "#D55E00" },
        ],
      },
      {
        title: l("Feedback", "Feedback"),
        swatches: [
          { name: l("Positive", "Positive"), token: "feedback.positive", hex: "#3DD68C" },
          { name: l("Warning", "Warning"), token: "feedback.warning", hex: "#F5B544" },
          { name: l("Negative", "Negative"), token: "feedback.negative", hex: "#FF6B6B" },
        ],
      },
    ],
    fonts: [
      {
        family: "IBM Plex Sans",
        stack: FONT.plex,
        role: l("Interface e títulos", "UI and headlines"),
        weights: [400, 500, 600],
      },
      {
        family: "IBM Plex Mono",
        stack: FONT.plexMono,
        role: l("Números, códigos e IDs", "Numbers, codes, and IDs"),
        weights: [400, 500],
      },
    ],
    typeScale: [
      { token: "kpi", label: "KPI · Mono", size: 36, lineHeight: 1.1, weight: 500, font: "mono" },
      { token: "heading-1", label: "Heading 1", size: 28, lineHeight: 1.2, weight: 600 },
      { token: "heading-2", label: "Heading 2", size: 20, lineHeight: 1.3, weight: 600 },
      { token: "body", label: "Body", size: 14, lineHeight: 1.5, weight: 400 },
      { token: "table", label: "Table · Mono", size: 13, lineHeight: 1.4, weight: 400, font: "mono" },
      { token: "label", label: "Label", size: 12, lineHeight: 1.3, weight: 500 },
      { token: "micro", label: "Micro", size: 11, lineHeight: 1.2, weight: 600, tracking: 0.8, upper: true },
    ],
    spacing: [
      { token: "1", px: 4 },
      { token: "2", px: 8 },
      { token: "3", px: 12 },
      { token: "4", px: 16 },
      { token: "5", px: 20 },
      { token: "6", px: 24 },
      { token: "8", px: 32 },
      { token: "12", px: 48 },
      { token: "16", px: 64 },
    ],
    radii: [
      { token: "radius.sm", px: 6 },
      { token: "radius.md", px: 10 },
      { token: "radius.lg", px: 14 },
    ],
    elevation: [
      { token: "surface.1", value: "inset 0 0 0 1px #273149" },
      { token: "surface.2", value: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px #273149" },
    ],
    grid: [
      { label: l("Dashboard · 1440px", "Dashboard · 1440px"), columns: 12, gutter: 16, margin: 24, container: "fluid" },
      { label: l("Tablet", "Tablet"), columns: 8, gutter: 16, margin: 20, container: "fluid" },
    ],
    theme: {
      font: FONT.plex,
      heading: FONT.plex,
      mono: FONT.plexMono,
      primary: "#6C7CFF",
      primaryHover: "#8F9BFF",
      onPrimary: "#0B0F1A",
      secondary: "#1A2238",
      onSecondary: "#E6EAF2",
      canvas: "#0B0F1A",
      surface: "#121829",
      text: "#E6EAF2",
      muted: "#8B95AD",
      border: "#273149",
      success: "#3DD68C",
      warning: "#F5B544",
      danger: "#FF6B6B",
      focus: "#8F9BFF",
      radius: 14,
      controlRadius: 8,
      dark: true,
    },
  },
  learnings: [
    l(
      "No modo escuro, sombras quase não aparecem; degraus de luminância comunicam elevação com mais clareza.",
      "In dark mode, shadows barely show; luminance steps communicate elevation more clearly.",
    ),
  ],
};

export const caseStudies: CaseStudy[] = [idwall, acalanto, idsummit, feiro, cacau, mirante];

export const caseSlugs = caseStudies.map((c) => c.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Contraste (WCAG 2.x)                                                */
/* ------------------------------------------------------------------ */

function channel(v: number) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}

export function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Melhor cor de texto (preto/branco) sobre a amostra, com a razão de contraste. */
export function bestOn(hex: string) {
  const white = contrastRatio(hex, "#FFFFFF");
  const black = contrastRatio(hex, "#000000");
  return white >= black ? { fg: "#FFFFFF", ratio: white } : { fg: "#000000", ratio: black };
}
