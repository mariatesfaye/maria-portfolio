"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { CommandPalette } from "@/components/CommandPalette"
import { ThemeSync } from "@/components/ThemeSync"

type ClosePalette = (after?: () => void) => void

type PaletteContextValue = {
  open: boolean
  openPalette: () => void
  closePalette: ClosePalette
  togglePalette: () => void
}

const PaletteContext = createContext<PaletteContextValue | null>(null)

export function usePalette(): PaletteContextValue {
  const value = useContext(PaletteContext)
  if (!value) throw new Error("usePalette must be used within UiProvider")
  return value
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

export function UiProvider({
  children,
  resumeAvailable,
}: {
  children: ReactNode
  resumeAvailable: boolean
}) {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const previousFocus = useRef<HTMLElement | null>(null)
  const afterClose = useRef<(() => void) | undefined>(undefined)
  const mounted = useRef(false)

  const closePalette = useCallback<ClosePalette>((after) => {
    afterClose.current = after
    openRef.current = false
    setOpen(false)
  }, [])

  const openPalette = useCallback(() => {
    if (openRef.current) return
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    afterClose.current = undefined
    openRef.current = true
    setOpen(true)
    window.dispatchEvent(new Event("palette-open"))
  }, [])

  const togglePalette = useCallback(() => {
    if (openRef.current) closePalette()
    else openPalette()
  }, [closePalette, openPalette])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openRef.current) {
        event.preventDefault()
        event.stopPropagation()
        closePalette()
        return
      }

      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return
      if (!openRef.current && isTypingTarget(event.target)) return
      event.preventDefault()
      event.stopPropagation()
      togglePalette()
    }

    window.addEventListener("keydown", onKeyDown, true)
    return () => window.removeEventListener("keydown", onKeyDown, true)
  }, [closePalette, togglePalette])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (open) return
    const after = afterClose.current
    afterClose.current = undefined
    if (after) after()
    else previousFocus.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
    }
  }, [open])

  const value = useMemo(
    () => ({ open, openPalette, closePalette, togglePalette }),
    [open, openPalette, closePalette, togglePalette],
  )

  return (
    <PaletteContext.Provider value={value}>
      <div inert={open ? true : undefined} className="flex min-h-full flex-1 flex-col">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </div>
      <ThemeSync />
      {open ? <CommandPalette resumeAvailable={resumeAvailable} closePalette={closePalette} /> : null}
    </PaletteContext.Provider>
  )
}
