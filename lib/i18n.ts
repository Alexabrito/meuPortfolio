export type Locale = "pt" | "en";

export const STORAGE_LOCALE_KEY = "locale";

export type ProjectId = "idwall" | "idsummit" | "cacau";

/** `coverIndex` = imagem da capa no grid e slide inicial no modal. */
export const projectsMedia: Record<
  ProjectId,
  { images: string[]; coverIndex: number }
> = {
  idwall: {
    images: [
      "/projects/idwall/mock01.png",
      "/projects/idwall/mock02.png",
      "/projects/idwall/mock03.png",
    ],
    coverIndex: 1,
  },
  idsummit: {
    images: [
      "/projects/idsummit/mock04.png",
      "/projects/idsummit/mock05.png",
      "/projects/idsummit/mock06.png",
    ],
    coverIndex: 0,
  },
  cacau: {
    images: [
      "/projects/cacau/mock07.png",
      "/projects/cacau/mock08.png",
    ],
    coverIndex: 0,
  },
};

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
      seeMore: "Veja mais",
      modalClose: "Fechar detalhe do projeto",
      modalCloseUi: "Fechar",
      modalAboutLabel: "Sobre o projeto",
      carouselNavAria: "Galeria de imagens do projeto",
    },
    projectsData: {
      idwall: {
        title: "Site idwall",
        short:
          "Presença digital da referência em identidade na América Latina — clareza, confiança e ritmo visual.",
        description:
          "Trabalho focado na experiência do site da idwall: hierarquia para produto e ecossistema, navegação que sustenta narrativa B2B e consistência com a marca em cada bloco. O desafio foi traduzir complexidade de identidade digital em páginas legíveis, com CTA e jornadas que conversam com quem decide em empresa.",
        tags: ["UX", "Web", "Marca"],
        linkUrl: "https://idwall.co",
        linkLabel: "Ver site da idwall",
      },
      idsummit: {
        title: "idsummit",
        short:
          "Landing e experiência do evento — confiança, programação e convite à inscrição.",
        description:
          "O idsummit concentra conteúdo denso: datas, line-up, credibilidade e urgência de inscrição. A interface organiza essa carga em camadas — hero com promessa clara, blocos de speakers e programação escaneáveis, e reforço de mensagem institucional sem perder ritmo. Pensado para quem chega pelo link e precisa entender o evento em segundos.",
        tags: ["UX", "Evento", "Landing"],
        linkUrl: "https://idsummit.com.br/",
        linkLabel: "Ver idsummit.com.br",
      },
      cacau: {
        title: "Proposta de layout — Cacau",
        short:
          "Estudo editorial e de interface publicado no Behance — ritmo, grid e identidade do projeto.",
        description:
          "Case de proposta de layout para Cacau: exploração de diagramação, hierarquia tipográfica e uso de espaço para contar a história do produto com personalidade. Foi um exercício de olhar editorial aplicado à interface — do conceito ao frame final, com atenção a detalhe e coerência visual.",
        tags: ["UI", "Editorial", "Behance"],
        linkUrl:
          "https://www.behance.net/gallery/139749369/Proposta-de-Layuot-Cacau",
        linkLabel: "Ver no Behance",
      },
    },
    tech: {
      eyebrow: "Ferramentas",
      title: "Do protótipo ao deploy.",
      subtitle:
        "Utilizo o Figma para arquitetar experiências e o ecossistema do React para dar vida a elas. Meu foco é criar sistemas escaláveis, acessíveis e fáceis de manter.",
      blurbs: {
        figma:
          "Onde passo a maior parte do tempo: fluxos, componentes, prototipagem e alinhamento com stakeholders — é minha principal superfície de trabalho.",
        react:
          "Interfaces reativas, estados claros e componentes que sobrevivem a iteração.",
        next: "Sites e produtos web com performance e estrutura sólida em produção.",
        ts: "Tipagem que reduz ambiguidade entre design, API e implementação.",
        tailwind:
          "Ritmo rápido com tokens e utilitários — sem perder a hierarquia visual.",
        git: "Histórico, revisão e deploy com rastreio do que entrou em cada release.",
      },
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
      copy: "Copiar e-mail",
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
      seeMore: "See more",
      modalClose: "Close project details",
      modalCloseUi: "Close",
      modalAboutLabel: "About the project",
      carouselNavAria: "Project image gallery",
    },
    projectsData: {
      idwall: {
        title: "idwall website",
        short:
          "Digital presence for Latin America’s identity leader — clarity, trust, and visual rhythm.",
        description:
          "UX-focused work on idwall’s site: hierarchy for product and ecosystem, navigation that carries a B2B story, and brand consistency in every block. The challenge was translating the complexity of digital identity into readable pages, with CTAs and journeys that speak to enterprise decision-makers.",
        tags: ["UX", "Web", "Brand"],
        linkUrl: "https://idwall.co",
        linkLabel: "Visit idwall.co",
      },
      idsummit: {
        title: "idsummit",
        short:
          "Event landing and experience — trust, schedule, and a clear path to register.",
        description:
          "idsummit packs dense content: dates, line-up, credibility, and registration urgency. The interface layers that load — a hero with a sharp promise, scannable speaker and agenda blocks, and institutional reinforcement without losing pace. Built for people who land from a link and need to get the event in seconds.",
        tags: ["UX", "Event", "Landing"],
        linkUrl: "https://idsummit.com.br/",
        linkLabel: "Visit idsummit.com.br",
      },
      cacau: {
        title: "Layout proposal — Cacau",
        short:
          "Editorial and UI study on Behance — rhythm, grid, and project identity.",
        description:
          "A layout proposal for Cacau: exploring composition, typographic hierarchy, and whitespace to tell the product story with character. An editorial eye applied to the interface — from concept to final frames, with attention to detail and visual coherence.",
        tags: ["UI", "Editorial", "Behance"],
        linkUrl:
          "https://www.behance.net/gallery/139749369/Proposta-de-Layuot-Cacau",
        linkLabel: "View on Behance",
      },
    },
    tech: {
      eyebrow: "Toolkit",
      title: "From prototype to deploy.",
      subtitle:
        "I use Figma to architect experiences and the React ecosystem to bring them to life. My focus is scalable, accessible systems that are easy to maintain.",
      blurbs: {
        figma:
          "Where I spend most of my time: flows, components, prototyping, and stakeholder alignment — my main workspace.",
        react:
          "Reactive UI, honest component states, and layouts that survive iteration.",
        next: "Web products and sites with solid structure and performance in production.",
        ts: "Types that reduce ambiguity between design, APIs, and implementation.",
        tailwind: "Fast iteration with utilities and tokens — without losing hierarchy.",
        git: "History, review, and deploy with a trace of what shipped when.",
      },
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
      copy: "Copy email",
      copied: "Copied",
    },
  },
} as const;

export type Messages = (typeof copy)[Locale];

export function getMessages(locale: Locale): Messages {
  return copy[locale];
}
