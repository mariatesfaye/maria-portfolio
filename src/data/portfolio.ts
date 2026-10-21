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
  "Maria Tesfaye is a full-stack software engineer in Addis Ababa. She contributes to production e-government procurement systems, builds full-stack applications, and evaluates AI coding agents."

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

export const about =
  "The part of engineering I keep coming back to is a workflow that has to be right: who may act, which state is allowed next, and whether the document matches the record. My own projects are where I work through that same judgment on a smaller scale."

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
      "I contribute to MEGP (Malawi Electronic Government Procurement) and SEGP (Sierra Leone Electronic Government Procurement), multi-tenant e-procurement platforms connecting procurement teams, suppliers, and contract execution workflows.",
    linksLabel: "Platform links",
    links: [
      { label: "Supplier Portal", href: "https://megp.dev.peragosystems.com/" },
      { label: "Back Office", href: "https://megp-bo.dev.peragosystems.com/planning/dashboard" },
    ],
    contributions: [
      {
        title: "Supplier portal and procurement journeys",
        summary:
          "Implement and refine supplier-facing workflows for bid preparation and submission, submission withdrawal, clarifications, purchase orders, delivery notes, and contract signing with comments.",
        impact: "Helps suppliers complete key procurement activities through connected digital workflows.",
      },
      {
        title: "Contract execution and approvals",
        summary:
          "Contribute to contract preparation, payment adjustments, contract claims, inspection and review, purchase-order approvals, and goods receipt notes, including related frontend and backend changes.",
        impact:
          "Supports traceable handoffs between contract approvals, delivery records, inspections, and payment workflows.",
      },
      {
        title: "Tendering and administrative review",
        summary:
          "Implement features involving tender amendment attachments, evaluation and award interfaces, and administrative review and appeals with associated permissions and feature configuration.",
        impact:
          "Keeps procurement decisions, supporting documents, and access permissions aligned with each stage of the process.",
      },
      {
        title: "Planning, vendor management, and tenant configuration",
        summary:
          "Work on procurement requisition workflows, technical team configuration, call-off amounts, vendor recommendation and removal, RFQ review, and tenant-specific feature configuration.",
        impact: "Supports configurable procurement processes across different organizational and tenant requirements.",
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
    // TODO(Maria): add dates when the AfterQuery contract period is confirmed.
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
    title: "Frontend",
    items: [
      "React, Next.js, Angular, and React Native",
      "TypeScript and JavaScript",
      "Tailwind CSS and Mantine",
      "Redux Toolkit and RTK Query",
      "Forms, validation, responsive UI, and complex business workflows"
    ],
  },
  {
    title: "Backend and APIs",
    items: [
      "Node.js, NestJS, and FastAPI",
      "REST APIs and service integration",
      "PostgreSQL and relational data modeling",
      "TypeORM, Prisma, and SQLAlchemy",
      "Authentication, authorization, RBAC, and business rules",
    ],
  },
  {
    title: "Engineering and tooling",
    items: [
      "Python and TypeScript for development and evaluation tasks",
      "Docker, pnpm, and monorepo workflows",
      "Automated testing and reproducible environments",
      "RabbitMQ and asynchronous workflows",
      "AI coding-agent evaluation and benchmark task design",
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
  path: "/resume/Maria_Tesfaye_FSCV.pdf",
  downloadName: "Maria_Tesfaye_FSCV.pdf",
  // updated: "October 2026",
}
