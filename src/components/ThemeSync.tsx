"use client"

import { useLayoutEffect } from "react"
import { applyTheme, readStoredTheme, resolveTheme, systemTheme } from "@/lib/theme"

export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(resolveTheme())

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    function onSystemChange() {
      if (readStoredTheme()) return
      applyTheme(systemTheme())
    }

    media.addEventListener("change", onSystemChange)
    return () => media.removeEventListener("change", onSystemChange)
  }, [])

  return null
}
