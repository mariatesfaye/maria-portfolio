import type { Metadata } from "next"

/**
 * Production origin for canonical and Open Graph URLs.
 * Set NEXT_PUBLIC_SITE_URL, for example https://example.com.
 * When it is unset or invalid, absolute URLs are omitted.
 */
export function getSiteUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!value) return null

  try {
    const url = new URL(value)
    const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")
    return `${url.origin}${pathname}`
  } catch {
    return null
  }
}

export function absoluteUrl(path: string): string | null {
  const siteUrl = getSiteUrl()
  if (!siteUrl) return null
  return new URL(path, `${siteUrl}/`).toString()
}

export function routeMetadata(path: string): Metadata {
  const url = absoluteUrl(path)
  if (!url) return {}

  return {
    alternates: { canonical: url },
    openGraph: { url },
  }
}
