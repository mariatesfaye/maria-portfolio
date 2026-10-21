"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { profile, resume, sectionIds } from "@/data/portfolio"
import { copyText } from "@/lib/clipboard"
import { cn } from "@/lib/cn"
import { getFocusable } from "@/lib/focus"
import { toggleTheme } from "@/lib/theme"

type ClosePalette = (after?: () => void) => void

type Command = {
  id: string
  label: string
  group: string
  keywords: readonly string[]
  perform: () => void
}

function openExternal(url: string) {
  const opened = window.open(url, "_blank", "noopener,noreferrer")
  if (opened) opened.opener = null
}

export function CommandPalette({
  resumeAvailable,
  closePalette,
}: {
  resumeAvailable: boolean
  closePalette: ClosePalette
}) {
  const router = useRouter()
  const pathname = usePathname()
  const reactId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexedQuery, setIndexedQuery] = useState("")
  const [status, setStatus] = useState("")

  const commands = useMemo<Command[]>(() => {
    function goTo(id: string) {
      closePalette(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (pathname === "/") {
          const focusId = id === sectionIds.top ? sectionIds.top : `${id}-heading`
          const target = document.getElementById(focusId) ?? document.getElementById(id)
          target?.focus({ preventScroll: true })
          ;(document.getElementById(id) ?? target)?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          })
          const hash = `#${id}`
          if (window.location.hash !== hash) window.history.pushState(null, "", hash)
          return
        }
        router.push(`/#${id}`)
      })
    }

    const items: Command[] = [
      {
        id: "home",
        label: "Go to Home",
        group: "Navigate",
        keywords: ["home", "top", "start"],
        perform: () => goTo(sectionIds.top),
      },
      {
        id: "experience",
        label: "Go to Experience",
        group: "Navigate",
        keywords: ["work", "perago", "jobs"],
        perform: () => goTo(sectionIds.experience),
      },
      {
        id: "projects",
        label: "Go to Projects",
        group: "Navigate",
        keywords: ["selected", "work", "erp", "flowboard", "docflow"],
        perform: () => goTo(sectionIds.projects),
      },
      {
        id: "about",
        label: "Go to About and Technical Strengths",
        group: "Navigate",
        keywords: ["about", "skills", "strengths"],
        perform: () => goTo(sectionIds.about),
      },
      {
        id: "education",
        label: "Go to Education",
        group: "Navigate",
        keywords: ["university", "aait", "degree", "school"],
        perform: () => goTo(sectionIds.education),
      },
      {
        id: "contact",
        label: "Go to Contact",
        group: "Navigate",
        keywords: ["contact", "hello"],
        perform: () => goTo(sectionIds.contact),
      },
    ]

    if (resumeAvailable) {
      items.push(
        {
          id: "view-resume",
          label: "View Resume",
          group: "Resume",
          keywords: ["resume", "cv", "pdf"],
          perform: () => closePalette(() => router.push("/resume")),
        },
        {
          id: "download-resume",
          label: "Download Resume",
          group: "Resume",
          keywords: ["resume", "download", "pdf"],
          perform: () => {
            const anchor = document.createElement("a")
            anchor.href = resume.path
            anchor.download = resume.downloadName
            document.body.appendChild(anchor)
            anchor.click()
            anchor.remove()
            closePalette()
          },
        },
      )
    }

    items.push(
      {
        id: "theme",
        label: "Toggle Theme",
        group: "Appearance",
        keywords: ["dark", "light", "theme", "mode"],
        perform: () => {
          toggleTheme()
          closePalette()
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        group: "Contact",
        keywords: ["github", "code", "profile"],
        perform: () => {
          openExternal(profile.github)
          closePalette()
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Contact",
        keywords: ["linkedin", "profile"],
        perform: () => {
          openExternal(profile.linkedin)
          closePalette()
        },
      },
      {
        id: "leetcode",
        label: "Open LeetCode",
        group: "Contact",
        keywords: ["leetcode", "profile"],
        perform: () => {
          openExternal(profile.leetcode)
          closePalette()
        },
      },
      {
        id: "email",
        label: "Send Email",
        group: "Contact",
        keywords: ["email", "mail", "contact"],
        perform: () => {
          window.location.href = `mailto:${profile.email}`
          closePalette()
        },
      },
      {
        id: "copy-email",
        label: "Copy Email",
        group: "Contact",
        keywords: ["email", "copy", "clipboard"],
        perform: () => {
          void copyText(profile.email).then((ok) => {
            setStatus(ok ? "Email copied" : "Could not copy email")
          })
        },
      },
    )

    return items
  }, [closePalette, pathname, resumeAvailable, router])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter((command) =>
      `${command.label} ${command.keywords.join(" ")}`.toLowerCase().includes(needle),
    )
  }, [commands, query])

  const fromKeyboard = useRef(false)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!fromKeyboard.current || activeIndex < 0) return
    fromKeyboard.current = false
    const command = filtered[activeIndex]
    if (!command) return
    document.getElementById(`${reactId}-${command.id}`)?.scrollIntoView({ block: "nearest" })
  }, [activeIndex, filtered, reactId])

  if (query !== indexedQuery) {
    setIndexedQuery(query)
    setActiveIndex(filtered.length > 0 ? 0 : -1)
  }

  function optionId(id: string) {
    return `${reactId}-${id}`
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (filtered.length === 0) return
      fromKeyboard.current = true
      setActiveIndex((index) => (index + 1) % filtered.length)
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (filtered.length === 0) return
      fromKeyboard.current = true
      setActiveIndex((index) => (index <= 0 ? filtered.length - 1 : index - 1))
      return
    }
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      event.preventDefault()
      filtered[activeIndex]?.perform()
    }
  }

  function onDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return
    const dialog = dialogRef.current
    if (!dialog) return
    const items = getFocusable(dialog)
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

  const listId = `${reactId}-list`
  const activeCommand = activeIndex >= 0 ? filtered[activeIndex] : undefined
  let renderedIndex = -1
  const groups = ["Navigate", "Resume", "Appearance", "Contact"]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]">
      <div
        className="palette-backdrop absolute inset-0 bg-[#1b1916]/45"
        onMouseDown={() => closePalette()}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${reactId}-title`}
        onKeyDown={onDialogKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
        className="palette-dialog relative flex max-h-[min(32rem,calc(100dvh-5rem))] w-full max-w-lg flex-col border border-control bg-surface shadow-[0_24px_50px_-28px_rgba(0,0,0,0.55)]"
      >
        <div className="flex items-center justify-between border-b border-control px-3">
          <h2 id={`${reactId}-title`} className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
            Commands
          </h2>
          <button
            type="button"
            onClick={() => closePalette()}
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-text"
          >
            Close
          </button>
        </div>
        <label htmlFor={`${reactId}-input`} className="sr-only">
          Search commands
        </label>
        <input
          ref={inputRef}
          id={`${reactId}-input`}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeCommand ? optionId(activeCommand.id) : undefined}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setStatus("")
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Type a command"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="min-h-12 border-b border-control bg-transparent px-3 text-base outline-none placeholder:text-muted"
        />
        <p aria-live="polite" aria-atomic="true" className="px-3 py-2 font-mono text-[11px] text-muted">
          {filtered.length === 0 ? "No results" : `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}
        </p>
        <div id={listId} role="listbox" aria-label="Commands" className="overflow-y-auto overscroll-contain pb-2">
          {groups.map((group) => {
            const groupItems = filtered.filter((command) => command.group === group)
            if (groupItems.length === 0) return null
            return (
              <div key={group} role="presentation">
                <p className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                  {group}
                </p>
                {groupItems.map((command) => {
                  renderedIndex += 1
                  const index = renderedIndex
                  const selected = index === activeIndex
                  return (
                    <div
                      key={command.id}
                      id={optionId(command.id)}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={(event) => {
                        if (event.movementX === 0 && event.movementY === 0) return
                        setActiveIndex(index)
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => command.perform()}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center px-3 text-sm",
                        selected && "bg-bg-elevated font-medium shadow-[inset_2px_0_0_var(--accent)]",
                      )}
                    >
                      {command.label}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>
    </div>
  )
}
