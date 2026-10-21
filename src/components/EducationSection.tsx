import { SectionHeading } from "@/components/SectionHeading"
import { education, sectionIds } from "@/data/portfolio"

export function EducationSection() {
  return (
    <section
      id={sectionIds.education}
      aria-labelledby="education-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading index="04" title="Education" headingId="education-heading" />
        <div className="grid gap-2 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-10">
          <p className="font-mono text-xs leading-5 text-muted">{education.dates}</p>
          <div>
            <p className="font-medium">{education.degree}</p>
            <p className="mt-1 max-w-[68ch] text-sm leading-6 text-muted">{education.institution}</p>
            <p className="mt-2 font-mono text-xs text-muted">Graduation {education.graduation}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
