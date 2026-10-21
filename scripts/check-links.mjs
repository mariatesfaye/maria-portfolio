import fs from "node:fs"
import path from "node:path"

const sourcePath = path.join(process.cwd(), "src/data/portfolio.ts")
const source = fs.readFileSync(sourcePath, "utf8")
const urls = [
  ...new Set(
    [...source.matchAll(/https?:\/\/[^\s"'`),]+/g)].map((match) => match[0].replace(/[.,)]+$/, "")),
  ),
]

const timeoutMs = 8000

function isNetworkError(error) {
  const message = error instanceof Error ? error.message : String(error)
  return /fetch failed|ENOTFOUND|ECONNRESET|ECONNREFUSED|EAI_AGAIN|ETIMEDOUT|network|aborted|getaddrinfo|AbortError/i.test(
    message,
  )
}

if (urls.length === 0) {
  console.log("No external URLs found in src/data/portfolio.ts")
  process.exit(0)
}

console.log(`Checking ${urls.length} URLs from src/data/portfolio.ts\n`)

const rows = []
let networkErrors = 0

for (const url of urls) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "Mozilla/5.0 (compatible; MariaPortfolioLinkCheck/1.0)",
      },
    })
    rows.push({ url, status: String(response.status), note: response.ok ? "ok" : "not verified" })
  } catch (error) {
    if (isNetworkError(error)) networkErrors += 1
    const message = error instanceof Error ? error.message : String(error)
    rows.push({ url, status: "ERR", note: message })
  } finally {
    clearTimeout(timer)
  }
}

const statusWidth = Math.max(6, ...rows.map((row) => row.status.length))
console.log(`${"status".padEnd(statusWidth)}  url`)
console.log(`${"-".repeat(statusWidth)}  ${"-".repeat(8)}`)
for (const row of rows) {
  console.log(`${row.status.padEnd(statusWidth)}  ${row.url}`)
  if (row.note !== "ok") console.log(`${"".padEnd(statusWidth)}  ${row.note}`)
}

if (networkErrors === urls.length) {
  console.log("\nThis environment could not reach the network. No links were verified.")
  process.exit(0)
}

const verified = rows.filter((row) => row.note === "ok")
const unverified = rows.filter((row) => row.note !== "ok")
console.log(`\nVerified (HTTP 2xx): ${verified.length}`)
console.log(`Not verified: ${unverified.length}`)
if (unverified.length > 0) {
  console.log("Unverified URLs were not confirmed. A non-2xx response from a bot check is not proof the link is broken.")
}
