"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/cn"

export function ResumeLink({ className }: { className?: string }) {
  const pathname = usePathname()
  const current = pathname === "/resume"

  return (
    <Link
      href="/resume"
      aria-current={current ? "page" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center border px-3 text-sm",
        current ? "border-text font-medium" : "border-control hover:border-text",
        className,
      )}
    >
      Resume
    </Link>
  )
}
