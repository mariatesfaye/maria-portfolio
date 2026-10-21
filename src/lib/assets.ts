import fs from "node:fs"
import path from "node:path"
import { resume } from "@/data/portfolio"

export function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "")
  if (relative.length === 0 || relative.includes("..")) return false
  return fs.existsSync(path.join(process.cwd(), "public", relative))
}

export function isResumeAvailable(): boolean {
  return publicFileExists(resume.path)
}
