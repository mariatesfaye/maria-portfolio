import Link from "next/link"
import { CopyEmailButton } from "@/components/CopyEmailButton"
import { ExternalLink } from "@/components/ExternalLink"
import { SectionHeading } from "@/components/SectionHeading"
import { contact, profile, sectionIds } from "@/data/portfolio"
import { isResumeAvailable } from "@/lib/assets"

const profiles = [
  { label: "LinkedIn", href: profile.linkedin, text: "maria-tesfaye" },
  { label: "GitHub", href: profile.github, text: "mariatesfaye" },
  { label: "LeetCode", href: profile.leetcode, text: "mariaa25" },
] as const

export function ContactSection() {
  const resumeAvailable = isResumeAvailable()

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading index="05" title={contact.heading} headingId="contact-heading" />
        <p className="max-w-[62ch] text-[1.0625rem] leading-7 text-pretty">{contact.body}</p>
        <div className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">Email</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 inline-flex min-h-11 items-center text-base break-all text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
            >
              {profile.email}
            </a>
          </div>
          <CopyEmailButton className="shrink-0 self-start sm:self-auto" />
        </div>
        <ul className="mt-8 flex max-w-3xl flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-12 sm:gap-y-5">
          {profiles.map((item) => (
            <li key={item.href}>
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{item.label}</p>
              <ExternalLink
                href={item.href}
                className="mt-1 min-h-11 text-sm text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
              >
                {item.text}
              </ExternalLink>
            </li>
          ))}
        </ul>
        {resumeAvailable ? (
          <p className="mt-8">
            <Link
              href="/resume"
              className="inline-flex min-h-11 items-center text-sm underline decoration-1 underline-offset-4"
            >
              Read or download resume
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  )
}
