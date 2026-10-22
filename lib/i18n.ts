export type Locale = "pt" | "en";

export const STORAGE_LOCALE_KEY = "locale";

const copy = {
  pt: {
    nav: {
      home: "Início",
      projects: "Projetos",
      stack: "Tecnologias",
      statement: "Manifesto",
      contact: "Contato",
    },
    header: {
      langShort: "EN",
      langAria: "Ler o site em inglês",
      themeLight: "Ativar modo claro",
      themeDark: "Ativar modo escuro",
      menuOpen: "Abrir menu de navegação",
      menuClose: "Fechar menu de navegação",
      menuBackdrop: "Fechar menu",
    },
    hero: {
      kicker: "UX Design · Front-end",
      line1: "Experiências digitais ",
      highlight: "claras",
      line2: ", rápidas e humanas.",
      body: "UX Design e Front-end em um fluxo único. Da estratégia ao código, entrego interfaces com foco absoluto em performance, acessibilidade e detalhe.",
      ctaProjects: "Ver projetos",
      ctaContact: "Falar comigo",
    },
    projects: {
      sectionEyebrow: "Portfólio",
      titleLine1: "Projetos",
      titleLine2: "em destaque",
      titleAccent: "",
      subtitle:
        "Uma seleção de soluções que unem pesquisa de usuário, design de interface e implementação técnica. Explore os detalhes de cada entrega.",
      seeMore: "Ver case",
    },
    caseStudy: {
      back: "Projetos",
      nextShort: "Próximo",
      academicBadge: "Projeto acadêmico",
      academicNote:
        "Estudo conceitual desenvolvido em contexto acadêmico. Marca, pessoas e dados são fictícios.",
      meta: {
        context: "Contexto",
        role: "Papel",
        tools: "Ferramentas",
      },
      overviewTitle: "Visão geral",
      problem: "O desafio",
      approach: "Como foi resolvido",
      outcome: "O que mudou",
      processTitle: "Processo",
      galleryTitle: "Telas",
      dsEyebrow: "Design system",
      dsTabsLabel: "Seções do design system",
      dsNav: {
        principles: "Princípios",
        colors: "Cores",
        typography: "Tipografia",
        foundations: "Fundamentos",
        components: "Componentes",
      },
      copyHint: "Clique para copiar o hex",
      copied: "Copiado!",
      contrast: "Contraste",
      weights: "Pesos",
      typeScale: "Escala tipográfica",
      spacing: "Espaçamento",
      radii: "Raios",
      elevation: "Elevação",
      grid: "Grid",
      columns: "colunas",
      gutter: "gutter",
      margin: "margem",
      container: "container",
      componentsBodyClient:
        "Componentes do projeto como foram desenhados, recriados aqui para serem usados ao vivo: passe o mouse, clique, use o teclado.",
      componentsBodyAcademic:
        "Componentes que definem a identidade do sistema, renderizados ao vivo com os próprios tokens.",
      learningsTitle: "Aprendizados",
      nextProject: "Próximo projeto",
      closeImage: "Fechar imagem",
      openImage: "Ampliar imagem",
    },
    tech: {
      eyebrow: "Ferramentas",
      title: "Da pesquisa ao deploy.",
      subtitle:
        "Do entendimento do problema ao código em produção: as ferramentas que uso em cada etapa do processo.",
      groups: [
        {
          title: "Pesquisa e estratégia",
          body: "Entender pessoas e contexto antes de desenhar qualquer tela.",
          tools: ["Miro", "FigJam", "Maze", "Hotjar", "Google Analytics"],
        },
        {
          title: "Design e prototipação",
          body: "Fluxos, interfaces, protótipos navegáveis e design systems.",
          tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Notion"],
        },
        {
          title: "Desenvolvimento",
          body: "Interfaces reais, acessíveis e fiéis ao que foi desenhado.",
          tools: ["HTML e CSS", "React", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
        },
      ],
    },
    statement: {
      eyebrow: "Filosofia de trabalho",
      line1: "Design para pessoas,",
      line2: "código para performance.",
      line3: "",
      line4: "",
      aside:
        "Acredito que uma interface só é bonita se for funcional. Minha missão é eliminar a fricção entre a dúvida do usuário e a solução do produto, garantindo que cada pixel tenha um propósito e cada linha de código, uma função.",
    },
    footer: {
      eyebrow: "Contato",
      title: "Vamos conversar",
      body:
        "Com formação em Design Digital e pós-graduação em UX Design em curso, somo 10 anos de atuação no mercado. Atuo de ponta a ponta na criação de interfaces, garantindo que o conceito inicial se transforme em um produto funcional e fiel ao projeto.\n\nEstou em constante reinvenção para garantir que cada projeto seja atual e eficiente. Se você busca uma parceria estratégica para o seu produto, vamos falar sobre como posso somar.",
      credit: "Feito com Next.js",
      socialLabel: "Redes",
      emailLabel: "E-mail",
    },
    copyEmail: {
      copy: "Clique para copiar o e-mail",
      copiedLive: "E-mail copiado para a área de transferência",
      copied: "Copiado",
    },
  },
  en: {
    nav: {
      home: "Home",
      projects: "Work",
      stack: "Technologies",
      statement: "Philosophy",
      contact: "Contact",
    },
    header: {
      langShort: "PT",
      langAria: "Read the site in Portuguese",
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      menuOpen: "Open navigation menu",
      menuClose: "Close navigation menu",
      menuBackdrop: "Close menu",
    },
    hero: {
      kicker: "UX Design · Front-end",
      line1: "Digital experiences that are ",
      highlight: "clear",
      line2: ", fast, and human.",
      body: "UX Design and front-end in one flow. From strategy to code, I ship interfaces with a sharp focus on performance, accessibility, and craft.",
      ctaProjects: "View work",
      ctaContact: "Get in touch",
    },
    projects: {
      sectionEyebrow: "Portfolio",
      titleLine1: "Featured",
      titleLine2: "projects",
      titleAccent: "",
      subtitle:
        "A selection of work that blends user research, interface design, and technical implementation. Explore the details of each delivery.",
      seeMore: "View case",
    },
    caseStudy: {
      back: "Projects",
      nextShort: "Next",
      academicBadge: "Academic project",
      academicNote:
        "A conceptual study developed in an academic setting. Brand, people, and data are fictional.",
      meta: {
        context: "Context",
        role: "Role",
        tools: "Tools",
      },
      overviewTitle: "Overview",
      problem: "The challenge",
      approach: "How it was solved",
      outcome: "What changed",
      processTitle: "Process",
      galleryTitle: "Screens",
      dsEyebrow: "Design system",
      dsTabsLabel: "Design system sections",
      dsNav: {
        principles: "Principles",
        colors: "Colour",
        typography: "Typography",
        foundations: "Foundations",
        components: "Components",
      },
      copyHint: "Click to copy the hex",
      copied: "Copied!",
      contrast: "Contrast",
      weights: "Weights",
      typeScale: "Type scale",
      spacing: "Spacing",
      radii: "Radii",
      elevation: "Elevation",
      grid: "Grid",
      columns: "columns",
      gutter: "gutter",
      margin: "margin",
      container: "container",
      componentsBodyClient:
        "The project’s components as they were designed, rebuilt here so you can use them live: hover, click, use the keyboard.",
      componentsBodyAcademic:
        "The components that define the system’s identity, rendered live with its own tokens.",
      learningsTitle: "Learnings",
      nextProject: "Next project",
      closeImage: "Close image",
      openImage: "Enlarge image",
    },
    tech: {
      eyebrow: "Toolkit",
      title: "From research to deploy.",
      subtitle:
        "From understanding the problem to code in production: the tools I use at each step of the process.",
      groups: [
        {
          title: "Research and strategy",
          body: "Understanding people and context before designing any screen.",
          tools: ["Miro", "FigJam", "Maze", "Hotjar", "Google Analytics"],
        },
        {
          title: "Design and prototyping",
          body: "Flows, interfaces, clickable prototypes, and design systems.",
          tools: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Notion"],
        },
        {
          title: "Development",
          body: "Real, accessible interfaces that stay true to the design.",
          tools: ["HTML and CSS", "React", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
        },
      ],
    },
    statement: {
      eyebrow: "Work philosophy",
      line1: "Design for people,",
      line2: "code for performance.",
      line3: "",
      line4: "",
      aside:
        "I believe an interface is only beautiful if it works. My mission is to remove friction between user doubt and the product solution—so every pixel has a purpose and every line of code has a function.",
    },
    footer: {
      eyebrow: "Contact",
      title: "Let’s talk",
      body:
        "If you have a project in mind or need to level up your product experience, I’d love to chat. I reply fast and enjoy exploring new solutions.",
      credit: "Built with Next.js (static export).",
      socialLabel: "Social",
      emailLabel: "Email",
    },
    copyEmail: {
      copy: "Click to copy the email",
      copiedLive: "Email copied to clipboard",
      copied: "Copied",
    },
  },
} as const;

export type Messages = (typeof copy)[Locale];

export function getMessages(locale: Locale): Messages {
  return copy[locale];
}
