import { experience, sectionIds, type ExperienceEntry as ExperienceEntryData } from "@/data/portfolio"
import { cn } from "@/lib/cn"
import { ExternalLink } from "@/components/ExternalLink"
import { SectionHeading } from "@/components/SectionHeading"

function Bullet({ text }: { text: string }) {
  const splitAt = text.indexOf(":")
  if (splitAt === -1) return text

  return (
    <>
      <span className="font-medium">{text.slice(0, splitAt + 1)}</span>
      {text.slice(splitAt + 1)}
    </>
  )
}

function Contributions({ examples }: { examples: NonNullable<ExperienceEntryData["contributions"]> }) {
  const platform = examples.filter((example) => !example.distinct)
  const distinct = examples.filter((example) => example.distinct)

  return (
    <div className="mt-6 space-y-4">
      {platform.length > 0 ? (
        <div className="border border-control bg-bg-elevated">
          <h4 className="border-b border-border px-4 py-3 text-sm font-medium tracking-tight sm:px-5">
            Selected Engineering Contributions
          </h4>
          <ol>
            {platform.map((example, index) => (
              <li key={example.title} className="border-t border-border px-4 py-5 first:border-t-0 sm:px-5">
                <div className="grid gap-2 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-4">
                  <p className="font-mono text-xs text-muted">0{index + 1}</p>
                  <div className="min-w-0">
                    <h5 className="font-medium tracking-tight">{example.title}</h5>
                    <p className="mt-3 max-w-[68ch] text-sm leading-6">{example.summary}</p>
                    {example.impact ? (
                      <div className="mt-3">
                        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Impact</p>
                        <p className="mt-1 max-w-[68ch] text-sm leading-6">{example.impact}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      {distinct.map((example) => (
        <div key={example.title} className="border-l-2 border-accent px-4 py-1">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Frontend migration</p>
          <h5 className="mt-1 font-medium tracking-tight">{example.title}</h5>
          <p className="mt-1.5 max-w-[68ch] text-sm leading-6">{example.summary}</p>
          {example.outcome ? (
            <div className="mt-3">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Outcome</p>
              <p className="mt-1 max-w-[68ch] text-sm leading-6">{example.outcome}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function ExperienceEntry({ entry }: { entry: ExperienceEntryData }) {
  const compact = entry.emphasis === "compact"
  const primary = entry.emphasis === "primary"

  return (
    <li className={cn("py-8", primary && "py-10")}>
      <div className="grid gap-3 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-10">
        <div className="font-mono text-xs leading-5 text-muted">
          {entry.dates ? <p>{entry.dates}</p> : null}
          {entry.employmentType ? <p>{entry.employmentType}</p> : null}
          {entry.location ? <p>{entry.location}</p> : null}
        </div>
        <div className="min-w-0">
          <h3 className={cn("font-medium tracking-tight", primary ? "text-xl" : compact ? "text-base" : "text-lg")}>
            {entry.role}
          </h3>
          <p className={cn("mt-1", compact ? "text-sm text-muted" : "text-muted")}>{entry.company}</p>
          <p className={cn("mt-4 max-w-[68ch] leading-7", compact ? "text-sm" : "text-[1.02rem]")}>
            {entry.introduction}
          </p>
          {entry.links ? (
            <div className="mt-5">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{entry.linksLabel}</p>
              <ul className="mt-2 space-y-1">
                {entry.links.map((link) => (
                  <li key={link.href}>
                    <ExternalLink
                      href={link.href}
                      className="min-h-11 text-sm text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
                    >
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {entry.bullets ? (
            <ul className="mt-4 max-w-[68ch] space-y-2.5">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="grid grid-cols-[0.4rem_minmax(0,1fr)] gap-3 text-[0.98rem] leading-7">
                  <span aria-hidden="true" className="mt-3 size-1 bg-muted" />
                  <span>
                    <Bullet text={bullet} />
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {entry.contributions ? (
            <Contributions examples={entry.contributions} />
          ) : null}
          {entry.technologies ? (
            <div className="mt-5 max-w-[68ch] font-mono text-xs leading-5 text-muted">
              {entry.technologyLabel ? (
                <p className="mb-1 text-[0.6875rem] tracking-[0.14em] uppercase">{entry.technologyLabel}</p>
              ) : (
                <span className="sr-only">Also used here: </span>
              )}
              <p>{entry.technologies}</p>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function ExperienceSection() {
  return (
    <section
      id={sectionIds.experience}
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading index="01" title="Experience" headingId="experience-heading" />
        <ol className="divide-y divide-border">
          {experience.map((entry) => (
            <ExperienceEntry key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  )
}
