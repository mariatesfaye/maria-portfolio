import Link from "next/link"
import { CommandPaletteTrigger } from "@/components/CommandPaletteTrigger"
import { MobileNav } from "@/components/MobileNav"
import { NavLinks } from "@/components/NavLinks"
import { ResumeLink } from "@/components/ResumeLink"
import { ThemeToggle } from "@/components/ThemeToggle"
import { isResumeAvailable } from "@/lib/assets"

export function Header() {
  const resumeAvailable = isResumeAvailable()

  return (
    <header className="sticky top-0 z-40 border-b border-control bg-bg">
      <div className="relative mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-5 sm:px-8">
        <Link
          href="/#top"
          aria-label="Maria Tesfaye, home"
          className="inline-flex min-h-11 items-center gap-2.5 pr-1"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-8 items-center justify-center border border-control font-mono text-[11px] tracking-wide"
          >
            MT
          </span>
          <span aria-hidden="true" className="hidden text-sm font-medium sm:inline">
            Maria Tesfaye
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks orientation="row" />
        </nav>
        <div className="ml-auto flex items-center">
          {resumeAvailable ? <ResumeLink className="mr-1 hidden md:inline-flex" /> : null}
          <CommandPaletteTrigger />
          <ThemeToggle />
          <MobileNav resumeAvailable={resumeAvailable} />
        </div>
      </div>
    </header>
  )
}
