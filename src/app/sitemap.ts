import type { MetadataRoute } from "next"
import { isResumeAvailable } from "@/lib/assets"
import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  if (!siteUrl) return []

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ]

  if (isResumeAvailable()) {
    entries.push({
      url: `${siteUrl}/resume`,
      changeFrequency: "monthly",
      priority: 0.5,
    })
  }

  return entries
}
