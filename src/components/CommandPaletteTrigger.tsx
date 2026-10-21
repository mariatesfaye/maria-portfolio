"use client"

import { Search } from "lucide-react"
import { useSyncExternalStore } from "react"
import { usePalette } from "@/components/UiProvider"

function subscribeCoarse(onStoreChange: () => void) {
  const media = window.matchMedia("(pointer: coarse)")
  media.addEventListener("change", onStoreChange)
  return () => media.removeEventListener("change", onStoreChange)
}

function coarseSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches
}

function appleSnapshot() {
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
}

function serverFalse() {
  return false
}

function subscribeStatic() {
  return () => {}
}

export function CommandPaletteTrigger() {
  const { openPalette } = usePalette()
  const touch = useSyncExternalStore(subscribeCoarse, coarseSnapshot, serverFalse)
  const apple = useSyncExternalStore(subscribeStatic, appleSnapshot, serverFalse)
  const modifier = apple ? "⌘" : "Ctrl"

  if (touch) {
    return (
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command palette"
        aria-keyshortcuts="Control+K Meta+K"
        className="inline-flex size-11 items-center justify-center hover:bg-bg-elevated"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command palette"
      aria-keyshortcuts="Control+K Meta+K"
      className="inline-flex min-h-11 items-center gap-1 px-2 font-mono text-[11px] tracking-wide text-muted hover:text-text"
    >
      <span aria-hidden="true">{modifier}</span>
      <span aria-hidden="true">K</span>
    </button>
  )
}
