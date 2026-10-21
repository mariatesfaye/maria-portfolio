import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { UiProvider } from "@/components/UiProvider"
import { siteDescription } from "@/data/portfolio"
import { isResumeAvailable } from "@/lib/assets"
import { getSiteUrl } from "@/lib/site"
import { themeInitScript } from "@/lib/theme"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: {
    default: "Maria Tesfaye | Full-Stack Software Engineer",
    template: "%s | Maria Tesfaye",
  },
  description: siteDescription,
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: "Maria Tesfaye | Full-Stack Software Engineer",
    description: siteDescription,
    type: "website",
    siteName: "Maria Tesfaye",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Maria Tesfaye | Full-Stack Software Engineer",
    description: siteDescription,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#131311" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <UiProvider resumeAvailable={isResumeAvailable()}>
          <Header />
          {children}
          <Footer />
        </UiProvider>
      </body>
    </html>
  )
}
