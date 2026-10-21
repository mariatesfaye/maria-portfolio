# Maria Tesfaye

Personal portfolio for Maria Tesfaye, a full-stack software engineer. One page, plus `/resume`.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change portfolio content

Edit `src/data/portfolio.ts`. That file holds the profile, experience, projects, technical strengths, education, contact copy, navigation, and resume settings. Optional fields stay hidden until you set them:

- `decisions` on a project: short notes in the expandable “Engineering decisions” block. Keep them tied to choices you actually made.
- `portrait`: a photo, rendered only when the field is set and the file exists.
- AfterQuery `dates`: add them when the contract period is confirmed.
- `resume.updated`: a short label such as `"October 2026"`.

## Project screenshots

Put one PNG in `public/` for each project. The page checks for the file at build time. Until the file is there, the project shows a temporary placeholder labeled “Screenshot not yet added.”

| Project | Path |
| --- | --- |
| Mini ERP | `public/images/projects/mini-erp.png` |
| FlowBoard | `public/images/projects/flowboard.png` |
| DocFlow AI | `public/images/projects/docflow-ai.png` |

Use a real screen from the application, about 2:1, and at least 1400px wide. Update the `alt` text in `src/data/portfolio.ts` so it describes the actual screen.

A portrait is optional. If you want one, add the image and set `portrait` in the profile data. One photo is enough. The site does not need a portrait.

Restart the dev server if a new file does not appear. Production picks the files up on the next build.

## Resume PDF

Place the file at:

`public/resume/Maria-Tesfaye-Resume.pdf`

The download name is set in `resume.downloadName`. While the file is missing, the site builds, every Resume link stays hidden, and `/resume` shows a short unavailable message with `noindex`. After you add the file and rebuild, `/resume` embeds the PDF on desktop and shows a download card below the `md` breakpoint.

Export the PDF from a document editor so the text is selectable. Keep it to one page, single column, with standard headings. The facts must match this site. Do not publish a phone number or home address unless you choose to.

## Production URL

Set `NEXT_PUBLIC_SITE_URL` to the public origin, without a trailing path guess:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Canonical URLs, absolute Open Graph URLs, the sitemap, and the Person `url` field are omitted when this variable is unset.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm check:links
pnpm build
pnpm start
```

`check:links` requests the external URLs in `src/data/portfolio.ts` and prints a status table. It is not part of the build. If the machine has no network, the script says so and does not treat that as a failed link check.

## Deploy

Vercel works. Set `NEXT_PUBLIC_SITE_URL` in the project environment before deploying so canonical and share URLs are absolute.
