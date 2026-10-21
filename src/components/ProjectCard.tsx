import { ChevronDown } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/data/portfolio"
import { ExternalLink } from "@/components/ExternalLink"
import { cn } from "@/lib/cn"

export function ProjectCard({
  project,
  imageAvailable,
  reverse = false,
}: {
  project: Project
  imageAvailable: boolean
  reverse?: boolean
}) {
  return (
    <article className="grid items-start gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <figure
        className={cn(
          "min-w-0 border border-control bg-bg-elevated lg:col-span-7",
          reverse && "lg:col-start-6",
        )}
      >
        <div className="relative aspect-[2/1] overflow-hidden">
          {imageAvailable ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
                Temporary placeholder
              </p>
              <p className="text-sm">{project.name}</p>
              <p className="max-w-[28ch] text-sm text-muted">Screenshot not yet added.</p>
            </div>
          )}
        </div>
      </figure>
      <div className={cn("min-w-0 lg:col-span-5", reverse && "lg:col-start-1 lg:row-start-1")}>
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase">
          {project.category}
          {project.deployed ? (
            <>
              <span aria-hidden="true"> · </span>
              Deployed
            </>
          ) : null}
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight">{project.name}</h3>
        <p className="mt-4 text-[1.02rem] leading-7">{project.purpose}</p>
        <ul className="mt-5 space-y-2.5">
          {project.capabilities.map((capability) => (
            <li key={capability} className="grid grid-cols-[0.4rem_minmax(0,1fr)] gap-3 text-sm leading-6">
              <span aria-hidden="true" className="mt-2.5 size-1 bg-muted" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-xs leading-5 text-muted">
          <span className="sr-only">Technologies: </span>
          {project.technologies.join(" · ")}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {project.links.map((link) => (
            <li key={link.href}>
              <ExternalLink
                href={link.href}
                className="min-h-11 text-sm text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
        <details className="group mt-8 open:bg-bg-elevated">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-t border-border py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            <span>
              Engineering decisions
              <span className="sr-only"> for {project.name}. </span>
              <span className="mt-0.5 block text-xs font-normal text-muted group-open:hidden">
                Show technical details
              </span>
              <span className="mt-0.5 hidden text-xs font-normal text-muted group-open:block">
                Hide technical details
              </span>
            </span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted group-open:rotate-180" />
          </summary>
          <div className="space-y-3 pb-4 text-sm leading-6">
            {project.decisions.map((decision) => (
              <p key={decision}>{decision}</p>
            ))}
          </div>
        </details>
      </div>
    </article>
  )
}
