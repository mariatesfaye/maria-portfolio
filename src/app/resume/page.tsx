import type { Metadata } from "next"
import Link from "next/link"
import { ResumeUnavailable, ResumeViewer } from "@/components/ResumeViewer"
import { isResumeAvailable } from "@/lib/assets"
import { routeMetadata } from "@/lib/site"

export function generateMetadata(): Metadata {
  const available = isResumeAvailable()
  return {
    title: "Resume",
    description: available
      ? "Resume for Maria Tesfaye, a full-stack software engineer."
      : "Maria Tesfaye's resume is not available yet.",
    robots: available ? { index: true, follow: true } : { index: false, follow: false },
    ...routeMetadata("/resume"),
  }
}

export default function ResumePage() {
  const available = isResumeAvailable()

  return (
    <main id="content" tabIndex={-1} className="focus-target flex-1">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-8">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">
            Back to portfolio
          </Link>
        </p>
        {available ? <ResumeViewer /> : <ResumeUnavailable />}
      </div>
    </main>
  )
}
