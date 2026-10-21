"use client"

import { useEffect, useRef, useState } from "react"
import { profile } from "@/data/portfolio"
import { copyText } from "@/lib/clipboard"
import { cn } from "@/lib/cn"

export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState("")
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  async function onCopy() {
    const ok = await copyText(profile.email)
    if (timer.current !== null) window.clearTimeout(timer.current)

    if (!ok) {
      setCopied(false)
      setStatus("Could not copy email")
      return
    }

    setCopied(true)
    setStatus("Email copied")
    timer.current = window.setTimeout(() => {
      setCopied(false)
      setStatus("")
    }, 2000)
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          "inline-flex min-h-11 items-center justify-center border border-control px-3 text-sm",
          className,
        )}
      >
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status}
      </span>
    </>
  )
}
