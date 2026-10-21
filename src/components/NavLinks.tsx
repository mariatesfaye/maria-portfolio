"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { navigation } from "@/data/portfolio"
import { cn } from "@/lib/cn"

const sectionIds = navigation.map((item) => item.id)

export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const visible = new Map<string, IntersectionObserverEntry>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry)
          else visible.delete(entry.target.id)
        }

        let bestId: string | null = null
        let bestDistance = Number.POSITIVE_INFINITY
        for (const [id, entry] of visible) {
          const distance = Math.abs(entry.boundingClientRect.top - 88)
          if (distance < bestDistance) {
            bestDistance = distance
            bestId = id
          }
        }
        setActive(bestId)
      },
      { rootMargin: "-72px 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )

    for (const element of elements) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return active
}

export function NavLinks({
  orientation,
  onNavigate,
}: {
  orientation: "row" | "column"
  onNavigate?: () => void
}) {
  const active = useActiveSection()

  return (
    <ul className={orientation === "row" ? "flex items-center" : "flex flex-col"}>
      {navigation.map((item) => {
        const current = active === item.id
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={current ? "true" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-flex min-h-11 items-center px-2.5 text-sm",
                current ? "font-medium underline decoration-1 underline-offset-4" : "text-muted hover:text-text",
              )}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
