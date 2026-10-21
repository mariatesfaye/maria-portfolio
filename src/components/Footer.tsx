import Link from "next/link"
import { CopyrightYear } from "@/components/CopyrightYear"
import { ExternalLink } from "@/components/ExternalLink"
import { profile } from "@/data/portfolio"
import { isResumeAvailable } from "@/lib/assets"

export function Footer() {
  const resumeAvailable = isResumeAvailable()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="text-sm text-muted">{profile.role}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <ExternalLink href={profile.linkedin} className="min-h-11 underline-offset-4 hover:underline">
                LinkedIn
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.github} className="min-h-11 underline-offset-4 hover:underline">
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.leetcode} className="min-h-11 underline-offset-4 hover:underline">
                LeetCode
              </ExternalLink>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center hover:underline">
                Email
              </a>
            </li>
            {resumeAvailable ? (
              <li>
                <Link href="/resume" className="inline-flex min-h-11 items-center hover:underline">
                  Resume
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        <p className="font-mono text-xs text-muted">
          © <CopyrightYear /> {profile.name}
        </p>
      </div>
    </footer>
  )
}
