"use client"

import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"
import { toggleTheme, type Theme } from "@/lib/theme"

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener("themechange", onStoreChange)
  return () => window.removeEventListener("themechange", onStoreChange)
}

function themeSnapshot(): Theme | null {
  const value = document.documentElement.getAttribute("data-theme")
  if (value === "light" || value === "dark") return value
  return null
}

function themeServerSnapshot(): null {
  return null
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, themeSnapshot, themeServerSnapshot)
  const label =
    theme === "dark"
      ? "Switch to light theme"
      : theme === "light"
        ? "Switch to dark theme"
        : "Toggle color theme"

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => toggleTheme()}
      className="inline-flex size-11 items-center justify-center hover:bg-bg-elevated"
    >
      <Sun aria-hidden="true" className="theme-icon-sun size-4" />
      <Moon aria-hidden="true" className="theme-icon-moon size-4" />
    </button>
  )
}
