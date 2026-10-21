import type { Metadata } from "next"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { EducationSection } from "@/components/EducationSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { Hero } from "@/components/Hero"
import { PersonJsonLd } from "@/components/PersonJsonLd"
import { ProjectsSection } from "@/components/ProjectsSection"
import { routeMetadata } from "@/lib/site"

export const metadata: Metadata = routeMetadata("/")

export default function Home() {
  return (
    <main id="content" tabIndex={-1} className="focus-target flex-1">
      <PersonJsonLd />
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
