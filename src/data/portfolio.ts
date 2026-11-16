export type Portrait = {
  src: string
  alt: string
}

export type Profile = {
  name: string
  role: string
  focus: string
  location: string
  availability: string
  introduction: string
  email: string
  github: string
  linkedin: string
  leetcode: string
  /**
   * Optional. Set this only when a real photo exists, for example
   * `{ src: "/images/portrait.jpg", alt: "Portrait of Maria Tesfaye" }`.
   * It renders only when the field is set and the file is in public/.
   */
  portrait?: Portrait
}

export type NavItem = {
  label: string
  href: string
  id: string
}

export type EngineeringExample = {
  title: string
  summary: string
  impact?: string
  outcome?: string
  /** Rendered apart from the numbered platform examples. */
  distinct?: boolean
}

export type ExperienceLink = {
  label: string
  href: string
}

export type ExperienceEntry = {
  id: string
  role: string
  company: string
  location?: string
  employmentType?: string
  dates?: string
  introduction: string
  bullets?: readonly string[]
  linksLabel?: string
  links?: readonly ExperienceLink[]
  contributions?: readonly EngineeringExample[]
  technologies?: string
  technologyLabel?: string
  emphasis: "primary" | "standard" | "compact"
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  slug: string
  name: string
  category: string
  purpose: string
  capabilities: readonly string[]
  technologies: readonly string[]
  links: readonly ProjectLink[]
  image: {
    src: string
    alt: string
  }
  deployed?: boolean
  /** Shown in an expandable section. Ground these in the project, not in guessed outcomes. */
  decisions: readonly string[]
}

export type TechGroup = {
  title: string
  items: readonly string[]
}

export type ResumeConfig = {
  path: string
  downloadName: string
  /** Shown as a small monospace label only when set, for example "October 2026". */
  updated?: string
}

export type Education = {
  degree: string
  institution: string
  dates: string
  graduation: string
}

export const sectionIds = {
  top: "top",
  experience: "experience",
  projects: "projects",
  about: "about",
  education: "education",
  contact: "contact",
} as const

export const siteDescription =
  "Maria Tesfaye is a full-stack software engineer in Addis Ababa. She contributes to production multi-tenant e-government procurement systems, builds full-stack applications, and evaluates AI coding agents."

export const profile: Profile = {
  name: "Maria Tesfaye",
  role: "Full-Stack Software Engineer",
  focus:
    "Building production web applications, connected business workflows, and AI coding-agent evaluations.",
  location: "Addis Ababa, Ethiopia",
  availability: "Open to remote, hybrid, and on-site opportunities",
  introduction:
    "I build practical software from user-facing interfaces to backend APIs and data workflows. My experience spans production e-government procurement systems, full-stack applications, and AI coding-agent evaluation.",
  email: "mariatesfaye67@gmail.com",
  github: "https://github.com/mariatesfaye",
  linkedin: "https://www.linkedin.com/in/maria-tesfaye/",
  leetcode: "https://leetcode.com/u/mariaa25/",
  // TODO(Maria): optional portrait. Uncomment and add the file when you have a photo you want on the site.
  // portrait: { src: "/images/portrait.jpg", alt: "Portrait of Maria Tesfaye" },
}

export const heroTechnologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Python",
  "PostgreSQL",
] as const

export const navigation: readonly NavItem[] = [
  { label: "Experience", href: `/#${sectionIds.experience}`, id: sectionIds.experience },
  { label: "Projects", href: `/#${sectionIds.projects}`, id: sectionIds.projects },
  { label: "About", href: `/#${sectionIds.about}`, id: sectionIds.about },
  { label: "Contact", href: `/#${sectionIds.contact}`, id: sectionIds.contact },
]

export const about = [
  "The part of engineering I keep coming back to is a workflow that has to be right: who may act, which state is allowed next, and whether the document matches the record. At Perago, that means procurement and contract processes where a wrong state transition has real consequences. My own projects are where I work through that same judgment on a smaller scale.",
  "It’s also what draws me to evaluation work: designing tasks and tests that check whether a solution is actually correct, not just one that looks correct.",
] as const

export const contact = {
  heading: "Let's build something useful.",
  body: "I'm interested in opportunities where I can contribute across the stack, solve meaningful engineering problems, and keep growing as a software engineer.",
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: "perago",
    role: "Software Engineer",
    company: "Perago Information Systems",
    location: "Addis Ababa, Ethiopia",
    dates: "March 2024 – Present",
    introduction:
      "I contribute to the development and maintenance of multi-tenant electronic government procurement platforms for Malawi and Sierra Leone (MEGP / SEGP), connecting procurement teams, suppliers, and contract execution workflows.",
    linksLabel: "Platform links",
    links: [
      { label: "Supplier Portal", href: "https://megp.dev.peragosystems.com/" },
      { label: "Back Office", href: "https://megp-bo.dev.peragosystems.com/planning/dashboard" },
    ],
    contributions: [
      {
        title: "Supplier portal and procurement workflows",
        summary:
          "Implemented supplier-facing functionality across bid preparation, submission, withdrawal, clarifications, purchase orders, delivery notes, and contract signing, including associated frontend and backend changes.",
      },
      {
        title: "Contract execution and business workflows",
        summary:
          "Developed features involving contract preparation, payment adjustments, claims review, inspections, goods receipt, and purchase-order approvals, supporting interconnected procurement and contract execution processes.",
      },
      {
        title: "Tendering and administrative review",
        summary:
          "Implemented tender amendment attachments, evaluation and award interfaces, administrative appeals, permission handling, and feature configuration.",
      },
      {
        title: "Planning and tenant configuration",
        summary:
          "Worked on requisition workflows, vendor recommendations, RFQ reviews, technical team configuration, call-off amounts, and tenant-specific procurement settings.",
      },
      {
        title: "Mentorship",
        summary:
          "Onboarded an intern onto the MEGP codebase, walking through the architecture, business logic and procurement workflows, assigning tasks, and reviewing their pull request.",
      },
      {
        title: "Ethiopian EGP — Angular 20 migration",
        summary:
          "Contributed substantially to migrating the Ethiopian EGP frontend to Angular 20, adopting Signals and standalone components while modernizing existing application patterns to improve maintainability and developer experience.",
        outcome:
          "Helped modernize the frontend's component and state-management patterns while improving maintainability and developer experience.",
        distinct: true,
      },
    ],
    technologyLabel: "Technologies",
    technologies:
      "TypeScript, React, Next.js, Angular, Mantine, NestJS, PostgreSQL, TypeORM, Redux Toolkit, RTK Query, RabbitMQ, and shared monorepo packages.",
    emphasis: "primary",
  },
  {
    id: "afterquery",
    role: "Full-Stack Software Engineer — Testing & Evaluation",
    company: "AfterQuery",
    employmentType: "Contract",
    dates: "January 2026 – Present",
    introduction:
      "Contribute to software-engineering benchmark development and AI coding-agent evaluation, designing reproducible tasks that assess implementation correctness, debugging ability, and performance across multi-step development workflows.",
    bullets: [
      "Pluto — Terminal-Agent Benchmarks: Design and validate Harbor/Terminal-Bench-style coding tasks with Dockerized environments, structured instructions, oracle solutions, and automated test suites.",
      "Deterministic Verification: Run tasks locally and validate expected behavior through executable tests, pre/post-solution checks, and reproducible failure cases.",
      "Hydra — Multi-Round Evaluations: Develop connected software feature scenarios spanning 10–40 rounds, using persistent application state, contract checkpoints, and regression checks to evaluate long-horizon agent performance.",
      "Evaluation Quality: Test agent implementations and repairs against edge cases, regression risks, and task constraints to assess correctness and identify incomplete or incorrect solutions.",
    ],
    technologyLabel: "Technical focus",
    technologies: "Docker, automated testing, and benchmark design.",
    emphasis: "standard",
  },
  {
    id: "qemer",
    role: "Software Engineering Intern",
    company: "Qemer Software Technology PLC",
    dates: "January 2024 – March 2024",
    introduction: "Frontend work on an enterprise inventory management system.",
    bullets: [
      "Built reusable React components for an enterprise inventory management system, improving consistency across business workflows.",
      "Integrated REST APIs into frontend applications and implemented data-driven interfaces for inventory and operational workflows.",
      "Improved form validation, UI structure, and user flows to reduce input errors and improve usability.",
    ],
    emphasis: "standard",
  },
]

export const projects: readonly Project[] = [
  {
    slug: "mini-erp",
    name: "Mini ERP",
    category: "Full-stack business application",
    purpose:
      "A small business system for inventory, invoicing, and sign-in, with PostgreSQL as the record of what happened.",
    capabilities: [
      "Authentication with admin and staff roles, enforced on the API.",
      "Product stock derived from an in-and-out movement ledger.",
      "Draft invoices that deduct stock in one transaction when they are issued.",
    ],
    technologies: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL"],
    links: [
      { label: "Live demo", href: "https://erp-system-phi-gules.vercel.app/" },
      { label: "Source code", href: "https://github.com/mariatesfaye/erp-system" },
    ],
    image: {
      src: "/images/projects/mini-erp.png",
      alt: "Mini ERP products page with a create form and the product table.",
    },
    deployed: true,
    decisions: [
      "Admin and staff roles are enforced on the NestJS API. Stock is a ledger of in and out movements, and the balance is their sum rather than a quantity edited on the product.",
      "Issuing an invoice checks that it is still a draft, checks availability, writes the outgoing movements, and marks the invoice issued inside one database transaction. Issued invoices stay unchanged.",
    ],
  },
  {
    slug: "flowboard",
    name: "FlowBoard",
    category: "Collaboration and task management",
    purpose:
      "A workspace for organizing projects and tasks, with live updates when someone else changes the board.",
    capabilities: [
      "Workspace membership with owner, member, and viewer roles.",
      "Boards, tasks, labels, comments, and an activity history.",
      "Drag-and-drop task ordering, synchronized over Socket.IO.",
    ],
    technologies: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Socket.IO"],
    links: [{ label: "Source code", href: "https://github.com/mariatesfaye/flowboard" }],
    image: {
      src: "/images/projects/flowboard.png",
      alt: "FlowBoard board with Todo, In Progress, and Done columns.",
    },
    decisions: [
      "A workspace has owner, member, and viewer roles. Boards, tasks, labels, comments, and activity are stored in PostgreSQL through Prisma, and the Next.js app reads and writes them through the NestJS API.",
      "Socket.IO sends task and comment changes to the other people on that board. Dragging a task updates the screen immediately and rolls back if the request fails. The person who made the change does not apply their own socket echo a second time.",
    ],
  },
  {
    slug: "docflow-ai",
    name: "DocFlow AI",
    category: "AI-assisted document processing",
    purpose:
      "Upload a document, extract structured fields, and correct them before approval or export.",
    capabilities: [
      "PDF text extraction, with an OCR fallback.",
      "A deterministic demo extractor, and an optional OpenAI path.",
      "Editable fields, then approval, rejection, or export.",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    links: [{ label: "Source code", href: "https://github.com/mariatesfaye/docflow-ai" }],
    image: {
      src: "/images/projects/docflow-ai.png",
      alt: "DocFlow AI operations dashboard with document counts and recent invoices.",
    },
    decisions: [
      "A document is extracted into fields a person can edit. Review is where those values are corrected before approval, rejection, or export, so an extracted value is not treated as final.",
      "The default extractor is deterministic and labeled as a demo, so the app can run without an API key. The optional OpenAI path is separate. If it fails, the failure is shown instead of being replaced with a successful-looking result.",
      "The evaluation harness scores synthetic test fixtures that have known answers. It checks that the pipeline can be reproduced. It is not a measure of accuracy on real documents.",
    ],
  },
]

export const technicalStrengths: readonly TechGroup[] = [
  {
    title: "Frontend engineering",
    items: [
      "TypeScript, JavaScript, React, Next.js, Angular, Redux Toolkit, RTK Query, Tailwind CSS, Mantine",
      "Component architecture, state management, API integration, form validation, responsive interfaces, complex business workflows.",
    ],
  },
  {
    title: "Backend and APIs",
    items: [
      "Node.js, NestJS, FastAPI, REST APIs, PostgreSQL, MySQL, MongoDB, TypeORM, Prisma",
      "Authentication, authorization, RBAC, relational data modeling, business logic, multi-tenant systems.",
    ],
  },
  {
    title: "Engineering and tooling",
    items: [
      "Python, Docker, Git, GitHub Actions, pnpm, Linux, Jest, PyTest, integration testing, CI/CD, monorepo workflows.",
      "RabbitMQ, asynchronous workflows, automated verification.",
    ],
  },
  {
    title: "AI evaluation",
    items: [
      "Coding-agent evaluation, benchmark design, Harbor, terminal-agent testing, reproducible environments, regression testing.",
    ],
  },
]

export const education: Education = {
  degree: "BSc in Software Engineering",
  institution: "Addis Ababa University — Addis Ababa Institute of Technology (AAiT)",
  dates: "2021 – 2025",
  graduation: "July 2025",
}

export const resume: ResumeConfig = {
  path: "/resume/Maria_Tesfaye_FSCV1.pdf",
  downloadName: "Maria_Tesfaye_FSCV1.pdf",
  // updated: "October 2026",
}
