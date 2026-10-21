import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="content" tabIndex={-1} className="focus-target flex-1">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">404</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-4 max-w-[68ch] leading-7 text-muted">That page is not on this site.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center text-sm underline decoration-1 underline-offset-4"
        >
          Back to portfolio
        </Link>
      </div>
    </main>
  )
}
