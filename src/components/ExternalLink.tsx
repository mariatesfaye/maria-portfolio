import { ArrowUpRight } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/cn"

type ExternalLinkProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  href: string
  children: ReactNode
}

export function ExternalLink({ href, children, className, ...props }: ExternalLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center gap-1", className)}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
