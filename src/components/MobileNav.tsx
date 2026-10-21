"use client"

import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { NavLinks } from "@/components/NavLinks"
import { ResumeLink } from "@/components/ResumeLink"
import { getFocusable } from "@/lib/focus"

export function MobileNav({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    function onPaletteOpen() {
      setOpen(false)
    }
    window.addEventListener("palette-open", onPaletteOpen)
    return () => window.removeEventListener("palette-open", onPaletteOpen)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    function onChange() {
      if (media.matches) setOpen(false)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return
    const root = panel

    const initial = getFocusable(root)
    initial[0]?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        buttonRef.current?.focus()
        return
      }

      if (event.key !== "Tab") return
      const items = getFocusable(root)
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (root.contains(target) || buttonRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onPointerDown)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center hover:bg-bg-elevated md:hidden"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
      </button>
      {open ? (
        <div
          ref={panelRef}
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-control bg-bg md:hidden"
        >
          <nav aria-label="Mobile" className="px-3 py-2">
            <NavLinks orientation="column" onNavigate={() => setOpen(false)} />
            {resumeAvailable ? (
              <ResumeLink className="mx-2.5 mt-1" />
            ) : null}
          </nav>
        </div>
      ) : null}
    </>
  )
}
