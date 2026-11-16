import { SectionHeading } from "@/components/SectionHeading"
import { about, sectionIds, technicalStrengths } from "@/data/portfolio"

export function AboutSection() {
  return (
    <section id={sectionIds.about} aria-labelledby="about-heading" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading index="03" title="About" headingId="about-heading" />
        <div className="max-w-[62ch] space-y-4 text-[1.0625rem] leading-7 text-pretty">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <h3 className="mt-8 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
          Technical strengths
        </h3>
        <div className="mt-5 grid gap-8 sm:grid-cols-2">
          {technicalStrengths.map((group) => (
            <section key={group.title} aria-labelledby={`strength-${group.title}`}>
              <h4 id={`strength-${group.title}`} className="text-sm font-medium">
                {group.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
