import { profile } from "@/data/portfolio"
import { getSiteUrl } from "@/lib/site"

export function PersonJsonLd() {
  const siteUrl = getSiteUrl()
  const data: {
    "@context": string
    "@type": string
    name: string
    jobTitle: string
    sameAs: string[]
    url?: string
  } = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    sameAs: [profile.github, profile.linkedin, profile.leetcode],
  }

  if (siteUrl) data.url = siteUrl

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
