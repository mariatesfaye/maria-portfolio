import { ExternalLink } from "@/components/ExternalLink"
import { ProjectCard } from "@/components/ProjectCard"
import { SectionHeading } from "@/components/SectionHeading"
import { profile, projects, sectionIds } from "@/data/portfolio"
import { publicFileExists } from "@/lib/assets"

export function ProjectsSection() {
  return (
    <section
      id={sectionIds.projects}
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading index="02" title="Selected projects" headingId="projects-heading" />
        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              imageAvailable={publicFileExists(project.image.src)}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
        <p className="mt-4 pt-8 text-sm leading-6">
          More of my work is on{" "}
          <ExternalLink
            href={profile.github}
            className="text-accent underline decoration-1 underline-offset-4 hover:text-accent-hover"
          >
            GitHub
          </ExternalLink>
        </p>
      </div>
    </section>
  )
}
