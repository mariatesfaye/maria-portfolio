import { FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { heroTechnologies, profile, sectionIds } from "@/data/portfolio"
import { isResumeAvailable, publicFileExists } from "@/lib/assets"

export function Hero() {
  const resumeAvailable = isResumeAvailable()
  const portrait =
    profile.portrait && publicFileExists(profile.portrait.src) ? profile.portrait : null

  return (
    <section aria-labelledby={sectionIds.top} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
        <div className={portrait ? "grid items-start gap-8 sm:grid-cols-[minmax(0,1fr)_auto]" : undefined}>
          <div>
            <h1
              id={sectionIds.top}
              tabIndex={-1}
              className="focus-target scroll-mt-24 text-4xl font-medium tracking-tight text-balance sm:text-5xl"
            >
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-muted sm:text-xl">{profile.role}</p>
            <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-7 text-pretty">{profile.focus}</p>
            <p className="mt-4 max-w-[68ch] text-[1.0625rem] leading-7 text-pretty">{profile.introduction}</p>
            <p className="mt-6 max-w-[68ch] font-mono text-xs leading-5 text-muted">
              {profile.location}
              <span aria-hidden="true"> · </span>
              {profile.availability}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={`/#${sectionIds.projects}`}
                className="inline-flex min-h-11 w-full items-center justify-center bg-text px-4 text-sm text-bg hover:opacity-80 sm:w-auto"
              >
                View selected work
              </Link>
              <Link
                href={`/#${sectionIds.contact}`}
                className="inline-flex min-h-11 w-full items-center justify-center border border-control px-4 text-sm hover:border-text sm:w-auto"
              >
                Get in touch
              </Link>
              {resumeAvailable ? (
                <Link
                  href="/resume"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  Resume
                </Link>
              ) : null}
            </div>
            <p className="mt-8 max-w-[68ch] font-mono text-xs leading-5 text-muted">
              <span className="sr-only">Technologies: </span>
              {heroTechnologies.join(" · ")}
            </p>
          </div>
          {portrait ? (
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={128}
              height={128}
              className="size-28 border border-control object-cover sm:size-32"
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
